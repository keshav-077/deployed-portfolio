import { useEffect, useRef, useState } from "react";

import { countUpValue } from "@/lib/animationMath";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Default animation duration, kept inside the 1000–3000ms range required by R5.5. */
const DEFAULT_DURATION_MS = 2000;

/** Every count-up begins at zero and interpolates toward the target. */
const START_VALUE = 0;

/**
 * useCountUp — animates a numeric value once from 0 to `target` (R5.5, R5.11).
 *
 * When `enabled` is true (typically driven by an in-view observer) and reduced
 * motion is off, the value interpolates from 0 to `target` over `durationMs`
 * using `requestAnimationFrame` and the pure `countUpValue`. The animation runs
 * a single time. When reduced motion is enabled the hook resolves to `target`
 * immediately with no animation. SSR-safe: falls back to `target` when
 * `requestAnimationFrame` is unavailable. The rAF is cancelled on unmount.
 */
export function useCountUp(
  target: number,
  opts?: { durationMs?: number; enabled?: boolean }
): number {
  const durationMs = opts?.durationMs ?? DEFAULT_DURATION_MS;
  const enabled = opts?.enabled ?? true;
  const prefersReducedMotion = useReducedMotion();

  const [value, setValue] = useState<number>(() =>
    prefersReducedMotion ? target : START_VALUE
  );

  const frameRef = useRef<number | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    // Reduced motion: present the final value immediately, no animation (R5.11).
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    // Animate only once, and only when enabled/visible.
    if (!enabled || hasAnimatedRef.current) {
      return;
    }

    if (
      typeof window === "undefined" ||
      typeof window.requestAnimationFrame !== "function"
    ) {
      setValue(target);
      return;
    }

    hasAnimatedRef.current = true;
    const startTime =
      typeof performance !== "undefined" && typeof performance.now === "function"
        ? performance.now()
        : Date.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = durationMs <= 0 ? 1 : elapsed / durationMs;
      setValue(countUpValue(START_VALUE, target, progress));

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [target, durationMs, enabled, prefersReducedMotion]);

  return value;
}
