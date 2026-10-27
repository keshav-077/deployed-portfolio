"""Render objective / marketing animation MP4 for non-UI doc-36 projects."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import argparse
import json
import math
import re
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

from doc36_common import (
    OUT_H,
    OUT_W,
    PUBLIC,
    entry_by_id,
    ffmpeg_bin,
    parse_doc_brief,
    poster_from_mp4,
    repo_path,
)

ROOT = Path(__file__).resolve().parents[1]

C = {
    "navy": (28, 43, 54),
    "cream": (246, 242, 238),
    "accent": (200, 70, 42),
    "teal": (45, 138, 158),
    "muted": (97, 122, 138),
}


def _font(size: int) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    for path in ("C:/Windows/Fonts/segoeui.ttf", "C:/Windows/Fonts/arial.ttf"):
        p = Path(path)
        if p.is_file():
            try:
                return ImageFont.truetype(str(p), size=size)
            except OSError:
                pass
    return ImageFont.load_default()


def wrap(draw: ImageDraw.ImageDraw, text: str, font, max_w: int) -> list[str]:
    words = text.split()
    lines: list[str] = []
    cur = ""
    for w in words:
        test = f"{cur} {w}".strip()
        if draw.textlength(test, font=font) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines[:6]


def collect_stills(repo: Path) -> list[Path]:
    stills: list[Path] = []
    patterns = (
        "outputs/**/*.png",
        "outputs/**/*.jpg",
        "assets/**/*.png",
        "docs/**/*.png",
        "results/**/*.png",
        "**/sample*.png",
        "**/demo*.png",
    )
    for pat in patterns:
        for p in repo.glob(pat):
            if p.is_file() and p.stat().st_size > 3000:
                if "shield" in p.name.lower():
                    continue
                stills.append(p)
    stills.sort(key=lambda p: p.stat().st_size, reverse=True)
    return stills[:4]


def scene_text(title: str, body_lines: list[str], t: float) -> Image.Image:
    img = Image.new("RGB", (OUT_W, OUT_H), C["cream"])
    draw = ImageDraw.Draw(img)
    for y in range(OUT_H):
        u = y / OUT_H
        col = (
            int(C["navy"][0] * (1 - u) * 0.15 + C["cream"][0] * (1 - 0.15 * (1 - u))),
            int(C["navy"][1] * (1 - u) * 0.15 + C["cream"][1] * (1 - 0.15 * (1 - u))),
            int(C["navy"][2] * (1 - u) * 0.15 + C["cream"][2] * (1 - 0.15 * (1 - u))),
        )
        draw.line([(0, y), (OUT_W, y)], fill=col)
    draw.rectangle((0, 0, OUT_W, 6), fill=C["accent"])
    draw.text((32, 28), title[:48], font=_font(22), fill=C["navy"])
    ty = 78
    for line in body_lines:
        for sub in wrap(draw, line, _font(13), OUT_W - 64):
            draw.text((32, ty), sub, font=_font(13), fill=C["muted"])
            ty += 20
    pulse = 0.5 + 0.5 * math.sin(t * 8)
    draw.rectangle((32, OUT_H - 24, 32 + int((OUT_W - 64) * pulse), OUT_H - 16), fill=C["teal"])
    return img


def scene_image(still: Path, t: float) -> Image.Image:
    im = Image.open(still).convert("RGB")
    iw, ih = im.size
    zoom = 1.0 + 0.12 * t
    cw, ch = int(iw / zoom), int(ih / zoom)
    left = (iw - cw) // 2
    top = (ih - ch) // 3
    crop = im.crop((left, top, left + cw, top + ch))
    crop = crop.resize((OUT_W, OUT_H), Image.Resampling.LANCZOS)
    overlay = Image.new("RGBA", (OUT_W, OUT_H), (28, 43, 54, 0))
    draw = ImageDraw.Draw(overlay)
    draw.rectangle((0, OUT_H - 36, OUT_W, OUT_H), fill=(28, 43, 54, 180))
    draw.text((16, OUT_H - 28), still.name[:50], font=_font(11), fill=C["cream"])
    base = crop.convert("RGBA")
    base.alpha_composite(overlay)
    return base.convert("RGB")


def frames_for_project(entry: dict) -> list[Image.Image]:
    brief = parse_doc_brief(entry["docIndex"])
    title = brief.get("title") or entry["portfolioId"]
    one = str(brief.get("oneLiner") or "")
    bullets = list(brief.get("bullets") or [])[:3]
    stills = collect_stills(repo_path(entry))

    frames: list[Image.Image] = []
    n1, n2, n3 = 36, 36, 48
    for i in range(n1):
        frames.append(scene_text(str(title), [one] if one else ["Project overview"], i / n1))
    for i, b in enumerate(bullets[:2]):
        for j in range(n2 // 2):
            frames.append(scene_text(str(title), [b], j / (n2 // 2)))
    if stills:
        for still in stills[:2]:
            for j in range(n3):
                frames.append(scene_image(still, j / n3))
    else:
        for j in range(n3):
            frames.append(scene_text(str(title), bullets or ["ML pipeline", "Train · Evaluate · Deploy"], j / n3))
    return frames


def write_mp4(frames: list[Image.Image], mp4: Path) -> None:
    mp4.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        td_path = Path(td)
        for i, fr in enumerate(frames):
            fr.save(td_path / f"frame_{i:05d}.png")
        pattern = (td_path / "frame_%05d.png").as_posix()
        cmd = [
            ffmpeg_bin(),
            "-y",
            "-framerate",
            "24",
            "-i",
            pattern,
            "-c:v",
            "libx264",
            "-crf",
            "28",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            str(mp4),
        ]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            raise RuntimeError(r.stderr[-400:])


def render_project(portfolio_id: str) -> dict:
    entry = entry_by_id(portfolio_id)
    if not entry:
        raise SystemExit(f"Unknown id: {portfolio_id}")
    out_dir = PUBLIC / portfolio_id
    mp4 = out_dir / "preview.mp4"
    poster = out_dir / "poster.jpg"
    frames = frames_for_project(entry)
    write_mp4(frames, mp4)
    poster_from_mp4(mp4, poster)
    report = {
        "portfolioId": portfolio_id,
        "source": "objective_animation",
        "frameCount": len(frames),
    }
    (out_dir / "preview_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    return report


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--id", required=True)
    args = ap.parse_args()
    rep = render_project(args.id)
    print(f"Rendered {args.id}: {rep['frameCount']} frames")


if __name__ == "__main__":
    main()
