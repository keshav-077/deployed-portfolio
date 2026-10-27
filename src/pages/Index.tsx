import { Suspense, lazy, useEffect, type ReactNode } from "react";
import Lenis from "lenis";

// Above-the-fold sections load eagerly so first paint has no Suspense gap.
import CoastalNavbar from "@/components/coastal/CoastalNavbar";
import CoastalHero from "@/components/coastal/CoastalHero";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import CustomCursor from "@/components/ui/CustomCursor";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Below-the-fold sections are code-split with React.lazy so their code is
// fetched as separate on-demand chunks rather than bloating the initial bundle
// (R9.3). Each import() boundary becomes its own chunk.
const CoastalManifesto = lazy(() => import("@/components/coastal/CoastalManifesto"));
const CoastalCases = lazy(() => import("@/components/coastal/CoastalCases"));
const CoastalExperience = lazy(() => import("@/components/coastal/CoastalExperience"));
const CoastalSkills = lazy(() => import("@/components/coastal/CoastalSkills"));
const CoastalEducation = lazy(() => import("@/components/coastal/CoastalEducation"));
const CoastalCertifications = lazy(() => import("@/components/coastal/CoastalCertifications"));
const CoastalPublications = lazy(() => import("@/components/coastal/CoastalPublications"));
const CoastalAchievements = lazy(() => import("@/components/coastal/CoastalAchievements"));
const CoastalContact = lazy(() => import("@/components/coastal/CoastalContact"));
const CoastalFooter = lazy(() => import("@/components/coastal/CoastalFooter"));

/**
 * Wraps a lazily-loaded section in a Suspense boundary whose fallback reserves
 * vertical space. Reserving height keeps cumulative layout shift low while a
 * section chunk is in flight (R9.5, R9.8): the placeholder occupies roughly the
 * same footprint as the loaded section, so content below does not jump.
 */
const LazySection = ({
  children,
  minHeight = "60vh",
}: {
  children: ReactNode;
  minHeight?: string;
}) => (
  <Suspense fallback={<div aria-hidden="true" style={{ minHeight }} />}>
    {children}
  </Suspense>
);

const Index = () => {
  const prefersReducedMotion = useReducedMotion();

  // Initialize Lenis once at the layout level for smooth in-page anchor
  // navigation (R5.10). When reduced motion is enabled, we do NOT start Lenis
  // smooth scrolling — native/instant scrolling is preserved (R5.11). SSR-safe:
  // the effect only runs in the browser.
  useEffect(() => {
    // Guard for SSR / non-browser environments.
    if (typeof window === "undefined") {
      return;
    }

    // Under reduced motion, skip Lenis entirely so anchor navigation and
    // scrolling behave instantly using the browser's native behavior (R5.11).
    if (prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      // Let Lenis intercept in-page anchor links for smooth scrolling (R5.10).
      anchors: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-[#F6F2EE] selection:bg-accent-1 selection:text-white">
      {/* Decorative animated background sits behind all content (fixed, -z-10). */}
      <AnimatedBackground />
      {/* Fixed overlays: scroll progress indicator and pointer-only custom cursor. */}
      <ScrollProgressBar />
      <CustomCursor />
      <CoastalNavbar />
      <main>
        <CoastalHero />
        <LazySection>
          <CoastalManifesto />
        </LazySection>
        <LazySection>
          <CoastalExperience />
        </LazySection>
        <LazySection>
          <CoastalEducation />
        </LazySection>
        <LazySection minHeight="100vh">
          <CoastalCases />
        </LazySection>
        <LazySection minHeight="40vh">
          <CoastalPublications />
        </LazySection>
        <LazySection>
          <CoastalSkills />
        </LazySection>
        <LazySection minHeight="40vh">
          <CoastalAchievements />
        </LazySection>
        <LazySection>
          <CoastalCertifications />
        </LazySection>
        <LazySection>
          <CoastalContact />
        </LazySection>
      </main>
      <LazySection minHeight="30vh">
        <CoastalFooter />
      </LazySection>
    </div>
  );
};

export default Index;
