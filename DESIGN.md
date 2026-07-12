---
name: capanema.io
description: Executive portfolio for Murilo Capanema — case studies, writing, and résumé, built content-first on a token-driven design system.
colors:
  cobalt: "#2150b8"
  cobalt-hover: "#1a4097"
  cobalt-pressed: "#16357a"
  cobalt-bright: "#3f6bd0"
  cobalt-soft: "#6e96e2"
  cobalt-faint: "#a6c1f0"
  ink: "#0f172a"
  ink-deep: "#1e293b"
  ink-soft: "#334155"
  slate: "#475569"
  slate-mid: "#64748b"
  slate-soft: "#94a3b8"
  slate-light: "#cbd5e1"
  mist: "#e2e8f0"
  frost: "#f8fafc"
  white: "#ffffff"
  night: "#0b1020"
  night-raised: "#111827"
  night-elevated: "#172033"
typography:
  display:
    fontFamily: "Red Hat Display, Helvetica Neue, ui-sans-serif, system-ui, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-1.5px"
  headline:
    fontFamily: "Red Hat Display, Helvetica Neue, ui-sans-serif, system-ui, sans-serif"
    fontSize: "40px"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.8px"
  title:
    fontFamily: "Red Hat Display, Helvetica Neue, ui-sans-serif, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.3px"
  body:
    fontFamily: "Red Hat Display, Helvetica Neue, ui-sans-serif, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.6
    letterSpacing: "0px"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Menlo, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.5px"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "32px"
  space-7: "40px"
  space-8: "48px"
  space-9: "64px"
  space-10: "80px"
  space-11: "96px"
  space-12: "128px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-hover}"
  button-primary-active:
    backgroundColor: "{colors.cobalt-pressed}"
  button-secondary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.ink-soft}"
  tag:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.slate}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
  card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "40px"
---

# Design System: capanema.io

## 1. Overview

**Creative North Star: "The Working Notebook"**

capanema.io is a senior technology leader's well-kept notebook: structured, honest, showing the work. Every case study reads like a carefully written entry — real decisions, real tradeoffs, real outcomes — and every visual decision is in service of that reading. The system is content-first and understated: hierarchy, spacing, and type are tools for the text, not displays of design skill. Confidence comes from substance, not from design volume ("earned confidence" — PRODUCT.md).

The mechanics are engineered like the work it describes. A five-layer governance chain (Foundation primitives → Semantic tokens → Components → Patterns → Pages) means every color routes through a semantic token, and dark mode is automatic: each themed token is defined once with CSS `light-dark()` and re-resolves from `color-scheme`, so components need zero `dark:` variants and zero per-mode overrides. The design system is maintained in Pencil (`design-system-v3.2.pen`, a separate repo — the single source of truth); this file is its translation into the codebase. When they disagree, Pencil wins.

This system explicitly rejects the SaaS landing-page template (numbered eyebrows, hero metrics, identical card grids, cream backgrounds, gradient blobs), the generic LinkedIn-résumé-in-a-box, and the academic text wall. Timeless over trendy: nothing that will read as 2026 in 2028.

**Key Characteristics:**
- Content-first: type, spacing, and hierarchy serve long-form reading (680px prose measure).
- Token-driven theming: `light-dark()` + `color-scheme`; both themes ship from one definition.
- One reserved accent (Cobalt) with strict usage rules; warmth carried by voice and type, not decoration.
- Tactile and assured interactions: press-scale on buttons, quiet card lift — decisive but never showy.
- WCAG 2.1 AA in both themes, reduced-motion respected everywhere, 44px touch targets.
- Page container 1120px; prose measure 680px; pattern headers 820px.

## 2. Colors

A restrained strategy: cool slate neutrals plus one deep cobalt accent, deployed on well under 10% of any screen.

### Primary
- **Cobalt Deep** (#2150b8, `--accent-500`): the single brand accent. In light mode it is the primary action fill, link color, accent text, eyebrow bar, and focus ring. Hover deepens to **Cobalt Hover** (#1a4097), pressed to **Cobalt Pressed** (#16357a).
- **Cobalt Bright / Soft / Faint** (#3f6bd0 / #6e96e2 / #a6c1f0, `--accent-400/300/200`): the dark-mode ramp. Dark surfaces need lighter, less saturated cobalt to hold contrast — links use Soft, link hover uses Faint, focus ring uses Bright.

### Neutral
- **Ink** (#0f172a): primary text in light mode; also the dark "Contact/Footer" surface and the secondary button fill. The strongest voice on the page.
- **Ink Deep / Ink Soft** (#1e293b / #334155): prose text (light), dark-mode raised surfaces, secondary-button hover.
- **Slate / Slate Mid / Slate Soft / Slate Light** (#475569 / #64748b / #94a3b8 / #cbd5e1): the supporting-text and border ramp — secondary text, tertiary/muted text, strong borders, default borders. Never used for body copy below Slate (#475569, 4.5:1 floor).
- **Mist / Frost / White** (#e2e8f0 / #f8fafc / #ffffff): light-mode surfaces — subtle borders, tag fills, secondary surfaces, and the page itself. Pure white body background, never cream.
- **Night / Night Raised / Night Elevated** (#0b1020 / #111827 / #172033): the dark-mode surface stack, page → raised → elevated card.

Status colors exist as fg/surface pairs per mode (success green, warning amber, error red, info cobalt) in `src/app/globals.css`; color is never the only signal — always paired with an icon or label.

### Named Rules
**The Semantic-Only Rule.** Components never reference a Foundation primitive (`--neutral-*`, `--accent-*`, `--dark-*`) or a raw hex — only semantic token utilities (`bg-surface-elevated`, `text-text-secondary`, `border-border-subtle`). The hex values above exist so you can reason about contrast; they are forbidden in component code.

**The Reserved Accent Rule.** Cobalt appears only on eyebrows, CTAs, links, and active nav. Categories and tags are neutral; metrics and outcomes are ink. Emphasis comes from size and weight, never from spreading the accent.

**The light-dark() Rule.** Every themed token is defined once in `:root` with `light-dark(<light>, <dark>)`, resolved by `color-scheme` (OS default; a persisted `data-theme` on `<html>` overrides it via a pre-hydration script). Never write a `dark:` variant, never add a `@media (prefers-color-scheme)` block for colors, never hardcode a color. New themed tokens: define in `:root`, map in `@theme inline`.

## 3. Typography

**Display Font:** Red Hat Display (with Helvetica Neue, system-ui fallback)
**Body Font:** Red Hat Display — one family, committed weight and size contrast
**Label/Mono Font:** JetBrains Mono (eyebrows, tags, dates, metadata, code)

**Character:** A humanist grotesque with editorial confidence at display sizes, warmer and more expressive than a geometric sans; the mono is the engineer's hand — precise little labels annotating the notebook.

### Hierarchy
Tokenized as `text-display-xl … text-caption` utilities (size + line-height + tracking travel together).

- **Display** (600, 72px / 64px / 56px, 1.05–1.08, −1.5 to −1.1px): hero headlines only (`text-display-xl/l/m`).
- **Headline** (600, 48px / 40px / 32px, 1.1–1.2, −1 to −0.5px): page and section headings (`text-h1/h2/h3`).
- **Title** (600, 24px / 20px, 1.3–1.4, −0.3 to 0px): card titles, sub-sections (`text-h4/h5`).
- **Body** (500, 18px / 16px / 14px, 1.6; prose at 1.7): reading text on `text-prose`, max measure 680px (`--measure-prose`).
- **Label** (500, 12px JetBrains Mono, +0.5 to +1px tracking): eyebrows, tags, dates, reading time, metadata.

### Named Rules
**The Medium-Body Rule.** Body and small text always use weight 500 (`font-medium`). Red Hat Display renders optically lighter than Inter; 400 produces insufficient stroke contrast.

**The Measure Rule.** Prose never exceeds 680px. The page container is 1120px, pattern headers 820px, hero sublines 640px — reading comfort defines every width.

## 4. Elevation

**The Paper-on-Desk Rule.** Cards sit barely above the page — a printed sheet on a desk. The resting shadow is intentional but whisper-soft; hover lifts the sheet slightly. Depth beyond that is conveyed by borders (`border-subtle` → `border-strong`) and the surface stack (primary → secondary → elevated), not by heavier shadows. Both shadow colors are themed tokens, so elevation survives dark mode without adjustment.

### Shadow Vocabulary
- **Resting card** (`box-shadow: 0 1px 3px var(--shadow-1a)` — #0f172a at 8% light / black at 35% dark): the default card state.
- **Hover lift** (`box-shadow: 0 4px 16px var(--shadow-1a)`): interactive cards on hover, paired with a border shift to `border-strong`. Transition 120ms `cubic-bezier(0.2, 0, 0, 1)`.

Motion tokens back all elevation changes: `--duration-fast` 120ms (hover), `--duration-base` 200ms, `--duration-slow` 320ms (entrances), easing `ease-standard` (0.2, 0, 0, 1) and `ease-emphasized` (0.3, 0, 0, 1). All motion collapses to ~0ms under `prefers-reduced-motion: reduce`.

## 5. Components

All components live in `src/components/ui/` (one file each, barrel-exported), map to Pencil masters, and consume semantic tokens only. The overall feel is **tactile and assured**: physical, decisive feedback — controls that feel good to use without ever showing off.

### Buttons
- **Shape:** gently rounded (8px), min-height 44px (touch target floor), padding 12px 24px, 14px semibold label.
- **Primary:** Cobalt fill (`action-primary`) with white text; hover deepens, press darkens further **and scales to 0.97** — the tactile signature.
- **Secondary:** Ink fill (`action-secondary`) with inverse text; hover lightens to Ink Soft.
- **Hover / Focus:** 120ms standard-ease color transitions; global 2px cobalt `:focus-visible` ring, offset 2px.
- Renders as `<a>` when given `href`, `<button type="button">` otherwise. `IconButton` is the square 44px variant and requires an accessible `label`.

### Chips
- **Tag:** mono 12px/500 label in a Mist pill (`surface-tertiary`), Slate text, +0.5px tracking, padding 4px 12px; optional 6px cobalt dot. Tags are neutral — never accent-colored (Reserved Accent Rule).
- **Filter chips** (index explorers): same pill language, ≥36px target, toggle state via `aria-pressed`.

### Cards / Containers
- **Corner Style:** 12px radius.
- **Background:** `surface-elevated` (white light / Night Elevated dark) over 1px `border-subtle`.
- **Shadow Strategy:** Paper-on-Desk (see Elevation) — resting shadow, hover lift + border shift.
- **Internal Padding:** 40px (space-7), internal gaps 24px.
- **CaseStudyCard** (signature): mono category line, title, summary, hairline divider, outcome metrics as `<dl>` (32px ink values — never accent), and a "Read case study" link that slides its arrow 2px on hover. The whole card is the link.

### Inputs / Fields
- **Style:** tokenized text inputs and selects on the index explorers — `surface-primary` background, 1px `border-default`, 8px radius, 44px min-height, labels associated via `htmlFor`/`id`.
- **Focus:** the global cobalt `:focus-visible` ring; no custom glow.
- **Result counts** announce through an `aria-live="polite"` region.

### Navigation
- **NavItem:** 14px medium Slate text, 2px transparent bottom border reserving space; active state is semibold Ink with a 2px cobalt underline, exposed via `aria-current="page"`. Hover shifts text to primary in 120ms.
- **SiteHeader:** brand + primary nav + ThemeToggle (persists choice to `localStorage`, sets `data-theme`).
- **Breadcrumb / ToCRail:** mono metadata styling; the ToC rail scroll-spies with IntersectionObserver and hides below `lg`.

### Eyebrow (signature)
The structural-accent texture: a 3×14px cobalt pill bar followed by a mono 12px cobalt label, +1px tracking. This is the system's one licensed accent flourish — one per section header, never stacked, never numbered. `SectionTick` (24×3px cobalt rule) is its codebase-only sibling for headline underlines.

### Dark panels
`surface-dark` + `text-on-dark*` tokens are dark in **both** modes — the Footer, ContactSection, and FeaturedCaseStudy metric panel. `Metric` takes `tone="onDark"` there.

## 6. Do's and Don'ts

### Do:
- **Do** route every color through a semantic token utility; define new themed tokens once with `light-dark()` in `:root` and map them in `@theme inline`.
- **Do** verify WCAG AA in **both** themes before calling anything done: body ≥4.5:1, large text and UI ≥3:1, focus ring ≥3:1.
- **Do** keep body text at weight 500+ (the Medium-Body Rule) and prose within 680px.
- **Do** keep interactive targets ≥44×44px (`min-h-11`), give every control a visible `:focus-visible` ring, and expose state (`aria-current`, `aria-pressed`, `aria-live`).
- **Do** write complete literal Tailwind classes — never interpolate class names (`text-${x}` is invisible to Tailwind).
- **Do** gate every animation behind `prefers-reduced-motion` and use the motion tokens (120/200/320ms, standard/emphasized easing).
- **Do** compose from existing components (`src/components/ui/`) and patterns before inventing; one `<h1>` per page, headings never skip levels.

### Don't:
- **Don't** build the **"SaaS landing-page template"** (PRODUCT.md anti-reference #1): numbered eyebrows (`01 / About`), hero metrics, identical card grids, cream or sand backgrounds, gradient blobs.
- **Don't** produce the **"generic LinkedIn-style résumé in a box"** (anti-reference #2) — bullet-list achievements with no voice — or the **"academic / dry"** text wall (anti-reference #3).
- **Don't** use `dark:` variants, `@media (prefers-color-scheme)` color blocks, raw hex, or Foundation primitives (`--neutral-*`, `--accent-*`, `--dark-*`) in components. The deprecated shadcn `--` token set stays dead — never reintroduce it.
- **Don't** spread the accent: no cobalt categories, tags, metrics, or decorative fills. Accent = eyebrows, CTAs, links, active nav. Nothing else.
- **Don't** use gradient text, glassmorphism, side-stripe borders (>1px colored `border-left`), or shadows heavier than the two-step vocabulary. If a card looks like it's floating, the shadow is too dark.
- **Don't** let color be the only signal — status always pairs fg + surface + icon/label.
- **Don't** drop below 4.5:1 on muted/secondary text "for elegance"; Slate (#475569) is the light-mode floor for body-size copy.
- **Don't** ship any surface that reads as 2026 in 2028 — no trend-chasing; typographic hierarchy, spacing, and structure carry the design.
