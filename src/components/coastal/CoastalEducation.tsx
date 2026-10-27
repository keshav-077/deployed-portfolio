import { useScrollReveal } from "@/hooks/useScrollReveal";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import { sortByDate } from "@/lib/sortByDate";
import OrgLogo from "./OrgLogo";

const CoastalEducation = () => {
  const { ref, isVisible } = useScrollReveal();

  // Reverse-chronological by start year so IIM Visakhapatnam (2026) is first (R2.4).
  const entries = sortByDate(education, (edu) => edu.startYear);

  return (
    <section id="education" ref={ref} className="py-24 px-8 md:px-20 bg-[#F6F2EE]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between items-baseline gap-4 mb-8">
          <h2 className={`font-display italic font-bold text-4xl md:text-6xl text-[#1C2B36] reveal-text ${isVisible ? 'is-in' : ''}`}>
            Academic
          </h2>
          <span className={`font-mono text-[11px] tracking-widest text-muted uppercase stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '250ms' }}>
            Foundations & Focus
          </span>
        </div>

        {profile.academicIntro ? (
          <p
            className={`max-w-3xl text-base md:text-lg text-muted leading-relaxed mb-20 stagger-in ${isVisible ? 'is-in' : ''}`}
            style={{ transitionDelay: '350ms' }}
          >
            {profile.academicIntro}
          </p>
        ) : null}

        {/* Vertical timeline rail */}
        <div className="relative border-l-2 border-accent-1/30 pl-6 md:pl-12 space-y-16">
          {entries.map((edu, i) => {
            const hasFocus = Boolean(edu.focus);
            const hasCoursework = Array.isArray(edu.coursework) && edu.coursework.length > 0;
            const hasHighlights = Array.isArray(edu.highlights) && edu.highlights.length > 0;
            const hasTech = Array.isArray(edu.technologies) && edu.technologies.length > 0;
            const hasAchievements = Array.isArray(edu.achievements) && edu.achievements.length > 0;

            return (
              <div
                key={edu.institution}
                className={`relative stagger-in ${isVisible ? 'is-in' : ''}`}
                style={{ transitionDelay: `${450 + i * 200}ms` }}
              >
                {/* Timeline node */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[31px] md:-left-[55px] top-2 h-3 w-3 rounded-full bg-accent-1 ring-4 ring-[#F6F2EE]"
                />

                <article className="bg-white/60 border border-[#1C2B36]/10 rounded-sm p-6 md:p-10 shadow-sm hover:shadow-md hover:border-accent-1/40 transition-all duration-500">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5 md:gap-7">
                    <OrgLogo
                      src={edu.logo}
                      label={edu.institution}
                      variant={edu.logoVariant ?? 'square'}
                    />

                    {/* Header block */}
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[11px] tracking-widest text-muted uppercase mb-2">
                        {edu.startYear} – {edu.endYear}
                      </p>
                      <h3 className="font-display font-semibold italic text-2xl md:text-3xl text-[#1C2B36] leading-tight mb-2 break-words">
                        {edu.program}
                      </h3>
                      <p className="font-mono text-[13px] text-accent-2 uppercase tracking-wide font-bold break-words">
                        {edu.institution}
                      </p>
                    </div>
                  </div>

                  {edu.description ? (
                    <p className="text-sm text-muted leading-relaxed mt-6 max-w-2xl">
                      {edu.description}
                    </p>
                  ) : null}

                  {hasFocus ? (
                    <div className="mt-6">
                      <p className="font-mono text-[10px] tracking-widest text-accent-1 uppercase mb-2">
                        Academic Focus
                      </p>
                      <p className="text-sm md:text-base text-[#1C2B36]/80 leading-relaxed max-w-2xl">
                        {edu.focus}
                      </p>
                    </div>
                  ) : null}

                  {hasHighlights ? (
                    <div className="mt-6">
                      <p className="font-mono text-[10px] tracking-widest text-accent-1 uppercase mb-3">
                        Key Learning Highlights
                      </p>
                      <ul className="space-y-2 max-w-2xl">
                        {edu.highlights!.map((h, j) => (
                          <li key={j} className="flex gap-3 text-sm text-[#1C2B36]/80 leading-relaxed">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-2" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {hasCoursework ? (
                    <div className="mt-6">
                      <p className="font-mono text-[10px] tracking-widest text-accent-1 uppercase mb-3">
                        Relevant Coursework
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.coursework!.map((c, j) => (
                          <span
                            key={j}
                            className="font-mono text-[11px] tracking-wide text-[#1C2B36]/70 border border-[#1C2B36]/15 rounded-full px-3 py-1"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {hasTech ? (
                    <div className="mt-6">
                      <p className="font-mono text-[10px] tracking-widest text-accent-1 uppercase mb-3">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.technologies!.map((t, j) => (
                          <span
                            key={j}
                            className="font-mono text-[11px] tracking-wide text-accent-2 bg-accent-2/10 border border-accent-2/20 rounded-full px-3 py-1"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {hasAchievements ? (
                    <div className="mt-6">
                      <p className="font-mono text-[10px] tracking-widest text-accent-1 uppercase mb-3">
                        Academic Achievements
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {edu.achievements!.map((a, j) => (
                          <span
                            key={j}
                            className="font-mono text-[11px] tracking-wide font-bold text-accent-1 bg-accent-1/10 border border-accent-1/25 rounded-sm px-3 py-1.5"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoastalEducation;
