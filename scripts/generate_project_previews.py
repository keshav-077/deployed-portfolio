"""Build portfolio previews from real repo/live media (GIF/PNG), not synthetic UI."""
from __future__ import annotations

import json
import re
import shutil
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public" / "projects"
MANIFEST = ROOT / "scripts" / "media_manifest.json"
SPECS = ROOT / "scripts" / "preview_specs.json"

OUT_W, OUT_H = 640, 360
GIF_MS = 100
KEN_BURNS_FRAMES = 48


def is_lfs_pointer(path: Path) -> bool:
    try:
        if path.stat().st_size > 400:
            return False
        return b"git-lfs" in path.read_bytes()[:120]
    except OSError:
        return True


def fit_cover(im: Image.Image, w: int, h: int) -> Image.Image:
    im = im.convert("RGB")
    return ImageOps.fit(im, (w, h), method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def gif_to_preview(src: Path, out: Path) -> None:
    im = Image.open(src)
    frames: list[Image.Image] = []
    try:
        while True:
            frame = fit_cover(im.copy().convert("RGB"), OUT_W, OUT_H)
            frames.append(frame)
            im.seek(im.tell() + 1)
    except EOFError:
        pass
    if not frames:
        frames = [fit_cover(Image.open(src).convert("RGB"), OUT_W, OUT_H)]
    if len(frames) > 80:
        step = max(1, len(frames) // 60)
        frames = frames[::step]
    out.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=GIF_MS,
        loop=0,
        optimize=True,
    )
    frames[0].save(out.with_name("poster.jpg"), quality=88, optimize=True)


def ken_burns(im: Image.Image, n: int) -> list[Image.Image]:
    im = im.convert("RGB")
    iw, ih = im.size
    frames: list[Image.Image] = []
    for i in range(n):
        t = i / max(n - 1, 1)
        ease = t * t * (3 - 2 * t)
        zoom = 1.0 + 0.2 * ease
        cw, ch = max(1, int(iw / zoom)), max(1, int(ih / zoom))
        left = (iw - cw) // 2
        top = int((ih - ch) * 0.38)
        top = max(0, min(top, ih - ch))
        crop = im.crop((left, top, left + cw, top + ch))
        frames.append(fit_cover(crop, OUT_W, OUT_H))
    return frames


def slideshow_gif(paths: list[Path], out: Path) -> None:
    images: list[Image.Image] = []
    for p in paths:
        if not p.is_file() or is_lfs_pointer(p):
            continue
        try:
            images.append(Image.open(p).convert("RGB"))
        except OSError:
            continue
    if not images:
        raise FileNotFoundError(f"No images for {out}")

    frames: list[Image.Image] = []
    per = max(12, KEN_BURNS_FRAMES // len(images))
    for im in images:
        frames.extend(ken_burns(im, per))
    out.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        out,
        save_all=True,
        append_images=frames[1:],
        duration=GIF_MS,
        loop=0,
        optimize=True,
    )
    frames[0].save(out.with_name("poster.jpg"), quality=88, optimize=True)


def copy_video(src: Path, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)


def og_fallback(pid: str, github_url: str | None) -> Path | None:
    if not github_url:
        return None
    m = re.search(r"github\.com/([^/]+)/([^/#?]+)", github_url)
    if not m:
        return None
    owner, repo = m.group(1), m.group(2)
    url = f"https://opengraph.githubassets.com/1/{owner}/{repo}"
    dest = ROOT / "scripts" / "media_cache" / pid / "github_og.jpg"
    if dest.is_file() and dest.stat().st_size > 800:
        return dest
    headers = {"User-Agent": "portfolio/1.0", "Accept": "image/*"}
    try:
        import subprocess

        token = subprocess.check_output(
            ["gh", "auth", "token"], stderr=subprocess.DEVNULL, text=True
        ).strip()
        if token:
            headers["Authorization"] = f"Bearer {token}"
    except (OSError, subprocess.SubprocessError):
        pass
    try:
        req = urllib.request.Request(url, headers=headers)
        data = urllib.request.urlopen(req, timeout=30).read()
        if len(data) > 800:
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
            return dest
    except OSError:
        return None
    return None


def build_from_entry(pid: str, entry: dict, github_url: str | None = None) -> tuple[str, str]:
    """Returns (source_kind, detail)."""
    out_gif = PUBLIC / pid / "preview.gif"
    chosen = entry.get("chosen")
    live_frames = entry.get("liveFrames") or []

    assets = entry.get("assets") or []
    repo_gifs = [
        Path(a["file"])
        for a in assets
        if a.get("file")
        and Path(a["file"]).suffix.lower() == ".gif"
        and Path(a["file"]).is_file()
        and not is_lfs_pointer(Path(a["file"]))
    ]
    if repo_gifs:
        gif_to_preview(repo_gifs[0], out_gif)
        return "repo_gif", str(repo_gifs[0])

    if live_frames and all(Path(p).is_file() for p in live_frames):
        slideshow_gif([Path(p) for p in live_frames], out_gif)
        return "live_capture", entry.get("liveUrl") or ""

    if chosen and chosen.get("file"):
        cp = Path(chosen["file"])
        if cp.is_file() and not is_lfs_pointer(cp):
            if chosen.get("source") == "live_capture" and live_frames:
                slideshow_gif([Path(p) for p in live_frames], out_gif)
                return "live_capture", chosen.get("url", "")
            ext = cp.suffix.lower()
            if ext == ".gif":
                gif_to_preview(cp, out_gif)
                return chosen.get("source", "gif"), str(cp)
            if ext in (".png", ".jpg", ".jpeg", ".webp"):
                slideshow_gif([cp], out_gif)
                return chosen.get("source", "image"), str(cp)
            if ext in (".mp4", ".webm"):
                copy_video(cp, PUBLIC / pid / f"preview{ext}")
                raise FileNotFoundError("video copied; add ffmpeg frame extract or use gif asset")

    media_paths: list[Path] = []
    for a in assets:
        p = Path(a.get("file", ""))
        if p.is_file() and not is_lfs_pointer(p) and p.suffix.lower() in (
            ".gif",
            ".png",
            ".jpg",
            ".jpeg",
            ".webp",
        ):
            media_paths.append(p)

    gifs = [p for p in media_paths if p.suffix.lower() == ".gif"]
    if gifs:
        gif_to_preview(gifs[0], out_gif)
        return "readme_gif", str(gifs[0])

    stills = [p for p in media_paths if p.suffix.lower() != ".gif"]
    stills.sort(key=lambda p: (0 if "demo" in p.name.lower() else 1, p.name))
    if stills:
        slideshow_gif(stills[:4], out_gif)
        return "readme_images", str(stills[0])

    og = og_fallback(pid, github_url)
    if og:
        slideshow_gif([og], out_gif)
        return "github_og", str(og)

    raise FileNotFoundError(f"No usable media for {pid}")


def main() -> None:
    if not MANIFEST.is_file():
        raise SystemExit("Run: python scripts/harvest_project_media.py first")

    media = json.loads(MANIFEST.read_text(encoding="utf-8"))
    specs = json.loads(SPECS.read_text(encoding="utf-8")) if SPECS.is_file() else {}
    report: dict[str, dict] = {}
    projects_text = (ROOT / "src" / "data" / "projects.ts").read_text(encoding="utf-8")
    gh_map: dict[str, str | None] = {}
    for m in re.finditer(
        r"id: '([^']+)'[\s\S]*?githubUrl:\s*(?:'([^']+)'|\n\s*'([^']+)')",
        projects_text,
    ):
        gh_map[m.group(1)] = m.group(2) or m.group(3)

    for pid, entry in media.items():
        out = PUBLIC / pid / "preview.gif"
        try:
            kind, detail = build_from_entry(pid, entry, gh_map.get(pid))
            report[pid] = {
                "source": kind,
                "detail": detail,
                "template": specs.get(pid, {}).get("visualTemplate"),
            }
            print(f"OK {pid}: {kind}")
        except FileNotFoundError as exc:
            print(f"MISSING {pid}: {exc}")
            report[pid] = {"source": "missing", "error": str(exc)}

    (PUBLIC / "generation_report.json").write_text(
        json.dumps(report, indent=2), encoding="utf-8"
    )
    ok = sum(1 for v in report.values() if v.get("source") != "missing")
    print(f"Done: {ok}/{len(report)} previews from real media")


if __name__ == "__main__":
    main()
