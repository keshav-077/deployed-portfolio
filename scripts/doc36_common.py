"""Shared helpers for doc-36 preview pipeline."""
from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = ROOT.parent
REGISTRY = ROOT / "scripts" / "doc36_registry.json"
DOC = REPO_ROOT / "PROJECTS_DOCUMENTATION.md"
PUBLIC = ROOT / "public" / "projects"
OUT_W, OUT_H = 640, 360


def load_registry() -> list[dict]:
    return json.loads(REGISTRY.read_text(encoding="utf-8"))


def entry_by_id(portfolio_id: str) -> dict | None:
    for e in load_registry():
        if e["portfolioId"] == portfolio_id:
            return e
    return None


def repo_path(entry: dict) -> Path:
    if entry.get("resolvedPath"):
        return Path(entry["resolvedPath"])
    for key in ("localDir", "fallbackLocalDir"):
        name = entry.get(key)
        if name and (REPO_ROOT / name).is_dir():
            return REPO_ROOT / name
    return REPO_ROOT / entry["localDir"]


def ffmpeg_bin() -> str:
    try:
        import imageio_ffmpeg

        return imageio_ffmpeg.get_ffmpeg_exe()
    except ImportError:
        pass
    pw = Path.home() / "AppData/Local/ms-playwright"
    if pw.is_dir():
        for c in sorted(pw.glob("ffmpeg-*/ffmpeg-win64.exe"), reverse=True):
            if c.is_file():
                return str(c)
    return "ffmpeg"


def run_ffmpeg(args: list[str]) -> None:
    cmd = [ffmpeg_bin(), "-y", *args]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-500:] if r.stderr else "ffmpeg failed")


def transcode_webm_to_mp4(webm: Path, mp4: Path) -> None:
    mp4.parent.mkdir(parents=True, exist_ok=True)
    run_ffmpeg(
        [
            "-i",
            str(webm),
            "-vf",
            f"scale={OUT_W}:{OUT_H}:force_original_aspect_ratio=decrease,pad={OUT_W}:{OUT_H}:(ow-iw)/2:(oh-ih)/2",
            "-c:v",
            "libx264",
            "-crf",
            "28",
            "-r",
            "24",
            "-an",
            "-movflags",
            "+faststart",
            str(mp4),
        ]
    )


def poster_from_mp4(mp4: Path, poster: Path) -> None:
    run_ffmpeg(["-i", str(mp4), "-vframes", "1", "-q:v", "2", str(poster)])


def parse_live_urls() -> dict[str, str]:
    text = (ROOT / "src/data/projects.ts").read_text(encoding="utf-8")
    out: dict[str, str] = {}
    for block in re.split(r"\n  \},\n", text):
        id_m = re.search(r"id: '([^']+)'", block)
        if not id_m:
            continue
        live_m = re.search(r"liveUrl:\s*'([^']+)'", block)
        if live_m:
            out[id_m.group(1)] = live_m.group(1)
    return out


def parse_doc_brief(doc_index: int) -> dict[str, str | list[str]]:
    if not DOC.is_file():
        return {"title": "", "oneLiner": "", "bullets": []}
    text = DOC.read_text(encoding="utf-8")
    m = re.search(rf"## {doc_index}\. .+?\n([\s\S]*?)(?=\n## \d+\. |\Z)", text)
    if not m:
        return {"title": "", "oneLiner": "", "bullets": []}
    block = m.group(0)
    title_m = re.search(rf"## {doc_index}\. (.+)", block)
    title = title_m.group(1).strip() if title_m else ""
    one = ""
    om = re.search(
        r"\*\*1\. What it is\*\*\s*\n(.+?)(?=\n\*\*2\.|\n---|\n## )",
        block,
        re.DOTALL,
    )
    if om:
        one = re.sub(r"\s+", " ", om.group(1).strip())[:320]
    bullets: list[str] = []
    for bm in re.finditer(r"^[-*] (.+)$", block, re.MULTILINE):
        line = bm.group(1).strip()
        if len(line) > 12 and len(bullets) < 4:
            bullets.append(line[:100])
    return {"title": title, "oneLiner": one, "bullets": bullets}
