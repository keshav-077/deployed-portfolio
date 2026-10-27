# Portfolio preview assets

## Prompt-based photorealistic cards (28 projects)

- Prompts + shared style line: [`../portfolio_visual_prompts.json`](../portfolio_visual_prompts.json)
- Staged JPEGs: `generated/{slug}.jpg`
- Install to site: `python scripts/install_prompt_preview.py`

Style suffix (append to every image prompt):

`Photorealistic, cinematic 16:9, shallow depth of field, soft natural lighting, sharp legible on-screen text, no real company logos or trademarks.`

Regenerate a single slug in Gemini/your image tool, drop `{slug}.jpg` in `generated/`, then run `install_prompt_preview.py`. Fix garbled on-screen text in an editor if needed.

## ALPR / border HUD composites

Install reference cards:

- `python scripts/install_alpr_reference_preview.py [optional-path.jpg]`
- `python scripts/install_border_reference_preview.py [optional-path.jpg]`

Fallback compositor: `render_product_hud_previews.py` (uses `*_hud_reference.jpg` when present).
