# Storyboards — 5–8s product trailers

**Approval:** Review with `audit.md` and `BLOCKED.md`. Narratives narrowed where repos lack weights or OSNet/multi-cam code.

Format per slug: **Beat 1 → Beat 2 → Beat 3** | Base: `runway` | `kling` | `screen` | `repo_artifact`

---

## Flagships (4)

| Slug | Story (one sentence per beat) | Base | Real run |
|------|-------------------------------|------|----------|
| `ledgeriq` | Dashboard opens on ledger rows → mismatches pulse → approver clears exception | screen | yes (live/local) |
| `invoiceflow-ai` | PDF drops on inbox → extraction fills fields → PO match green approve | screen | yes |
| `paperloom` | PDF paper lands → claim links to highlighted source → trace complete | screen | yes |
| `healthcare-assistant` | User asks clinical question → retrieval chips appear → grounded answer | screen | yes |

---

## Computer Vision (10)

### 1. `ai-border-security` (YOLOv8 + ReID — **narrowed per audit**)
- **Beat 1:** Dusk CCTV: figure walks toward fence (Runway/Kling base).
- **Beat 2:** **Real YOLO** boxes person on frames; HUD shows class + confidence from repo weights.
- **Beat 3:** Weapon/person class change on **real detector output** only (multi-cam ReID **only if OSNet weights/script added**; else single-cam).
- Base: `runway` + overlay | Audit: notebooks; 1 weight file; OSNet not in tree.

### 2. `intelligent-vehicle-recognition-alpr`
- Car approaches toll lane → box locks vehicle → plate crop + OCR JSON from **Flask/app inference**.
- Base: `runway` + overlay or `screen` (Flask UI).

### 3. `deepfake-detection`
- Talking-head clip → face mesh → **real/fake probability** from repo model on frames.
- Base: `runway` + overlay | Audit: notebook-only; demo needed.

### 4. `sign-language-detection`
- Webcam signer → skeleton/hand track → **live letter/word** from model.
- Base: `screen` or webcam capture + overlay.

### 5. `crop-disease-detection`
- Leaf close-up → diseased region mask → label + advice from **CNN output**.
- Base: `runway`/`kling` field + overlay.

### 6. `aeroscale-sr`
- Blurry aerial tile → wipe reveals **model upscaled** side.
- Base: repo inference frames.

### 7. `espcn-super-resolution`
- Low-res → sharp with **FPS counter** from real ESPCN forward pass.
- Base: repo artifact.

### 8. `srgan`
- Face/texture wipe low→high using **SRGAN output** frames.
- Base: repo artifact.

### 9. `object-detection-hackbyte` (Duality YOLOv8)
- Busy scene → multi-box detect → live class count from **YOLOv8s**.
- Base: screen or overlay on sample video.

### 10. `clothes-inpainting-sam`
- Person photo → SAM jacket mask → inpaint **real SD/SAM pipeline** (not mocked).
- Base: `screen` Gradio/Streamlit `/demo` | Audit: notebook-only.

---

## Generative AI (7)

| Slug | Beats | Base |
|------|-------|------|
| `cyclegan` | Photo morphs domain A→B using **generator frames** | repo_artifact |
| `ddpm-diffusion` | Noise denoises stepwise to image | repo_artifact |
| `dcgan-image-generation` | Grid evolves; latent interpolation | repo_artifact |
| `progressive-gan` | Resolution grows 4×4→final checkpoint | repo_artifact |
| `wgan` | Stable latent walk (or train curve if in repo) | repo_artifact |
| `vae-digit-generation` | Latent cursor glides; digits morph | repo_artifact |
| `multimodal-generation-ai` | Prompt typed; CLIP+VQGAN image emerges | screen/repo |

---

## NLP / LLM / RAG (10)

| Slug | Beats | Base |
|------|-------|------|
| `source-code-analysis-chatbot` | Paste repo URL → index → Q&A with file/line cites | screen |
| `language-translation-summarization` | Foreign doc in → translation → summary stream | screen/demo |
| `sentiment-analysis-engine` | Comment feed; toxic flagged with **model confidence** | screen |
| `hinglish-turn-detector` | Two speakers; waveform; turn boundary flips on **Whisper model** | screen + audio viz |
| `vertexai-gemini-chatbot` | Real app; streaming tokens | screen |
| `vertexai-llm-finetuning` | Same prompt; base vs fine-tuned split | screen/cloud |
| `vertexai-rag` | PDF upload → question → answer + **highlighted chunk** | screen (GCP) |
| `broken-semantic-search` | Split screen wrong vs fixed ranked results | screen |
| `chainlit-llm-assistant` | Multi-step Chainlit conversation | screen |
| `vibe-apply-job-automation` | Jobs scroll → select → cover letter + email generated | screen |

---

## ML / Data / RL / Systems (10)

| Slug | Beats | Base |
|------|-------|------|
| `neuralfolio` | Streamlit: agent curves vs benchmark; stress shock | screen |
| `rl-music-recommendation` | Skip/like; playlist adapts; reward shown | screen/demo |
| `stock-price-predictor` | Candles; forecast line; actual overlay later | screen |
| `earthquake-prediction` | Seismograph; map markers; pred vs actual | screen |
| `attritionlens` | Streamlit filters; risk cards red/amber/green | screen |
| `fraud-detection-mlops` | Transaction stream; fraud block; MLflow/Grafana if local | screen |
| `logisticshub` | Map parcels; KPIs; RTS flags (**Snowflake blocked** without cloud) | BLOCKED / Qlik PNG + honest caption |
| `multibax-sklearn` | Acquisition loop; convergence plots from **repo** | repo_artifact |
| `cloudstack-messenger` | Two browsers chat; architecture glimpse | screen |
| `durable-queue-wal` | Enqueue → kill process → WAL replay; no loss | screen/terminal |
| `dontcaught-ai-assistant` | Video call; overlay answers; invisible in share | screen capture |

---

## Remaining portfolio slugs (also storyboarded)

| Slug | Beats | Base |
|------|-------|------|
| `fraud-detection-mlops` | (see above) | screen |
| `multibax-sklearn` | (see above) | repo |

All **42** `projects.ts` ids have folders under `portfolio-videos/<slug>/`. Slugs not listed above use the same rules: **screen if UI**, **runway+kling+overlay if CV**, else **BLOCKED** until `/demo` + weights.

---

## Pilot batch (render first)

1. `ai-border-security`
2. `intelligent-vehicle-recognition-alpr`
3. `deepfake-detection`
4. `clothes-inpainting-sam`
5. `vertexai-rag`

Then remaining in **batches of 8** (CV → Generative → NLP → ML/Systems).
