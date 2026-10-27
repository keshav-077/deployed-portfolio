# Doc-36 portfolio preview videos

Generates **MP4** loops for the 36 projects in `PROJECTS_DOCUMENTATION.md` (lines 29–64).

## Prerequisites

- Python 3.10+
- `pip install playwright pyyaml pillow imageio imageio-ffmpeg`
- `python -m playwright install chromium`
- Playwright bundles **FFmpeg** (used for transcoding)

## Commands

```powershell
cd deployed-portfolio
npm run previews:doc36              # full pipeline (long)
python scripts/build_doc36_previews.py --id ledgeriq   # single project
```

Pipeline steps:

1. `ensure_doc36_clones.py` — clone missing repos under `../`
2. `classify_doc36_ui.py` — detect web / Streamlit / Gradio
3. UI projects → `record_frontend_preview.py` (Playwright tour)
4. Others → `render_objective_preview.py` (doc-driven animation + repo stills)

Outputs: `public/projects/{id}/preview.mp4`, `poster.jpg`, `preview_report.json`.
