@AGENTS.md

# capanema.io — Project Guide

Personal portfolio for Murilo Capanema (Engineering Leadership). Hosts case studies and a resume. Built to be minimal: no CMS, no database — content lives as MDX files in the repo.

## Stack

- **Next.js 16** (App Router, Turbopack) — `pageExtensions` includes `md` and `mdx`
- **MDX** via `@next/mdx` with `experimental.mdxRs: true` (Rust compiler, required for Turbopack compatibility — do not switch to JS-based remark plugins, they will break the build)
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`, no `tailwind.config.ts`
- **Vercel Analytics** — `<Analytics />` from `@vercel/analytics/next` in root layout
- **Vercel Speed Insights** — `<SpeedInsights />` from `@vercel/speed-insights/next` in root layout
- **Fonts** — Geist Sans + Geist Mono via `next/font/google`

## Project structure

```
src/
  app/
    layout.tsx       # Root layout: fonts, Analytics, SpeedInsights
    page.tsx         # Home page
    globals.css      # Tailwind import + CSS variables
mdx-components.tsx   # Required by Next.js MDX integration (keep at root)
next.config.ts       # MDX + mdxRs config
vercel.json          # { "framework": "nextjs" }
```

## Adding content

- **Case study**: create `src/app/case-studies/[slug]/page.mdx`
- **Resume**: create `src/app/resume/page.tsx` or `page.mdx`

## Key constraints

- **No remark/rehype plugins with Turbopack** — passing plugin functions (e.g. `remarkGfm`) to `createMDX({ options: { remarkPlugins } })` causes a serialization error with Turbopack. Use `mdxRs: true` instead, which handles GFM natively.
- **Tailwind v4 syntax** — uses `@import "tailwindcss"` in CSS, not `@tailwind base/components/utilities`. Theme tokens go in `@theme inline {}`.
- **Dark mode** — uses `prefers-color-scheme` media query (not Tailwind's `dark:` class strategy). All components should include `dark:` variants.

## Deployment

- **GitHub remote**: `git@github.com:mcapanema/capanema.io.git`
- **Vercel project**: `mcapanemas-projects/mcapanema.io`
- **Production URL**: https://mcapanemaio.vercel.app
- Every push to `main` triggers an automatic production deployment on Vercel.

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # validate before pushing
```
