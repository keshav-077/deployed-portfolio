"""Install the AI Border Security HUD image as the portfolio card preview."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "preview_assets"
PUBLIC = ROOT / "public" / "projects" / "ai-border-security"
W, H = 1280, 720

DEFAULT_REF = Path(
    r"C:\Users\keshav\.cursor\projects\c-Github-all-repos\assets\c__Users_keshav_AppData_Roaming_Cursor_User_workspaceStorage_0a3d70f660936fb4b763070aabf0cb7c_images_Gemini_Generated_Image_k7sr1ck7sr1ck7sr-31ecf916-a386-4b3d-b5a5-c2f5f7803a99.jpg"
)


def main() -> None:
    ref = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_REF
    if not ref.is_file():
        bundled = ASSETS / "border_hud_reference.jpg"
        if bundled.is_file():
            ref = bundled
        else:
            raise SystemExit(f"Reference not found: {ref}")

    img = Image.open(ref).convert("RGB")
    img = img.resize((W, H), Image.Resampling.LANCZOS)

    ASSETS.mkdir(parents=True, exist_ok=True)
    canonical = ASSETS / "border_hud_reference.jpg"
    img.save(canonical, quality=93)

    PUBLIC.mkdir(parents=True, exist_ok=True)
    for name in ("preview.jpg", "poster.jpg"):
        out = PUBLIC / name
        img.save(out, quality=93)
        print(f"Wrote {out}")

    shutil.copy2(canonical, ASSETS / "border_card.jpg")
    print("AI Border Security HUD preview installed.")


if __name__ == "__main__":
    main()
