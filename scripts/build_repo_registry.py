"""Build repo_registry.json: portfolio id → local clone path + how to run UI."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
REPO_ROOT = ROOT.parent
PROJECTS_TS = ROOT / "src" / "data" / "projects.ts"
OUT = ROOT / "scripts" / "repo_registry.json"
REPORT = ROOT / "scripts" / "repo_registry.report.json"

# portfolio id → folder name under REPO_ROOT (when GitHub slug ≠ folder)
LOCAL_OVERRIDES: dict[str, str] = {
    "hinglish-turn-detector": "Turn-Detection-Model-Whisper-Tiny-Dual-Scale-Attention-Classification-Head-for-Low-Latency-Voice-AI-main",
    "multibax-sklearn": "multibax-sklearn-main",
    "espcn-super-resolution": "espcn-from-scratch",
    "attritionlens": "Employee-Churn-Prediction-main",
    "paperloom": "trace-research-paper-studio",
    "vibe-apply-job-automation": "-Job-Application-Assistant-HackByte3.0",
    "dcgan-image-generation": "1mage-Generation-using-DCGAN",
    "wgan": "WGAN-GAN-Implementation",
    "srgan": "Super-Resolution-GAN-SRGAN",
    "cyclegan": "CycleGAN-Image-Translation",
    "ddpm-diffusion": "Diffusion-Models-Implementation",
    "rl-music-recommendation": "Music-Recommend-system-using-Reinforcement-Learning",
    "crop-disease-detection": "Crop_Detection",
    "earthquake-prediction": "Earthquake_prediction",
    "sentiment-analysis-engine": "Sentiment_analysis",
    "object-detection-hackbyte": "Duality-HackByte-Object-Detection-using-YOLOv8s",
    "dontcaught-ai-assistant": "Dontcaught-AI-assistant",
}

DEMO_SCRIPT_OVERRIDES: dict[str, str] = {
    "ledgeriq": "scroll_only",
    "healthcare-assistant": "scroll_only",
}


def parse_projects() -> list[dict]:
    text = PROJECTS_TS.read_text(encoding="utf-8")
    entries: list[dict] = []
    for m in re.finditer(
        r"id: '([^']+)'[\s\S]*?name: '([^']+)'[\s\S]*?(?:githubUrl:\s*(?:'([^']+)'|\n\s*'([^']+)'))?",
        text,
    ):
        gh = m.group(3) or m.group(4)
        entries.append({"id": m.group(1), "name": m.group(2), "githubUrl": gh})
    return entries


def github_slug(url: str | None) -> str | None:
    if not url:
        return None
    m = re.search(r"github\.com/[^/]+/([^/#?]+)", url)
    return m.group(1).rstrip("/") if m else None


def list_repo_dirs() -> list[str]:
    skip = {".cursor", ".vscode", "deployed-portfolio", "fonts", "contributions", "Certifications"}
    return [
        p.name
        for p in REPO_ROOT.iterdir()
        if p.is_dir() and p.name not in skip and not p.name.startswith(".")
    ]


def resolve_local_path(pid: str, slug: str | None) -> tuple[str | None, str]:
    if pid in LOCAL_OVERRIDES:
        folder = LOCAL_OVERRIDES[pid]
        if (REPO_ROOT / folder).is_dir():
            return folder, "override"
    if slug and (REPO_ROOT / slug).is_dir():
        return slug, "exact_slug"
    dirs = list_repo_dirs()
    if slug:
        slug_low = slug.lower().replace("-", "").replace("_", "")
        for d in dirs:
            d_norm = d.lower().replace("-", "").replace("_", "")
            if slug_low in d_norm or d_norm in slug_low:
                return d, "fuzzy"
    return None, "missing"


def read_text(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except OSError:
        return ""


def env_required(repo_path: Path) -> list[str]:
    names: list[str] = []
    for example in (".env.example", ".env.sample", "env.example"):
        p = repo_path / example
        if p.is_file():
            for line in read_text(p).splitlines():
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key = line.split("=", 1)[0].strip()
                if key and key not in names:
                    names.append(key)
    return names[:20]


def detect_surface(repo_path: Path) -> tuple[str, dict | None]:
    """Returns (surface, start_config)."""
    if not repo_path.is_dir():
        return "none", None

    fe = repo_path / "frontend" / "package.json"
    root_pkg = repo_path / "package.json"
    client_pkg = repo_path / "client" / "package.json"
    web_pkg = repo_path / "web" / "package.json"

    for pkg_path, cwd_rel in [
        (fe, "frontend"),
        (client_pkg, "client"),
        (web_pkg, "web"),
        (root_pkg, "."),
    ]:
        if not pkg_path.is_file():
            continue
        pkg = json.loads(read_text(pkg_path) or "{}")
        scripts = pkg.get("scripts") or {}
        deps = {**(pkg.get("dependencies") or {}), **(pkg.get("devDependencies") or {})}
        cmd = None
        port = 5173
        if "dev" in scripts:
            cmd = ["npm", "run", "dev"]
        elif "start" in scripts:
            cmd = ["npm", "start"]
            port = 3000
        if cmd:
            surface = "vite"
            if "next" in deps:
                surface = "next"
                port = 3000
            elif "react-scripts" in deps:
                surface = "cra"
                port = 3000
            if (repo_path / cwd_rel / "vite.config.ts").is_file() or (
                repo_path / cwd_rel / "vite.config.js"
            ).is_file():
                surface = "vite"
            return surface, {
                "command": cmd,
                "cwd": cwd_rel,
                "port": port,
                "readyUrl": f"http://127.0.0.1:{port}/",
            }

    # Tauri
    if (repo_path / "src-tauri").is_dir() and root_pkg.is_file():
        return "tauri", {
            "command": ["npm", "run", "dev"],
            "cwd": ".",
            "port": 1420,
            "readyUrl": "http://127.0.0.1:1420/",
        }

    # Streamlit
    for app in ("app.py", "streamlit_app.py", "Home.py"):
        ap = repo_path / app
        if ap.is_file() and "streamlit" in read_text(ap).lower():
            return "streamlit", {
                "command": ["streamlit", "run", app, "--server.port", "{port}", "--server.headless", "true"],
                "cwd": ".",
                "port": 8501,
                "readyUrl": "http://127.0.0.1:{port}/",
            }
    if (repo_path / "requirements.txt").is_file():
        req = read_text(repo_path / "requirements.txt").lower()
        if "streamlit" in req:
            app = "app.py" if (repo_path / "app.py").is_file() else "streamlit_app.py"
            if (repo_path / app).is_file():
                return "streamlit", {
                    "command": ["streamlit", "run", app, "--server.port", "{port}", "--server.headless", "true"],
                    "cwd": ".",
                    "port": 8501,
                    "readyUrl": "http://127.0.0.1:{port}/",
                }

    # Gradio
    for py in repo_path.glob("*.py"):
        if py.name.startswith("test_"):
            continue
        body = read_text(py)
        if "gr.Interface" in body or "gr.Blocks" in body:
            return "gradio", {
                "command": ["python", py.name],
                "cwd": ".",
                "port": 7860,
                "readyUrl": "http://127.0.0.1:{port}/",
            }

    # Chainlit
    if list(repo_path.glob("**/.chainlit")) or (repo_path / "chainlit.md").is_file():
        return "chainlit", {
            "command": ["chainlit", "run", "app.py", "-w", "--port", "{port}"],
            "cwd": ".",
            "port": 8000,
            "readyUrl": "http://127.0.0.1:{port}/",
        }

    # Flask templates
    for py in ("app.py", "main.py", "run.py"):
        ap = repo_path / py
        if ap.is_file() and ("Flask(" in read_text(ap) or "streamlit" not in read_text(ap).lower()):
            if "Flask(" in read_text(ap):
                return "flask", {
                    "command": ["python", py],
                    "cwd": ".",
                    "port": 5000,
                    "readyUrl": "http://127.0.0.1:{port}/",
                }

    return "none", None


def build_entry(project: dict) -> dict:
    pid = project["id"]
    slug = github_slug(project.get("githubUrl"))
    local_name, match_kind = resolve_local_path(pid, slug)
    local_path = str(REPO_ROOT / local_name) if local_name else None
    repo_path = Path(local_path) if local_path else Path()
    surface, start = detect_surface(repo_path) if local_name else ("none", None)
    demo = DEMO_SCRIPT_OVERRIDES.get(pid, "marketing_scroll")
    return {
        "id": pid,
        "name": project["name"],
        "githubSlug": slug,
        "localFolder": local_name,
        "localPath": local_path,
        "matchKind": match_kind,
        "surface": surface,
        "start": start,
        "demoScript": demo,
        "envRequired": env_required(repo_path) if local_name else [],
    }


def main() -> None:
    projects = parse_projects()
    registry = [build_entry(p) for p in projects]
    OUT.write_text(json.dumps(registry, indent=2), encoding="utf-8")

    missing = [e["id"] for e in registry if e["matchKind"] == "missing"]
    no_ui = [e["id"] for e in registry if e["surface"] == "none" and e["matchKind"] != "missing"]
    report = {
        "total": len(registry),
        "missingClones": missing,
        "noDetectableUi": no_ui,
        "withUi": [e["id"] for e in registry if e["surface"] != "none"],
    }
    REPORT.write_text(json.dumps(report, indent=2), encoding="utf-8")
    print(f"Wrote {OUT} ({len(registry)} projects)")
    print(f"Missing clones: {len(missing)} | UI detectable: {len(report['withUi'])}")


if __name__ == "__main__":
    main()
