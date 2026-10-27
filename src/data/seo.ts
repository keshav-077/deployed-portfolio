// SEO configuration — single source of truth for the portfolio's search and
// social metadata. Consumed by src/lib/seoMeta.ts to generate Open Graph,
// Twitter Card, and JSON-LD Person tags for index.html.
// See design.md "SEO data model" (R7.1, R7.2, R7.3, R7.5, R7.6).
//
// All values are owner-controlled; no template-generated placeholder
// metadata or third-party host domains appear here (R7.6).

import type { SeoConfig } from './types';

// Single absolute canonical origin for the portfolio (R7.5).
const CANONICAL_ORIGIN = 'https://keshavardhan-makireddi-portfolio.vercel.app';

export const seoConfig: SeoConfig = {
  // Exactly one absolute canonical URL (R7.5).
  canonicalUrl: CANONICAL_ORIGIN,

  // og:title / twitter:title — at most 60 characters (R7.1, R7.2).
  ogTitle: 'Kesavardhan Makireddi — AI Engineer & Software Engineer',

  // og:description / twitter:description — at most 160 characters (R7.1, R7.2).
  ogDescription:
    'Portfolio of Kesavardhan Makireddi, AI Engineer building LLM, RAG, and computer vision systems. Explore projects, experience, and research.',

  // Absolute, owner-controlled image URL derived from the canonical origin (R7.1).
  ogImage: `${CANONICAL_ORIGIN}/screenshot-1.png`,

  // Owner's real Twitter handle, name-based and aligned with the GitHub
  // username keshav-077 (R7.6).
  twitterHandle: '@keshav_077',

  // Absolute image URL for the Twitter card (R7.2).
  twitterImage: `${CANONICAL_ORIGIN}/screenshot-1.png`,

  // JSON-LD schema.org Person data (R7.3).
  person: {
    name: 'Kesavardhan Makireddi',
    jobTitle: 'AI Engineer',
    sameAs: [
      'https://github.com/keshav-077',
      'https://www.linkedin.com/in/keshavardhan-m-9b8a22314',
    ],
  },
};

export default seoConfig;
