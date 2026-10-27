"""Ensure local clones exist for doc-36 registry entries."""
from __future__ import annotations

import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REGISTRY = ROOT / "scripts" / "doc36_registry.json"
REPO_ROOT = ROOT.parent
GITHUB_USER = "keshav-077"


def resolve_local(entry: dict) -> Path | None:
    for key in ("localDir", "fallbackLocalDir"):
        name = entry.get(key)
        if not name:
            continue
        path = REPO_ROOT / name
        if path.is_dir():
            return path
    return None


def main() -> None:
    entries = json.loads(REGISTRY.read_text(encoding="utf-8"))
    cloned = 0
    for entry in entries:
        pid = entry["portfolioId"]
        existing = resolve_local(entry)
        if existing:
            entry["resolvedPath"] = str(existing)
            print(f"OK {pid}: {existing.name}")
            continue
        repo = entry["githubRepo"]
        target = REPO_ROOT / entry["localDir"]
        url = f"https://github.com/{GITHUB_USER}/{repo}.git"
        print(f"Cloning {pid} -> {target.name}...")
        target.parent.mkdir(parents=True, exist_ok=True)
        r = subprocess.run(
            ["git", "clone", "--depth", "1", url, str(target)],
            capture_output=True,
            text=True,
        )
        if r.returncode != 0:
            fb = entry.get("fallbackLocalDir")
            if fb and (REPO_ROOT / fb).is_dir():
                print(f"  clone failed; using fallback {fb}")
                entry["resolvedPath"] = str(REPO_ROOT / fb)
                continue
            print(f"  FAILED: {r.stderr[:300]}")
            continue
        cloned += 1
        entry["resolvedPath"] = str(target)
    REGISTRY.write_text(json.dumps(entries, indent=2), encoding="utf-8")
    print(f"Done. Cloned {cloned} repos.")


if __name__ == "__main__":
    main()
