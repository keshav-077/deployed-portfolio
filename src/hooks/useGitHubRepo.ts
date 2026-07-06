import { useQuery } from '@tanstack/react-query';

import type { GitHubRepoMeta } from '@/data/types';
import { mapRepoResponse, parseRepoUrl } from '@/lib/githubClient';

/**
 * Live GitHub repository metadata with a 5-second timeout and a silent fallback
 * to static `Project_Dataset` content on any failure (R10.2, R10.3).
 *
 * Behavior:
 * - When `repoUrl` is undefined or does not parse into an owner/repo pair, the
 *   hook performs no network request and returns `{ data: null, isError: false }`.
 * - On a successful retrieval within 5 seconds, `data` holds the normalized
 *   `GitHubRepoMeta` mapped from the untrusted API response (R10.2).
 * - On ANY failure (network error, 5-second timeout, non-ok status such as a
 *   rate-limit response), the hook resolves to `data: null` so the caller keeps
 *   rendering static content, and never surfaces an error to the visitor. The
 *   `isError` flag is consumed internally only (R10.3).
 */

const TIMEOUT_MS = 5_000;

async function fetchRepoMeta(owner: string, repo: string): Promise<GitHubRepoMeta> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      signal: controller.signal,
      headers: { Accept: 'application/vnd.github+json' },
    });

    // Any non-ok status (including 403 rate-limit) is treated as a failure so
    // the caller falls back to static content.
    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }

    const raw: unknown = await response.json();
    return mapRepoResponse(raw);
  } finally {
    clearTimeout(timeout);
  }
}

export function useGitHubRepo(repoUrl?: string): {
  data: GitHubRepoMeta | null;
  isError: boolean;
} {
  const parsed = repoUrl ? parseRepoUrl(repoUrl) : null;

  const query = useQuery({
    // A stable key per owner/repo; disabled entirely when there is nothing to fetch.
    queryKey: ['github-repo', parsed?.owner, parsed?.repo],
    queryFn: () => fetchRepoMeta(parsed!.owner, parsed!.repo),
    enabled: parsed !== null,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1_000, // 5 minutes: repo metadata changes slowly.
    gcTime: 30 * 60 * 1_000,
  });

  // Silent fallback: on failure (or while loading / when disabled) expose null
  // data so the caller renders static Project_Dataset content. The error is
  // never surfaced to the visitor.
  return {
    data: query.data ?? null,
    isError: query.isError,
  };
}
