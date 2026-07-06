/**
 * animationMath.ts — pure math behind the animation hooks (R5.3, R5.4, R5.5, R5.6, R5.7).
 *
 * Framework-free, side-effect-free functions consumed by the browser-adapting
 * hooks in `src/hooks/*`. Keeping this logic pure makes the animation
 * behavior (scroll progress, active-section resolution, count-up interpolation,
 * pointer-capability detection) directly testable without a DOM.
 */

/** A section identified by its id and its vertical offset from the top of the document. */
export interface SectionOffset {
  id: string;
  offset: number;
}

/** Accepts a raw boolean or a `matchMedia`-like result with a `matches` field. */
export type PointerCapabilityQuery = boolean | { matches: boolean };

/** Clamp `value` into the inclusive range [min, max]. */
function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

/**
 * Vertical scroll progress as a value in [0, 1] (R5.3).
 *
 * Returns 0 at the top of the document and 1 at the bottom. The mapping is
 * monotonic non-decreasing in `scrollTop`: as the visitor scrolls further
 * down, progress never decreases. The maximum scrollable distance is
 * `scrollHeight - clientHeight`; when the document is not taller than the
 * viewport (`scrollHeight <= clientHeight`) there is nothing to scroll, so the
 * progress is 0.
 */
export function computeScrollProgress(
  scrollTop: number,
  scrollHeight: number,
  clientHeight: number
): number {
  const scrollable = scrollHeight - clientHeight;
  if (scrollable <= 0) return 0;
  return clamp(scrollTop / scrollable, 0, 1);
}

/**
 * The id of the currently active section for navbar indication (R5.4).
 *
 * Returns the id of the section with the greatest `offset` that is still
 * less than or equal to `scrollPosition`. Before the first section's offset is
 * reached, the first section (by offset) is active. When the set is non-empty
 * the returned id is always one drawn from the provided set; when the set is
 * empty an empty string is returned.
 */
export function computeActiveSection(
  sections: SectionOffset[],
  scrollPosition: number
): string {
  if (sections.length === 0) return "";

  // Order by offset so "greatest offset <= scrollPosition" and the default
  // "first section" are well-defined regardless of input ordering.
  const ordered = [...sections].sort((a, b) => a.offset - b.offset);

  let activeId = ordered[0].id;
  for (const section of ordered) {
    if (section.offset <= scrollPosition) {
      activeId = section.id;
    } else {
      break;
    }
  }
  return activeId;
}

/**
 * Interpolated count-up value at animation progress `p` (R5.5).
 *
 * `p` is clamped to [0, 1]. The result is bounded between `start` and `target`,
 * equals `start` exactly at `p = 0`, and equals `target` exactly at `p = 1`
 * (regardless of whether `target` is greater or less than `start`).
 */
export function countUpValue(start: number, target: number, p: number): number {
  const progress = clamp(p, 0, 1);
  if (progress === 0) return start;
  if (progress === 1) return target;
  return start + (target - start) * progress;
}

/**
 * Whether the visitor's device is pointer-capable (R5.6, R5.7).
 *
 * Pure adapter over a media-query-like result so a hook can pass
 * `matchMedia('(pointer: fine)')` (an object with a `matches` field) or a
 * plain boolean. Returns true only when the device reports a fine pointer.
 */
export function isPointerCapable(query: PointerCapabilityQuery): boolean {
  if (typeof query === "boolean") return query;
  return query.matches === true;
}
