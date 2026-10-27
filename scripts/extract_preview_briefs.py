"""Extract preview specs from PROJECTS_DOCUMENTATION.md and projects.ts ids."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DOC = ROOT.parent / "PROJECTS_DOCUMENTATION.md"
PROJECTS_TS = ROOT / "src" / "data" / "projects.ts"
OUT = ROOT / "scripts" / "preview_specs.json"

TEMPLATE_BY_ID: dict[str, str] = {
    "ledgeriq": "fintech_recon",
    "invoiceflow-ai": "invoice_pipeline",
    "paperloom": "research_trace",
    "healthcare-assistant": "rag_chat",
    "source-code-analysis-chatbot": "rag_chat",
    "vertexai-rag": "rag_chat",
    "vertexai-gemini-chatbot": "rag_chat",
    "chainlit-llm-assistant": "rag_chat",
    "broken-semantic-search": "rag_chat",
    "vertexai-llm-finetuning": "data_pipeline",
    "ai-border-security": "cv_detect",
    "intelligent-vehicle-recognition-alpr": "cv_detect",
    "deepfake-detection": "cv_detect",
    "object-detection-hackbyte": "cv_detect",
    "sign-language-detection": "cv_detect",
    "crop-disease-detection": "cv_detect",
    "espcn-super-resolution": "cv_detect",
    "aeroscale-sr": "cv_detect",
    "clothes-inpainting-sam": "cv_detect",
    "neuralfolio": "rl_portfolio",
    "rl-music-recommendation": "rl_portfolio",
    "logisticshub": "data_pipeline",
    "fraud-detection-mlops": "data_pipeline",
    "attritionlens": "data_pipeline",
    "multibax-sklearn": "data_pipeline",
    "stock-price-predictor": "data_pipeline",
    "earthquake-prediction": "data_pipeline",
    "hinglish-turn-detector": "nlp_pipeline",
    "language-translation-summarization": "nlp_pipeline",
    "sentiment-analysis-engine": "nlp_pipeline",
    "dcgan-image-generation": "gan_grid",
    "vae-digit-generation": "gan_grid",
    "progressive-gan": "gan_grid",
    "wgan": "gan_grid",
    "srgan": "gan_grid",
    "cyclegan": "gan_grid",
    "ddpm-diffusion": "gan_grid",
    "multimodal-generation-ai": "gan_grid",
    "cloudstack-messenger": "app_shell",
    "durable-queue-wal": "app_shell",
    "vibe-apply-job-automation": "app_shell",
    "dontcaught-ai-assistant": "app_shell",
}

DEFAULT_STEPS: dict[str, list[str]] = {
    "fintech_recon": ["Import ledgers", "Match refs", "Flag gaps", "Approve send"],
    "invoice_pipeline": ["Upload PDF", "Extract fields", "Match PO", "Pay / review"],
    "research_trace": ["Import paper", "Extract claims", "Verify sources", "Publish trace"],
    "rag_chat": ["User query", "Retrieve context", "Grounded answer", "Cite sources"],
    "cv_detect": ["Camera frame", "Detect objects", "Track / classify", "Alert UI"],
    "rl_portfolio": ["Market state", "Policy action", "Rebalance", "Reward curve"],
    "data_pipeline": ["Ingest data", "Transform", "Train model", "Dashboard KPI"],
    "gan_grid": ["Sample noise", "Generator", "Refine latent", "Output grid"],
    "nlp_pipeline": ["Input text", "Translate / tokenize", "Model pass", "Summary out"],
    "app_shell": ["Open app", "Core workflow", "Validate", "Result view"],
}


def project_ids() -> list[str]:
    text = PROJECTS_TS.read_text(encoding="utf-8")
    return re.findall(r"id: '([^']+)'", text)


def parse_doc_sections() -> dict[str, str]:
    if not DOC.is_file():
        return {}
    text = DOC.read_text(encoding="utf-8")
    chunks = re.split(r"\n## \d+\.\s+", text)
    out: dict[str, str] = {}
    for chunk in chunks[1:]:
        title_line, _, body = chunk.partition("\n")
        title = title_line.strip().lower()
        m = re.search(
            r"\*\*1\. What it is[^*]*\*\*\s*\n(.+?)(?=\n\*\*2\.|\n---|\n## )",
            body,
            re.DOTALL,
        )
        if not m:
            m = re.search(r"\*\*1\. What it is[^*]*\*\*\s*(.+?)(?=\n\*\*2\.|\n---)", body, re.DOTALL)
        if m:
            one = re.sub(r"\s+", " ", m.group(1).strip())
            out[title] = one[:280]
    return out


def name_for_id(pid: str, projects_text: str) -> str:
    m = re.search(rf"id: '{re.escape(pid)}',[\s\S]*?name: '([^']+)'", projects_text)
    return m.group(1) if m else pid.replace("-", " ").title()


def desc_for_id(pid: str, projects_text: str) -> str:
    m = re.search(
        rf"id: '{re.escape(pid)}',[\s\S]*?description:\s*\n\s*'([^']+)'",
        projects_text,
    )
    return m.group(1) if m else ""


def main() -> None:
    ids = project_ids()
    projects_text = PROJECTS_TS.read_text(encoding="utf-8")
    doc_blurbs = parse_doc_sections()
    specs: dict[str, dict] = {}
    for pid in ids:
        name = name_for_id(pid, projects_text)
        desc = desc_for_id(pid, projects_text)
        template = TEMPLATE_BY_ID.get(pid, "app_shell")
        one_liner = desc
        for _title, blurb in doc_blurbs.items():
            if pid.replace("-", " ") in _title or name.lower()[:12] in _title:
                one_liner = blurb
                break
        specs[pid] = {
            "id": pid,
            "displayName": name,
            "oneLiner": one_liner,
            "workflowSteps": DEFAULT_STEPS.get(template, DEFAULT_STEPS["app_shell"]),
            "visualTemplate": template,
        }
    OUT.write_text(json.dumps(specs, indent=2), encoding="utf-8")
    print(f"Wrote {len(specs)} specs to {OUT}")


if __name__ == "__main__":
    main()
