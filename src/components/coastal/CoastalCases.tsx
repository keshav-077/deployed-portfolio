import { useMemo, useState } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { displayProjects } from '@/lib/enrichProjects';
import { distinctTags, filterByTag } from '@/lib/filterProjects';
import { sortProjectsForDisplay } from '@/lib/sortProjects';
import type { Project } from '@/data/types';
import ProjectDetailModal from './ProjectDetailModal';
import CategoryFilter from '@/components/portfolio/CategoryFilter';
import ProjectGridCard from '@/components/portfolio/ProjectGridCard';

const CoastalCases = () => {
  const { ref, isVisible } = useScrollReveal();
  const [selectedTag, setSelectedTag] = useState<string | 'all'>('all');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const tags = useMemo(() => distinctTags(displayProjects), []);
  const filters: Array<string | 'all'> = useMemo(() => ['all', ...tags], [tags]);

  const visible = useMemo(() => {
    let list = filterByTag(displayProjects, selectedTag);
    if (featuredOnly) {
      list = list.filter((p) => p.featured);
    }
    return sortProjectsForDisplay(list);
  }, [selectedTag, featuredOnly]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const openDetail = (project: Project) => {
    setSelectedProject(project);
    setDetailOpen(true);
  };

  return (
    <section id="cases" ref={ref} className="py-20 px-6 md:px-16 lg:px-20 bg-[#E3EBF0]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
          <h2
            className={`font-display italic font-bold text-4xl md:text-5xl text-[#1C2B36] reveal-text ${
              isVisible ? 'is-in' : ''
            }`}
          >
            Projects
          </h2>
          <span className="font-mono text-[11px] tracking-[0.12em] text-muted uppercase">
            Showing {visible.length} of {displayProjects.length} products
          </span>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-pressed={featuredOnly}
            onClick={() => setFeaturedOnly((v) => !v)}
            className={`inline-flex min-h-[40px] items-center font-mono text-[10px] tracking-[0.1em] uppercase px-3 py-1.5 border transition-colors duration-300 outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1 ${
              featuredOnly
                ? 'bg-accent-1 text-white border-accent-1'
                : 'bg-transparent text-[#1C2B36] border-[#1C2B36]/20 hover:border-accent-1 hover:text-accent-1'
            }`}
          >
            Featured only
          </button>
        </div>

        <CategoryFilter
          filters={filters}
          selected={selectedTag}
          onSelect={setSelectedTag}
          className={`mb-10 ${isVisible ? '' : ''}`}
        />

        {visible.length === 0 ? (
          <p className="font-mono text-sm text-muted">No projects match this filter.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {visible.map((project, index) => (
              <ProjectGridCard
                key={project.id}
                project={project}
                onOpenDetail={openDetail}
                priority={index < 4}
              />
            ))}
          </div>
        )}
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
