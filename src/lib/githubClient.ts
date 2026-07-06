import type { GitHubRepoMeta } from '@/data/types';
import { formatUpdatedDate } from '@/lib/formatDate';

/**
 * Pure mapping helpers for the public GitHub REST API (R10.1, R10.5).
 *
 * These functions are framework-free and treat the API response as untrusted:
 * every field is validated and normalized before it reaches the model.
 */

/**
 * Coerces an unknown value into a non-negative integer count.
 * Missing, non-numeric, NaN, and negative values all normalize to 0 (R10.1).
 */
function toNonNegativeInt(value: unknown): number {
  const n = typeof value === 'number' ? value : Number(value);
  if (!Number.isFinite(n)) {
    return 0;
  }
  return Math.max(0, Math.floor(n));
}

/**
 * Normalizes the `topics` field into a string array, dropping non-string
 * entries. Returns an empty array when topics are absent (R10.5).
 */
function toTopics(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.filter((t): t is string => typeof t === 'string');
}

/**
 * Safely normalizes an untrusted GitHub repo API response into GitHubRepoMeta.
 *
 * - `stars`/`forks` are clamped to non-negative integers (missing/NaN -> 0).
 * - `topics` becomes a `string[]` (empty when absent).
 * - `isPublic` is derived from the `private` boolean; defaults to public
 *   unless the response explicitly marks the repo private.
 * - `language` may be null.
 * - `updatedAt` is the human-readable formatted `updated_at` date.
 */
export function mapRepoResponse(raw: unknown): GitHubRepoMeta {
  const repo: Record<string, unknown> =
    raw !== null && typeof raw === 'object' ? (raw as Record<string, unknown>) : {};

  const language = typeof repo.language === 'string' ? repo.language : null;
  const updatedAtRaw = typeof repo.updated_at === 'string' ? repo.updated_at : '';
  const isPublic = repo.private === true ? false : true;

  return {
    language,
    updatedAt: formatUpdatedDate(updatedAtRaw),
    topics: toTopics(repo.topics),
    stars: toNonNegativeInt(repo.stargazers_count),
    forks: toNonNegativeInt(repo.forks_count),
    isPublic,
  };
}

/**
 * Parses a `github.com/{owner}/{repo}` URL into its owner/repo parts.
 * Returns null when the URL does not match that shape (R10).
 *
 * Accepts optional scheme, optional `www.`, a trailing `.git` suffix, and
 * trailing slashes or extra path segments (only the first two segments are
 * used). Owner and repo segments must be non-empty.
 */
export function parseRepoUrl(url: string): { owner: string; repo: string } | null {
  if (typeof url !== 'string') {
    return null;
  }

  const match = url
    .trim()
    .match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^/\s]+)\/([^/\s#?]+)/i);

  if (!match) {
    return null;
  }

  const owner = match[1];
  let repo = match[2];
  // Strip a trailing ".git" suffix commonly present on clone URLs.
  repo = repo.replace(/\.git$/i, '');

  if (!owner || !repo) {
    return null;
  }

  return { owner, repo };
}
