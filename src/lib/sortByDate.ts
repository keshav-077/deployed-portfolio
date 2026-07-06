// Pure reverse-chronological ordering for dated content entries.
// Reusable across Experience (startDate string "YYYY-MM") and Education
// (startYear number). Produces a new array in descending start-date order so
// that each entry's start date is >= the start date of the entry that follows.
// See design.md "New logic modules" and Correctness Property 2.
// Validates: Requirements 2.3, 2.4

/**
 * Comparable start-date value. String values (e.g. "YYYY-MM") sort
 * lexicographically, which matches chronological order for zero-padded
 * ISO-style dates; numeric values (e.g. a start year) sort numerically.
 */
export type DateKey = string | number;

/**
 * Compare two keys for descending (most-recent-first) ordering.
 * Works uniformly for strings and numbers.
 */
function compareDesc(a: DateKey, b: DateKey): number {
  if (a < b) return 1;
  if (a > b) return -1;
  return 0;
}

/**
 * Return a new array of `entries` sorted in reverse-chronological order by the
 * start-date value produced by `getKey`. The input array is not mutated.
 *
 * @param entries  The dated entries to order (not mutated).
 * @param getKey   Selects the comparable start-date value for an entry.
 */
export function sortByDate<T>(
  entries: readonly T[],
  getKey: (entry: T) => DateKey,
): T[] {
  // Copy first so the caller's array is never mutated; Array.prototype.sort is
  // stable in modern engines, preserving input order for equal keys.
  return entries.slice().sort((a, b) => compareDesc(getKey(a), getKey(b)));
}
