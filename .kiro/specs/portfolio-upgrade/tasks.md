# Implementation Plan: Portfolio Upgrade

## Overview

This plan converts the design into incremental, code-focused steps that evolve the existing React + TypeScript + Vite Coastal portfolio in place. The work proceeds bottom-up: first the typed data layer and pure logic modules (`src/lib/*`), then the hooks that adapt browser state, then the in-place modifications to the existing Coastal section components and new global UI overlays, then the serverless contact endpoint and SEO artifacts, and finally end-to-end wiring in the layout. Property-based tests (fast-check, minimum 100 iterations) validate the pure-logic correctness properties from the design; unit, edge-case, integration, and smoke tests cover the remaining behaviors. Every task references specific requirements and, where applicable, the design property it validates.

## Tasks

- [x] 1. Set up dependencies, data types, and content data modules
  - [x] 1.1 Install libraries and create shared data types
    - Add `framer-motion`, `lenis`, and `fast-check` (dev) to `package.json` and install
    - Create `src/data/types.ts` with `Category`, `Project`, `Experience`, `Education`, `SkillCategory`, `Certification`, `Publication`, `Achievement`, `Profile`, `GitHubRepoMeta`, `ContactFormValues`, `SendResult`, and `SeoConfig` per the design Data Models
    - _Requirements: 1.1, 1.2_

  - [x] 1.2 Create resume-derived content data modules
    - Create `src/data/profile.ts`, `src/data/experience.ts` (three roles), `src/data/education.ts` (two entries, IIM first), `src/data/skills.ts` (nine headings), `src/data/certifications.ts` (eight entries), `src/data/publications.ts` (IEEE 2026), and `src/data/achievements.ts` (Hackbyte 3.0, Workato)
    - Source every value only from the Resume_Source; omit fields not present rather than using placeholder text
    - _Requirements: 1.6, 1.7, 1.8, 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9_

  - [x] 1.3 Create the projects dataset
    - Create `src/data/projects.ts` with exactly 30 `Project` entries, each with non-empty `name`, `description`, `category`, and at least one `techStack` item; `githubUrl`/`liveUrl` present only when they exist in the Project_Dataset
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.10, 3.11_

  - [x] 1.4 Create the SEO config module
    - Create `src/data/seo.ts` exporting a `SeoConfig` value (canonical URL, OG/Twitter titles ≤60 chars, descriptions ≤160 chars, absolute image URLs, real Twitter handle, JSON-LD Person data) with no Lovable references
    - _Requirements: 7.1, 7.2, 7.3, 7.5, 7.6_

  - [ ]* 1.5 Write property test for placeholder-free content and metadata
    - **Property 1: No placeholder content in rendered data or metadata**
    - **Validates: Requirements 1.6, 7.6**

- [x] 2. Implement pure content-integrity and filtering logic
  - [x] 2.1 Implement date ordering and project filtering utilities
    - Create `src/lib/sortByDate.ts` with a reverse-chronological sort over dated entries and `src/lib/filterProjects.ts` with `distinctCategories` and `filterByCategory` (including the `'all'` identity case)
    - _Requirements: 2.3, 2.4, 3.6, 3.7, 3.8, 3.9_

  - [ ]* 2.2 Write property test for reverse-chronological ordering
    - **Property 2: Reverse-chronological ordering of dated entries**
    - **Validates: Requirements 2.3, 2.4**

  - [ ]* 2.3 Write property test for distinct category enumeration
    - **Property 10: Distinct category enumeration**
    - **Validates: Requirements 3.6**

  - [ ]* 2.4 Write property test for the "all" filter identity
    - **Property 11: "All" filter is the identity**
    - **Validates: Requirements 3.7, 3.9**

  - [ ]* 2.5 Write property test for category filter soundness and completeness
    - **Property 12: Category filter soundness and completeness**
    - **Validates: Requirements 3.8**

- [x] 3. Implement contact validation and rate-limit logic
  - [x] 3.1 Implement contact validation
    - Create `src/lib/validation.ts` with the Zod `contactSchema`, `validateContact` (name 1–100, email 1–254 with non-empty local part / single `@` / dotted domain, message 1–2000, returns offending field), and `isValidEmail`
    - _Requirements: 6.1, 6.6_

  - [x] 3.2 Implement rolling-window rate limiting
    - Create `src/lib/rateLimit.ts` with `isRateLimited` (>5 in trailing 10-minute window) and `recordSubmission` (prunes entries outside the window)
    - _Requirements: 6.8_

  - [ ]* 3.3 Write property test for contact validation soundness
    - **Property 19: Contact validation soundness**
    - **Validates: Requirements 6.1, 6.6**

  - [ ]* 3.4 Write property test for rolling-window rate limiting
    - **Property 21: Rolling-window rate limiting**
    - **Validates: Requirements 6.8**

- [x] 4. Implement GitHub mapping, date formatting, and SEO/contrast generators
  - [x] 4.1 Implement GitHub response mapping and date formatting
    - Create `src/lib/githubClient.ts` with `mapRepoResponse` (clamps star/fork counts to non-negative integers, normalizes topics/visibility) and `parseRepoUrl`; create `src/lib/formatDate.ts` with `formatUpdatedDate` (human-readable calendar date)
    - _Requirements: 10.1, 10.5_

  - [x] 4.2 Implement SEO metadata and contrast utilities
    - Create `src/lib/seoMeta.ts` generating OG/Twitter tag maps and the JSON-LD Person object from `SeoConfig`; create `src/lib/contrast.ts` computing WCAG contrast ratios for palette pairings
    - _Requirements: 7.1, 7.2, 7.3, 8.5_

  - [ ]* 4.3 Write property test for GitHub response mapping
    - **Property 26: GitHub response mapping normalizes counts and dates**
    - **Validates: Requirements 10.1**

  - [ ]* 4.4 Write property tests for SEO metadata and JSON-LD generation
    - **Property 22: SEO metadata generation constraints**
    - **Property 23: JSON-LD Person structured data validity**
    - **Validates: Requirements 7.1, 7.2, 7.3**

  - [ ]* 4.5 Write property test for palette contrast pairings
    - **Property 25: Palette color pairings meet WCAG AA contrast**
    - **Validates: Requirements 8.5**

- [x] 5. Implement pure animation math utilities
  - [x] 5.1 Implement scroll-progress, active-section, count-up, and cursor-capability math
    - Create `src/lib/animationMath.ts` with `computeScrollProgress` (clamped [0,1], monotonic), `computeActiveSection` (returns an id from the provided set), `countUpValue` (bounded, equals start at p=0 and target at p=1), and `isPointerCapable`
    - _Requirements: 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ]* 5.2 Write property test for scroll progress
    - **Property 14: Scroll progress is a clamped, monotonic mapping**
    - **Validates: Requirements 5.3**

  - [ ]* 5.3 Write property test for active section resolution
    - **Property 15: Active section is always a known section**
    - **Validates: Requirements 5.4**

  - [ ]* 5.4 Write property test for count-up bounds and termination
    - **Property 16: Count-up stays within bounds and terminates at the target**
    - **Validates: Requirements 5.5**

  - [ ]* 5.5 Write property test for custom cursor pointer capability
    - **Property 17: Custom cursor enabled exactly for pointer-capable devices**
    - **Validates: Requirements 5.6, 5.7**

- [x] 6. Checkpoint - Ensure all logic-layer tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement hooks that adapt browser state
  - [x] 7.1 Implement motion-gating and scroll/section hooks
    - Create `src/hooks/useReducedMotion.ts` (wraps `matchMedia('(prefers-reduced-motion: reduce)')`), `src/hooks/useScrollProgress.ts`, and `src/hooks/useActiveSection.ts` using the `src/lib/animationMath.ts` functions
    - _Requirements: 5.3, 5.4, 5.11, 8.6_

  - [x] 7.2 Implement count-up and custom-cursor hooks
    - Create `src/hooks/useCountUp.ts` (animates once when visible, respects reduced motion by returning the target) and `src/hooks/useCustomCursor.ts` (enabled only on pointer-capable devices, motion disabled under reduced motion)
    - _Requirements: 5.5, 5.6, 5.7, 5.11_

  - [ ]* 7.3 Write property test for reduced-motion static resolution
    - **Property 18: Reduced motion yields static final state**
    - **Validates: Requirements 5.11, 8.6, 4.10**

  - [x] 7.4 Implement the email client transport
    - Create `src/lib/emailClient.ts` `sendContact` that posts to `/api/contact` with a 30s timeout, drops submissions whose honeypot field is non-empty before any network call, and returns a `SendResult`
    - _Requirements: 6.2, 6.5, 6.7_

  - [ ]* 7.5 Write property test for honeypot drop before transport
    - **Property 20: Honeypot submissions are dropped without contacting the email service**
    - **Validates: Requirements 6.7**

  - [x] 7.6 Implement the contact form hook
    - Create `src/hooks/useContactForm.ts` managing values/errors/status (`idle`/`submitting`/`success`/`error`/`rate_limited`), client-side validation, loading/duplicate-submission prevention, field clearing on success, and value retention on failure
    - _Requirements: 6.3, 6.4, 6.5, 6.6_

  - [x] 7.7 Implement the GitHub metadata hook
    - Create `src/hooks/useGitHubRepo.ts` using `@tanstack/react-query` with a 5s timeout and silent fallback to static `Project_Dataset` content on any failure (network, timeout, rate limit), never surfacing an error to the visitor
    - _Requirements: 10.2, 10.3_

  - [ ]* 7.8 Write unit tests for GitHub fallback behavior
    - **Property 27: GitHub failure falls back to static content silently**
    - **Validates: Requirements 10.3**

- [x] 8. Implement global animation UI primitives
  - [x] 8.1 Create scroll progress bar and animated background
    - Create `src/components/ui/ScrollProgressBar.tsx` bound to `useScrollProgress` and `src/components/ui/AnimatedBackground.tsx` (aurora/gradient-mesh) gated by `useReducedMotion`, animating transform/opacity only
    - _Requirements: 5.3, 5.9, 5.11, 5.12_

  - [x] 8.2 Create custom cursor overlay
    - Create `src/components/ui/CustomCursor.tsx` bound to `useCustomCursor` (glow/follower/magnetic on pointer devices, absent on touch, motion disabled under reduced motion)
    - _Requirements: 5.6, 5.7, 5.11_

- [x] 9. Update Navbar and Hero components in place
  - [x] 9.1 Update CoastalNavbar
    - Modify `src/components/coastal/CoastalNavbar.tsx`: Owner wordmark and real section links, fixed position with active-section indication via `useActiveSection`, `role="navigation"` + `aria-label`, and a mobile disclosure affordance (≥44px touch target) using the existing `Sheet`/`Drawer` primitive
    - _Requirements: 1.4, 5.4, 8.7, 11.1, 11.4, 11.5_

  - [x] 9.2 Update CoastalHero content and links
    - Modify `src/components/coastal/CoastalHero.tsx`: render name/title/headline/intro from `profile`, GitHub/LinkedIn/email links, `Resume_Button` download with inline "resume unavailable" fallback, contact scroll control, Availability_Badge, optional profile portrait treatment, and intro animation gated by reduced motion
    - _Requirements: 1.4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10_

  - [ ]* 9.3 Write property test for the availability badge
    - **Property 13: Availability badge shows exactly one allowed state**
    - **Validates: Requirements 4.7**

  - [ ]* 9.4 Write property test for safe external links
    - **Property 9: External links open safely in a new tab**
    - **Validates: Requirements 3.5, 4.3**

  - [ ]* 9.5 Write unit tests for Hero content and resume fallback
    - Assert name/title/links/resume button/contact control render; assert resume-unavailable error path stays on view
    - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6_

- [x] 10. Update resume-derived section components in place
  - [x] 10.1 Update Manifesto, Experience, Skills, Education
    - Modify `CoastalManifesto.tsx` (professional summary), `CoastalExperience.tsx` (employer/role/location/date range, reverse-chronological via `sortByDate`), `CoastalSkills.tsx` (nine headings + skills), and `CoastalEducation.tsx` (two entries, IIM first) to render from data modules with omitted optional fields rendering nothing
    - _Requirements: 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.9_

  - [x] 10.2 Update Certifications, Publications, Achievements
    - Modify `CoastalCertifications.tsx` (eight entries + issuer), `CoastalPublications.tsx` (IEEE 2026 title + venue), and `CoastalAchievements.tsx` (Hackbyte 3.0, Workato; remove non-resume entries) to render from data modules
    - _Requirements: 1.4, 2.6, 2.7, 2.8_

  - [ ]* 10.3 Write property test for experience rendering completeness
    - **Property 3: Experience rendering completeness**
    - **Validates: Requirements 2.2**

  - [ ]* 10.4 Write property test for skills rendering completeness
    - **Property 4: Skills rendering completeness**
    - **Validates: Requirements 2.5**

  - [ ]* 10.5 Write property test for certifications rendering completeness
    - **Property 5: Certifications rendering completeness**
    - **Validates: Requirements 2.6**

  - [ ]* 10.6 Write property test for omitted optional fields
    - **Property 6: Omitted optional fields render no placeholder**
    - **Validates: Requirements 2.9, 10.5**

  - [ ]* 10.7 Write unit tests for publications and achievements presence
    - Assert IEEE 2026 paper renders, Hackbyte/Workato render, and no Esports/studio content remains
    - _Requirements: 2.7, 2.8_

- [x] 11. Update the Projects section with filtering and GitHub badges
  - [x] 11.1 Render all projects with rich cards and category filter
    - Modify `src/components/coastal/CoastalCases.tsx` to render one card per project (name/description/category/tech stack) from `projects`, add a category filter control driven by `distinctCategories` (default "all", active-filter indication), and render repo/live links only when present with `target="_blank" rel="noopener noreferrer"`
    - _Requirements: 1.4, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11_

  - [x] 11.2 Wire GitHub metadata badges into project cards
    - Consume `useGitHubRepo` in the project cards to show language/updated date/topics/stars/forks and an open-source badge when public, falling back silently to static content; keep `CoastalWork.tsx` as a lightweight selected-work index linking into the projects section
    - _Requirements: 1.4, 1.5, 10.1, 10.2, 10.3, 10.4, 10.5_

  - [ ]* 11.3 Write property test for complete project rendering
    - **Property 7: All projects render with complete detail**
    - **Validates: Requirements 3.1, 3.2**

  - [ ]* 11.4 Write property test for optional project links
    - **Property 8: Optional project links mirror the data**
    - **Validates: Requirements 3.3, 3.4, 3.10, 3.11**

  - [ ]* 11.5 Write property test for the open-source badge
    - **Property 28: Open-source badge reflects repository visibility**
    - **Validates: Requirements 10.4**

- [x] 12. Checkpoint - Ensure all section and hook tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Implement the contact section and serverless endpoint
  - [x] 13.1 Update CoastalContact form UI
    - Modify `src/components/coastal/CoastalContact.tsx` to render name/email/message fields with per-field validation messages, a hidden honeypot field, loading state, success animation with field clearing, error state retaining values, and a Copy Email control confirming within 1s; wire to `useContactForm`
    - _Requirements: 1.4, 6.1, 6.3, 6.4, 6.5, 6.6, 6.7, 6.9_

  - [x] 13.2 Implement the /api/contact serverless function
    - Create `api/contact.ts` that drops honeypot submissions without calling Resend, re-validates server-side, enforces rate limiting via `rateLimit.ts`, and sends via Resend using `RESEND_API_KEY` from the environment; return structured JSON (`{ ok } | { error, field } | { rateLimited }`)
    - _Requirements: 6.2, 6.6, 6.7, 6.8, 6.10_

  - [ ]* 13.3 Write unit tests for the contact form lifecycle and copy-email
    - Test loading/success/error/rate-limited states, duplicate-submission prevention, value retention on failure, and clipboard confirmation
    - _Requirements: 6.3, 6.4, 6.5, 6.9_

  - [ ]* 13.4 Write integration test for endpoint delivery
    - Test `/api/contact` success and rate-limit paths with a mocked Resend client
    - _Requirements: 6.2, 6.8_

- [x] 14. Implement SEO artifacts and accessibility/responsiveness passes
  - [x] 14.1 Update index.html and static SEO files
    - Replace Lovable metadata in `index.html` using `seoMeta` output (OG, Twitter, JSON-LD Person, single canonical); create `public/sitemap.xml` and update `public/robots.txt` to reference it; retain remaining metadata if an image URL is unresolved
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [x] 14.2 Apply accessibility and responsiveness refinements across sections
    - Ensure keyboard reachability/focus indicators, alt text (empty for decorative), `aria-label`s on icon-only controls, single-column mobile layout with ≥44px touch targets, tablet adaptation, and no horizontal overflow from 320–1920px across all modified Coastal components
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 11.1, 11.2, 11.3, 11.6_

  - [x] 14.3 Apply performance optimizations
    - Add lazy loading with reserved layout space for below-fold images/sections (within 300px), responsive image assets, on-demand code splitting for non-critical sections, and `font-display: swap`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.8_

  - [ ]* 14.4 Write property test for accessible names
    - **Property 24: Accessible names for images and icon-only controls**
    - **Validates: Requirements 8.3, 8.4**

  - [ ]* 14.5 Write unit and edge-case tests for SEO artifacts and lazy loading
    - Test canonical/sitemap/robots presence, unresolved-image retention, and lazy-load/font-swap attributes
    - _Requirements: 7.4, 7.5, 7.7, 9.1, 9.4, 9.8_

- [x] 15. Wire global overlays and finalize composition
  - [x] 15.1 Compose overlays and smooth scrolling in the layout
    - Mount `ScrollProgressBar`, `CustomCursor`, and `AnimatedBackground` around `<main>` in `src/pages/Index.tsx` without adding routes; initialize Lenis once at the layout level (instant scroll under reduced motion) for in-page anchor navigation
    - _Requirements: 1.1, 1.2, 5.3, 5.6, 5.9, 5.10, 5.11_

  - [x] 15.2 Update the footer and remove the duplicate contact anchor
    - Modify `src/components/coastal/CoastalFooter.tsx` with Owner branding and real links, and remove the duplicate `id="contact"` so the Contact section owns that anchor
    - _Requirements: 1.4, 1.5_

  - [ ]* 15.3 Write smoke tests for composition and secret hygiene
    - Test single-route composition, no duplicate section components, design-token snapshot, no client-shipped secret, and code-split chunk presence
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.10, 9.3_

- [x] 16. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional test tasks and can be skipped for a faster MVP; core implementation tasks are never optional.
- Each task references specific requirements clauses for traceability, and each property test task references its design property number.
- Property tests use `fast-check` with Vitest at a minimum of 100 iterations each and cover the pure logic layer; unit, edge-case, integration, and smoke tests cover the remaining behaviors.
- Performance/Lighthouse/60fps/full-WCAG verification (R5.13, R9.6, R9.7, R8.5 conformance) requires manual tooling review beyond automated tests and is not a coding task here.
- Each task builds on previous ones: data and pure logic first, then hooks, then in-place component updates, then endpoint/SEO, then final wiring, so no code is left orphaned.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4"] },
    { "id": 2, "tasks": ["1.5", "2.1", "3.1", "3.2", "4.1", "4.2", "5.1"] },
    { "id": 3, "tasks": ["2.2", "2.3", "2.4", "2.5", "3.3", "3.4", "4.3", "4.4", "4.5", "5.2", "5.3", "5.4", "5.5"] },
    { "id": 4, "tasks": ["7.1", "7.2", "7.4", "7.6", "7.7"] },
    { "id": 5, "tasks": ["7.3", "7.5", "7.8", "8.1", "8.2"] },
    { "id": 6, "tasks": ["9.1", "9.2", "10.1", "10.2", "11.1"] },
    { "id": 7, "tasks": ["9.3", "9.4", "9.5", "10.3", "10.4", "10.5", "10.6", "10.7", "11.2"] },
    { "id": 8, "tasks": ["11.3", "11.4", "11.5", "13.1", "13.2", "14.1"] },
    { "id": 9, "tasks": ["13.3", "13.4", "14.2", "14.3", "15.1", "15.2"] },
    { "id": 10, "tasks": ["14.4", "14.5", "15.3"] }
  ]
}
```
