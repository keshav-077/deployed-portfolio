import { useCustomCursor } from "@/hooks/useCustomCursor";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

/**
 * CustomCursor — pointer-only glow/follower/magnetic cursor overlay (R5.6, R5.7, R5.11).
 *
 * Bound to {@link useCustomCursor}. On touch-only devices the hook reports
 * `enabled: false`, so this component renders nothing and the native pointer is
 * retained (R5.7). On pointer-capable devices it renders a fixed, non-interactive
 * follower positioned at the tracked pointer coordinates using a GPU-accelerated
 * `translate3d` transform only (R5.6).
 *
 * Motion gating (R5.11): the hook stops updating `position` while reduced motion
 * is enabled, and this component additionally omits the follow transition in that
 * case, so no transition-based cursor motion is applied. The overlay is
 * `aria-hidden` and `pointer-events-none` so it never interferes with the
 * accessibility tree or hit-testing.
 */
export function CustomCursor() {
  const { enabled, position } = useCustomCursor();
  const prefersReducedMotion = useReducedMotion();

  // Touch-only (or SSR) devices retain the native pointer — render nothing (R5.7).
  if (!enabled) {
    return null;
  }

  // GPU-accelerated positioning: transform (translate3d) only, centered on the pointer.
  const transform = `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      style={{
        transform,
        // Follow easing only when motion is allowed; no transition under reduced motion (R5.11).
        transition: prefersReducedMotion ? undefined : "transform 120ms ease-out",
        willChange: "transform",
      }}
    >
      {/* Outer glow / magnetic halo */}
      <div
        className={cn(
          "h-8 w-8 rounded-full",
          "bg-[#2D8A9E]/25 blur-[2px]",
          "ring-1 ring-[#2D8A9E]/40",
        )}
      />
      {/* Inner follower dot */}
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C8462A]" />
    </div>
  );
}

export default CustomCursor;
