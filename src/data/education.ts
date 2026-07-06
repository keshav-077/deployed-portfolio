// Education — two entries from the Resume_Source.
// Ordered reverse-chronologically with IIM Visakhapatnam first (R2.4).
// Enriched with focus, coursework, learning highlights, technologies, and
// academic achievements for the premium Education timeline. Institution logos
// are omitted (no owner-provided assets) and rendered as a monogram fallback.

import type { Education } from './types';

export const education: Education[] = [
  {
    institution: 'Indian Institute of Management Visakhapatnam (IIM Visakhapatnam)',
    program: 'Master of Business Administration — PGPMCI',
    startYear: 2026,
    endYear: 2028,
    focus:
      'Bridging technical depth with business strategy — product management, analytics, and the economics of deploying AI at scale.',
    coursework: [
      'Business Strategy',
      'Marketing Management',
      'Financial Accounting',
      'Operations & Supply Chain',
      'Business Analytics',
      'Organizational Behavior',
    ],
    highlights: [
      'Translating AI/ML capabilities into product and go-to-market strategy',
      'Data-driven decision making and business analytics',
      'Leadership, teamwork, and stakeholder communication',
    ],
    technologies: ['Power BI', 'Excel', 'SQL', 'Business Analytics'],
  },
  {
    institution: 'Indian Institute of Information Technology, Nagpur (IIIT Nagpur)',
    program:
      'Bachelor of Technology, Computer Science & Engineering — Artificial Intelligence & Machine Learning',
    startYear: 2022,
    endYear: 2026,
    focus:
      'Core computer science with a specialization in Artificial Intelligence and Machine Learning — the mathematical and systems foundation behind deep learning, computer vision, and large language models.',
    coursework: [
      'Data Structures & Algorithms',
      'Machine Learning',
      'Deep Learning',
      'Computer Vision',
      'Natural Language Processing',
      'Operating Systems',
      'Database Management Systems',
      'Computer Networks',
    ],
    highlights: [
      'Built end-to-end deep learning systems spanning GANs, diffusion models, and transformers',
      'Applied computer vision and NLP to real-world detection, generation, and language problems',
      'Published IEEE research on multimodal deep learning for skin disease classification',
    ],
    technologies: [
      'Python',
      'PyTorch',
      'TensorFlow',
      'OpenCV',
      'Hugging Face',
      'CUDA',
      'Scikit-learn',
    ],
    achievements: [
      'Top 5 — Hackbyte 3.0',
      'Top 10 — Workato AI Automation Hackathon',
      'IEEE Xplore 2026 publication',
    ],
  },
];
