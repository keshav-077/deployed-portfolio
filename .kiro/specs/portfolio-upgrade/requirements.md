# Requirements Document

## Introduction

This feature upgrades and completes the existing React + TypeScript + Vite portfolio for Kesavardhan Makireddi (AI Engineer), located at `keshav-ai-portfolio`. The site is built on a "Coastal" component set (`src/components/coastal/*`), shadcn/ui primitives (`src/components/ui/*`), and Tailwind CSS, and is composed on a single page (`src/pages/Index.tsx`) driven by React Router.

This is an **upgrade, not a rebuild**. The existing template, folder structure, routing, component composition, design language (Coastal palette, Fraunces/DM Sans/DM Mono typography, section rhythm), and architecture are preserved. Every change is a natural evolution of the current template — a premium version of the same website, not a different one. Placeholder studio content (e.g., "Mizen Head Tourism Board", "Stand at the edge") is replaced with the owner's real content sourced only from the provided resume and project list. No content is fabricated beyond those sources.

The current animation system is CSS-transition based via the `useScrollReveal` hook and IntersectionObserver. `framer-motion` and a smooth-scroll library (Lenis) are **not currently installed**; where richer animation is required, this feature may introduce such a library as an additive evolution, provided existing motion patterns continue to work and the Coastal look is preserved.

The contact experience currently uses EmailJS (client-side). This feature hardens email delivery, adding either a Resend-backed serverless endpoint or a hardened EmailJS/Formspree path, with spam protection and rate limiting.

## Glossary

- **Portfolio**: The complete single-page React application at `keshav-ai-portfolio`, including all sections, routing, and assets.
- **Coastal_Component**: Any component under `src/components/coastal/*` that composes a section of the Portfolio.
- **Section**: A distinct content block rendered on the Index page (Hero, Work, Cases/Projects, Experience, Skills, Education, Certifications, Publications, Achievements, Contact, plus Navbar and Footer).
- **Owner**: Kesavardhan Makireddi, the subject of the Portfolio.
- **Visitor**: Any person viewing the Portfolio in a browser.
- **Resume_Source**: The provided resume content and the accompanying PDF at `public/Keshavardhan_Makireddi.pdf`.
- **Project_Dataset**: The structured list of the Owner's 30 projects, each with name, description, category, tech stack, GitHub repository URL, and optional live deployment URL.
- **Projects_Section**: The Coastal_Component that displays the Project_Dataset (`CoastalWork` and/or `CoastalCases`).
- **Category**: A grouping label applied to projects (e.g., "Real-time Detection & Surveillance", "LLM & RAG Applications").
- **Hero_Section**: The `CoastalHero` Coastal_Component at the top of the Portfolio.
- **Navbar**: The `CoastalNavbar` Coastal_Component providing site navigation.
- **Contact_Form**: The form within the `CoastalContact` Coastal_Component used to send messages to the Owner.
- **Email_Service**: The mechanism that delivers Contact_Form submissions to the Owner (Resend-backed serverless endpoint, or a hardened EmailJS/Formspree integration).
- **Animation_System**: The set of motion behaviors (reveal, stagger, scroll progress, counters, cursor, hover, backgrounds) applied across the Portfolio.
- **Reduced_Motion**: The browser-reported `prefers-reduced-motion: reduce` user preference.
- **Custom_Cursor**: The premium pointer follower (glow/magnetic) rendered on pointer-capable devices.
- **SEO_System**: The set of metadata, structured data, sitemap, robots, and canonical artifacts that describe the Portfolio to search engines and social platforms.
- **GitHub_Integration**: The feature that retrieves and displays repository metadata from GitHub for the Owner's repositories.
- **Resume_Button**: The Hero_Section control that downloads the Resume_Source PDF.
- **Availability_Badge**: The Hero_Section indicator showing the Owner's availability status.

## Requirements

### Requirement 1: Preserve Existing Template and Architecture

**User Story:** As the Owner, I want the upgrade to evolve the current template rather than replace it, so that the site keeps its established Coastal identity while becoming more complete and premium.

#### Acceptance Criteria

1. THE Portfolio SHALL retain the existing folder structure, the routing configuration in `src/App.tsx`, and the single-page composition in `src/pages/Index.tsx` without adding, removing, or renaming routes.
2. THE Portfolio SHALL render all Section content exclusively through the existing Coastal_Component set under `src/components/coastal/*`, without introducing new Section-rendering components outside that directory.
3. THE Portfolio SHALL preserve the existing Coastal design language, keeping the currently defined color palette values, the Fraunces, DM Sans, and DM Mono typefaces, and the existing section spacing values unchanged from their current definitions.
4. WHERE a Coastal_Component already renders a Section, THE Portfolio SHALL modify that existing component in place and SHALL NOT introduce a parallel or duplicate component that renders the same Section.
5. WHERE existing project data or components already contain the Owner's real content, THE Portfolio SHALL reuse that existing content and SHALL NOT create a second copy of the same content.
6. THE Portfolio SHALL replace all placeholder studio content with the Owner's real content sourced only from the Resume_Source and the Project_Dataset, retaining no placeholder studio content after the replacement.
7. IF content does not originate from the Resume_Source or the Project_Dataset, THEN THE Portfolio SHALL NOT include that content in any rendered Section.
8. IF the Resume_Source and the Project_Dataset provide conflicting values for the same content item, THEN THE Portfolio SHALL use the Project_Dataset value for project-related content and the Resume_Source value for all other content.

### Requirement 2: Complete Resume-Derived Content

**User Story:** As a Visitor, I want to read the Owner's full professional background, so that I can evaluate the Owner's experience, education, and skills.

#### Acceptance Criteria

1. THE Portfolio SHALL display, as visible content without requiring Visitor interaction, a professional summary describing the Owner as an AI Engineer, using only content present in the Resume_Source.
2. THE Portfolio SHALL display each of the three work experiences from the Resume_Source, including employer, role title, location, and date range: Course5i (AI Engineer Intern, Mumbai, Oct 2025–Apr 2026), Infoteck Solutions (Data Scientist Intern, Remote-UK, Oct 2024–Mar 2025), and IIIT Nagpur (ML Research Intern, Remote-India, May 2024–Jul 2024).
3. THE Portfolio SHALL order the displayed work experiences in reverse-chronological order by start date: Course5i, then Infoteck Solutions, then IIIT Nagpur.
4. THE Portfolio SHALL display each of the two education entries from the Resume_Source, including institution, program, and date range: IIM Visakhapatnam (MBA PGPMCI, 2026–2028) and IIIT Nagpur (B.Tech CSE AI&ML, 2022–2026), ordered reverse-chronologically with IIM Visakhapatnam first.
5. THE Portfolio SHALL display the Owner's skills grouped under the nine Resume_Source category headings — Programming Languages, AI/ML & Deep Learning, Computer Vision & NLP, Data Science & Analytics, Web & API Development, Cloud & Databases, DevOps & Tools, AI Automation & IDEs, and Accelerated Computing — with each heading rendered alongside every skill listed under it in the Resume_Source.
6. THE Portfolio SHALL display all eight certifications from the Resume_Source, each attributed to its issuer (Nvidia, IBM, or Udemy).
7. THE Portfolio SHALL display the Owner's publication from the Resume_Source, including the IEEE Xplore 2026 skin disease classification paper title and venue.
8. THE Portfolio SHALL display the Owner's achievements from the Resume_Source: Top 5 at Hackbyte 3.0 and Top 10 at the Workato AI Automation Hackathon.
9. WHERE a Resume_Source field is not provided for a displayed entry, THE Portfolio SHALL omit that field and SHALL NOT display placeholder characters or fabricated text in its place.

### Requirement 3: Projects Section Content and Interaction

**User Story:** As a Visitor, I want to browse all of the Owner's projects with rich detail and working links, so that I can explore the Owner's work in depth.

#### Acceptance Criteria

1. THE Projects_Section SHALL display all 30 projects from the Project_Dataset.
2. THE Projects_Section SHALL display, for each project, the project name, description, Category, and tech stack from the Project_Dataset.
3. WHERE a project in the Project_Dataset has a GitHub repository URL, THE Projects_Section SHALL render a link to that repository under `github.com/keshav-077`.
4. WHERE a project in the Project_Dataset has a live deployment URL, THE Projects_Section SHALL render a link to that deployment, including the Medical Chatbot RAG deployment at `https://medical-chatbot-179320.vercel.app` and the Job Search Automation Devfolio page.
5. WHEN a Visitor activates a project's repository or deployment link, THE Projects_Section SHALL open the target URL in a new browser tab with `rel="noopener noreferrer"`.
6. THE Projects_Section SHALL present a Category filter control that lists each distinct Category present in the Project_Dataset exactly once alongside an all-projects option.
7. WHEN the Portfolio first loads, THE Projects_Section SHALL activate the all-projects option by default and display all 30 projects.
8. WHEN a Visitor selects a Category filter, THE Projects_Section SHALL display only the projects assigned to that Category and SHALL indicate the selected Category as the active filter.
9. WHEN a Visitor clears the Category filter or selects the all-projects option, THE Projects_Section SHALL display all 30 projects.
10. IF a project in the Project_Dataset lacks a live deployment URL, THEN THE Projects_Section SHALL render the project without a deployment link and without a broken link placeholder.
11. IF a project in the Project_Dataset lacks a GitHub repository URL, THEN THE Projects_Section SHALL render the project without a repository link and without a broken link placeholder.

### Requirement 4: Hero Section

**User Story:** As a Visitor, I want an immediate, premium introduction to the Owner, so that I understand who the Owner is and can reach the Owner's key links quickly.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the Owner's name, the "AI Engineer / Software Engineer" title, a headline, and an introductory statement sourced from the Resume_Source.
2. THE Hero_Section SHALL display links to the Owner's GitHub (`github.com/keshav-077`), LinkedIn (`keshavardhan-m-9b8a22314`), and email (`keshavardhan777@gmail.com`).
3. WHEN a Visitor activates a Hero_Section link to GitHub or LinkedIn, THE Portfolio SHALL open the corresponding destination in a new browser tab, and WHEN a Visitor activates the email link, THE Portfolio SHALL open the Visitor's default email client addressed to `keshavardhan777@gmail.com`.
4. WHEN a Visitor activates the Resume_Button, THE Portfolio SHALL initiate a download of the PDF at `public/Keshavardhan_Makireddi.pdf`.
5. IF the PDF at `public/Keshavardhan_Makireddi.pdf` cannot be retrieved when the Resume_Button is activated, THEN THE Portfolio SHALL display an error message indicating the resume is unavailable and SHALL remain on the current view without navigating away.
6. WHEN a Visitor activates the Contact control in the Hero_Section, THE Portfolio SHALL scroll to the Contact Section such that the Contact Section's top boundary is positioned within the viewport within 1000 milliseconds.
7. THE Hero_Section SHALL display an Availability_Badge showing exactly one of the following states: "Available", "Open to opportunities", or "Unavailable".
8. WHEN the Portfolio first loads and Reduced_Motion is disabled, THE Hero_Section SHALL play an introduction animation that completes within 3000 milliseconds and resolves to the fully visible final state of the Hero_Section content.
9. WHERE a profile picture is provided by the Owner, THE Hero_Section SHALL display the profile picture using a floating-portrait, glass-card, or split-layout treatment that does not overlap the Owner's name, title, headline, or introductory statement.
10. WHILE Reduced_Motion is enabled, THE Hero_Section SHALL present its content in the final, static state without the introduction animation within 100 milliseconds of first load.

### Requirement 5: Animation System

**User Story:** As a Visitor, I want polished, performant motion throughout the site, so that the experience feels premium without being distracting or inaccessible.

#### Acceptance Criteria

1. WHEN the Portfolio first loads, THE Animation_System SHALL perform an initial reveal that includes text reveal and staggered entrance of Hero_Section elements, completing the reveal within 2000 milliseconds.
2. WHEN a Section scrolls into the viewport such that at least 10% of the Section's area is visible, THE Animation_System SHALL apply, one time per page load, a scroll-triggered entrance effect selected from fade, slide, blur reveal, scale, stagger, and mask reveal, completing the effect within 1000 milliseconds.
3. THE Animation_System SHALL display a scroll progress indicator that continuously updates to reflect the Visitor's vertical scroll position, ranging from 0% at the top of the Portfolio to 100% at the bottom of the Portfolio.
4. WHILE a Visitor scrolls, THE Navbar SHALL remain fixed and SHALL indicate the currently active Section.
5. WHEN a numeric statistic scrolls into the viewport such that at least 10% of the statistic element's area is visible, THE Animation_System SHALL animate a counter from a starting value to the target value over a duration between 1000 and 3000 milliseconds.
6. WHERE the Visitor's device is pointer-capable, THE Animation_System SHALL render the Custom_Cursor with glow, follower, and magnetic behavior.
7. WHERE the Visitor's device is touch-only, THE Animation_System SHALL NOT render the Custom_Cursor and SHALL retain the native pointer behavior.
8. WHEN a Visitor hovers over a card, button, icon, or image, THE Animation_System SHALL apply a hover effect to that element.
9. THE Animation_System SHALL render an animated background treatment selected from aurora, gradient mesh, or particles.
10. THE Portfolio SHALL apply smooth scrolling to in-page navigation.
11. WHILE Reduced_Motion is enabled, THE Animation_System SHALL disable entrance reveals, counter animations, animated background motion, and Custom_Cursor motion, and SHALL present all content in its final rendered state.
12. THE Animation_System SHALL animate using GPU-accelerated properties (transform and opacity) for its reveal and movement effects.
13. WHILE any animation is running, THE Animation_System SHALL sustain a rendering frame rate of at least 60 frames per second.

### Requirement 6: Contact Form with Email Delivery

**User Story:** As a Visitor, I want to send the Owner a message that actually reaches the Owner, so that I can start a conversation reliably.

#### Acceptance Criteria

1. THE Contact_Form SHALL provide input fields for the Visitor's name (1 to 100 characters), email address (1 to 254 characters), and message (1 to 2000 characters).
2. WHEN a Visitor submits the Contact_Form with all required fields populated and valid, THE Email_Service SHALL deliver the submission to the Owner's email address and SHALL confirm delivery within 30 seconds.
3. WHILE a Contact_Form submission is in progress, THE Contact_Form SHALL display a loading state and SHALL prevent duplicate submissions.
4. WHEN the Email_Service confirms successful delivery, THE Contact_Form SHALL display a success animation and clear the input fields.
5. IF the Email_Service reports a delivery failure OR does not confirm delivery within 30 seconds, THEN THE Contact_Form SHALL display an error message indicating that delivery failed and SHALL retain the Visitor's entered values.
6. IF a required Contact_Form field is empty, OR the name exceeds 100 characters, OR the message exceeds 2000 characters, OR the email address does not contain a non-empty local part, a single "@" separator, and a domain containing at least one dot, THEN THE Contact_Form SHALL display a validation message identifying the invalid field and SHALL NOT submit.
7. THE Contact_Form SHALL include a hidden honeypot field, and IF the honeypot field is populated on submission, THEN THE Contact_Form SHALL reject the submission without contacting the Email_Service.
8. WHEN the number of submissions from a Visitor exceeds 5 within a rolling 10-minute window, THE Email_Service SHALL reject further submissions and indicate that the rate limit was exceeded until the 10-minute window resets.
9. THE Portfolio SHALL provide a Copy Email control, and WHEN a Visitor activates it, THE Portfolio SHALL copy the Owner's email address to the clipboard and display a visible confirmation within 1 second.
10. THE Email_Service SHALL read its provider credentials from environment variables and SHALL NOT expose secret credentials in client-delivered source.

### Requirement 7: SEO

**User Story:** As the Owner, I want the Portfolio to be discoverable and to preview correctly when shared, so that search engines and social platforms represent the site accurately.

#### Acceptance Criteria

1. THE SEO_System SHALL provide Open Graph metadata for the Portfolio including og:title, og:description, og:type set to "website", og:url set to the Portfolio's absolute canonical URL, and og:image referencing an absolute image URL, where og:title contains at most 60 characters and og:description contains at most 160 characters.
2. THE SEO_System SHALL provide Twitter Card metadata including twitter:card set to "summary_large_image", twitter:title, twitter:description, twitter:image referencing an absolute image URL, and twitter:site set to the Owner's Twitter handle, where twitter:title contains at most 60 characters and twitter:description contains at most 160 characters.
3. THE SEO_System SHALL embed structured data describing the Owner as a schema.org Person, including the Owner's full name, job title, and one or more social profile URLs.
4. THE SEO_System SHALL provide a `sitemap.xml` and a `robots.txt` served from the site root, where `sitemap.xml` lists the Portfolio's canonical URL and `robots.txt` references the `sitemap.xml` location.
5. THE SEO_System SHALL declare exactly one canonical URL for the Portfolio using an absolute URL.
6. THE SEO_System SHALL replace the placeholder author metadata value "Lovable", the placeholder Twitter handle "@Lovable", and all Lovable-hosted image URLs currently present in `index.html` with the Owner's name, the Owner's Twitter handle, and Owner-controlled absolute image URLs respectively, such that no reference to "Lovable" or Lovable-hosted domains remains in the metadata.
7. IF a metadata image URL cannot be resolved, THEN THE SEO_System SHALL retain the remaining metadata values without omission or substitution.

### Requirement 8: Accessibility

**User Story:** As a Visitor using assistive technology or keyboard navigation, I want the Portfolio to be operable and perceivable, so that I can access all content and controls.

#### Acceptance Criteria

1. THE Portfolio SHALL make every interactive control reachable in a logical sequential order using the Tab and Shift+Tab keys, activatable using the Enter or Space keys, and free of keyboard traps such that focus can always move away from any control using standard keyboard keys.
2. WHEN an interactive control receives keyboard focus, THE Portfolio SHALL display a visible focus indicator that has a contrast ratio of at least 3:1 against adjacent background colors and remains visible until focus moves to another control.
3. THE Portfolio SHALL provide descriptive text alternatives for all non-decorative images and programmatically associated ARIA labels for all interactive controls that lack visible text.
4. WHERE an image is decorative, THE Portfolio SHALL expose it to assistive technology with an empty text alternative so that it is ignored by screen readers.
5. THE Portfolio SHALL meet the following WCAG 2.1 AA contrast ratios: at least 4.5:1 for normal text, at least 3:1 for large-scale text (18pt or 14pt bold and larger), and at least 3:1 for essential user interface components and graphical objects.
6. WHILE Reduced_Motion is enabled, THE Portfolio SHALL disable or reduce all non-essential motion animations across every Section while preserving access to all content and controls.
7. THE Navbar SHALL expose its navigation structure to assistive technology using semantic landmarks or ARIA roles that identify it as the primary navigation region.

### Requirement 9: Performance

**User Story:** As a Visitor, I want the Portfolio to load quickly and stay responsive, so that I can browse without waiting or experiencing layout shifts.

#### Acceptance Criteria

1. WHEN a below-the-fold image (any image whose top edge lies below the initial viewport at first paint) scrolls to within 300 pixels of the visible viewport, THE Portfolio SHALL load that image.
2. THE Portfolio SHALL serve responsive image assets whose intrinsic width does not exceed the rendered display width by more than 20 percent for the current rendering viewport.
3. WHEN a Section or route requiring non-critical code is first requested, THE Portfolio SHALL load that code on demand rather than including it in the initial bundle.
4. WHILE a web font is loading, THE Portfolio SHALL display text in a fallback font so that text remains visible throughout the loading period and swaps to the web font once it has loaded.
5. THE Portfolio SHALL reserve layout space for images and dynamically loaded content so that the cumulative layout shift (CLS) remains below 0.1.
6. WHEN measured on a production build using Lighthouse with default simulated mobile throttling, THE Portfolio SHALL achieve a score of at least 95 in each of the Performance, Accessibility, Best Practices, and SEO categories.
7. WHEN a Visitor loads the Portfolio on a production build, THE Portfolio SHALL reach Largest Contentful Paint within 2.5 seconds.
8. WHEN a Section not intersecting the initial viewport at first paint scrolls to within 300 pixels of the visible viewport, THE Portfolio SHALL load and render that Section.

### Requirement 10: GitHub Integration

**User Story:** As a Visitor, I want to see live repository details for the Owner's projects, so that I can gauge their activity and scope.

#### Acceptance Criteria

1. WHERE a project has a GitHub repository URL, THE GitHub_Integration SHALL display the repository's primary language, last-updated date, topics, star count, and fork count, rendering the star count and fork count as non-negative integers and the last-updated date in a human-readable calendar date format.
2. WHEN GitHub repository metadata is retrieved successfully within 5 seconds of the request, THE GitHub_Integration SHALL render the retrieved metadata alongside the corresponding project.
3. IF the GitHub metadata request fails, exceeds the 5-second response timeout, or the rate limit is exceeded, THEN THE GitHub_Integration SHALL render the project using the static Project_Dataset content, SHALL retain that static content until a subsequent successful retrieval, and SHALL NOT display an error indication to the Visitor.
4. WHERE a repository is public, THE GitHub_Integration SHALL display an open-source badge for the corresponding project.
5. WHEN retrieved repository metadata contains zero topics, THE GitHub_Integration SHALL render the project without a topics list and without empty placeholder elements.

### Requirement 11: Responsiveness

**User Story:** As a Visitor on any device, I want the Portfolio to adapt to my screen, so that the experience is excellent on mobile, tablet, and desktop.

#### Acceptance Criteria

1. WHILE the viewport width is below 768px (mobile), THE Portfolio SHALL present a single-column layout for every Section in which all interactive controls expose a touch target of at least 44px by 44px.
2. WHILE the viewport width is between 768px and 1023px inclusive (tablet), THE Portfolio SHALL adapt Section layouts to the intermediate width such that no content exceeds the viewport width and no horizontal scrollbar appears.
3. WHILE the viewport width is 1024px or greater (desktop), THE Portfolio SHALL present the full multi-column Coastal layout.
4. WHILE the viewport width is below 768px (mobile), THE Navbar SHALL display a navigation affordance whose touch target is at least 44px by 44px.
5. WHEN the Visitor activates the mobile navigation affordance, THE Navbar SHALL reveal the navigation links for all Sections.
6. THE Portfolio SHALL constrain rendered content to the viewport width so that no horizontal scrollbar appears at any viewport width from 320px through 1920px.
