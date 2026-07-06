import { Github, ExternalLink } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Project } from "@/data/types";

/**
 * ProjectDetailModal — premium case-study modal for a project.
 *
 * Renders the rich `detail` block (Problem, Solution, Architecture, Features,
 * Technologies, Challenges, Related Technologies) alongside repository and live
 * links. Used by the Selected Work showcase and the Projects grid. Sections
 * whose data is absent are omitted (no empty placeholders).
 */

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h4 className="font-mono text-[11px] tracking-[0.14em] text-accent-2 uppercase">{label}</h4>
    <div className="text-[14px] leading-[1.6] text-[#1C2B36]/80">{children}</div>
  </div>
);

const Chips = ({ items }: { items: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((item) => (
      <span
        key={item}
        className="font-mono text-[10px] tracking-[0.08em] uppercase text-[#1C2B36]/70 bg-[#E3EBF0] px-2.5 py-1"
      >
        {item}
      </span>
    ))}
  </div>
);

const ProjectDetailModal = ({ project, open, onOpenChange }: ProjectDetailModalProps) => {
  if (!project) return null;

  const detail = project.detail;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-lenis-prevent
        className="max-w-2xl max-h-[85vh] bg-[#F6F2EE] border-none flex flex-col"
      >
        <DialogHeader>
          <p className="font-mono text-[11px] tracking-[0.12em] text-accent-2 uppercase text-left">
            {project.category}
          </p>
          <DialogTitle className="font-display italic font-bold text-3xl md:text-4xl text-[#1C2B36] text-left leading-[1.1]">
            {project.name}
          </DialogTitle>
          <DialogDescription className="font-body text-[14px] leading-[1.6] text-[#1C2B36]/75 text-left">
            {project.description}
          </DialogDescription>
        </DialogHeader>

        <div 
          className="mt-4 space-y-6 overflow-y-auto overscroll-contain flex-1 pr-2 -mr-2 scroll-smooth"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            scrollbarGutter: 'stable'
          }}
        >
          {detail?.problem && <Section label="Problem Statement">{detail.problem}</Section>}
          {detail?.solution && <Section label="Solution">{detail.solution}</Section>}
          {detail?.architecture && <Section label="Architecture">{detail.architecture}</Section>}

          {detail?.features && detail.features.length > 0 && (
            <Section label="Features">
              <ul className="space-y-1.5">
                {detail.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-accent-1 mt-2.5 shrink-0" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          <Section label="Technologies">
            <Chips items={project.techStack} />
          </Section>

          {detail?.challenges && <Section label="Challenges">{detail.challenges}</Section>}

          {detail?.relatedTech && detail.relatedTech.length > 0 && (
            <Section label="Related Technologies">
              <Chips items={detail.relatedTech} />
            </Section>
          )}

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#1C2B36]/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-accent-1 uppercase hover:text-accent-2 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
                >
                  <Github size={16} aria-hidden="true" />
                  GitHub Repository
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[12px] tracking-[0.08em] text-accent-1 uppercase hover:text-accent-2 transition-colors outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-1"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDetailModal;
