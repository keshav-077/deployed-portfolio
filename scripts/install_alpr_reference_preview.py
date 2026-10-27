"""Install the ALPR HUD reference mock as the portfolio card preview."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "preview_assets"
PUBLIC = ROOT / "public" / "projects" / "intelligent-vehicle-recognition-alpr"
W, H = 1280, 720

# Default: bundled reference; override with argv[1]
DEFAULT_REF = Path(
    r"C:\Users\keshav\.cursor\projects\c-Github-all-repos\assets\c__Users_keshav_AppData_Roaming_Cursor_User_workspaceStorage_0a3d70f660936fb4b763070aabf0cb7c_images_Vehicle_Plate_Recognition_2x-90b452b3-a402-4e02-9d01-be0ae6847f2c.jpg"
)


def main() -> None:
    ref = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_REF
    if not ref.is_file():
        bundled = ASSETS / "alpr_hud_reference.jpg"
        if bundled.is_file():
            ref = bundled
        else:
            raise SystemExit(f"Reference not found: {ref}")

    img = Image.open(ref).convert("RGB")
    img = img.resize((W, H), Image.Resampling.LANCZOS)

    ASSETS.mkdir(parents=True, exist_ok=True)
    canonical = ASSETS / "alpr_hud_reference.jpg"
    img.save(canonical, quality=93)

    PUBLIC.mkdir(parents=True, exist_ok=True)
    for name in ("preview.jpg", "poster.jpg"):
        out = PUBLIC / name
        img.save(out, quality=93)
        print(f"Wrote {out}")

    shutil.copy2(canonical, ASSETS / "alpr_card.jpg")
    print("ALPR HUD preview installed.")


if __name__ == "__main__":
    main()
