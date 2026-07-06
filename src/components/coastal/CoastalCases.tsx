import { useMemo, useState } from "react";
import { GitFork, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useGitHubRepo } from "@/hooks/useGitHubRepo";
import { projects } from "@/data/projects";
import { distinctCategories, filterByCategory } from "@/lib/filterProjects";
import type { Category, Project } from "@/data/types";
import ProjectDetailModal from "./ProjectDetailModal";

/**
 * A single project card. Extracted into its own component so each card can call
 * `useGitHubRepo` for its own repository — React hooks cannot be called in a loop
 * conditionally, so one component instance per project keeps hook order stable.
 *
 * Live metadata is purely additive: when the hook returns `data: null` (no repo
 * URL, still loading, or any failure/timeout/rate-limit), the card renders its
 * static Project_Dataset content with no error indication (R10.2, R10.3).
 */
const ProjectCard = ({
  project,
  isVisible,
  index,
  onOpenDetail,
}: {
  project: Project;
  isVisible: boolean;
  index: number;
  onOpenDetail: (project: Project) => void;
}) => {
  // Silent fallback contract: `data` is null while loading or on any failure,
  // and `isError` is intentionally not surfaced to the visitor (R10.3).
  const { data } = useGitHubRepo(project.githubUrl);

  return (
    <div
      className={`flex flex-col bg-white border-t-4 border-accent-1 group hover:shadow-2xl transition-all duration-500 stagger-in ${isVisible ? 'is-in' : ''}`}
      style={{ transitionDelay: `${400 + (index % 3) * 150}ms` }}
    >
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <p className="font-mono text-[11px] tracking-[0.12em] text-accent-2 uppercase">{project.category}</p>
          {/* Open-source badge shown iff the repository is public (R10.4) */}
          {data?.isPublic && (
            <span className="font-mono text-[10px] tracking-[0.08em] uppercase text-accent-1 border border-accent-1/40 px-2 py-0.5 whitespace-nowrap">
              Open Source
            </span>
          )}
        </div>
        <h3 className="font-display font-semibold italic text-[22px] leading-[1.2] text-[#1C2B36] mb-3">
          <button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="text-left w-full outline-none group-hover:text-accent-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
          >
            {project.name}
          </button>
        </h3>
        <p className="text-[14px] text-muted leading-[1.55] mb-6">{project.description}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#1C2B36]/70 bg-[#E3EBF0] px-2.5 py-1"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Live GitHub metadata (R10.1). Rendered only when the hook succeeds;
            otherwise the card silently keeps its static content (R10.2, R10.3). */}
        {data && (
          <div className="mb-6 pt-1 border-t border-[#1C2B36]/10">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-4 font-mono text-[11px] tracking-[0.06em] text-[#1C2B36]/70 uppercase">
              {data.language && (
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent-1" aria-hidden="true" />
                  {data.language}
                </span>
              )}
              <span className="inline-flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5" aria-hidden="true" />
                {data.stars}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <GitFork className="w-3.5 h-3.5" aria-hidden="true" />
                {data.forks}
              </span>
              <span className="normal-case tracking-normal text-muted">Updated {data.updatedAt}</span>
            </div>

            {/* Topics list only when non-empty — no empty placeholder (R10.5) */}
            {data.topics.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {data.topics.map((topic) => (
                  <span
                    key={topic}
                    className="font-mono text-[10px] tracking-[0.08em] lowercase text-accent-2 bg-accent-2/10 px-2 py-0.5"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-6 pt-2">
          <button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="font-mono text-[12px] tracking-[0.08em] text-accent-2 uppercase hover:text-accent-1 transition-colors inline-flex min-h-[44px] items-center gap-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
          >
            Details <span aria-hidden="true">+</span>
          </button>
          {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.08em] text-accent-2 uppercase hover:text-accent-1 transition-colors inline-flex min-h-[44px] items-center gap-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
              >
                Repository <span aria-hidden="true">↗</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] tracking-[0.08em] text-accent-2 uppercase hover:text-accent-1 transition-colors inline-flex min-h-[44px] items-center gap-2 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
              >
                Live <span aria-hidden="true">→</span>
              </a>
            )}
        </div>
      </div>
    </div>
  );
};

const CoastalCases = () => {
  const { ref, isVisible } = useScrollReveal();

  // Filter state: 'all' is the default on first load and after clearing (R3.7, R3.9).
  const [selected, setSelected] = useState<Category | "all">("all");

  // Distinct categories drive the filter control; 'all' is prepended (R3.6).
  const categories = useMemo(() => distinctCategories(projects), []);
  const visible = useMemo(() => filterByCategory(projects, selected), [selected]);

  const filters: Array<Category | "all"> = ["all", ...categories];

  // Project detail modal state. Any card can open the modal — projects without
  // a `detail` block still render description, tech stack, and links.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetail = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  return (
    <section id="cases" ref={ref} className="py-24 px-8 md:px-20 bg-[#E3EBF0]">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-baseline mb-12">
          <h2 className={`font-display italic font-bold text-4xl md:text-6xl text-[#1C2B36] reveal-text ${isVisible ? 'is-in' : ''}`}>
            Projects
          </h2>
          <span className={`font-mono text-[11px] tracking-[0.12em] text-muted uppercase stagger-in ${isVisible ? 'is-in' : ''}`} style={{ transitionDelay: '300ms' }}>
            {projects.length} Projects
          </span>
        </div>

        {/* Category filter control (R3.6–R3.9) */}
        <div
          className={`flex flex-wrap gap-3 mb-16 stagger-in ${isVisible ? 'is-in' : ''}`}
          style={{ transitionDelay: '350ms' }}
          role="group"
          aria-label="Filter projects by category"
        >
          {filters.map((filter) => {
            const isActive = filter === selected;
            const label = filter === "all" ? "All" : filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelected(filter)}
                aria-pressed={isActive}
                className={`inline-flex min-h-[44px] items-center font-mono text-[11px] tracking-[0.12em] uppercase px-4 py-2 border transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1 ${
                  isActive
                    ? 'bg-[#1C2B36] text-[#F6F2EE] border-[#1C2B36]'
                    : 'bg-transparent text-[#1C2B36] border-[#1C2B36]/20 hover:border-accent-1 hover:text-accent-1'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              isVisible={isVisible}
              index={i}
              onOpenDetail={openDetail}
            />
          ))}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </section>
  );
};

export default CoastalCases;
