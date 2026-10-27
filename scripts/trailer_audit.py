"""Audit all portfolio repos for trailer feasibility."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from portfolio_projects import parse_projects, repo_path_for

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "portfolio-videos"
WEIGHT_GLOBS = ("**/*.pt", "**/*.pth", "**/*.onnx", "**/*.h5", "**/*.weights", "**/best.pt")
SKIP_DIRS = {".git", "node_modules", "__pycache__", ".venv", "venv"}


def scan_repo(base: Path) -> dict:
    if not base.is_dir():
        return {
            "repo_exists": False,
            "has_frontend": "no",
            "stack": "—",
            "how_to_run": "Clone repo missing locally",
            "weights_data": "unknown",
            "can_run_locally": "no",
        }

    has_pkg = list(base.glob("package.json")) + list(base.glob("frontend/package.json"))
    has_streamlit = any(
        "streamlit" in p.read_text(encoding="utf-8", errors="ignore").lower()
        for p in list(base.glob("**/app.py"))[:8]
        if p.is_file() and "node_modules" not in str(p)
    )
    has_gradio = any(
        "gradio" in p.read_text(encoding="utf-8", errors="ignore").lower()
        for p in list(base.glob("**/app.py"))[:8]
        if p.is_file()
    )
    has_flask = any(
        "flask" in p.read_text(encoding="utf-8", errors="ignore").lower()
        for p in [base / "app.py", base / "main.py"]
        if p.is_file()
    )
    has_chainlit = (base / "chainlit.md").is_file() or any(
        "chainlit" in p.read_text(encoding="utf-8", errors="ignore").lower()
        for p in list(base.glob("**/*.py"))[:15]
        if p.is_file() and p.stat().st_size < 50000
    )
    has_next = False
    for p in has_pkg:
        if not p.is_file():
            continue
        try:
            data = json.loads(p.read_text(encoding="utf-8"))
            deps = {**data.get("dependencies", {}), **data.get("devDependencies", {})}
            if any("next" in k.lower() for k in deps):
                has_next = True
        except json.JSONDecodeError:
            pass

    stack_parts = []
    if has_next or has_pkg:
        stack_parts.append("web")
    if has_streamlit:
        stack_parts.append("streamlit")
    if has_gradio:
        stack_parts.append("gradio")
    if has_flask:
        stack_parts.append("flask")
    if has_chainlit:
        stack_parts.append("chainlit")
    if (base / "demo").is_dir():
        stack_parts.append("demo/")

    weights: list[str] = []
    for pat in WEIGHT_GLOBS:
        for p in base.glob(pat):
            if any(s in p.parts for s in SKIP_DIRS):
                continue
            if p.stat().st_size > 1000:
                weights.append(str(p.relative_to(base))[:80])
        if len(weights) >= 5:
            break

    req = base / "requirements.txt"
    needs_cloud = False
    if req.is_file():
        rt = req.read_text(encoding="utf-8", errors="ignore").lower()
        if "snowflake" in rt or "vertexai" in rt or "google.cloud" in rt:
            needs_cloud = True

    ipynb = len(list(base.glob("**/*.ipynb"))[:20])
    has_inference_py = any(
        p.name in ("predict.py", "inference.py", "detect.py", "run.py", "app.py")
        for p in base.glob("**/*.py")
    )

    how = "—"
    if has_streamlit:
        how = "streamlit run app.py (or streamlit_app.py)"
    elif has_flask:
        how = "python app.py"
    elif has_gradio:
        how = "python app.py"
    elif has_pkg:
        how = "npm install && npm run dev (see package.json)"
    elif ipynb > 0 and not has_inference_py:
        how = "Notebook-only; needs /demo wrapper for trailer UI"
    elif weights:
        how = "Batch inference on sample video/images with repo weights"

    has_frontend = "yes" if stack_parts else "no"
    if ipynb > 0 and not stack_parts:
        has_frontend = "partial (notebooks)"

    w_status = f"{len(weights)} weight file(s)" if weights else "none found"
    if ipynb and not weights:
        w_status += f"; {ipynb}+ notebooks"

    can_run = "maybe"
    if not weights and not stack_parts and ipynb > 0:
        can_run = "needs demo + weights export"
    elif needs_cloud and not stack_parts:
        can_run = "cloud credentials likely required"
    elif stack_parts or weights:
        can_run = "yes (verify deps)"
    else:
        can_run = "unlikely"

    return {
        "repo_exists": True,
        "has_frontend": has_frontend,
        "stack": ", ".join(stack_parts) if stack_parts else ("notebooks" if ipynb else "scripts"),
        "how_to_run": how,
        "weights_data": w_status,
        "can_run_locally": can_run,
        "demo_needed": has_frontend == "no" and (weights or ipynb > 0),
        "needs_cloud": needs_cloud,
    }


def blurb_mismatch(project: dict, base: Path) -> str:
    notes: list[str] = []
    text = ""
    if base.is_dir():
        readme = base / "README.md"
        if readme.is_file():
            text = readme.read_text(encoding="utf-8", errors="ignore").lower()
    stack = " ".join(project.get("techStack", [])).lower()
    if "pytorch" in stack and "tensorflow" in text and "pytorch" not in text[:5000]:
        notes.append("Portfolio says PyTorch; README emphasizes TensorFlow")
    if "osnet" in project.get("description", "").lower() and base.is_dir():
        if "osnet" not in text and not list(base.glob("**/*osnet*")):
            notes.append("Blurb claims OSNet ReID; no OSNet code/weights found in tree")
    if project["id"] == "ai-border-security":
        if not list(base.glob("**/*.pt")) if base.is_dir() else True:
            notes.append("No exported .pt in repo root scan; training in notebooks only")
    return "; ".join(notes) if notes else "—"


def blocked_reason(project: dict, audit: dict) -> str | None:
    if not audit.get("repo_exists"):
        return f"Local clone missing under {repo_path_for(project['id'], project.get('githubUrl', ''))}"
    if audit.get("needs_cloud") and audit["has_frontend"] == "no":
        return "Cloud API credentials / Vertex project required; no local offline demo"
    if project["id"] == "logisticshub":
        return "Snowflake + dbt pipeline; no single local UI without cloud stack"
    live_ok = {
        "ledgeriq",
        "invoiceflow-ai",
        "paperloom",
        "healthcare-assistant",
    }
    if project["id"] in live_ok and project.get("liveUrl"):
        return None
    ui_ok = {
        "cloudstack-messenger",
        "vibe-apply-job-automation",
        "broken-semantic-search",
        "vertexai-gemini-chatbot",
        "chainlit-llm-assistant",
        "dontcaught-ai-assistant",
        "neuralfolio",
        "attritionlens",
    }
    if project["id"] in ui_ok and audit["has_frontend"] != "no":
        return None
    if audit["weights_data"].startswith("none") and audit["has_frontend"] in ("no", "partial (notebooks)"):
        return "No weights and no runnable frontend; add /demo + weights or use screen-only if UI exists"
    return None


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    projects = parse_projects()
    rows: list[dict] = []
    blocked: list[dict] = []

    for p in projects:
        base = repo_path_for(p["id"], p.get("githubUrl", ""))
        audit = scan_repo(base)
        mismatch = blurb_mismatch(p, base)
        row = {
            "project": p["id"],
            "name": p["name"],
            "has_frontend": audit["has_frontend"],
            "stack": audit["stack"],
            "how_to_run": audit["how_to_run"],
            "weights_data": audit["weights_data"],
            "can_run_locally": audit["can_run_locally"],
            "blurb_vs_repo": mismatch,
            "repo_path": str(base) if base.is_dir() else "MISSING",
        }
        rows.append(row)
        reason = blocked_reason(p, audit)
        if reason:
            alt = "Record live/deployed URL if available" if p.get("liveUrl") else "Build /demo calling real inference when weights exist"
            blocked.append({"slug": p["id"], "missing": reason, "alternative": alt})

        slug_dir = OUT_DIR / p["id"]
        for sub in ("source_footage", "renders", "overlay_code"):
            (slug_dir / sub).mkdir(parents=True, exist_ok=True)

    # audit.md
    lines = [
        "# Portfolio trailer audit",
        "",
        "| project | has_frontend | stack | how_to_run | weights_data | can_run_locally | blurb_vs_repo |",
        "|---------|--------------|-------|------------|--------------|-----------------|---------------|",
    ]
    for r in rows:
        lines.append(
            f"| {r['project']} | {r['has_frontend']} | {r['stack']} | {r['how_to_run'][:60]} | {r['weights_data'][:50]} | {r['can_run_locally']} | {r['blurb_vs_repo'][:60]} |"
        )
    lines.extend(["", "## Repo paths", ""])
    for r in rows:
        lines.append(f"- **{r['project']}**: `{r['repo_path']}`")
    (OUT_DIR / "audit.md").write_text("\n".join(lines), encoding="utf-8")

    blines = ["# BLOCKED trailers (honest list)", "", "Do not fabricate overlays. Unblock by adding weights, /demo, or credentials.", ""]
    for b in blocked:
        blines.append(f"## `{b['slug']}`")
        blines.append(f"- **Missing:** {b['missing']}")
        blines.append(f"- **Alternative:** {b['alternative']}")
        blines.append("")
    (OUT_DIR / "BLOCKED.md").write_text("\n".join(blines), encoding="utf-8")

    (OUT_DIR / "audit.json").write_text(json.dumps(rows, indent=2), encoding="utf-8")
    print(f"Wrote audit.md ({len(rows)} projects), BLOCKED.md ({len(blocked)} entries)")


if __name__ == "__main__":
    main()
