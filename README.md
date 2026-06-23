# capanema.io

My personal site — a personal record of the engineering leadership work I find worth documenting. It hosts long-form case studies on the problems I've led teams through, the architectural and organizational tradeoffs I've navigated, and the outcomes that followed. It also serves as a living resume and a place to publish writing on technology, product, and org design.

The site is intentionally minimal. No CMS, no database, no third-party content layer. Content lives as MDX files in the repository, which means the writing process is the same as the engineering process: version-controlled, reviewable, and permanent.

**Production:** https://capanema.io

## Design System

The entire site is built from [Capanema Design System](https://github.com/mcapanema/design-system-capanema.io). [DESIGN.md](./DESIGN.md) is its translation into this codebase: tokens, components, patterns, conventions, and accessibility rules.

Key rules:
- **Semantic tokens only** — never raw hex, never Foundation primitives (`--neutral-*`, `--accent-*`). Always a semantic token (`bg-surface-primary`, `text-text-primary`, `border-border-subtle`, …).
- **Dark mode is automatic** — all themed tokens use `light-dark()` in `globals.css`. Zero `dark:` variants anywhere; zero per-component color overrides. The `ThemeToggle` sets `data-theme` on `<html>` to persist an explicit choice.
- **Token governance chain:** Foundation primitives → Semantic tokens → Components → Patterns → Pages. Each layer references only the one above it.
- **Motion & accessibility** — all animations respect `prefers-reduced-motion` via `@media (prefers-reduced-motion: reduce)`.

## Project structure

```
src/
  app/
    layout.tsx              # Root layout: fonts, ThemeToggle, Analytics, SpeedInsights
    globals.css             # Tailwind import + full DS token layer (@theme inline)
    page.tsx                # Home (Hero + Latest Updates)
    styleguide/page.tsx     # Token + component preview
    case-studies/
      page.tsx              # Index (Discovery pattern)
      CaseStudiesExplorer.tsx  # Client: search / filter / sort
      [slug]/page.tsx       # Canonical case-study template (Detail pattern)
    articles/
      page.tsx              # Index (Writing pattern)
      ArticlesExplorer.tsx  # Client: search / filter / sort
      [slug]/page.tsx       # Article reading template
    resume/page.tsx         # About me (profile + Contact patterns)
  components/ui/            # DS components (one file each) + index.ts barrel
  content/                  # Typed metadata + MDX bodies (the content layer)
    case-studies.ts         # Case study metadata
    articles.ts             # Article metadata
    resume.ts               # About me data
    types.ts                # Shared TypeScript types
    case-studies/<slug>.mdx # Case study bodies
    articles/<slug>.mdx     # Article bodies
  lib/cn.ts                 # Tiny className joiner
mdx-components.tsx          # MDX prose system — styles every element with DS tokens
next.config.ts              # MDX + mdxRs config
```

## Local development

```bash
npm install
npm run dev    # http://localhost:3000
npm run lint
npm run test
npm run build  # validate before pushing
```

## Adding content

Content is **typed metadata + an MDX body**.

**Case study** — add an entry to `src/content/case-studies.ts` (include `sections` = the H2 labels in order) and a body at `src/content/case-studies/<slug>.mdx`. The route `case-studies/[slug]` renders it automatically.

**Article** — add an entry to `src/content/articles.ts` and a body at `src/content/articles/<slug>.mdx`.

**About me** — edit `src/content/resume.ts`; replace `public/Murilo-Capanema-Resume.pdf` when the downloadable resume changes.

MDX bodies use plain Markdown plus DS components exposed in `mdx-components.tsx`: `<Pullquote>`, `<Callout>`, `<Metric>`, `<MetricCard>`, `<Tag>`, `<Eyebrow>`. H2 anchor IDs are generated in the `h2` renderer (not via `rehype-slug` — see constraints below).

## Key constraints

- **No remark/rehype plugins** — passing plugin functions to `createMDX` causes a serialization error under Turbopack. `mdxRs: true` handles GFM natively. Do not switch to JS-based remark plugins.
- **Tailwind v4 syntax** — `@import "tailwindcss"` in CSS, not `@tailwind base/components/utilities`. Theme tokens go inside `@theme inline {}`.
- **Dark mode via tokens, not `dark:` variants** — adding `dark:` classes or hardcoded colors breaks both themes. Use semantic token utilities exclusively.
- **No shadcn token set** — the deprecated shadcn `--` variable set is intentionally absent; do not reintroduce it.
