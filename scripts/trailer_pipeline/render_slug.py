"""Render one portfolio trailer slug."""
from __future__ import annotations

import argparse
import json
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "scripts"))
sys.path.insert(0, str(Path(__file__).resolve().parent))

from env_loader import load_env_local
from portfolio_projects import parse_projects, repo_path_for
from compose import compose_final
from config import PUBLIC, VIDEOS
from fetch_base import ensure_base_footage
from repo_source import find_repo_mp4
from screen_record import record_to_source

load_env_local()

PROMPTS: dict[str, str] = {
    "ai-border-security": "Cinematic CCTV dusk border fence, person walking toward camera, realistic, no text",
    "intelligent-vehicle-recognition-alpr": "Highway toll lane camera, car approaching, realistic traffic cam",
    "deepfake-detection": "News anchor talking head close-up, broadcast lighting, realistic",
    "clothes-inpainting-sam": "Fashion photo person standing neutral background studio light",
    "crop-disease-detection": "Drone close-up green crop field leaf detail realistic",
    "vertexai-rag": "Modern office worker at laptop reviewing AI chat responses, soft daylight, realistic",
}

LIVE_FLAGSHIPS = {"ledgeriq", "invoiceflow-ai", "paperloom", "healthcare-assistant"}


def is_blocked(slug: str) -> str | None:
    blocked = VIDEOS / "BLOCKED.md"
    if not blocked.is_file():
        return None
    text = blocked.read_text(encoding="utf-8")
    if f"## `{slug}`" in text:
        return "Listed in BLOCKED.md"
    return None


def meta_for(slug: str) -> dict:
    p = next((x for x in parse_projects() if x["id"] == slug), None)
    if not p:
        raise SystemExit(f"Unknown slug: {slug}")
    return p


def run_overlay_if_present(slug_dir: Path, source: Path) -> Path:
    overlay_script = slug_dir / "overlay_code" / "run_overlay.py"
    if not overlay_script.is_file():
        return source
    import subprocess

    subprocess.run([sys.executable, str(overlay_script), str(source)], check=False, cwd=str(slug_dir))
    composed = slug_dir / "renders" / "composited.mp4"
    if composed.is_file() and composed.stat().st_size > 1000:
        return composed
    return source


def try_screen(slug: str, source: Path) -> bool:
    if record_to_source(slug, source):
        return True
    pub = PUBLIC / slug / "preview.mp4"
    if pub.is_file():
        source.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(pub, source)
        return True
    return False


def render(slug: str, force_screen: bool = False) -> dict:
    block = is_blocked(slug)
    slug_dir = VIDEOS / slug
    slug_dir.mkdir(parents=True, exist_ok=True)
    source = slug_dir / "source_footage" / "base.mp4"
    meta = meta_for(slug)
    title = meta["name"]
    tagline = meta["description"][:90]
    notes = slug_dir / "notes.md"

    mode = "unknown"
    is_real = False

    if slug in LIVE_FLAGSHIPS or force_screen or meta.get("liveUrl"):
        if try_screen(slug, source):
            mode = "screen"
            is_real = True
        elif not source.is_file():
            notes.write_text("Screen record failed; see BLOCKED.md\n", encoding="utf-8")
            return {"slug": slug, "status": "failed", "reason": "screen record"}

    elif slug in PROMPTS or slug in {"vertexai-rag"}:
        prompt = PROMPTS.get(slug, f"Realistic product scene for {title}, cinematic, no text")
        if block and not source.is_file():
            notes.write_text(f"Overlay path BLOCKED: {block}\n", encoding="utf-8")
            src_kind = ensure_base_footage(slug, prompt, source)
            if src_kind == "missing":
                repo = repo_path_for(slug, meta.get("githubUrl", ""))
                found = find_repo_mp4(repo)
                if found:
                    source.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(found, source)
                    mode = "repo_artifact"
                    is_real = True
                else:
                    return {"slug": slug, "status": "blocked", "reason": block}
            else:
                mode = src_kind
        else:
            src_kind = ensure_base_footage(slug, prompt, source)
            if src_kind == "missing" and not source.is_file():
                repo = repo_path_for(slug, meta.get("githubUrl", ""))
                found = find_repo_mp4(repo)
                if found:
                    source.parent.mkdir(parents=True, exist_ok=True)
                    shutil.copy2(found, source)
                    mode = "repo_artifact"
                    is_real = True
                else:
                    notes.write_text(
                        f"Need base footage. Prompt:\n{prompt}\nPlace at: {source}\n",
                        encoding="utf-8",
                    )
                    return {"slug": slug, "status": "needs_base_footage", "prompt": prompt}
            else:
                mode = src_kind if src_kind != "missing" else "cached"
        if source.is_file() and mode not in ("screen", "repo_artifact"):
            source = run_overlay_if_present(slug_dir, source)
            is_real = (slug_dir / "renders" / "composited.mp4").is_file()

    else:
        if try_screen(slug, source):
            mode = "screen"
            is_real = True
        else:
            repo = repo_path_for(slug, meta.get("githubUrl", ""))
            found = find_repo_mp4(repo)
            if found:
                source.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(found, source)
                mode = "repo_artifact"
                is_real = True
            elif block:
                return {"slug": slug, "status": "blocked", "reason": block}
            else:
                return {"slug": slug, "status": "pending", "reason": "no source"}

    if not source.is_file():
        return {"slug": slug, "status": "no_source"}

    result = compose_final(slug, source, slug_dir, title, tagline)
    report = {
        **result,
        "status": "ok",
        "mode": mode,
        "is_real_run": is_real,
        "title": title,
    }
    (slug_dir / "preview_report.json").write_text(json.dumps(report, indent=2), encoding="utf-8")
    notes.write_text(
        f"# {slug}\n\nMode: {mode}\nis_real_run: {is_real}\n",
        encoding="utf-8",
    )
    return report


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--slug", required=True)
    ap.add_argument("--force-screen", action="store_true")
    args = ap.parse_args()
    rep = render(args.slug, force_screen=args.force_screen)
    print(json.dumps(rep, indent=2))


if __name__ == "__main__":
    main()
