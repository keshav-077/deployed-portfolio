"""Copy staged prompt previews from scripts/preview_assets/generated/ to public/projects/."""
from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
STAGE = Path(__file__).resolve().parent / "preview_assets" / "generated"
PUBLIC = ROOT / "public" / "projects"
PROMPTS = Path(__file__).resolve().parent / "portfolio_visual_prompts.json"


def main() -> None:
    cfg = json.loads(PROMPTS.read_text(encoding="utf-8"))
    slugs = cfg["projects"].keys()
    ok, missing = 0, []
    for slug in slugs:
        src = STAGE / f"{slug}.jpg"
        if not src.is_file():
            missing.append(slug)
            continue
        dest_dir = PUBLIC / slug
        dest_dir.mkdir(parents=True, exist_ok=True)
        for name in ("preview.jpg", "poster.jpg"):
            shutil.copy2(src, dest_dir / name)
        ok += 1
    print(f"Installed {ok}/{len(slugs)} previews")
    if missing:
        print("Missing staged files:", ", ".join(missing))


if __name__ == "__main__":
    main()
