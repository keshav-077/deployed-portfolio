// Owner profile — single source of truth for identity and hero content.
// Sourced only from the Resume_Source (resume PDF + requirements Requirement 2).
// See requirements R2.1, R4.1, R4.2, R4.7.

import type { Profile } from './types';

export const profile: Profile = {
  name: 'Kesavardhan Makireddi',
  title: 'AIML Engineer / Software Engineer',
  headline: 'Building intelligent systems at the intersection of research and engineering.',
  summary:
    'AI Engineer with deep expertise in Large Language Models, multi-agent systems, ' +
    'Retrieval-Augmented Generation (RAG), and computer vision. From designing ' +
    'diffusion-GAN hybrid architectures to building production multi-agent platforms, ' +
    'I work across border security, healthcare, NLP, and automation to create ' +
    'scalable, impactful solutions.',
  availability: 'Open to opportunities',
  email: 'keshavardhan777@gmail.com',
  githubUrl: 'https://github.com/keshav-077',
  linkedinUrl: 'https://www.linkedin.com/in/keshavardhan-m-9b8a22314',
  resumePath: '/Keshavardhan_Makireddi.pdf',
  // Small professional portrait shown in the Hero. Drop a headshot at
  // public/profile.jpg; the Hero degrades gracefully if the file is absent.
  profileImage: '/profile.jpg',
  academicIntro:
    'My academic path runs from a B.Tech in Computer Science with a specialization in ' +
    'Artificial Intelligence & Machine Learning at IIIT Nagpur to an MBA at IIM Visakhapatnam. ' +
    'The engineering years gave me the mathematical and systems foundation behind modern AI — ' +
    'deep learning, computer vision, and large language models — while the management track sharpens ' +
    'how I translate that research into products and strategy. Together they shaped my transition into ' +
    'AI, Machine Learning, and Software Engineering as a builder who cares about both the model and the outcome.',
};
