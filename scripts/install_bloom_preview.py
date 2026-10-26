"""Copy Bloom original site demo GIF from medical-chatbot-rag into portfolio."""
from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

from doc36_common import ffmpeg_bin

OUT = ROOT / "public" / "projects" / "healthcare-assistant"
DEFAULT_GIF = Path(r"C:\Github-all-repos\medical-chatbot-rag\docs\demo.gif")
FALLBACK_GIF = Path(r"C:\Github-all-repos\medical-chatbot-rag\docs\brand\readme-hero.gif")


def poster_from_gif(gif: Path, poster: Path) -> None:
    tmp = poster.parent / "_bloom_frame.png"
    subprocess.run(
        [ffmpeg_bin(), "-y", "-i", str(gif), "-vframes", "1", str(tmp)],
        capture_output=True,
        check=False,
    )
    if tmp.is_file():
        from PIL import Image

        Image.open(tmp).convert("RGB").save(poster, quality=92)
        tmp.unlink(missing_ok=True)


def main() -> None:
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_GIF
    if not src.is_file():
        src = FALLBACK_GIF
    if not src.is_file():
        raise SystemExit(f"No Bloom GIF found at {DEFAULT_GIF} or {FALLBACK_GIF}")

    OUT.mkdir(parents=True, exist_ok=True)
    dest_gif = OUT / "preview.gif"
    shutil.copy2(src, dest_gif)
    poster = OUT / "poster.jpg"
    poster_from_gif(dest_gif, poster)
    preview_jpg = OUT / "preview.jpg"
    if poster.is_file():
        shutil.copy2(poster, preview_jpg)

    canonical = ROOT / "scripts" / "preview_assets" / "bloom_demo.gif"
    canonical.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, canonical)
    print(f"Installed Bloom preview from {src.name} -> {dest_gif} ({dest_gif.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
