"""Build preview_manifest.json from projects.ts ids + projectMeta workflows."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PROJECTS_TS = ROOT / "src" / "data" / "projects.ts"
META_TS = ROOT / "src" / "data" / "projectMeta.ts"
OUT = ROOT / "scripts" / "preview_manifest.json"
SPECS = ROOT / "scripts" / "preview_specs.json"
REPO = ROOT.parent

text = PROJECTS_TS.read_text(encoding="utf-8")
ids = re.findall(r"id: '([^']+)'", text)

# Parse simple meta from projectMeta.ts (workflow blocks)
meta_text = META_TS.read_text(encoding="utf-8") if META_TS.exists() else ""


def extract_workflow(pid: str) -> list[str] | None:
    block = re.search(
        rf"{re.escape(pid)}:\s*\{{[\s\S]*?workflow:\s*\[([\s\S]*?)\]",
        meta_text,
    )
    if not block:
        return None
    inner = block.group(1)
    items = re.findall(r"'([^']*)'", inner)
    return items if items else None


# Image overrides
IMAGE_OVERRIDES: dict[str, dict] = {}


def name_from_projects(pid: str) -> str:
    m = re.search(
        rf"id: '{re.escape(pid)}',[\s\S]*?name: '([^']+)'",
        text,
    )
    return m.group(1) if m else pid.replace("-", " ").title()


def desc_from_projects(pid: str) -> str:
    m = re.search(
        rf"id: '{re.escape(pid)}',[\s\S]*?description:\s*\n\s*'([^']+)'",
        text,
    )
    if m:
        return m.group(1)
    m2 = re.search(
        rf"id: '{re.escape(pid)}',[\s\S]*?description:\s*\n\s*\"([^\"]+)\"",
        text,
    )
    return m2.group(1) if m2 else ""


specs: dict = {}
if SPECS.is_file():
    specs = json.loads(SPECS.read_text(encoding="utf-8"))

manifest = []
for pid in ids:
    entry: dict = {
        "id": pid,
        "name": name_from_projects(pid),
        "description": desc_from_projects(pid),
        "source": "generated",
    }
    wf = extract_workflow(pid)
    if wf:
        entry["workflow"] = wf
        entry["ui_title"] = entry["name"][:24]
    sp = specs.get(pid)
    if sp:
        entry["visualTemplate"] = sp.get("visualTemplate")
        entry["oneLiner"] = sp.get("oneLiner")
        entry["workflowSteps"] = sp.get("workflowSteps")
        entry["displayName"] = sp.get("displayName")
    if pid in IMAGE_OVERRIDES:
        entry.update(IMAGE_OVERRIDES[pid])
    manifest.append(entry)

OUT.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print(f"Wrote {len(manifest)} entries to {OUT}")
