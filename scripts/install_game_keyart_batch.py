"""Install game key-art previews from assets/{slug}.jpg into public/projects/."""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS_CURSOR = Path(r"C:\Users\keshav\.cursor\projects\c-Github-all-repos\assets")
GENERATED = Path(__file__).resolve().parent / "preview_assets" / "generated"
PUBLIC = ROOT / "public" / "projects"
CFG = Path(__file__).resolve().parent / "game_keyart_prompts.json"
W, H = 1280, 720


def install(slug: str) -> bool:
    src = None
    for base in (ASSETS_CURSOR, GENERATED):
        p = base / f"{slug}.jpg"
        if p.is_file():
            src = p
            break
    if not src:
        print(f"MISSING {slug}")
        return False
    img = Image.open(src).convert("RGB").resize((W, H), Image.Resampling.LANCZOS)
    out_dir = PUBLIC / slug
    out_dir.mkdir(parents=True, exist_ok=True)
    for name in ("preview.jpg", "poster.jpg"):
        img.save(out_dir / name, quality=93)
    GENERATED.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, GENERATED / f"{slug}.jpg")
    print(f"OK {slug}")
    return True


def main() -> None:
    cfg = json.loads(CFG.read_text(encoding="utf-8"))
    slugs = list(cfg["projects"].keys())
    if len(sys.argv) > 1:
        slugs = sys.argv[1:]
    ok = sum(install(s) for s in slugs)
    print(f"Installed {ok}/{len(slugs)}")


if __name__ == "__main__":
    main()
