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

1.  Never hardcode projects, services, or case studies.
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

/content/projects /content/services /content/case-studies
/content/testimonials

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
