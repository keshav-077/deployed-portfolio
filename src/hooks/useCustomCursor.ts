import { useEffect, useState } from "react";

import { isPointerCapable } from "@/lib/animationMath";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Fine-pointer media query used to detect pointer-capable devices (R5.6, R5.7). */
const POINTER_QUERY = "(pointer: fine)";

/**
 * useCustomCursor — pointer-capable-only custom cursor state (R5.6, R5.7, R5.11).
 *
 * `enabled` is true if and only if the device is pointer-capable
 * (`matchMedia('(pointer: fine)')`), so touch-only devices retain the native
 * pointer and never render the custom cursor. While enabled and reduced motion
 * is off, the hook tracks the pointer position via a `mousemove` listener. When
 * reduced motion is on, cursor motion is disabled and the position is not
 * updated. SSR-safe: guards `window`/`matchMedia` and cleans up its listeners.
 */
export function useCustomCursor(): {
  enabled: boolean;
  position: { x: number; y: number };
} {
  const prefersReducedMotion = useReducedMotion();

  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return isPointerCapable(window.matchMedia(POINTER_QUERY));
  });

  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Track pointer-capability changes (e.g. attaching/detaching a mouse).
  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(POINTER_QUERY);
    const onChange = () => setEnabled(isPointerCapable(mql));
    setEnabled(isPointerCapable(mql));
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Follow the pointer only on pointer-capable devices with motion allowed.
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    // Reduced motion disables follower motion; touch-only devices never track (R5.11).
    if (!enabled || prefersReducedMotion) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [enabled, prefersReducedMotion]);

  return { enabled, position };
}
