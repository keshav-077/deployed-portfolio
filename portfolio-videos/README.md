# Portfolio product trailers (5–8s)

Realistic cinematic or screen-capture trailers with **real model overlays** only.

## Layout per slug

```
<slug>/
  source_footage/
  renders/
  overlay_code/
  final.mp4
  final.webm
  poster.jpg
  contact_sheet.jpg
  notes.md
```

## Docs

- `audit.md` — repo capability audit (all 42 projects)
- `BLOCKED.md` — cannot render honestly until unblocked
- `storyboards.md` — approved narrative beats per project

## Env

Copy `.env.example` to `.env.local` (gitignored). Set `RUNWAY_API_KEY` and/or `KLING_API_KEY` for cinematic base footage.

## Commands

```powershell
.\make.ps1 video SLUG=ai-border-security
python scripts/trailer_pipeline/render_slug.py --slug ai-border-security
python scripts/trailer_audit.py
```

Legacy theme-promo scripts (`render_theme_promo.py`, `render_objective_preview.py`) are **deprecated** for finals.
