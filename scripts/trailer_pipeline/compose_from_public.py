"""Re-compose all slugs from public/projects/*/preview.mp4 (post doc36 rebuild)."""
from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from compose import compose_final
from config import PUBLIC, VIDEOS
from portfolio_projects import parse_projects


def main() -> None:
    results = {}
    for p in parse_projects():
        slug = p["id"]
        pub = PUBLIC / slug / "preview.mp4"
        if not pub.is_file():
            results[slug] = {"status": "no_public_mp4"}
            continue
        slug_dir = VIDEOS / slug
        source = slug_dir / "source_footage" / "base.mp4"
        source.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(pub, source)
        title = p["name"]
        tagline = p["description"][:90]
        rep = compose_final(slug, source, slug_dir, title, tagline)
        report = {
            **rep,
            "status": "ok",
            "mode": "public_preview",
            "is_real_run": False,
        }
        (slug_dir / "preview_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
        results[slug] = report
    (VIDEOS / "compose_public_report.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
    ok = sum(1 for v in results.values() if v.get("status") == "ok")
    print(f"Composed {ok}/{len(results)} from public preview.mp4")

    import subprocess

    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_videos_json.py")], check=False)


if __name__ == "__main__":
    main()
