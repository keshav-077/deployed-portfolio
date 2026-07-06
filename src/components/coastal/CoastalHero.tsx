import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Coastal Hero — Owner introduction (R4.1–R4.10).
// Preserves the Coastal visual language (deep navy stage, background video,
// Fraunces display italic, DM Mono accents) while rendering real profile
// content. The intro animation is gated by prefers-reduced-motion and animates
// only transform/opacity (R4.8, R4.10, R5.12).

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const CoastalHero = () => {
  const reducedMotion = useReducedMotion();
  const [resumeError, setResumeError] = useState(false);
  // If the portrait fails to load (e.g. public/profile.jpg not yet present),
  // hide it so no broken-image icon is shown (R4.9, graceful degradation).
  const [imageError, setImageError] = useState(false);

  // Attempt to fetch and download the resume PDF. On any retrieval failure,
  // surface an inline "resume unavailable" message and stay on the current
  // view — never navigate away (R4.4, R4.5).
  const handleResumeDownload = async () => {
    setResumeError(false);
    try {
      const response = await fetch(profile.resumePath, { method: "GET" });
      if (!response.ok) {
        throw new Error(`Resume request failed with status ${response.status}`);
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = profile.resumePath.split("/").pop() ?? "resume.pdf";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(objectUrl);
    } catch {
      setResumeError(true);
    }
  };

  // When reduced motion is preferred, render the final static state immediately
  // (initial === final), so content is fully visible within 100ms (R4.10).
  const initial = reducedMotion ? "visible" : "hidden";

  return (
    <section
      id="home"
      className="hero relative w-full min-h-screen overflow-hidden bg-[#1C2B36]"
    >
      {/* Background video — Coastal visual signature */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          poster="https://kombai-assets-dev.b-cdn.net/generated_assets/7_landing_page_for_a_coastal_bold_design_studio/assets/hero.png"
        >
          <source
            src="https://kombai-assets-dev.b-cdn.net/generated_assets/7_landing_page_for_a_coastal_bold_design_studio/assets/hero.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-overlay absolute inset-0 bg-gradient-to-b from-[rgba(28,43,54,0.7)] via-[rgba(28,43,54,0.45)] to-[rgba(28,43,54,0.85)]" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-end p-8 md:p-20 max-w-7xl mx-auto w-full pb-20 md:pb-24">
        <div className="w-full">
          <motion.div
            variants={containerVariants}
            initial={initial}
            animate="visible"
          >
            {/* Small professional portrait + availability badge. The avatar is a
                subtle circular headshot (~64px) that blends into the intro
                without dominating the layout or covering the animation (R4.9).
                It degrades gracefully: on load failure it is hidden via onError. */}
            <motion.div variants={itemVariants} className="mb-6 flex items-center gap-4">
              {profile.profileImage && !imageError && (
                <img
                  src={profile.profileImage}
                  alt={`Portrait of ${profile.name}`}
                  onError={() => setImageError(true)}
                  className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-full object-cover border border-[rgba(246,242,238,0.35)] ring-2 ring-[rgba(246,242,238,0.12)] shadow-lg"
                />
              )}
              <span className="inline-flex items-center gap-2 border border-[rgba(246,242,238,0.35)] rounded-full px-4 py-[6px] font-mono text-[11px] tracking-[0.12em] text-accent-2 uppercase">
                <span className="w-2 h-2 rounded-full bg-accent-1" aria-hidden="true" />
                {profile.availability}
              </span>
            </motion.div>

            {/* Name (R4.1) */}
            <motion.h1
              variants={itemVariants}
              className="font-display italic font-black text-5xl md:text-7xl text-[#F6F2EE] leading-[1.0] mb-4"
            >
              {profile.name}
            </motion.h1>

            {/* Title (R4.1) */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-[12px] md:text-[13px] tracking-[0.14em] text-accent-1 uppercase mb-5"
            >
              {profile.title}
            </motion.p>

            {/* Headline (R4.1) */}
            <motion.p
              variants={itemVariants}
              className="font-display text-xl md:text-2xl text-[#F6F2EE] leading-[1.3] max-w-[640px] mb-4"
            >
              {profile.headline}
            </motion.p>

            {/* Intro / summary (R4.1) */}
            <motion.p
              variants={itemVariants}
              className="text-[14px] leading-[1.6] text-[rgba(246,242,238,0.82)] max-w-[560px] mb-8"
            >
              {profile.summary}
            </motion.p>

            {/* Primary actions: Resume download + Contact scroll (R4.4, R4.5, R4.6) */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-6">
              <button
                type="button"
                onClick={handleResumeDownload}
                className="inline-flex min-h-[44px] items-center gap-2 bg-accent-1 px-6 py-[12px] text-[13px] tracking-[0.06em] text-white uppercase font-medium hover:bg-accent-2 transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-2"
              >
                <Download size={16} aria-hidden="true" />
                Download Resume
              </button>

              <a
                href="#contact"
                className="inline-flex min-h-[44px] items-center gap-2 border-[1.5px] border-[rgba(255,255,255,0.5)] px-6 py-[11px] text-[13px] tracking-[0.06em] text-white uppercase font-medium hover:bg-[rgba(255,255,255,0.1)] hover:border-white transition-all duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
              >
                <ArrowDown size={16} aria-hidden="true" />
                Get in Touch
              </a>
            </motion.div>

            {/* Inline resume-unavailable message (R4.5) — stays on view */}
            {resumeError && (
              <motion.p
                variants={itemVariants}
                role="alert"
                className="font-mono text-[12px] tracking-[0.04em] text-accent-2 mb-6"
              >
                Resume is currently unavailable. Please try again later or reach out via email.
              </motion.p>
            )}

            {/* Social + email links (R4.2, R4.3) */}
            <motion.div variants={itemVariants} className="flex items-center gap-1 -ml-2.5">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-[rgba(246,242,238,0.75)] hover:text-accent-1 transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
              >
                <Github size={20} aria-hidden="true" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-[rgba(246,242,238,0.75)] hover:text-accent-1 transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
              >
                <Linkedin size={20} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-[rgba(246,242,238,0.75)] hover:text-accent-1 transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
              >
                <Mail size={20} aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CoastalHero;
