import { motion, useSpring } from "framer-motion";
import { useEffect } from "react";

import { useScrollProgress } from "@/hooks/useScrollProgress";

/**
 * ScrollProgressBar — fixed top progress indicator bound to `useScrollProgress`
 * (R5.3). Reflects vertical scroll progress in [0, 1] by scaling on the X axis
 * (transform only, satisfying R5.12). Decorative, so it is hidden from
 * assistive technology (`aria-hidden`).
 *
 * The bar sits above page content and uses the Coastal accent palette
 * (accent-1 → accent-2 gradient). A light spring smooths the fill without
 * animating any non-GPU-accelerated property.
 */
export function ScrollProgressBar() {
  const progress = useScrollProgress();

  // Smooth the raw progress with a spring; `scaleX` is a transform, so this
  // stays GPU-accelerated (R5.12). transformOrigin is the left edge so the bar
  // grows left→right from 0 to full width.
  const scaleX = useSpring(progress, {
    stiffness: 140,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    scaleX.set(progress);
  }, [progress, scaleX]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[3px] w-full origin-left bg-gradient-to-r from-accent-1 to-accent-2"
      style={{ scaleX }}
    />
  );
}

export default ScrollProgressBar;
