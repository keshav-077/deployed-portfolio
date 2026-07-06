import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * AnimatedBackground — aurora / gradient-mesh treatment rendered behind all
 * content (R5.9). Fixed, sits at a low z-index, and never intercepts pointer
 * events. Decorative, so it is hidden from assistive technology.
 *
 * Only `transform` (x / y / scale) and `opacity` are animated, satisfying
 * R5.12. The static blur `filter` is applied once and is never animated.
 *
 * When `prefers-reduced-motion` is enabled, a static (non-animating) version of
 * the same mesh is rendered so the visual is preserved without motion (R5.11).
 */
export function AnimatedBackground() {
  const reducedMotion = useReducedMotion();

  // Each blob is a soft radial gradient drawn from the Coastal palette. Motion
  // is expressed purely through transform (x/y/scale) and opacity.
  const blobs = [
    {
      color: "rgba(45, 138, 158, 0.45)", // accent-2 (teal)
      className: "left-[-10%] top-[-10%] h-[45vmax] w-[45vmax]",
      animate: {
        x: [0, 60, -30, 0],
        y: [0, 40, 80, 0],
        scale: [1, 1.15, 0.95, 1],
        opacity: [0.5, 0.7, 0.55, 0.5],
      },
      duration: 26,
    },
    {
      color: "rgba(200, 70, 42, 0.4)", // accent-1 (coral)
      className: "right-[-15%] top-[10%] h-[40vmax] w-[40vmax]",
      animate: {
        x: [0, -50, 30, 0],
        y: [0, 60, -20, 0],
        scale: [1, 0.9, 1.1, 1],
        opacity: [0.45, 0.6, 0.5, 0.45],
      },
      duration: 32,
    },
    {
      color: "rgba(97, 122, 138, 0.4)", // muted slate
      className: "bottom-[-15%] left-[20%] h-[50vmax] w-[50vmax]",
      animate: {
        x: [0, 40, -40, 0],
        y: [0, -40, 20, 0],
        scale: [1, 1.1, 0.95, 1],
        opacity: [0.4, 0.55, 0.45, 0.4],
      },
      duration: 38,
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {blobs.map((blob, i) => {
        const base = {
          background: `radial-gradient(circle at center, ${blob.color} 0%, transparent 70%)`,
        };

        if (reducedMotion) {
          // Static final-state mesh: no animation, content preserved (R5.11).
          return (
            <div
              key={i}
              className={`absolute rounded-full blur-[80px] ${blob.className}`}
              style={{ ...base, opacity: blob.animate.opacity[0] }}
            />
          );
        }

        return (
          <motion.div
            key={i}
            className={`absolute rounded-full blur-[80px] ${blob.className}`}
            style={base}
            animate={blob.animate}
            transition={{
              duration: blob.duration,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

export default AnimatedBackground;
