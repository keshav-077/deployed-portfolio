import { useEffect, useState } from "react";

import { computeActiveSection, type SectionOffset } from "@/lib/animationMath";

/**
 * useActiveSection — id of the section currently in view for navbar
 * indication (R5.4).
 *
 * Resolves each id's live DOM offset (`getElementById(id).offsetTop`), builds a
 * `SectionOffset[]`, and delegates to the pure `computeActiveSection` using the
 * current scroll position. Recomputes on `scroll`/`resize` with passive
 * listeners and cleans up on unmount. SSR-safe: returns the first id (or an
 * empty string) when there is no browser environment.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  // Stable dependency key so the effect re-subscribes when the id list changes.
  const idsKey = sectionIds.join("|");

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const update = () => {
      const offsets: SectionOffset[] = sectionIds.reduce<SectionOffset[]>(
        (acc, id) => {
          const el = document.getElementById(id);
          if (el) {
            acc.push({ id, offset: el.offsetTop });
          }
          return acc;
        },
        []
      );
      const scrollPosition = window.scrollY ?? document.documentElement.scrollTop;
      setActiveId(computeActiveSection(offsets, scrollPosition));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idsKey]);

  return activeId;
}
