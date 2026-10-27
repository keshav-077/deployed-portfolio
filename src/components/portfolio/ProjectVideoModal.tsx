import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import type { Project } from '@/data/types';

type ProjectVideoModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const ProjectVideoModal = ({ project, open, onOpenChange }: ProjectVideoModalProps) => {
  if (!project) return null;

  const mp4 = project.previewVideo ?? `/projects/${project.id}/preview.mp4`;
  const webm = project.previewWebm ?? `/projects/${project.id}/preview.webm`;
  const poster = project.previewPoster ?? `/projects/${project.id}/poster.jpg`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl border-[#1C2B36]/15 bg-[#F6F2EE] p-0 overflow-hidden">
        <DialogTitle className="sr-only">{project.name} preview</DialogTitle>
        <div className="aspect-video w-full bg-[#1C2B36]">
          <video
            controls
            autoPlay
            playsInline
            poster={poster}
            className="h-full w-full object-contain"
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
          </video>
        </div>
        <div className="p-4">
          <p className="font-display text-lg font-semibold text-[#1C2B36]">{project.name}</p>
          <p className="mt-1 text-sm text-[#617A8A]">{project.description}</p>
          {project.videoNotes && (
            <p className="mt-2 text-xs text-[#617A8A]">{project.videoNotes}</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectVideoModal;
