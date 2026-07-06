import { useMemo, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { projects } from "@/data/projects";
import type { Project } from "@/data/types";
import ProjectDetailModal from "./ProjectDetailModal";

/**
 * CoastalWork is the "Selected Work" case-study showcase (R1.4). It is a
 * lightweight, editorial index into the flagship projects only — filtered to
 * `featured` and ordered by `featureOrder` — and never re-renders the full
 * project grid (that lives in CoastalCases, R1.5). Each large card opens the
 * shared ProjectDetailModal with the project's rich case-study `detail`.
 */

// Flagship projects only, in curated order (featureOrder ascending).
const featuredProjects: Project[] = projects
  .filter((p) => p.featured)
  .sort((a, b) => (a.featureOrder ?? 0) - (b.featureOrder ?? 0));

const CoastalWork = () => {
  const { ref, isVisible } = useScrollReveal();

  // Detail-modal state: which flagship case study is open (R1.4).
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const cards = useMemo(
    () =>
      featuredProjects.map((project, i) => ({
        project,
        num: String(i + 1).padStart(2, "0"),
      })),
    []
  );

  const openCaseStudy = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <section id="work" ref={ref} className="py-24 px-8 md:px-20 bg-[#F6F2EE] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section header — Coastal editorial styling */}
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div
            className={`w-[3px] h-14 bg-accent-1 mb-8 origin-top transition-transform duration-600 ease-custom ${
              isVisible ? "scale-y-100" : "scale-y-0"
            }`}
          />
          <p
            className={`font-mono text-[11px] tracking-[0.14em] text-accent-2 uppercase mb-5 stagger-in ${
              isVisible ? "is-in" : ""
            }`}
          >
            Applied AI Projects
          </p>
          <h2
            className={`font-display italic font-bold text-[40px] md:text-[64px] leading-[1.05] text-[#1C2B36] mb-6 reveal-text ${
              isVisible ? "is-in" : ""
            }`}
          >
            Selected Work
          </h2>
          <p
            className={`text-[16px] md:text-[18px] text-muted leading-[1.6] stagger-in ${
              isVisible ? "is-in" : ""
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            A handful of flagship builds — from real-time computer vision and
            generative models to LLM and RAG systems. Open any card for the full
            case study.
          </p>
        </div>

        {/* Flagship case-study cards — large, editorial, one column on mobile */}
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 list-none p-0 m-0">
          {cards.map(({ project, num }, i) => (
            <li key={project.id} className="flex">
              <button
                type="button"
                onClick={() => openCaseStudy(project)}
                aria-label={`View case study: ${project.name}`}
                className={`group relative flex w-full flex-col text-left bg-white border-t-4 border-accent-1 p-8 md:p-10 min-h-[44px] cursor-pointer transition-all duration-500 hover:shadow-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1 outline-none stagger-in ${
                  isVisible ? "is-in" : ""
                }`}
                style={{ transitionDelay: `${300 + (i % 2) * 120}ms` }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-accent-2 uppercase">
                    {project.category}
                  </p>
                  <span className="font-mono text-[40px] leading-none font-display italic font-black text-[#1C2B36]/10 group-hover:text-accent-1/25 transition-colors duration-300">
                    {num}
                  </span>
                </div>

                <h3 className="font-display italic font-bold text-[26px] md:text-[30px] leading-[1.12] text-[#1C2B36] group-hover:text-accent-1 transition-colors duration-300 mb-4">
                  {project.name}
                </h3>

                <p className="text-[14px] md:text-[15px] text-muted leading-[1.6] mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#1C2B36]/70 bg-[#E3EBF0] px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <span className="mt-auto inline-flex items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-accent-1 uppercase">
                  View Case Study
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>

                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-1 group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA into the full Projects section (R1.4) */}
        <div className="mt-16 md:mt-20 flex flex-wrap items-baseline justify-between gap-4">
          <a
            href="#cases"
            className={`inline-flex min-h-[44px] items-center w-fit font-body font-medium text-[14px] tracking-[0.06em] text-accent-1 uppercase border-b-[1.5px] border-accent-1 pb-1 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-1 stagger-in ${
              isVisible ? "is-in" : ""
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            View All Projects →
          </a>
          <span
            className={`font-mono text-[11px] tracking-[0.12em] text-muted uppercase stagger-in ${
              isVisible ? "is-in" : ""
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {projects.length} Projects Shipped
          </span>
        </div>
      </div>

      <ProjectDetailModal project={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
};

export default CoastalWork;
