"""Clone portfolio GitHub repos missing from Github-all-repos."""
from __future__ import annotations

import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = ROOT.parent
REGISTRY = ROOT / "scripts" / "repo_registry.json"
REPORT = ROOT / "scripts" / "repo_registry.report.json"


def main() -> None:
    if not REPORT.is_file():
        print("Run build_repo_registry.py first", file=sys.stderr)
        sys.exit(1)
    report = json.loads(REPORT.read_text(encoding="utf-8"))
    registry = json.loads(REGISTRY.read_text(encoding="utf-8")) if REGISTRY.is_file() else []
    by_id = {e["id"]: e for e in registry}

    for pid in report.get("missingClones", []):
        entry = by_id.get(pid)
        if not entry or not entry.get("githubSlug"):
            print(f"skip {pid}: no slug")
            continue
        slug = entry["githubSlug"]
        dest = REPO_ROOT / slug
        if dest.is_dir():
            print(f"exists {slug}")
            continue
        print(f"Cloning {slug}...")
        r = subprocess.run(
            ["gh", "repo", "clone", f"keshav-077/{slug}", str(dest)],
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            print(r.stderr or r.stdout, file=sys.stderr)
        else:
            print(f"OK {slug}")

    subprocess.run([sys.executable, str(ROOT / "scripts" / "build_repo_registry.py")], check=False)


if __name__ == "__main__":
    main()
