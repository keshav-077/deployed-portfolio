"""Build doc-36 preview MP4s (UI record or objective animation)."""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
PROFILE = ROOT / "scripts" / "doc36_ui_profile.json"
PUBLIC = ROOT / "public" / "projects"


def run_script(name: str, extra: list[str] | None = None) -> None:
    cmd = [sys.executable, str(ROOT / "scripts" / name), *(extra or [])]
    r = subprocess.run(cmd, cwd=str(ROOT))
    if r.returncode != 0:
        raise RuntimeError(f"{name} failed (exit {r.returncode})")


def profile_map() -> dict[str, dict]:
    return {p["portfolioId"]: p for p in json.loads(PROFILE.read_text(encoding="utf-8"))}


def build_one(pid: str, profiles: dict[str, dict]) -> dict:
    prof = profiles.get(pid, {"kind": "none"})
    if prof.get("kind") and prof.get("kind") != "none":
        run_script("record_frontend_preview.py", ["--id", pid])
        return json.loads((PUBLIC / pid / "preview_report.json").read_text(encoding="utf-8"))
    run_script("render_objective_preview.py", ["--id", pid])
    return json.loads((PUBLIC / pid / "preview_report.json").read_text(encoding="utf-8"))


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--id", help="Single portfolio id")
    ap.add_argument("--skip-clones", action="store_true")
    ap.add_argument("--skip-classify", action="store_true")
    args = ap.parse_args()

    if not args.skip_clones:
        run_script("ensure_doc36_clones.py")
    if not args.skip_classify:
        run_script("classify_doc36_ui.py")

    profiles = profile_map()
    if args.id:
        ids = [args.id]
    else:
        from doc36_common import load_registry

        ids = [e["portfolioId"] for e in load_registry()]

    report: dict[str, dict] = {}
    errors: dict[str, str] = {}
    for i, pid in enumerate(ids):
        print(f"\n=== [{i+1}/{len(ids)}] {pid} ===")
        try:
            report[pid] = build_one(pid, profiles)
        except Exception as exc:
            errors[pid] = str(exc)
            print(f"ERROR {pid}: {exc}")
            try:
                run_script("render_objective_preview.py", ["--id", pid])
                report[pid] = json.loads(
                    (PUBLIC / pid / "preview_report.json").read_text(encoding="utf-8")
                )
                report[pid]["fallback"] = True
            except Exception as exc2:
                errors[pid] = f"{exc}; fallback: {exc2}"

    summary = {"ok": report, "errors": errors}
    (PUBLIC / "doc36_generation_report.json").write_text(
        json.dumps(summary, indent=2), encoding="utf-8"
    )
    print(f"\nFinished: {len(report)} ok, {len(errors)} errors")


if __name__ == "__main__":
    main()
