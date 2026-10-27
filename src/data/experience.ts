// Work experience — three roles from the Resume_Source.
// Ordered reverse-chronologically by start date (R2.2, R2.3).
// startDate/endDate use YYYY-MM for deterministic sorting.

import type { Experience } from './types';

export const experience: Experience[] = [
  {
    company: 'Course5i',
    role: 'AI Engineer Intern',
    location: 'Mumbai',
    startDate: '2025-10',
    endDate: '2026-04',
    bullets: [
      'Built production-grade multi-agent systems using LangChain and LangGraph with advanced LLMs, implementing state management, persistent memory, inter-agent communication, scalable RAG pipelines, and end-to-end MLOps for reliable deployment.',
      'Developed an agentic planner platform for visually creating and editing domain-specific workflows using GPT-based models, RAG, React Flow, Dagre, Azure, Qdrant, and multimodal language models.',
    ],
    logo: '/logos/course5i.jpg',
    logoVariant: 'wide',
  },
  {
    company: 'Infoteck Solutions',
    role: 'Data Scientist Intern',
    location: 'Remote (UK)',
    startDate: '2024-10',
    endDate: '2025-03',
    bullets: [
      'Developed a custom pipeline for automated XML-to-JSON file conversion using Large Language Models (LLMs), applying fine-tuning techniques on models like Mistral-7B and LLaMA with Quantization, LoRA, and QLoRA to optimize performance.',
      'Collaborated with SambaNova Cloud to test their AI models and built AI-driven automations on Workato by integrating OpenAI models and other technologies to optimize workflows.',
    ],
    logo: '/logos/infoteck.png',
    logoVariant: 'square',
  },
  {
    company: 'IIIT Nagpur',
    role: 'ML Research Intern',
    location: 'Remote (India)',
    startDate: '2024-05',
    endDate: '2024-07',
    bullets: [
      'Designed an architecture that integrates diffusion models with GAN discrimination for image generation.',
      'Developed a generative model combining a diffusion model as the generator and a GAN-based discriminator to produce high-quality, realistic images, leveraging Kaggle datasets via the Kaggle API.',
    ],
    logo: '/logos/iiit-nagpur.svg',
    logoVariant: 'square',
  },
];
