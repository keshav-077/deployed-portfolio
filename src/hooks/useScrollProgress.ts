import { useEffect, useState } from "react";

import { computeScrollProgress } from "@/lib/animationMath";

/**
 * useScrollProgress — vertical scroll progress in [0, 1] for the progress
 * indicator (R5.3).
 *
 * Reads `document.documentElement` scroll metrics and maps them through the
 * pure `computeScrollProgress`. Listens to `scroll`/`resize` with passive
 * listeners and cleans up on unmount. SSR-safe: returns 0 when there is no
 * browser environment.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const update = () => {
      const doc = document.documentElement;
      setProgress(
        computeScrollProgress(
          window.scrollY ?? doc.scrollTop,
          doc.scrollHeight,
          window.innerHeight ?? doc.clientHeight
        )
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return progress;
}
