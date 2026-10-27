# Cinematic portfolio previews

- **Prompts:** `cinematic_portfolio_prompts.py` (master Alexa 65 style + per-slug scenes, no in-image text).
- **Sources:** `preview_assets/cinematic/cin_{slug}.jpg` (committed copies of generated stills).
- **Publish:** `python scripts/publish_cinematic_previews.py` → `public/projects/{slug}/preview.jpg` (+ `poster.jpg`).
- **GIF cards:** LedgerIQ, PaperLoom, Bloom keep `preview.gif` on cards; cinematic stills update `poster.jpg` only.

Regenerate a single slug: add/replace `cin_{slug}.jpg` in `preview_assets/cinematic/`, then `python scripts/publish_cinematic_previews.py {slug}`.

Projects **not** in `projects.ts` (Latent Diffusion IIITN, C5i Agent5i, Infoteck) have no portfolio slot yet.
