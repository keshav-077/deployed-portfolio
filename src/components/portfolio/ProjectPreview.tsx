import { useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

type ProjectPreviewProps = {
  previewSrc: string;
  previewPoster: string;
  previewVideo?: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

const ProjectPreview = ({
  previewSrc,
  previewPoster,
  previewVideo,
  alt,
  className = '',
  priority = false,
}: ProjectPreviewProps) => {
  const reducedMotion = useReducedMotion();
  const [usePoster, setUsePoster] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const showVideo = Boolean(previewVideo) && !reducedMotion && !videoFailed && !usePoster;

  return (
    <div
      className={`relative aspect-video w-full overflow-hidden rounded-sm border border-[#1C2B36]/10 bg-[#E3EBF0] ${className}`}
    >
      {showVideo ? (
        <video
          key={previewVideo}
          src={previewVideo}
          poster={previewPoster}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          className="h-full w-full object-cover object-center bg-[#E3EBF0]"
          aria-label={alt}
          onError={() => setVideoFailed(true)}
        />
      ) : (
        <img
          key={usePoster || videoFailed ? previewPoster : previewSrc}
          src={reducedMotion || usePoster || videoFailed ? previewPoster : previewSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onError={() => {
            if (!usePoster && previewPoster !== previewSrc) {
              setUsePoster(true);
            }
          }}
          className="h-full w-full object-cover object-center bg-[#E3EBF0]"
        />
      )}
      {reducedMotion && (
        <span className="sr-only">Static preview; animation disabled for reduced motion.</span>
      )}
    </div>
  );
};

export default ProjectPreview;
