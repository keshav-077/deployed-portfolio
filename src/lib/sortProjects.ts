import type { Project } from '@/data/types';
import { displayOrderFor } from '@/data/projectDisplayOrder';

/** User tier order (displayOrder), then name. */
export function sortProjectsForDisplay(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => {
    const ao = a.displayOrder ?? displayOrderFor(a.id);
    const bo = b.displayOrder ?? displayOrderFor(b.id);
    if (ao !== bo) return ao - bo;
    return a.name.localeCompare(b.name);
  });
}
