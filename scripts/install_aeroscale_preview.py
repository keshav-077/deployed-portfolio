"""Install AeroScale SR portfolio card preview from reference image."""
from __future__ import annotations

import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
ASSETS = Path(__file__).resolve().parent / "preview_assets"
PUBLIC = ROOT / "public" / "projects" / "aeroscale-sr"
W, H = 1280, 720

DEFAULT_REF = Path(
    r"C:\Users\keshav\.cursor\projects\c-Github-all-repos\assets\c__Users_keshav_AppData_Roaming_Cursor_User_workspaceStorage_0a3d70f660936fb4b763070aabf0cb7c_images_Gemini_Generated_Image_db5wo6db5wo6db5w-e06fdae0-261d-4737-8012-2be3e026ae5a.jpg"
)


def main() -> None:
    ref = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_REF
    if not ref.is_file():
        bundled = ASSETS / "aeroscale_reference.jpg"
        if not bundled.is_file():
            raise SystemExit(f"Reference not found: {ref}")
        ref = bundled

    img = Image.open(ref).convert("RGB")
    img = img.resize((W, H), Image.Resampling.LANCZOS)

    ASSETS.mkdir(parents=True, exist_ok=True)
    img.save(ASSETS / "aeroscale_reference.jpg", quality=93)

    PUBLIC.mkdir(parents=True, exist_ok=True)
    for name in ("preview.jpg", "poster.jpg"):
        out = PUBLIC / name
        img.save(out, quality=93)
        print(f"Wrote {out}")


if __name__ == "__main__":
    main()
