"""Compose final trailer: trim, LUT-ish grade, lower-third, export MP4/WebM/poster/contact sheet."""
from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from doc36_common import ffmpeg_bin

from config import DURATION_MAX, DURATION_MIN, FPS, H, PUBLIC, W


def run_ffmpeg(args: list[str]) -> None:
    cmd = [ffmpeg_bin(), "-y", *args]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        raise RuntimeError(r.stderr[-600:] if r.stderr else "ffmpeg failed")


def compose_final(
    slug: str,
    source: Path,
    out_dir: Path,
    title: str,
    tagline: str,
) -> dict:
    out_dir.mkdir(parents=True, exist_ok=True)
    final_mp4 = out_dir / "final.mp4"
    final_webm = out_dir / "final.webm"
    poster = out_dir / "poster.jpg"
    contact = out_dir / "contact_sheet.jpg"

    tagline_esc = tagline.replace(":", "\\:").replace("'", "")[:80]
    title_esc = title.replace(":", "\\:").replace("'", "")[:48]

    vf = (
        f"scale={W}:{H}:force_original_aspect_ratio=decrease,"
        f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2,"
        f"drawbox=y=h-{120}:color=0x1C2B36@0.75:w=iw:h=120:t=fill,"
        f"drawtext=text='{title_esc}':fontcolor=F6F2EE:fontsize=36:x=40:y=h-95,"
        f"drawtext=text='{tagline_esc}':fontcolor=C8462A:fontsize=22:x=40:y=h-50"
    )

    run_ffmpeg(
        [
            "-i",
            str(source),
            "-t",
            str(DURATION_MAX),
            "-vf",
            vf,
            "-r",
            str(FPS),
            "-c:v",
            "libx264",
            "-crf",
            "23",
            "-pix_fmt",
            "yuv420p",
            "-movflags",
            "+faststart",
            "-an",
            str(final_mp4),
        ]
    )

    run_ffmpeg(
        [
            "-i",
            str(final_mp4),
            "-vf",
            f"scale=1280:720",
            "-c:v",
            "libvpx-vp9",
            "-b:v",
            "1M",
            "-an",
            str(final_webm),
        ]
    )

    run_ffmpeg(["-i", str(final_mp4), "-vframes", "1", "-q:v", "2", str(poster)])

    run_ffmpeg(
        [
            "-i",
            str(final_mp4),
            "-vf",
            "select='eq(n\\,0)+eq(n\\,45)+eq(n\\,90)',scale=640:-1,tile=3x1",
            "-frames:v",
            "1",
            str(contact),
        ]
    )

    pub = PUBLIC / slug
    pub.mkdir(parents=True, exist_ok=True)
    for name, src in (
        ("preview.mp4", final_mp4),
        ("preview.webm", final_webm),
        ("poster.jpg", poster),
    ):
        dest = pub / name
        dest.write_bytes(src.read_bytes())

    return {
        "slug": slug,
        "duration_target": f"{DURATION_MIN}-{DURATION_MAX}s",
        "paths": {
            "mp4": str(final_mp4),
            "webm": str(final_webm),
            "poster": str(poster),
        },
    }
