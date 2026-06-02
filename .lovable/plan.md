# Plan: Export Complete Portfolio Content to DOCX

Generate a comprehensive Word document (`.docx`) containing every piece of content from your portfolio website, organized section by section.

## What will be included

The document will mirror the portfolio structure and extract all visible content, descriptions, metadata, and links from each component file.

### Sections to extract

1. **Hero Section** — name, headline, tagline, bio, all CTAs, stats counters
2. **About Me** — full bio paragraphs, career vision, all stats (projects, internships, publications), education entries (IIM Visakhapatnam MBA + IIIT Nagpur B.Tech) with degree, program, school, location, period, full descriptions, links
3. **Work Experience** — all 3 roles (C5i, Infoteck Solutions, IIIT Nagpur) with company, URL, location, period, and every bullet point
4. **Publications** — IEEE paper details and link
5. **Projects** — every project (all 27+) with title, full description, tech stack tags, category, and GitHub link
6. **Skills & Expertise** — all 7 categories with every individual skill listed
7. **Certifications** — every certification (NVIDIA, IBM, Udemy) with issuer and link
8. **Achievements** — Hackbyte 3.0, esports wins, etc.
9. **Contact** — email, phone, social links, form fields
10. **Footer** — any tagline / copy

## Technical approach

- Read every section component file to extract exact source-of-truth content (no paraphrasing).
- Build the file using `docx-js` per the docx skill (Arial default, proper headings H1/H2/H3, bullet lists via `LevelFormat.BULLET`, smart quotes, US Letter page size).
- Structure: Title page → Table-of-contents-style section list → Each section as H1 with content underneath.
- Project entries rendered as H3 + description + "Tech: ..." line + GitHub link as ExternalHyperlink.
- Save to `/mnt/documents/keshavardhan-portfolio-content.docx`.
- QA: convert to PDF + page images via LibreOffice and visually inspect each page for layout issues before delivering.
- Deliver via `<presentation-artifact>` tag.

## Deliverable

A single downloadable `.docx` containing 100% of the portfolio's textual content, ready to reuse for resumes, applications, or rewrites.
