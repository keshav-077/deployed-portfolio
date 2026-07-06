/**
 * rateLimit.ts — rolling-window rate limiting for the contact endpoint (R6.8).
 *
 * Pure, framework-free accounting over a history of submission timestamps.
 * A submission is "in the trailing window" when it falls within the last
 * `windowMs` milliseconds relative to `now`, i.e. `now - ts < windowMs`.
 * Timestamps outside that window are ignored and stop contributing once the
 * window advances past them.
 */

/** Default rolling window: 10 minutes. */
export const DEFAULT_WINDOW_MS = 10 * 60 * 1000;

/** Default maximum submissions permitted within the window. */
export const DEFAULT_MAX = 5;

export interface RateLimitOptions {
  /** Length of the trailing window in milliseconds. Defaults to 10 minutes. */
  windowMs?: number;
  /** Maximum submissions allowed within the window. Defaults to 5. */
  max?: number;
}

/**
 * Returns true if and only if the number of submissions within the trailing
 * `windowMs` window (ending at `now`) exceeds `max`. Timestamps outside the
 * window do not count.
 */
export function isRateLimited(
  history: number[],
  now: number,
  opts?: RateLimitOptions
): boolean {
  const windowMs = opts?.windowMs ?? DEFAULT_WINDOW_MS;
  const max = opts?.max ?? DEFAULT_MAX;

  let countInWindow = 0;
  for (const ts of history) {
    if (isWithinWindow(ts, now, windowMs)) {
      countInWindow++;
    }
  }

  return countInWindow > max;
}

/**
 * Appends `now` to the history and prunes any entries that fall outside the
 * trailing window. Does not mutate the input array — a new array is returned.
 */
export function recordSubmission(
  history: number[],
  now: number,
  windowMs: number = DEFAULT_WINDOW_MS
): number[] {
  const pruned = history.filter((ts) => isWithinWindow(ts, now, windowMs));
  pruned.push(now);
  return pruned;
}

/**
 * A timestamp is within the trailing window ending at `now` when it is no
 * older than `windowMs` and not in the future relative to `now`.
 */
function isWithinWindow(ts: number, now: number, windowMs: number): boolean {
  return ts > now - windowMs && ts <= now;
}
