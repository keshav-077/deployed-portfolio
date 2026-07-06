// Pure category enumeration and filtering for the Projects section.
// Framework-free helpers consumed by CoastalCases and its filter control.
// See design.md "New logic modules" and Correctness Properties 10, 11, 12.
// Validates: Requirements 3.6, 3.7, 3.8, 3.9

import type { Category, Project } from '@/data/types';

/**
 * Return each distinct Category present in `projects` exactly once, in order of
 * first appearance. No category present in the dataset is omitted, and no
 * category absent from the dataset is introduced.
 *
 * Validates: Requirements 3.6 (Property 10)
 */
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

/**
 * Filter `projects` by `category`. The `'all'` sentinel returns the full
 * dataset (identity over contents); any other value returns exactly the
 * projects whose category equals it — every match is included and nothing else.
 *
 * Validates: Requirements 3.7, 3.8, 3.9 (Properties 11, 12)
 */
export function filterByCategory(
  projects: Project[],
  category: Category | 'all',
): Project[] {
  if (category === 'all') {
    // Identity case: the full dataset, in original order.
    return projects.slice();
  }
  return projects.filter((project) => project.category === category);
}
