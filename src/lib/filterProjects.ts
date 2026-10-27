// Category and tag filtering for the Projects section.

import type { Category, Project } from '@/data/types';

export function distinctCategories(projects: Project[]): Category[] {
  const seen = new Set<Category>();
  const result: Category[] = [];
  for (const project of projects) {
    if (!seen.has(project.category)) {
      seen.add(project.category);
      result.push(project.category);
    }
  }
  return result;
}

export function filterByCategory(
  projects: Project[],
  category: Category | 'all',
): Project[] {
  if (category === 'all') {
    return projects.slice();
  }
  return projects.filter((project) => project.category === category);
}

export function distinctTags(projects: Project[]): string[] {
  const set = new Set<string>();
  for (const p of projects) {
    for (const tag of p.tags ?? []) {
      set.add(tag);
    }
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

export function filterByTag(projects: Project[], tag: string | 'all'): Project[] {
  if (tag === 'all') {
    return projects.slice();
  }
  return projects.filter((p) => p.tags?.includes(tag));
}
