# CLAUDE.md

# Role

You are a Senior Product Engineer building a production-ready portfolio.
Prioritize clean architecture over quick hacks.

# Tech Stack

-   Next.js (App Router)
-   TypeScript (strict)
-   Tailwind CSS
-   shadcn/ui
-   Framer Motion
-   Lucide Icons

# Rules

1.  Never hardcode projects, services, or case studies (except 3 flagship projects — see below).
2.  Store content under `/content`.
3.  Build reusable components only.
4.  Mobile-first responsive design.
5.  Use Server Components unless client-side state is required.
6.  Keep business logic in `/lib`.
7.  Use TypeScript types for all content models.
8.  Prefer composition over duplication.
9.  Optimize for Lighthouse 95+.
10. Follow accessibility best practices (semantic HTML, keyboard
    navigation, ARIA where needed).

# Flagship Projects (Handcrafted — NOT CMS)

Three flagship projects are handcrafted static pages and must NOT be converted to database content:

1. HVAC Lead Intelligence (`/projects/hvac-lead-intelligence`)
2. WhatsApp/AmarChat Customer Hub (`/projects/whatsapp-customer-hub`)
3. AI Document Intelligence (`/projects/document-intelligence-system`)

Their data lives in `content/projects/index.ts`. The CMS manages future projects only.
Future projects appear in the "More Projects" section on the projects page.

# Design Language

-   Inspired by CodeWonders, Linear, Vercel.
-   Premium, minimal, editorial.
-   Large typography.
-   Spacious layout.
-   Dark-first with optional light mode.
-   Smooth, subtle animations only.

# Folder Structure

app/ components/ content/ lib/ types/ public/

# Content Collections

/content/testimonials /content/case-studies /content/services /content/shared

Projects and Solution Breakdowns are managed via Admin Dashboard → Content.
The CMS ONLY manages future (non-flagship) projects — the 3 flagship projects are protected in all CRUD operations.
Flagship projects appear in the main grid; CMS projects appear in the "More Projects" section.

# Image Strategy
- Projects have `cover_image`, `hero_image`, and `gallery_images` (JSON array of filenames).
- All images resolve to `/projects/{filename}`.
- Gallery images are stored as JSONB in the database.
- The UI gracefully displays only the images that exist.

# Animation

-   Fade in
-   Slide up
-   Gentle hover
-   No excessive motion

# Primary CTA

"Send a Message"

Never use "Book a Call" as the primary action.

# Definition of Done

-   Clean code
-   Reusable
-   Responsive
-   Accessible
-   No console errors
-   No duplicated UI
-   Ready for future CMS
