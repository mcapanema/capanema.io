# capanema.io — Design System

This document is the authoritative record of how capanema.io is designed and built. **Every visual decision must be traceable to it.** Before adding or changing UI, read the relevant section and reuse what exists.

The Design System is maintained in **Pencil** (`design-system-v3.1.pen`, a separate repo — the single source of truth) and translated into this codebase as a token-first foundation. This file documents that translation: tokens, components, patterns, conventions, and rules. When the two ever disagree, Pencil wins and this file should be corrected to match.

---

## 1. Philosophy

The site is content-first: an executive portfolio that should communicate seniority, credibility, clarity, and thoughtfulness. The design is understated and timeless — closer to a thoughtful technology leader's knowledge base than a marketing site.

Principles, in priority order (the tie-breakers when a choice is unclear):

1. **Simplicity over complexity** — fewest moving parts that solve the problem.
2. **Consistency over novelty** — match what exists; predictable beats clever.
3. **Accessibility first** — WCAG AA is the floor, in both themes, no exceptions.
4. **Readability over decoration** — type, spacing, and hierarchy serve reading.
5. **Mobile-first & responsive** — design the smallest viewport first.
6. **Reuse before creating** — compose from existing tokens/components/patterns.
7. **Maintainability** — every value routes through a token; optimize for the next contributor.

Decision test for anything new: *Does it serve the reader first? Can an existing token/component/pattern already do it? Does it work in Light and Dark with zero overrides? Does it meet WCAG AA? Will it be obvious to the next contributor?* If any answer is no, revise before adding.

---

## 2. Architecture

**Five-layer governance chain — each layer references only the one above it:**

```
Foundation primitives  →  Semantic tokens  →  Components  →  Patterns  →  Pages
(static hex/values)        (per-mode)          (consume tokens)  (compose)   (compose)
```

- **Foundation primitives** are static and never themed (`--neutral-*`, `--accent-*`, `--dark-*`, `--primary-*`). Components must never reference them directly.
- **Semantic tokens** carry a value per **Mode (Light / Dark)** and re-resolve automatically.
- **Components** consume semantic tokens only — never raw hex, never primitives.
- **Patterns** compose components; **Pages** compose patterns.

**Dark mode is token-driven.** `globals.css` defines each themed token once with `light-dark(<light>, <dark>)` in `:root`, which resolves against the element's `color-scheme`. `:root` defaults to `color-scheme: light dark` (follow the OS). An explicit, persisted choice sets `data-theme="light|dark"` on `<html>`, which switches `color-scheme` and overrides the OS. Because every component uses semantic token utilities, dark mode needs **zero `dark:` variants and zero per-component overrides**. Never hardcode a color or add a `dark:` class.

All tokens are defined in `src/app/globals.css` and mapped into Tailwind v4 via `@theme inline`, which keeps utilities pointing at the live CSS vars so the `light-dark()`/`color-scheme` resolution re-resolves them. See §13 for the theme-toggle mechanism.

---

## 3. Foundations

### Typography

Two families, loaded in `layout.tsx`:

- **Inter** (`font-sans`, `--font-inter`) — all UI and display text.
- **JetBrains Mono** (`font-mono`, `--font-jetbrains-mono`) — eyebrows, labels, metadata, dates, reading-time, code.

**Type scale** (size / line-height / letter-spacing; headings are weight 600):

| Name | px | line-height | tracking | Tailwind example |
|---|---|---|---|---|
| Display XL | 72 | 1.05 | −1.5 | `text-display-xl font-semibold` |
| Display L | 64 | 1.05 | −1.3 | `text-display-l font-semibold` |
| Display M | 56 | 1.08 | −1.1 | `text-display-m font-semibold` |
| H1 | 48 | 1.1 | −1 | `text-h1 font-semibold` |
| H2 | 40 | 1.15 | −0.8 | `text-h2 font-semibold` |
| H3 | 32 | 1.2 | −0.5 | `text-h3 font-semibold` |
| H4 | 24 | 1.3 | −0.3 | `text-h4 font-semibold` |
| H5 | 20 | 1.4 | 0 | `text-h5 font-semibold` |
| Body L | 18 | 1.6 | 0 | `text-body-l` |
| Body M | 16 | 1.6 | 0 | `text-body-m` |
| Body S | 14 | 1.5 | 0 | `text-body-s` |
| Caption | 12 | 1.4 | 0 | `text-caption font-medium` |

The type scale is **tokenized** (v3.1): each step is a `text-*` utility (`text-display-xl … text-caption`) carrying size + line-height + tracking, registered in `globals.css` `@theme`. Line-height tokens exist for prose: `--leading-tight 1.1`, `--leading-snug 1.3`, `--leading-normal 1.6`, `--leading-prose 1.7`. Reading measure: `--measure-prose: 680px`.

### Spacing

DS ramp (`space-0…12`): `0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128`. Every value maps exactly onto Tailwind's default 4px scale, so use standard utilities — no custom spacing tokens:

| DS | px | Tailwind | DS | px | Tailwind |
|---|---|---|---|---|---|
| space-1 | 4 | `1` | space-7 | 40 | `10` |
| space-2 | 8 | `2` | space-8 | 48 | `12` |
| space-3 | 12 | `3` | space-9 | 64 | `16` |
| space-4 | 16 | `4` | space-10 | 80 | `20` |
| space-5 | 24 | `6` | space-11 | 96 | `24` |
| space-6 | 32 | `8` | space-12 | 128 | `32` |

### Radius & elevation

- **Radius** — v3.1 scale `radius-sm 8 / md 12 / lg 16 / pill 999`. Wired so `rounded-sm`→8, `rounded-md`→12, `rounded-pill`→999; `rounded-lg` (8) and `rounded-xl` (12) keep Tailwind defaults (existing buttons/cards), and `radius-lg` (16) is consumed via `rounded-[var(--radius-lg)]`. Conceptually buttons read as `radius-sm` (8) and cards as `radius-md` (12). Per v3.1's radius-token migration, the `Callout` snapped from off-scale `rounded-[10px]` to `rounded-sm` (8).
- **Elevation** — soft card shadow via the themed shadow tokens: `shadow-[0_1px_3px_var(--shadow-1a)]`.
- **Motion** (v3.1) — `--duration-fast 120ms / -base 200ms / -slow 320ms`; easing `ease-standard cubic-bezier(0.2,0,0,1)` / `ease-emphasized cubic-bezier(0.3,0,0,1)`. Hover uses fast·standard; overlays use slow·emphasized.
- **Icon sizes** (v3.1) — `--icon-sm 16 / -md 20 / -lg 24` (= `size-4/5/6`); consume via `size-[var(--icon-*)]`.
- **Breakpoints** (v3.1) — `breakpoint-sm 640 / -md 768 / -lg 1024 / -xl 1280`, declared in `@theme`; equal to Tailwind's defaults.

### Layout widths

- Page container: `max-w-[1120px]`.
- Reading measure (prose): `max-w-[680px]`.
- Pattern headers / hero subline: `max-w-[820px]` / `max-w-[640px]`.

---

## 4. Semantic tokens

Reference with the matching Tailwind utility (color name = token name). Every token resolves per mode.

**Text** — `text-primary`, `text-secondary`, `text-tertiary`, `text-muted`, `text-prose`, `text-accent`, `text-inverse`, `text-on-accent`, `text-on-dark`, `text-on-dark-muted`, `text-success`.
→ utilities `text-text-primary`, `text-text-secondary`, … (the doubled `text-` is correct: prefix + token name).

**Surface** — `surface-primary`, `surface-secondary`, `surface-tertiary`, `surface-subtle`, `surface-elevated`, `surface-inverse`, `surface-dark`, `surface-dark-raised`, `surface-accent`. → `bg-surface-elevated`, etc.

**Border** — `border-subtle`, `border-default`, `border-strong`, `border-accent`. → `border-border-subtle`, etc.

**Action / link / focus / disabled** — `action-primary` (+`-hover`, `-pressed`), `action-secondary` (+`-hover`), `link` (+`-hover`), `focus-ring`, `disabled`, `disabled-text`.

**Status** (each has `-fg` and `-surface`) — `status-success-*`, `status-warning-*`, `status-error-*`, `status-info-*`. Always pair the surface with the matching fg **and** an icon/label (color is never the sole signal).

> `surface-dark` / `text-on-dark*` are dark in **both** modes — used by the Footer and Contact section.

The full hex values per mode live in `src/app/globals.css`. The deprecated shadcn `--background`/`--primary`/`--radius-*` set is **intentionally omitted** — do not reintroduce or reference `--`-prefixed tokens in new work.

**Structural accent (v3.1).** Accent is reserved for **eyebrows, CTAs, links, and active nav**. Categories and tags are neutral; metrics and outcomes are ink. Emphasis comes from size, weight, and the **eyebrow accent bar** texture (the `Eyebrow` component) — never from spreading color. (`SectionTick` is a codebase-only accent rule built from the same texture; not a DS master.) The accent itself is **Cobalt Deep** (`accent-500 #2150B8`, dark ramp `400 #3F6BD0` / `300 #6E96E2` / `200 #A6C1F0`).

---

## 5. Components

All in `src/components/ui/`, exported from `index.ts`. Each maps to a Pencil master and uses semantic tokens only.

**Primitives**
- `Button` — primary / secondary variants, optional icon, `min-h-11` touch target. Renders `<a>` (when `href`) or `<button>`.
- `IconButton` — square icon action, requires `label` (a11y), `min-h-11 min-w-11`.
- `Tag` — mono pill, optional accent dot.
- `NavItem` — text nav link with active state.
- `Metric` — big value + label; `tone="onDark"` for dark panels.
- `MetricCard` — elevated metric with mono eyebrow.
- `Callout` — `info` / `success` / `warning` / `error`, leading icon + optional title (usable in MDX).
- `Pullquote` — left-accent quote + attribution (usable in MDX).
- `Breadcrumb` — `items: Crumb[]`, chevron separators, current page emphasized.
- `Eyebrow` — the v3.1 structural-accent texture (a port of the DS `Eyebrow` master): an accent bar + mono accent label. (`SectionTick`, a 24×3 accent rule, ships alongside it as a codebase-only helper — not a DS master.)

**Composite**
- `CaseStudyCard` — category, title, summary, divider, outcome metrics, "Read case study" (whole-card link).
- `ArticleCard` — category · date, title, excerpt, reading time.
- `CredibilityStrip` — eyebrow + company wordmarks.
- `FeaturedCaseStudy` — content + dark metric panel (Discovery featured block).
- `FeaturedArticle` — featured essay card (Writing pattern).
- `TimelineItem` — dated role with left rail + accent dot, description, accent outcome; `isLast` drops the rail.
- `ToCRail` — "On this page" rail with **scroll-spy** active state (client; IntersectionObserver).

**Chrome / layout**
- `SiteHeader` — brand + primary nav + `ThemeToggle` (client; active section from pathname).
- `ThemeToggle` — `IconButton` that flips light/dark and persists the choice to `localStorage` (client; see §13).
- `Footer` — dark, brand + link columns + legal.
- `PageHeader` — shared index header (eyebrow + H1 + description).
- `ContactSection` — dark Contact pattern block (eyebrow, headline, sub, email CTA, social links).

> `Highlight Card` (LA0Vr) exists in the DS but is not yet used in code — build it from its master if a future section needs it.

---

## 6. Patterns → Pages

The DS Patterns board maps ~1:1 to the pages. Each page is composed only from existing components.

| Page | Route | Pattern | Key components |
|---|---|---|---|
| Home | `/` | Hero + Latest Updates | `PageHeader`-less hero, `Button`, `CredibilityStrip`, `CaseStudyCard`, `ArticleCard` |
| Case Studies | `/case-studies` | Case Study Discovery | `PageHeader`, `FeaturedCaseStudy`, `CaseStudyCard`, explorer (search/filter/sort) |
| Case Study | `/case-studies/[slug]` | Case Study Detail | `Breadcrumb`, `Metric` band, `ToCRail`, MDX prose, `Pullquote`, `Callout`, `CaseStudyCard` (related) |
| Articles | `/articles` | Writing | `PageHeader`, `FeaturedArticle`, `ArticleCard`, explorer |
| Article | `/articles/[slug]` | Writing (reading) | `Breadcrumb`, meta, MDX prose |
| About me | `/resume` | Profile + Contact | `MetricCard`, `TimelineItem`, `Tag`, `ContactSection`, `Button` (download) |

`/styleguide` renders the token palette, type scale, and every component for in-browser review in both themes.

---

## 7. Conventions

- **Token names** — lowercase, hyphen-separated (`action-primary`, `status-error-fg`). Interaction states use `-hover` / `-pressed`. Reference in CSS with a `$`/`var()`; in Tailwind via the color utility.
- **Components** — PascalCase, named by function not appearance, one file each, re-exported from `index.ts`. Variants are props/token overrides, never a forked component.
- **No raw values in components** — every color/spacing/radius is a token or a standard Tailwind utility backed by one. If you write a hex into a component, route it through a token instead.
- **Class joining** — `cn()` from `src/lib/cn.ts` (no clsx dependency).
- **Dynamic Tailwind classes** — Tailwind only detects complete literal class strings; never build class names by interpolation (`text-${x}`). Use full literals or arbitrary `text-(--token)` syntax.

---

## 8. Accessibility (mandatory, both themes)

- **WCAG 2.1 AA** minimum for all text and meaningful UI; verify in Light **and** Dark.
- **Keyboard** — every interactive element reachable and operable, logical order, no traps.
- **Visible focus** — global `:focus-visible` ring (`--focus-ring`) in `globals.css`; never remove without an equal replacement.
- **Targets** — interactive targets ≥ 44×44px (`min-h-11`; filter chips ≥ 36px with spacing).
- **Color is never alone** — hierarchy from size/weight; status pairs color with icon + label.
- **Semantic structure** — one `<h1>` per page, headings nest without skipping; real landmarks (`nav` for breadcrumb/ToC/header, `header`/`footer`/`main`).
- **Responsive** — usable from 320px; content reflows, nothing clipped or horizontally scrolled. ToC hides under `lg`; grids collapse to one column.

Contrast quick reference: body ≥ 4.5:1; large text (≥24px / 19px bold) & UI ≥ 3:1; focus ring ≥ 3:1 against adjacent color.

---

## 9. MDX prose system

`mdx-components.tsx` (repo root, required by Next's MDX integration) styles every prose element with DS tokens — Body L on `text-prose` at `leading-prose`, headings on the type scale, tokenized links/code/tables/blockquotes.

- **Heading anchors** — the `h2` renderer slugifies its text into an `id` (`slugify()` in `content/types.ts`), since `rehype-slug` can't run under Turbopack. ToC `sections` in metadata mirror those labels to produce matching anchors.
- **DS components in MDX** — `<Pullquote>`, `<Callout>`, `<Metric>`, `<Tag>` are exposed for authors to compose directly.
- Supports the full long-form toolkit: headings, lists, links, images, tables, code blocks, blockquotes, callouts, pullquotes, metrics.
- Templates strip the leading top margin with `[&>*:first-child]:mt-0`.

---

## 10. Content model

Typed metadata + MDX bodies, in `src/content/`:

- `types.ts` — `CaseStudy`, `Article`, `Outcome`; helpers `formatStamp`, `byNewest`, `slugify`.
- `case-studies.ts` / `articles.ts` — metadata arrays + getters + tag/category helpers. Case studies carry `metrics`, `sections` (= H2 labels driving the ToC), `period`.
- `case-studies/<slug>.mdx`, `articles/<slug>.mdx` — long-form bodies, loaded via **relative dynamic import** (`../../../content/.../${slug}.mdx`) so Turbopack bundles them; `generateStaticParams` prerenders each.
- `resume.ts` — typed About me profile data; PDF at `public/Murilo-Capanema-Resume.pdf`.

See CLAUDE.md → "Adding content" for the step-by-step.

---

## 11. Known gaps & decisions

The v2-era token gaps are **closed in v3.1**:

- **Radius tokens** — `radius-sm/md/lg/pill` (§3).
- **Type-scale tokens** — `text-display-xl … text-caption` (§3).
- **Motion tokens** — `duration-*` + `ease-*` (§3).
- **Breakpoint tokens** — `breakpoint-sm/md/lg/xl` (§3).

Remaining gap: a 15px/13px/11px handful of raw literals stay off the documented ramp (no matching token; expanding the ramp is out of scope). The structural-accent rule is currently applied at the token layer + `MetricCard` + styleguide; rolling it across every page/component (Eyebrow/tick in all headers, neutral categories everywhere, ink timeline outcomes) is a follow-up.

Additions made this build, justified by spec requirements the DS didn't cover, composed from existing primitives:

- **Search / category-tag filter / sort** controls on the index pages (the DS defines cards, not form controls) — tokenized inputs, selects, and toggle chips.
- **Education / Certifications** on the About me page — a `CredentialList` composed from type tokens.
- **Résumé download** — a real `<a download>` to a (placeholder) PDF in `public/`.

---

## 12. Workflow reminders

- Verify both themes and mobile before claiming done.
- `npm run build` must pass before a PR; pages prerender as static HTML.
- Branch from `main`, never stack PRs (see CLAUDE.md → Git workflow).
- When the Pencil DS changes, update this file, CLAUDE.md, and the token layer together — never let them drift.

---

## 13. Theming & the theme toggle

Three layers cooperate:

1. **Tokens (`globals.css`).** Each themed token is `light-dark(<light>, <dark>)`, resolved against `color-scheme`. `:root` is `color-scheme: light dark` (follow OS). `:root[data-theme="light"|"dark"]` forces one mode.
2. **Pre-hydration script (`layout.tsx`).** First child of `<body>`; reads `localStorage.theme` and, if it is `"light"`/`"dark"`, sets `data-theme` on `<html>` before first paint (no flash). No stored value = attribute unset = follow OS. `<html>` carries `suppressHydrationWarning` because the script mutates the attribute.
3. **`ThemeToggle` (`components/ui/ThemeToggle.tsx`).** On mount resolves the effective theme (`localStorage` else `matchMedia`); on click flips it, writes `localStorage.theme`, and sets `data-theme`. Renders a fixed-size placeholder until mounted to avoid layout shift / hydration mismatch.

**Default behavior is preserved:** with nothing stored, the site follows the OS live. Persistence is opt-in (set on first click). Returning to pure OS-follow means clearing `localStorage.theme` (no "Auto" control yet — a possible future addition).

Adding a new themed token: define it once with `light-dark()` in `:root` and map it in `@theme inline`. Never add a `@media (prefers-color-scheme)` block or a `dark:` variant.
