import { useEffect, useState } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

/**
 * useReducedMotion — single source of truth for motion gating (R5.11, R8.6, R4.10).
 *
 * Wraps `matchMedia('(prefers-reduced-motion: reduce)')`, returns a boolean, and
 * subscribes to preference changes. SSR-safe: guards `window`/`matchMedia` so it
 * defaults to `false` (motion enabled) when no browser environment is present.
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }
    const mql = window.matchMedia(QUERY);
    const onChange = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };
    // Sync immediately in case the preference changed before subscription.
    setPrefersReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReduced;
}
