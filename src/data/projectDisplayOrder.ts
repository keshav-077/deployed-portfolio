/** Portfolio grid order (Tier 1 → Tier 4). */
export const PROJECT_DISPLAY_ORDER: readonly string[] = [
  'ledgeriq',
  'paperloom',
  'healthcare-assistant',
  'invoiceflow-ai',
  'logisticshub',
  'hinglish-turn-detector',
  'espcn-super-resolution',
  'fraud-detection-mlops',
  'multibax-sklearn',
  'neuralfolio',
  'ai-border-security',
  'intelligent-vehicle-recognition-alpr',
  'durable-queue-wal',
  'dontcaught-ai-assistant',
  'vibe-apply-job-automation',
  'source-code-analysis-chatbot',
  'vertexai-rag',
  'attritionlens',
  'clothes-inpainting-sam',
  'deepfake-detection',
  'cloudstack-messenger',
  'vertexai-llm-finetuning',
  'aeroscale-sr',
  'object-detection-hackbyte',
  'rl-music-recommendation',
  'sign-language-detection',
  'progressive-gan',
  'srgan',
  'cyclegan',
  'ddpm-diffusion',
  'wgan',
  'multimodal-generation-ai',
  'dcgan-image-generation',
  'crop-disease-detection',
  'stock-price-predictor',
  'earthquake-prediction',
  'vae-digit-generation',
  'sentiment-analysis-engine',
  'language-translation-summarization',
  'vertexai-gemini-chatbot',
  'chainlit-llm-assistant',
  'broken-semantic-search',
] as const;

export function displayOrderFor(id: string): number {
  const i = PROJECT_DISPLAY_ORDER.indexOf(id);
  return i >= 0 ? i : 999;
}

/** Tier-1 lead projects (featured in grid toggle). */
export const TIER1_FEATURED_IDS = new Set([
  'ledgeriq',
  'paperloom',
  'healthcare-assistant',
  'invoiceflow-ai',
  'logisticshub',
  'hinglish-turn-detector',
]);
