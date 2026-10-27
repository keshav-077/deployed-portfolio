/** Tags, preview hints, and live verification — merged onto base projects. */

export type ProjectMetaEntry = {
  tags: string[];
  workflow?: string[];
  uiTitle?: string;
  liveVerified?: boolean;
  previewSource?: 'repo' | 'generated';
};

const CATEGORY_TAGS: Record<string, string[]> = {
  'LLM & RAG': ['LLM Applications', 'Retrieval-Augmented Generation (RAG)', 'Artificial Intelligence (AI)'],
  'Computer Vision': ['Computer Vision', 'Deep Learning', 'Artificial Intelligence (AI)'],
  'Generative AI': ['Generative AI', 'Deep Learning', 'Artificial Intelligence (AI)'],
  NLP: ['Natural Language Processing (NLP)', 'Machine Learning', 'Artificial Intelligence (AI)'],
  'Reinforcement Learning': ['Reinforcement Learning (RL)', 'Machine Learning', 'Artificial Intelligence (AI)'],
  'AI for Agriculture & Science': ['Machine Learning', 'Artificial Intelligence (AI)'],
  'Cloud & Distributed Systems': ['Backend Engineering', 'Full-Stack Development', 'Artificial Intelligence (AI)'],
  'Desktop AI Applications': ['Full-Stack Development', 'Artificial Intelligence (AI)'],
};

export const projectMeta: Record<string, ProjectMetaEntry> = {
  ledgeriq: {
    tags: ['Agentic AI / AI Agents', 'Full-Stack Development', 'Backend Engineering', 'Artificial Intelligence (AI)'],
    workflow: [
      'Ingest ledger entries',
      'Match transactions',
      'Flag discrepancies',
      'Human approval',
    ],
    uiTitle: 'Reconciliation',
    liveVerified: true,
    previewSource: 'generated',
  },
  'invoiceflow-ai': {
    tags: ['LLM Applications', 'Agentic AI / AI Agents', 'Full-Stack Development', 'Artificial Intelligence (AI)'],
    workflow: [
      'Upload invoice PDF',
      'VLM field extraction',
      'PO validation',
      'Approve or review',
    ],
    uiTitle: 'AP Automation',
    liveVerified: true,
    previewSource: 'generated',
  },
  paperloom: {
    tags: ['LLM Applications', 'Retrieval-Augmented Generation (RAG)', 'Research', 'Full-Stack Development'],
    workflow: [
      'Import research paper',
      'Extract claims',
      'Verify sources',
      'Structured output',
    ],
    uiTitle: 'Research Studio',
    liveVerified: false,
    previewSource: 'generated',
  },
  neuralfolio: {
    tags: ['Reinforcement Learning (RL)', 'Machine Learning', 'Data Engineering / Analytics'],
    workflow: [
      'Market state feed',
      'RL policy action',
      'Rebalance portfolio',
      'Reward tracking',
    ],
    previewSource: 'generated',
  },
  logisticshub: {
    tags: ['Data Engineering / Analytics', 'Machine Learning', 'Backend Engineering'],
    workflow: [
      'Ingest parcel events',
      'dbt transform marts',
      'Train ML models',
      'Dashboard KPIs',
    ],
  },
  'fraud-detection-mlops': {
    tags: ['Machine Learning', 'Backend Engineering', 'Artificial Intelligence (AI)'],
    workflow: ['Load transactions', 'Feature pipeline', 'Model scoring', 'MLOps deploy'],
  },
  attritionlens: {
    tags: ['Machine Learning', 'Full-Stack Development', 'Data Engineering / Analytics'],
    workflow: ['Load HR dataset', 'Train classifier', 'Risk segments', 'Streamlit dashboard'],
  },
  'hinglish-turn-detector': {
    tags: ['Natural Language Processing (NLP)', 'Deep Learning', 'Artificial Intelligence (AI)'],
    workflow: ['Audio chunk', 'Whisper encode', 'Turn boundary', 'Agent handoff'],
  },
  'multibax-sklearn': {
    tags: ['Machine Learning', 'Artificial Intelligence (AI)'],
    workflow: ['Load tabular data', 'Preprocess', 'Fit model', 'Evaluate metrics'],
  },
  'espcn-super-resolution': {
    tags: ['Computer Vision', 'Deep Learning'],
    workflow: ['Low-res input', 'Sub-pixel conv', 'Upscale features', 'SR output'],
  },
  'aeroscale-sr': {
    tags: ['Computer Vision', 'Deep Learning'],
    workflow: ['Aerial tile input', 'Enhance model', 'Upscaled imagery', 'Quality check'],
  },
  'stock-price-predictor': {
    tags: ['Machine Learning', 'Data Engineering / Analytics'],
    workflow: ['Price history', 'Feature window', 'Forecast model', 'Metrics view'],
  },
  'healthcare-assistant': {
    tags: ['Retrieval-Augmented Generation (RAG)', 'LLM Applications', 'Full-Stack Development'],
    liveVerified: true,
    workflow: ['User question', 'Vector retrieve', 'Grounded LLM', 'Cited answer'],
  },
  'source-code-analysis-chatbot': {
    tags: ['Retrieval-Augmented Generation (RAG)', 'LLM Applications'],
    workflow: ['Index repository', 'Semantic search', 'Code context', 'Q&A response'],
  },
  'vertexai-rag': {
    tags: ['Retrieval-Augmented Generation (RAG)', 'LLM Applications', 'Backend Engineering'],
  },
  'vertexai-llm-finetuning': {
    tags: ['LLM Applications', 'Machine Learning'],
  },
  'vertexai-gemini-chatbot': {
    tags: ['LLM Applications', 'Full-Stack Development'],
  },
  'chainlit-llm-assistant': {
    tags: ['LLM Applications', 'Full-Stack Development'],
  },
  'vibe-apply-job-automation': {
    tags: ['LLM Applications', 'Artificial Intelligence (AI)'],
    workflow: ['Job query', 'Scrape listings', 'Draft outreach', 'Sheet log'],
  },
  'ai-border-security': {
    tags: ['Computer Vision', 'Deep Learning'],
    workflow: ['Video frame', 'YOLO detect', 'Re-ID track', 'Alert dashboard'],
  },
  'intelligent-vehicle-recognition-alpr': {
    tags: ['Computer Vision', 'Backend Engineering'],
    workflow: ['Camera frame', 'Detect plate', 'OCR text', 'API response'],
  },
  'deepfake-detection': {
    tags: ['Computer Vision', 'Deep Learning'],
    workflow: ['Video frames', 'Spatial CNN', 'Temporal LSTM', 'Authenticity score'],
  },
  'object-detection-hackbyte': {
    tags: ['Computer Vision', 'Deep Learning'],
  },
  'sign-language-detection': {
    tags: ['Computer Vision', 'Deep Learning'],
  },
  'dcgan-image-generation': { tags: ['Generative AI', 'Deep Learning'] },
  'vae-digit-generation': { tags: ['Generative AI', 'Deep Learning'] },
  'progressive-gan': { tags: ['Generative AI', 'Deep Learning'] },
  wgan: { tags: ['Generative AI', 'Deep Learning'] },
  srgan: { tags: ['Generative AI', 'Computer Vision'] },
  cyclegan: { tags: ['Generative AI', 'Computer Vision'] },
  'ddpm-diffusion': { tags: ['Generative AI', 'Deep Learning'] },
  'clothes-inpainting-sam': { tags: ['Generative AI', 'Computer Vision'] },
  'multimodal-generation-ai': { tags: ['Generative AI', 'LLM Applications'] },
  'language-translation-summarization': {
    tags: ['Natural Language Processing (NLP)', 'LLM Applications'],
  },
  'sentiment-analysis-engine': { tags: ['Natural Language Processing (NLP)', 'Machine Learning'] },
  'rl-music-recommendation': { tags: ['Reinforcement Learning (RL)', 'Machine Learning'] },
  'crop-disease-detection': { tags: ['Computer Vision', 'Machine Learning'] },
  'earthquake-prediction': { tags: ['Machine Learning', 'Deep Learning'] },
  'cloudstack-messenger': {
    tags: ['Full-Stack Development', 'Backend Engineering'],
    workflow: ['Send message', 'Go services', 'Redis delivery', 'Persist PG'],
  },
  'broken-semantic-search': {
    tags: ['Retrieval-Augmented Generation (RAG)', 'Backend Engineering'],
  },
  'durable-queue-wal': { tags: ['Backend Engineering'] },
  'dontcaught-ai-assistant': { tags: ['Full-Stack Development', 'Artificial Intelligence (AI)'] },
};

export function tagsForProject(id: string, category: string): string[] {
  const meta = projectMeta[id];
  if (meta?.tags?.length) {
    return meta.tags;
  }
  return CATEGORY_TAGS[category] ?? ['Artificial Intelligence (AI)'];
}
