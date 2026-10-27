import { ExternalLink, Github } from 'lucide-react';
import { useGitHubRepo } from '@/hooks/useGitHubRepo';
import type { Project } from '@/data/types';
import ProjectPreview from './ProjectPreview';

type ProjectGridCardProps = {
  project: Project;
  onOpenDetail: (project: Project) => void;
  priority?: boolean;
};

const ProjectGridCard = ({ project, onOpenDetail, priority = false }: ProjectGridCardProps) => {
  const { data } = useGitHubRepo(project.githubUrl);
  const tags = (project.tags ?? []).slice(0, 3);
  const techLine = project.techStack.slice(0, 5).join(' · ');

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-sm border border-[#1C2B36]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-1/40 hover:shadow-lg"
    >
      <div className="border-t-[3px] border-accent-1">
        <ProjectPreview
          previewSrc={project.previewSrc ?? `/projects/${project.id}/preview.jpg`}
          previewPoster={project.previewPoster ?? `/projects/${project.id}/poster.jpg`}
          previewVideo={project.previewVideo}
          alt={`Preview for ${project.name}`}
          className="rounded-none border-0 border-b border-[#1C2B36]/10"
          priority={priority}
        />
      </div>

      <div className="flex flex-1 flex-col p-4 md:p-5">
        <h3 className="font-display text-lg font-semibold italic leading-snug text-[#1C2B36] group-hover:text-accent-1 transition-colors">
          <button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="text-left outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
          >
            {project.name}
          </button>
        </h3>

        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">
          {project.description}
        </p>

        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] tracking-[0.06em] uppercase text-accent-2 bg-accent-2/10 px-2 py-0.5"
              >
                {tag.length > 28 ? `${tag.slice(0, 26)}…` : tag}
              </span>
            ))}
          </div>
        )}

        <p className="mt-3 truncate font-mono text-[10px] tracking-wide text-[#1C2B36]/60">
          {techLine}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2 pt-1">
          {project.liveUrl && project.liveVerified && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 bg-accent-1 px-3 py-2 font-mono text-[10px] tracking-[0.1em] uppercase text-white transition-colors hover:bg-accent-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
            >
              Live Demo
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository for ${project.name}`}
              className="inline-flex min-h-[40px] items-center gap-1.5 border border-[#1C2B36]/20 px-3 py-2 font-mono text-[10px] tracking-[0.1em] uppercase text-[#1C2B36] transition-colors hover:border-accent-1 hover:text-accent-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
            >
              <Github className="h-4 w-4" aria-hidden />
              GitHub
            </a>
          )}
          <button
            type="button"
            onClick={() => onOpenDetail(project)}
            className="ml-auto font-mono text-[10px] tracking-[0.1em] uppercase text-accent-2 hover:text-accent-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
          >
            Details
          </button>
          {data?.isPublic && (
            <span className="font-mono text-[9px] uppercase text-muted">Open source</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectGridCard;
