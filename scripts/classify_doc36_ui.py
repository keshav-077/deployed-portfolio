"""Classify doc-36 repos as web/streamlit/gradio/none."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

try:
    import yaml
except ImportError:
    yaml = None

from doc36_common import REGISTRY, load_registry, repo_path

ROOT = Path(__file__).resolve().parents[1]
OVERRIDES = ROOT / "scripts" / "doc36_record_overrides.yaml"
OUT = ROOT / "scripts" / "doc36_ui_profile.json"


def read_pkg(path: Path) -> dict:
    if not path.is_file():
        return {}
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except json.JSONDecodeError:
        return {}


def deps_text(pkg: dict) -> str:
    d = pkg.get("dependencies") or {}
    dev = pkg.get("devDependencies") or {}
    return json.dumps({**d, **dev}).lower()


def find_web_root(base: Path) -> tuple[str, Path] | None:
    for sub in (".", "frontend", "web-application", "client", "web"):
        pkg = base / sub / "package.json" if sub != "." else base / "package.json"
        if not pkg.is_file():
            continue
        data = read_pkg(pkg)
        dt = deps_text(data)
        if any(k in dt for k in ("react", "next", "vite", "vue", "@angular")):
            scripts = data.get("scripts") or {}
            if "dev" in scripts:
                start = "npm run dev"
            elif "start" in scripts:
                start = "set BROWSER=none&& npm start"
            else:
                start = "npm run dev"
            return start, base / sub if sub != "." else base
    return None


def find_python_ui(base: Path) -> tuple[str, str, Path] | None:
    py_files = list(base.glob("**/app.py")) + list(base.glob("**/streamlit_app.py"))
    py_files = [p for p in py_files if "node_modules" not in str(p)]
    for p in py_files[:5]:
        text = p.read_text(encoding="utf-8", errors="ignore").lower()
        cwd = p.parent
        if "streamlit" in text or p.name == "streamlit_app.py":
            cmd = f"streamlit run {p.name} --server.port 8500 --server.address 127.0.0.1"
            return "streamlit", cmd, cwd
        if "gradio" in text:
            return "gradio", f"python {p.name}", cwd
        if "chainlit" in text:
            return "chainlit", f"chainlit run {p.name}", cwd
    req = base / "requirements.txt"
    if req.is_file():
        rt = req.read_text(encoding="utf-8", errors="ignore").lower()
        if "streamlit" in rt:
            app = base / "app.py"
            if app.is_file():
                return (
                    "streamlit",
                    "streamlit run app.py --server.port 8500 --server.address 127.0.0.1",
                    base,
                )
        if "gradio" in rt:
            app = base / "app.py"
            if app.is_file():
                return "gradio", "python app.py", base
    return None


def load_overrides() -> dict:
    if yaml and OVERRIDES.is_file():
        return yaml.safe_load(OVERRIDES.read_text(encoding="utf-8")) or {}
    return {}


def classify_entry(entry: dict, overrides: dict) -> dict:
    pid = entry["portfolioId"]
    base = repo_path(entry)
    profile: dict = {
        "portfolioId": pid,
        "docIndex": entry["docIndex"],
        "repoPath": str(base),
        "kind": "none",
    }
    if pid in overrides:
        o = overrides[pid]
        profile.update(o)
        profile["kind"] = o.get("kind", "web")
        return profile

    web = find_web_root(base)
    if web:
        start, cwd = web
        profile.update(
            {
                "kind": "web",
                "startCommand": start,
                "cwd": str(cwd.relative_to(base) if cwd != base else "."),
                "baseUrl": "http://127.0.0.1:5173",
                "readyPath": "/",
            }
        )
        return profile

    py = find_python_ui(base)
    if py:
        kind, cmd, cwd = py
        profile.update(
            {
                "kind": kind,
                "startCommand": cmd,
                "cwd": str(cwd.relative_to(base) if cwd != base else "."),
                "baseUrl": "http://127.0.0.1:8500" if kind == "streamlit" else "http://127.0.0.1:7860",
                "readyPath": "/",
            }
        )
        return profile

    return profile


def main() -> None:
    overrides = load_overrides()
    profiles = [classify_entry(e, overrides) for e in load_registry()]
    OUT.write_text(json.dumps(profiles, indent=2), encoding="utf-8")
    kinds = {}
    for p in profiles:
        kinds[p["kind"]] = kinds.get(p["kind"], 0) + 1
    print(f"Wrote {OUT}: {kinds}")


if __name__ == "__main__":
    main()
