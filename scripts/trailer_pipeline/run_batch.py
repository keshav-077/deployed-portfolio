"""Render trailers in batches of 8."""
from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))

from portfolio_projects import parse_projects
from config import VIDEOS
from render_slug import render

PILOTS = json.loads((VIDEOS / "storyboard_config.json").read_text(encoding="utf-8"))["pilots"]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--pilot", action="store_true")
    ap.add_argument("--batch", type=int, default=0, help="0-indexed batch of 8")
    ap.add_argument("--all", action="store_true")
    args = ap.parse_args()

    ids = [p["id"] for p in parse_projects()]
    if args.pilot:
        slugs = PILOTS
    elif args.all:
        slugs = ids
    else:
        start = args.batch * 8
        slugs = ids[start : start + 8]

    results = {}
    for slug in slugs:
        print(f"Rendering {slug}...")
        results[slug] = render(slug)

    report_name = "pilot_report.json" if args.pilot else f"batch_{args.batch}_report.json"
    if args.all:
        report_name = "batch_all_report.json"
    (VIDEOS / report_name).write_text(json.dumps(results, indent=2), encoding="utf-8")
    print(f"Done {len(slugs)} slugs")

    import subprocess

    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_videos_json.py")], check=False)


if __name__ == "__main__":
    main()
