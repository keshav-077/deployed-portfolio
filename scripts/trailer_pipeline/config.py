from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
VIDEOS = ROOT / "portfolio-videos"
PUBLIC = ROOT / "public" / "projects"

W, H = 1920, 1080
FPS = 30
DURATION_MIN, DURATION_MAX = 5.0, 8.0

LOWER_THIRD_H = 120
