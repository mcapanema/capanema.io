@AGENTS.md

# capanema.io — Project Guide

Personal portfolio for Murilo Capanema (technology / engineering / product leadership). Hosts a home dashboard, case studies, writing, and an executive resume. Built to be minimal: no CMS, no database — content lives as MDX + typed metadata in the repo.

**The entire site is built from a Design System.** Before making any design, layout, component, spacing, typography, color, or interaction decision, read **[DESIGN.md](./DESIGN.md)** — it is the authoritative record of the tokens, components, patterns, conventions, and accessibility rules. The DS itself is maintained in Pencil (a separate repo) and is the single source of truth; DESIGN.md is its translation into this codebase.

## Stack

- **Next.js 16** (App Router, Turbopack) — `pageExtensions` includes `md` and `mdx`
- **MDX** via `@next/mdx` with `experimental.mdxRs: true` (Rust compiler, required for Turbopack compatibility — do not switch to JS-based remark plugins, they will break the build)
- **Tailwind CSS v4** — configured via `@tailwindcss/postcss`, no `tailwind.config.ts`. All design tokens live in `src/app/globals.css`.
- **Fonts** — **Inter** (UI + display) + **JetBrains Mono** (eyebrows, labels, metadata, code) via `next/font/google`
- **Icons** — `lucide-react`
- **Vercel Analytics** + **Speed Insights** — in the root layout

## Project structure

```
src/
  app/
    layout.tsx              # Root layout: fonts, Analytics, SpeedInsights
    globals.css             # Tailwind import + full DS token layer
    page.tsx                # Home (Hero + Latest Updates)
    styleguide/page.tsx     # Token + component preview
    case-studies/
      page.tsx              # Index (Discovery pattern)
      CaseStudiesExplorer.tsx# Client: search / filter / sort
      [slug]/page.tsx       # Canonical case-study template (Detail pattern)
    articles/
      page.tsx              # Index (Writing pattern)
      ArticlesExplorer.tsx  # Client: search / filter / sort
      [slug]/page.tsx       # Article reading template
    resume/page.tsx         # Resume (Resume + Contact patterns)
  components/ui/            # DS components (one file each) + index.ts barrel
  content/                  # Typed metadata + MDX bodies (the content layer)
  lib/cn.ts                 # Tiny className joiner (no clsx dep)
mdx-components.tsx          # MDX prose system — styles every element with DS tokens
next.config.ts             # MDX + mdxRs config
public/                    # Static assets (e.g. résumé PDF)
```

## Adding content

Content is **typed metadata + an MDX body**, not per-route MDX pages.

- **Case study**: add an entry to `src/content/case-studies.ts` (incl. `sections` = the H2 labels, in order) and a body at `src/content/case-studies/<slug>.mdx`. The route `case-studies/[slug]` renders it.
- **Article**: add an entry to `src/content/articles.ts` and a body at `src/content/articles/<slug>.mdx`.
- **Resume**: edit `src/content/resume.ts`; replace `public/Murilo-Capanema-Resume.pdf` with the real document.
- MDX bodies use plain markdown plus the DS components exposed in `mdx-components.tsx` (`<Pullquote>`, `<Callout>`, `<Metric>`, `<Tag>`). H2 anchors are slugified automatically.

## Key constraints

- **No remark/rehype plugins with Turbopack** — passing plugin functions (e.g. `remarkGfm`, `rehype-slug`) to `createMDX` causes a serialization error. Use `mdxRs: true` (handles GFM natively). Heading anchor ids are generated in the `h2` renderer in `mdx-components.tsx` instead of via `rehype-slug`.
- **Tailwind v4 syntax** — `@import "tailwindcss"` in CSS, not `@tailwind base/...`. Theme tokens go in `@theme inline {}`.
- **Dark mode is token-driven** — semantic tokens carry both mode values via `light-dark()` and re-resolve from `color-scheme` in `globals.css`. Default is `color-scheme: light dark` (follow OS); the header `ThemeToggle` sets `data-theme` on `<html>` to force a persisted choice (see DESIGN.md §13). **Do NOT use `dark:` variants and do NOT hardcode colors.** Use semantic token utilities (`bg-surface-primary`, `text-text-primary`, `border-border-subtle`, …) and dark mode is automatic. See DESIGN.md for the full token list.
- **Semantic tokens only** — never a raw hex or a Foundation primitive (`--neutral-*`, `--accent-*`) inside a component; always a semantic token. The deprecated shadcn `--` token set is intentionally absent — do not reintroduce it.

## Deployment

- **GitHub remote**: `git@github.com:mcapanema/capanema.io.git`
- **Vercel project**: `mcapanemas-projects/mcapanema.io`
- **Production URL**: https://mcapanemaio.vercel.app
- Every push to `main` triggers an automatic production deployment on Vercel.

## Git workflow

**Never commit directly to `main`.** For every change:

1. Create a new branch **from `main`** with a short descriptive name (e.g. `feat/case-studies`, `fix/dark-mode-nav`).
2. Make commits on that branch.
3. Run `npm run build` to verify the build passes before opening a PR.
4. Open a PR on GitHub with `gh pr create` — clear title, body covering what changed, why, and any tradeoffs.
5. Leave the PR open for Murilo to review and merge.

**Always base PRs on `main` — never stack one feature branch on another.** (A stacked PR in this repo once merged into its parent branch instead of `main` and the work was lost; it had to be recovered by cherry-pick.) If work depends on an unmerged branch, wait for it to merge, then branch from `main`.

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # validate before pushing
```
