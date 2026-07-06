import { useScrollReveal } from "@/hooks/useScrollReveal";
import { profile } from "@/data/profile";

// Large reveal wordmark derived from the Owner's name (R1.6). Rendered
// uppercase to mirror the original Coastal treatment while carrying the
// Owner's real identity instead of studio placeholder branding.
const wordmark = profile.name.toUpperCase();

// In-page anchors that mirror the section `id`s composed in `Index.tsx` and the
// `CoastalNavbar` items. The Contact section (`CoastalContact`) solely owns the
// `#contact` anchor — the footer intentionally carries no `id="contact"` (R1.4).
const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#home", label: "Home" },
  { href: "#manifesto", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#work", label: "Selected Work" },
  { href: "#cases", label: "Projects" },
  { href: "#publications", label: "Publications" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certifications", label: "Certifications" },
  { href: "#contact", label: "Contact" },
];

const currentYear = new Date().getFullYear();

const CoastalFooter = () => {
  const { ref, isVisible } = useScrollReveal(0);

  return (
    <footer id="footer" ref={ref} className="bg-[#1C2B36] text-[#F6F2EE] pt-32 pb-16 px-8 md:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Wordmark with Reveal Animation */}
        <div className="flex items-center gap-4 sm:gap-8 mb-10">
          <div className={`hidden sm:block flex-1 h-[2px] bg-accent-1 origin-right transition-transform duration-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
          <h2 className="font-display italic font-black text-[clamp(1.4rem,7vw,4.5rem)] tracking-tighter text-[#F6F2EE] flex flex-wrap justify-center overflow-hidden">
            {wordmark.split("").map((char, i) => (
              <span
                key={i}
                className={`transition-transform duration-700 ease-custom ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
          <div className={`hidden sm:block flex-1 h-[2px] bg-accent-1 origin-left transition-transform duration-1000 ${isVisible ? 'scale-x-100' : 'scale-x-0'}`} />
        </div>

        <p className={`font-mono text-center text-[12px] tracking-[0.14em] text-muted uppercase mb-24 stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '500ms' }}>
          {profile.title}
        </p>

        <div className="grid md:grid-cols-3 gap-16 border-t border-white/12 pt-16">
          <div className={`stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '700ms' }}>
            <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase mb-6">Get in touch</p>
            <h3 className="font-display italic font-bold text-xl mb-2 text-[#F6F2EE]">{profile.name}</h3>
            <a href={`mailto:${profile.email}`} className="inline-flex min-h-[44px] items-center rounded-sm text-accent-2 hover:text-accent-1 transition-colors text-sm outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1">
              {profile.email}
            </a>
          </div>

          <div className={`stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '800ms' }}>
            <p className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase mb-6">Navigate</p>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 font-body text-[15px] text-[rgba(246,242,238,0.65)]">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="inline-flex min-h-[44px] items-center rounded-sm hover:text-[#F6F2EE] transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className={`stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '900ms' }}>
            <p className="font-mono text-[12px] tracking-[0.1em] text-accent-1 uppercase mb-6">Elsewhere</p>
            <ul className="space-y-3 font-body text-[15px] text-[rgba(246,242,238,0.65)]">
              <li>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-sm hover:text-[#F6F2EE] transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center rounded-sm hover:text-[#F6F2EE] transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-white/8 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono text-[11px] text-muted tracking-[0.08em] uppercase">
            © {currentYear} {profile.name}. All rights reserved.
          </span>
          <span className="font-mono text-[11px] text-muted tracking-[0.08em] uppercase">
            {profile.availability}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default CoastalFooter;
