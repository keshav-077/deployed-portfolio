// SEO metadata generators — pure, framework-free functions that turn a
// SeoConfig into Open Graph tags, Twitter Card tags, and a JSON-LD Person
// object. Consumed by index.html generation and validated by design
// Properties 22 and 23.
// See design.md "Correctness Properties" (R7.1, R7.2, R7.3).
//
// Titles and descriptions are passed through unchanged: the SeoConfig is the
// single source of truth and already respects the <=60 / <=160 char limits
// (R7.1, R7.2). These generators never truncate silently.

import type { SeoConfig } from '../data/types';

/**
 * A flat map of Open Graph meta tag names to their content values.
 * Keys are the full `og:*` property names as they appear in `<meta property>`.
 */
export type OpenGraphTags = Record<string, string>;

/**
 * A flat map of Twitter Card meta tag names to their content values.
 * Keys are the full `twitter:*` names as they appear in `<meta name>`.
 */
export type TwitterTags = Record<string, string>;

/**
 * A schema.org Person object suitable for embedding as JSON-LD structured
 * data. Matches the shape required by design Property 23.
 */
export interface JsonLdPerson {
  '@context': 'https://schema.org';
  '@type': 'Person';
  name: string;
  jobTitle: string;
  sameAs: string[];
}

/**
 * Builds the Open Graph tag map from a SeoConfig (R7.1).
 *
 * Always includes `og:type` = "website". Title/description/URL/image are
 * taken verbatim from the config so the caller controls length limits.
 *
 * @param config - The owner-controlled SEO configuration.
 * @returns A map of `og:*` property names to content strings.
 */
export function buildOpenGraphTags(config: SeoConfig): OpenGraphTags {
  return {
    'og:type': 'website',
    'og:title': config.ogTitle,
    'og:description': config.ogDescription,
    'og:url': config.canonicalUrl,
    'og:image': config.ogImage,
  };
}

/**
 * Builds the Twitter Card tag map from a SeoConfig (R7.2).
 *
 * Always includes `twitter:card` = "summary_large_image". Remaining values
 * come directly from the config.
 *
 * @param config - The owner-controlled SEO configuration.
 * @returns A map of `twitter:*` names to content strings.
 */
export function buildTwitterTags(config: SeoConfig): TwitterTags {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:title': config.ogTitle,
    'twitter:description': config.ogDescription,
    'twitter:image': config.twitterImage,
    'twitter:site': config.twitterHandle,
  };
}

/**
 * Builds a schema.org Person object from a SeoConfig (R7.3).
 *
 * The returned object contains `@context`, `@type` "Person", the person's
 * name and job title, and the `sameAs` profile URLs from the config.
 *
 * @param config - The owner-controlled SEO configuration.
 * @returns A JSON-LD Person object.
 */
export function buildJsonLdPerson(config: SeoConfig): JsonLdPerson {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: config.person.name,
    jobTitle: config.person.jobTitle,
    sameAs: [...config.person.sameAs],
  };
}

/**
 * Serializes the JSON-LD Person object to a JSON string ready for embedding
 * inside a `<script type="application/ld+json">` tag (R7.3).
 *
 * @param config - The owner-controlled SEO configuration.
 * @returns A JSON string representation of the Person object.
 */
export function buildJsonLdPersonString(config: SeoConfig): string {
  return JSON.stringify(buildJsonLdPerson(config));
}
