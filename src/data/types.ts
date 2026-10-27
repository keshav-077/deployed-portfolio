// Shared data types for the portfolio content layer.
// These types are the single source of truth for content shape across the app.
// See design.md "Data Models" for the authoritative definitions.

export type Category = string; // e.g. "Real-time Detection & Surveillance", "LLM & RAG Applications"

/**
 * Rich case-study detail for flagship ("Selected Work") projects, surfaced in a
 * detail modal. Optional: only featured projects populate it.
 */
export interface ProjectDetail {
  problem: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string;
  relatedTech: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: Category;
  techStack: string[];
  githubUrl?: string; // under github.com/keshav-077 when present (R3.3)
  liveUrl?: string; // present only when a deployment exists (R3.4, R3.10)
  featured?: boolean; // flagship project shown in the Selected Work showcase
  featureOrder?: number; // ordering within the Selected Work showcase (1 = first)
  /** Grid sort key (lower = earlier). From projectDisplayOrder.ts when unset. */
  displayOrder?: number;
  detail?: ProjectDetail; // rich case-study content for the detail modal
  /** Filter tags for the projects grid (multi-label). */
  tags?: string[];
  previewSrc?: string;
  previewPoster?: string;
  previewVideo?: string;
  previewSource?: 'repo' | 'generated' | 'local_video';
  liveVerified?: boolean;
}

export interface Experience {
  company: string; // Course5i | Infoteck Solutions | IIIT Nagpur
  role: string;
  location: string;
  startDate: string; // ISO or YYYY-MM for reverse-chronological sort (R2.3)
  endDate: string;
  bullets: string[];
  logo?: string;
  logoVariant?: 'square' | 'wide';
}

export interface Education {
  institution: string; // IIM Visakhapatnam | IIIT Nagpur
  program: string;
  startYear: number;
  endYear: number;
  description?: string;
  logo?: string; // optional institution logo asset path (omitted when unavailable)
  logoVariant?: 'square' | 'wide';
  focus?: string; // academic focus / specialization summary
  coursework?: string[]; // relevant coursework
  highlights?: string[]; // key learning highlights
  technologies?: string[]; // technologies learned
  achievements?: string[]; // academic achievements (optional)
}

export interface SkillCategory {
  title: string; // one of the nine resume headings (R2.5)
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: 'NVIDIA' | 'IBM' | 'Udemy';
} // eight entries (R2.6)

export interface Publication {
  title: string;
  venue: string;
  year: number;
  url?: string;
} // IEEE 2026 (R2.7)

export interface Achievement {
  title: string;
  badge: string;
  description?: string;
} // Hackbyte, Workato (R2.8)

export interface Profile {
  name: string;
  title: string; // "AI Engineer / Software Engineer"
  headline: string;
  summary: string; // professional summary (R2.1)
  availability: 'Available' | 'Open to opportunities' | 'Unavailable'; // (R4.7)
  email: string; // keshavardhan777@gmail.com
  githubUrl: string; // github.com/keshav-077
  linkedinUrl: string; // keshavardhan-m-9b8a22314
  resumePath: string; // /Keshavardhan_Makireddi.pdf
  profileImage?: string; // optional portrait (R4.9)
  academicIntro?: string; // short intro shown above the education timeline
}

export interface GitHubRepoMeta {
  language: string | null;
  updatedAt: string; // human-readable via formatUpdatedDate (R10.1)
  topics: string[]; // may be empty -> no topics list (R10.5)
  stars: number; // >= 0 (R10.1)
  forks: number; // >= 0 (R10.1)
  isPublic: boolean; // open-source badge (R10.4)
}

// Contact
export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot
}

export type SendResult =
  | { ok: true }
  | { ok: false; reason: 'validation' | 'rate_limited' | 'delivery' };

export interface SeoConfig {
  canonicalUrl: string; // single absolute canonical (R7.5)
  ogTitle: string; // <= 60 chars (R7.1)
  ogDescription: string; // <= 160 chars (R7.1)
  ogImage: string; // absolute (R7.1)
  twitterHandle: string; // replaces @Lovable (R7.6)
  twitterImage: string; // absolute (R7.2)
  person: { name: string; jobTitle: string; sameAs: string[] }; // JSON-LD Person (R7.3)
}
