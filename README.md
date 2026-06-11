# capanema.io

This is my personal site — a curated record of the engineering leadership work I find worth documenting. It hosts long-form case studies on the problems I've led teams through, the architectural and organizational tradeoffs I've navigated, and the outcomes that followed. It also serves as a living resume.

The site is intentionally minimal. No CMS, no database, no third-party content layer. Content lives as MDX files in the repository, which means the writing process is the same as the engineering process: version-controlled, reviewable, and permanent.

## Stack

| Layer | Choice | Rationale |
|---|---|---|
| Framework | Next.js 16 (App Router) | Static generation by default; incremental adoption of server components as content scales |
| Content | MDX + mdxRs | Markdown with full React composability; Rust compiler keeps builds fast |
| Styles | Tailwind CSS v4 | Utility-first with zero runtime — no stylesheet overhead on a content-heavy site |
| Observability | Vercel Analytics + Speed Insights | Page-level traffic and Core Web Vitals without a third-party script tax |
| Deployment | Vercel | Git-push-to-production with zero config |

## Local development

```bash
npm install
npm run dev
```

## Adding content

- **Case study** — create `src/app/case-studies/[slug]/page.mdx`
- **Resume** — edit `src/app/resume/page.tsx` or `page.mdx`
