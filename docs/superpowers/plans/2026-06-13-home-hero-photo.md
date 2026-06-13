# Home Hero Photo Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a portrait photo of Murilo to the home hero — to the right of the headline on desktop, above the headline on mobile.

**Architecture:** Restructure the existing single-column hero `<section>` in `src/app/page.tsx` into a two-column flex row (text + photo) that collapses to a single column on small screens. The photo is rendered with `next/image` for automatic size/format optimization and a blur-up placeholder (the source is a 2.3 MB PNG). The `CredibilityStrip` stays full-width below the row. Photo shape: natural ~4:5 portrait, `rounded-xl` (12px, matches cards), DS card shadow, subtle border. Mobile order: photo first (above the headline).

**Tech Stack:** Next.js 16 (App Router, Turbopack), `next/image` with static import, Tailwind CSS v4 semantic tokens.

---

## File Structure

- `src/app/me.png` — **new** (moved from repo-root `photo.png`). Lives inside the importable tree so it can be statically imported by `next/image` (this auto-derives intrinsic width/height and enables `placeholder="blur"`). The repo's other images (logos, manifest icons) live in `public/`, but those are referenced as path strings; a static import gives the hero photo the optimization + blur win, which is why it goes under `src/app/` instead.
- `src/app/page.tsx` — **modify**. Add `next/image` import + static photo import; restructure the hero `<section>` into a two-column row. No other file changes.

**Why `next/image` here when logos use plain `<img>`:** the logos render at 8×8px so a plain `<img>` is fine; this hero photo is a 1122×1402 / 2.3 MB source displayed up to 340px wide, where `next/image`'s on-demand resize + WebP + blur placeholder matter. This is the idiomatic Next 16 choice (`node_modules/next/dist/docs/01-app/01-getting-started/12-images.md`).

---

### Task 1: Create the feature branch

**Files:** none (git only)

- [ ] **Step 1: Branch from `main`**

CLAUDE.md forbids committing to `main`. Confirm you're on `main` and create the branch.

Run:
```bash
git checkout main && git checkout -b feat/home-hero-photo && git branch --show-current
```
Expected: final line prints `feat/home-hero-photo`.

---

### Task 2: Relocate the photo asset into the importable tree

**Files:**
- Move: repo-root `photo.png` → `src/app/me.png`

`photo.png` is currently untracked at the repo root (`git status` shows `?? photo.png`), so a plain `mv` is correct — there's nothing tracked to `git mv`.

- [ ] **Step 1: Move and rename the file**

Run:
```bash
mv photo.png src/app/me.png
```

- [ ] **Step 2: Verify it landed and the root is clean**

Run:
```bash
ls -l src/app/me.png && ls photo.png 2>&1
```
Expected: `src/app/me.png` exists (~2.3M); the second `ls` prints `ls: photo.png: No such file or directory`.

- [ ] **Step 3: Confirm intrinsic dimensions (for reference only)**

Run:
```bash
file src/app/me.png
```
Expected: `PNG image data, 1122 x 1402, 8-bit/color RGB, non-interlaced`. (No code uses these numbers — the static import derives them — this just confirms the right file moved.)

---

### Task 3: Add the photo to the hero

**Files:**
- Modify: `src/app/page.tsx`

This task has two edits: (a) the import block, (b) the hero `<section>`.

- [ ] **Step 1: Add the `next/image` and static photo imports**

Replace the top import block (lines 1–11) of `src/app/page.tsx`:

```tsx
import { ArrowRight } from "lucide-react";
import {
  ArticleCard,
  Button,
  CaseStudyCard,
  CredibilityStrip,
  Footer,
  SiteHeader,
} from "@/components/ui";
import { getCaseStudies } from "@/content/case-studies";
import { getArticles } from "@/content/articles";
```

with:

```tsx
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  ArticleCard,
  Button,
  CaseStudyCard,
  CredibilityStrip,
  Footer,
  SiteHeader,
} from "@/components/ui";
import { getCaseStudies } from "@/content/case-studies";
import { getArticles } from "@/content/articles";
import meImage from "./me.png";
```

- [ ] **Step 2: Restructure the hero section**

Replace the entire hero `<section>` block (currently lines 48–75 — the `{/* Hero — DS Hero Pattern */}` comment through its closing `</section>`):

```tsx
        {/* Hero — DS Hero Pattern */}
        <section className="flex flex-col gap-12 py-16 md:py-24">
          <div className="flex flex-col gap-6">
            <span className="font-mono text-sm tracking-[1px] text-text-accent">
              CTO · PLATFORM &amp; AI · ORG SCALING
            </span>
            <h1 className="max-w-[900px] text-[40px] font-semibold leading-[1.05] tracking-[-1px] text-text-primary sm:text-[56px] sm:tracking-[-1.1px] lg:text-[64px] lg:tracking-[-1.3px]">
              Scaling engineering organizations and the platforms they ship.
            </h1>
            <p className="max-w-[640px] text-lg leading-[1.6] text-text-secondary">
              Two decades turning early teams into durable engineering
              organizations — and the data and AI platforms that let them move
              fast without breaking trust.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                href="/case-studies"
                icon={<ArrowRight className="size-4" />}
              >
                View case studies
              </Button>
              <Button variant="secondary" href="/resume">
                Read résumé
              </Button>
            </div>
          </div>
          <CredibilityStrip companies={COMPANIES} />
        </section>
```

with:

```tsx
        {/* Hero — DS Hero Pattern */}
        <section className="flex flex-col gap-12 py-16 md:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Portrait — first on mobile (above the headline), right on desktop */}
            <div className="order-first lg:order-last lg:shrink-0">
              <Image
                src={meImage}
                alt="Murilo Capanema"
                priority
                placeholder="blur"
                sizes="(min-width: 1024px) 340px, (min-width: 640px) 260px, 220px"
                className="w-[220px] rounded-xl border border-border-subtle shadow-[0_1px_3px_var(--shadow-1a)] sm:w-[260px] lg:w-[340px]"
              />
            </div>
            {/* Headline + subline + actions */}
            <div className="flex flex-col gap-6 lg:min-w-0 lg:flex-1">
              <span className="font-mono text-sm tracking-[1px] text-text-accent">
                CTO · PLATFORM &amp; AI · ORG SCALING
              </span>
              <h1 className="max-w-[900px] text-[40px] font-semibold leading-[1.05] tracking-[-1px] text-text-primary sm:text-[56px] sm:tracking-[-1.1px] lg:text-[64px] lg:tracking-[-1.3px]">
                Scaling engineering organizations and the platforms they ship.
              </h1>
              <p className="max-w-[640px] text-lg leading-[1.6] text-text-secondary">
                Two decades turning early teams into durable engineering
                organizations — and the data and AI platforms that let them move
                fast without breaking trust.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  href="/case-studies"
                  icon={<ArrowRight className="size-4" />}
                >
                  View case studies
                </Button>
                <Button variant="secondary" href="/resume">
                  Read résumé
                </Button>
              </div>
            </div>
          </div>
          <CredibilityStrip companies={COMPANIES} />
        </section>
```

Notes on the structure (do not add these as comments to the file):
- `order-first` on the photo + the parent's `flex-col` puts the photo **above** the headline on mobile. `lg:flex-row` + `lg:order-last` moves it to the **right** on desktop.
- `lg:flex-1 lg:min-w-0` lets the text column take the remaining width and wrap long words cleanly; `lg:shrink-0` keeps the photo at its fixed width.
- `w-[220px] / sm:w-[260px] / lg:w-[340px]` with `h-auto` implied (no height set, intrinsic ratio from the static import preserves ~4:5). `sizes` matches those breakpoints so the browser fetches an appropriately sized image instead of the full source.
- All visual values use DS tokens: `rounded-xl` (card radius), `border-border-subtle`, `shadow-[0_1px_3px_var(--shadow-1a)]` (DS card elevation). No raw hex.
- `priority` because the photo is above the fold (skips lazy-loading, avoids LCP delay).

---

### Task 4: Verify build, lint, and rendered output

**Files:** none (verification only)

- [ ] **Step 1: Production build passes**

Run:
```bash
npm run build
```
Expected: build completes with no errors; the `/` route appears in the route summary. Specifically there must be **no** errors mentioning `me.png`, static image import, or `next/image`.

- [ ] **Step 2: Lint passes**

Run:
```bash
npm run lint
```
Expected: no errors. (A warning-free run is ideal; there must be no errors referencing `page.tsx`.)

- [ ] **Step 3: Confirm the photo renders in the served HTML**

Start the dev server in the background, then check the markup.

Run:
```bash
npm run dev &
sleep 4
curl -s http://localhost:3000/ | grep -o 'alt="Murilo Capanema"' | head -1
kill %1 2>/dev/null
```
Expected: prints `alt="Murilo Capanema"` (confirms the `next/image` element rendered into the hero). If it prints nothing, the image is not rendering — stop and debug before committing.

---

### Task 5: Commit and open the PR

**Files:** none (git only)

- [ ] **Step 1: Stage the asset move + the page change**

Run:
```bash
git add src/app/me.png src/app/page.tsx docs/superpowers/plans/2026-06-13-home-hero-photo.md
git status
```
Expected: `src/app/me.png` (new file), `src/app/page.tsx` (modified), and the plan doc are staged; no other unexpected changes.

- [ ] **Step 2: Commit**

Run:
```bash
git commit -m "$(cat <<'EOF'
feat(home): add hero portrait photo

Adds a portrait of Murilo to the home hero — right of the headline on
desktop, above it on mobile. Rendered via next/image (static import) for
size/format optimization and a blur-up placeholder. Shape is the natural
~4:5 portrait with rounded-xl corners, DS card shadow, and a subtle border.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
EOF
)"
```
Expected: one commit created on `feat/home-hero-photo`.

- [ ] **Step 3: Push and open the PR**

Run:
```bash
git push -u origin feat/home-hero-photo
gh pr create --base main --title "feat(home): add hero portrait photo" --body "$(cat <<'EOF'
## What
Adds a portrait photo of Murilo to the home hero.

- Desktop: photo sits to the **right** of the headline (two-column flex row).
- Mobile: photo sits **above** the headline (single column, photo first).
- Rendered with `next/image` via a static import (`src/app/me.png`) for automatic resize/WebP and a blur-up placeholder; `priority` since it's above the fold.
- Shape: natural ~4:5 portrait, `rounded-xl`, DS card shadow + subtle border. All values are DS semantic tokens — no raw hex, no `dark:` variants (dark mode is automatic).
- `CredibilityStrip` unchanged, still full-width below the hero row.

## Why
The hero previously had no image of Murilo. A portrait personalizes the landing experience.

## Tradeoffs
- The headline column is narrower on desktop, so the H1 wraps to more lines next to the photo — intentional and within the DS hero pattern.
- Source PNG is 2.3 MB; `next/image` serves optimized variants, so delivered size is far smaller.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
Expected: PR created against `main`. Leave it open for Murilo to review and merge.

---

## Self-Review

**Spec coverage:**
- "photo to the right of the headline" → Task 3, `lg:flex-row` + `lg:order-last`. ✓
- "use photo.png" → Task 2 moves it to `src/app/me.png`, Task 3 imports it. ✓
- Photo shape = rounded portrait (user choice) → `rounded-xl`, ~4:5 natural, shadow + border. ✓
- Mobile = photo above headline (user choice) → `order-first` in `flex-col`. ✓

**Placeholder scan:** No TBD/TODO/"add error handling" — every code step shows full literal code; every command lists expected output. ✓

**Type/name consistency:** `meImage` import name is used verbatim in the `<Image src={meImage}>` JSX. The file is `src/app/me.png` in Tasks 2, 3 (import `./me.png`), and 5 (git add). `alt="Murilo Capanema"` is identical in Task 3 and the Task 4 grep. ✓

**Constraints honored:** DS semantic tokens only (no hex, no `dark:`); no remark/rehype plugins touched; Tailwind v4 utilities; git workflow (branch from `main`, build before PR, PR open for review). ✓
