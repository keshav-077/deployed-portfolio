"""1080p Playwright screen recording for UI trailers."""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from record_frontend_preview import record_project  # reuses live/local logic


def record_to_source(slug: str, dest: Path) -> bool:
    try:
        record_project(slug)
        src = ROOT / "public" / "projects" / slug / "preview.mp4"
        if src.is_file():
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(src.read_bytes())
            return True
    except Exception as exc:
        (dest.parent.parent / "notes.md").write_text(
            f"Screen record failed: {exc}\n", encoding="utf-8"
        )
    return False
