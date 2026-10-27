"""Generate portfolio-videos/videos.json from projects + render reports."""
from __future__ import annotations

import json
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from portfolio_projects import parse_projects

ROOT = Path(__file__).resolve().parents[1]
VIDEOS = ROOT / "portfolio-videos"
OUT = VIDEOS / "videos.json"


def main() -> None:
    entries = []
    for p in parse_projects():
        slug = p["id"]
        slug_dir = VIDEOS / slug
        report_path = slug_dir / "preview_report.json"
        is_real = False
        notes = ""
        if report_path.is_file():
            rep = json.loads(report_path.read_text(encoding="utf-8"))
            is_real = bool(rep.get("is_real_run"))
            notes = rep.get("status", "")
        mp4 = slug_dir / "final.mp4"
        webm = slug_dir / "final.webm"
        poster = slug_dir / "poster.jpg"
        pub_mp4 = ROOT / "public" / "projects" / slug / "preview.mp4"
        entries.append(
            {
                "slug": slug,
                "title": p["name"],
                "tagline": p["description"][:120],
                "category": p["category"],
                "videoMp4": f"/projects/{slug}/preview.mp4" if pub_mp4.is_file() else None,
                "videoWebm": f"/projects/{slug}/preview.webm"
                if (ROOT / "public" / "projects" / slug / "preview.webm").is_file()
                else None,
                "poster": f"/projects/{slug}/poster.jpg",
                "duration": "5-8s",
                "repoUrl": p.get("githubUrl", ""),
                "is_real_run": is_real,
                "notes": notes or ("rendered" if mp4.is_file() else "pending"),
            }
        )
    OUT.write_text(json.dumps(entries, indent=2), encoding="utf-8")
    print(f"Wrote {OUT} ({len(entries)} entries)")


if __name__ == "__main__":
    main()
