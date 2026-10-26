import { projects } from '@/data/projects';
import { displayOrderFor, TIER1_FEATURED_IDS } from '@/data/projectDisplayOrder';
import { projectMeta, tagsForProject } from '@/data/projectMeta';
import type { Project } from '@/data/types';

/** Only these cards use animated GIF; others use static preview.jpg (no composed MP4). */
export const REPO_GIF_PREVIEW_IDS = new Set([
  'ledgeriq',
  'paperloom',
  'healthcare-assistant',
]);

export function enrichProject(project: Project): Project {
  const meta = projectMeta[project.id];
  const useGif = REPO_GIF_PREVIEW_IDS.has(project.id);
  const previewPoster = project.previewPoster ?? `/projects/${project.id}/poster.jpg`;
  const previewSrc = useGif
    ? (project.previewSrc ?? `/projects/${project.id}/preview.gif`)
    : `/projects/${project.id}/preview.jpg`;
  const previewVideo = undefined;
  const featured = TIER1_FEATURED_IDS.has(project.id);
  const featureOrder = featured ? displayOrderFor(project.id) : undefined;
  return {
    ...project,
    tags: project.tags ?? tagsForProject(project.id, project.category),
    previewSrc,
    previewPoster,
    previewVideo,
    displayOrder: project.displayOrder ?? displayOrderFor(project.id),
    featured,
    featureOrder,
    previewSource: useGif
      ? 'repo'
      : (project.previewSource ?? meta?.previewSource ?? 'generated'),
    liveVerified: project.liveVerified ?? meta?.liveVerified,
  };
}

export const displayProjects: Project[] = projects.map(enrichProject);

export default displayProjects;
