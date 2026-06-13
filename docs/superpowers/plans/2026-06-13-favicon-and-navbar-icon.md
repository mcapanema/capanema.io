# Favicon & Navbar Icon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire up the generated favicon asset set into the Next.js app, and add a theme-aware brand icon to the left of the "Murilo Capanema" wordmark in the site header.

**Architecture:** Favicons use Next.js 16 **file-based metadata conventions** (`favicon.ico` / `icon.svg` / `apple-icon.png` in `src/app/`) plus an `app/manifest.ts` — Next auto-injects all the `<link>` tags, no manual `metadata.icons` needed. The navbar logo is two plain `<img>` elements (light + dark variants) whose visibility is swapped in pure CSS, mirroring the existing `color-scheme` / `data-theme` mechanism already documented in `globals.css` — so it tracks the OS by default and respects the persisted ThemeToggle choice, with no JavaScript and no flash.

**Tech Stack:** Next.js 16 (App Router, Turbopack), Tailwind CSS v4, `next/font`, macOS `sips` (image resize). No new dependencies.

---

## Context the executor must know

- **This repo's Next.js is non-standard** — before touching metadata/icon code, read `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/app-icons.md` (already verified for this plan). Heed `AGENTS.md`.
- **Source assets already on disk (untracked):**
  - `favicon/favicon.ico`, `favicon/favicon.svg`, `favicon/apple-touch-icon.png`, `favicon/favicon-96x96.png`, `favicon/web-app-manifest-192x192.png`, `favicon/web-app-manifest-512x512.png`, `favicon/site.webmanifest`
  - `icon.png` (587×587, light-theme logo) and `icon-negative-v2.png` (1024×1024, dark-theme logo) at the repo root.
- **`favicon/favicon.svg` already self-switches** light/dark via an embedded `@media (prefers-color-scheme: dark)` block — so it covers the favicon for both modes on its own. No edit to it is required.
- **Theme mechanism (do not break it):** `:root` defaults to `color-scheme: light dark` (follow OS). A `data-theme="light"|"dark"` attribute on `<html>` (set by the pre-hydration script in `layout.tsx` and by `ThemeToggle`) forces one mode and wins over the OS. The navbar logo CSS below replicates exactly these states.
- **No `next/image`** is used anywhere in this repo — use a plain `<img>` to stay consistent. **No `dark:` variants, no raw hex** in components (CLAUDE.md). The logo swap lives in `globals.css` as plain CSS, not Tailwind `dark:` utilities.

## File structure (created / modified / removed)

- **Create:** `src/app/favicon.ico` (moved), `src/app/icon.svg` (moved), `src/app/apple-icon.png` (moved), `src/app/manifest.ts`
- **Create:** `public/web-app-manifest-192x192.png` (moved), `public/web-app-manifest-512x512.png` (moved), `public/logo-light.png` (resized), `public/logo-dark.png` (resized)
- **Modify:** `src/app/globals.css` (append logo-swap CSS), `src/components/ui/SiteHeader.tsx` (render logo)
- **Remove:** the `favicon/` directory and the root `icon.png` / `icon-negative-v2.png` originals (consumed into `src/app/` and `public/`)

---

### Task 0: Create the feature branch

**Files:** none (git only)

- [ ] **Step 1: Branch from `main`**

CLAUDE.md forbids committing to `main`. Confirm you are on `main` and up to date, then branch.

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
git checkout main && git pull --ff-only
git checkout -b feat/favicon-and-navbar-icon
```
Expected: `Switched to a new branch 'feat/favicon-and-navbar-icon'`

---

### Task 1: Wire up the favicon asset set

**Files:**
- Create (move): `src/app/favicon.ico`, `src/app/icon.svg`, `src/app/apple-icon.png`
- Create (move): `public/web-app-manifest-192x192.png`, `public/web-app-manifest-512x512.png`
- Create: `src/app/manifest.ts`
- Remove: `favicon/` directory

- [ ] **Step 1: Move the favicon files into their Next.js convention locations**

Next 16 maps these exact filenames in `src/app/` to `<link>` tags automatically: `favicon.ico` → `<link rel="icon" sizes="any">`, `icon.svg` → svg icon link, `apple-icon.png` → `<link rel="apple-touch-icon">`. The two `web-app-manifest-*.png` go in `public/` because the manifest references them by absolute path.

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
mv favicon/favicon.ico            src/app/favicon.ico
mv favicon/favicon.svg            src/app/icon.svg
mv favicon/apple-touch-icon.png   src/app/apple-icon.png
mv favicon/web-app-manifest-192x192.png public/web-app-manifest-192x192.png
mv favicon/web-app-manifest-512x512.png public/web-app-manifest-512x512.png
```
Expected: no output (success).

- [ ] **Step 2: Remove the leftover source files**

`favicon-96x96.png` is redundant (`favicon.ico` already provides the raster fallback, `icon.svg` the modern one) and `site.webmanifest` is replaced by `manifest.ts` in the next step. YAGNI — drop them and the now-empty directory.

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
rm favicon/favicon-96x96.png favicon/site.webmanifest
rmdir favicon
```
Expected: no output; `favicon/` no longer exists.

- [ ] **Step 3: Create the web manifest as a typed route**

`app/manifest.ts` is served at `/manifest.webmanifest` and Next auto-injects `<link rel="manifest">`. Contents mirror the original `site.webmanifest` exactly.

Create `src/app/manifest.ts`:
```ts
import type { MetadataRoute } from "next";

// Served at /manifest.webmanifest; Next injects <link rel="manifest"> for it.
// Mirrors the generated site.webmanifest. The two icons live in /public.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Capanema",
    short_name: "Capanema",
    icons: [
      {
        src: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#ffffff",
    display: "standalone",
  };
}
```

- [ ] **Step 4: Build to verify the conventions are picked up**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io && npm run build
```
Expected: build succeeds. In the route list you should see entries for `/favicon.ico`, `/icon.svg`, `/apple-icon.png`, and `/manifest.webmanifest` (Next emits these as routes). No errors.

- [ ] **Step 5: Verify the injected `<head>` tags against a running server**

Start the dev server in the background, fetch the homepage, and confirm the tags. (Dev is enough; the metadata renders into the streamed HTML.)

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
(npm run dev >/tmp/cap-dev.log 2>&1 &) ; sleep 6
curl -s http://localhost:3000/ | grep -oE '<link rel="(icon|apple-touch-icon|manifest)"[^>]*>'
```
Expected: lines containing `rel="icon"` referencing `favicon.ico` (sizes="any"), a second `rel="icon"` referencing `/icon.svg`, a `rel="apple-touch-icon"` referencing `/apple-icon.png`, and `rel="manifest"` referencing `/manifest.webmanifest`.

Also confirm the manifest itself serves:
```bash
curl -s http://localhost:3000/manifest.webmanifest | head -c 200
```
Expected: JSON starting with `{"name":"Capanema",...}`.

Stop the server:
```bash
pkill -f "next dev" || true
```

- [ ] **Step 6: Commit**

```bash
cd /Users/murilo/Workspace/capanema.io
git add src/app/favicon.ico src/app/icon.svg src/app/apple-icon.png src/app/manifest.ts \
        public/web-app-manifest-192x192.png public/web-app-manifest-512x512.png
git commit -m "feat(favicon): wire favicon, svg icon, apple icon, and web manifest"
```

---

### Task 2: Prepare the navbar logo assets

**Files:**
- Create (resized): `public/logo-light.png`, `public/logo-dark.png`
- Remove: root `icon.png`, `icon-negative-v2.png`

- [ ] **Step 1: Resize the source logos to a navbar-appropriate size**

The icon renders at ~32px; serve 2× (64×64) for crispness on retina. `sips` ships with macOS. `-z h w` resizes (it preserves the square aspect since the sources are square: 587² and 1024²).

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
sips -z 64 64 icon.png            --out public/logo-light.png
sips -z 64 64 icon-negative-v2.png --out public/logo-dark.png
```
Expected: `sips` prints the source/destination paths for each. Two new files in `public/`.

- [ ] **Step 2: Confirm the outputs are 64×64 and small**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
sips -g pixelWidth -g pixelHeight public/logo-light.png public/logo-dark.png
ls -la public/logo-light.png public/logo-dark.png
```
Expected: both report `pixelWidth: 64` / `pixelHeight: 64`; each file is a few KB (not the original 386KB / 1.4MB).

- [ ] **Step 3: Remove the oversized root originals**

They are untracked and now superseded by the `public/` copies.

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
rm icon.png icon-negative-v2.png
```
Expected: no output.

- [ ] **Step 4: Commit**

```bash
cd /Users/murilo/Workspace/capanema.io
git add public/logo-light.png public/logo-dark.png
git commit -m "feat(brand): add 64px navbar logo assets (light + dark)"
```

---

### Task 3: Add the theme-aware logo-swap CSS

**Files:**
- Modify: `src/app/globals.css` (append at end of file, after the `:focus-visible` block)

- [ ] **Step 1: Append the logo-swap rules**

These four CSS states exactly mirror the theme mechanism documented at the top of `globals.css`: default = light shown; OS-dark (only when no forced choice) = dark shown; `data-theme="dark"` = dark shown regardless of OS; `data-theme="light"` = light stays shown regardless of OS (covered by the default + the media query targeting only `:not([data-theme])`).

Append to the end of `src/app/globals.css`:
```css

/* ----------------------------------------------------------------------------
   Brand logo · theme-aware swap (navbar)
   Two <img>s share these classes; visibility follows the same color-scheme /
   data-theme mechanism as the token layer above — OS by default, overridden by
   a persisted data-theme choice. No JS, no flash, no `dark:` variant needed.
   ---------------------------------------------------------------------------- */
.logo-light {
  display: block;
}
.logo-dark {
  display: none;
}

/* Forced dark via the ThemeToggle wins over the OS setting. */
:root[data-theme="dark"] .logo-light {
  display: none;
}
:root[data-theme="dark"] .logo-dark {
  display: block;
}

/* Follow the OS only when no explicit choice is persisted. */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) .logo-light {
    display: none;
  }
  :root:not([data-theme]) .logo-dark {
    display: block;
  }
}
```

- [ ] **Step 2: Build to confirm the CSS still compiles**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io && npm run build
```
Expected: build succeeds, no CSS errors. (The classes aren't used yet — that's fine; they're plain CSS, not Tailwind-detected utilities, so they survive purging.)

- [ ] **Step 3: Commit**

```bash
cd /Users/murilo/Workspace/capanema.io
git add src/app/globals.css
git commit -m "feat(brand): add theme-aware logo-swap CSS"
```

---

### Task 4: Render the logo in the site header

**Files:**
- Modify: `src/components/ui/SiteHeader.tsx:21-26` (the home-link anchor)

- [ ] **Step 1: Replace the brand anchor with icon + wordmark**

Current code (`src/components/ui/SiteHeader.tsx:21-26`):
```tsx
        <a
          href="/"
          className="text-base font-semibold tracking-[-0.3px] text-text-primary"
        >
          Murilo Capanema
        </a>
```

Replace with (icon left of wordmark, ~32px = `h-8 w-8`; both images decorative — `alt=""` — because the wordmark text already names the link, avoiding a duplicate announcement to screen readers):
```tsx
        <a
          href="/"
          className="inline-flex items-center gap-2 text-base font-semibold tracking-[-0.3px] text-text-primary"
        >
          <img
            src="/logo-light.png"
            alt=""
            width={32}
            height={32}
            className="logo-light h-8 w-8"
          />
          <img
            src="/logo-dark.png"
            alt=""
            width={32}
            height={32}
            className="logo-dark h-8 w-8"
          />
          Murilo Capanema
        </a>
```

- [ ] **Step 2: Build to confirm it compiles**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io && npm run build
```
Expected: build succeeds, no type or lint errors.

- [ ] **Step 3: Verify both images render in the served HTML**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io
(npm run dev >/tmp/cap-dev.log 2>&1 &) ; sleep 6
curl -s http://localhost:3000/ | grep -oE '<img[^>]*logo-(light|dark)[^>]*>'
```
Expected: two `<img>` tags, one with class containing `logo-light` and `src="/logo-light.png"`, one with `logo-dark` and `src="/logo-dark.png"`.

- [ ] **Step 4: Visually verify the theme swap (manual)**

With the dev server still running, open `http://localhost:3000/` in a browser and check all four states:
1. OS in light mode, no toggle → light logo shows next to the wordmark.
2. Click the ThemeToggle to dark → dark (negative) logo shows; only one logo visible at a time.
3. Toggle back to light → light logo shows.
4. Reload after forcing dark → no flash of the wrong logo on first paint.

Then stop the server:
```bash
pkill -f "next dev" || true
```

If a logo looks wrong-sized or off-baseline, adjust the `h-8 w-8` / `gap-2` only; do not reintroduce hardcoded colors or `dark:` variants.

- [ ] **Step 5: Commit**

```bash
cd /Users/murilo/Workspace/capanema.io
git add src/components/ui/SiteHeader.tsx
git commit -m "feat(header): add theme-aware brand icon left of the wordmark"
```

---

### Task 5: Final verification & PR

**Files:** none (verification + git)

- [ ] **Step 1: Clean build from scratch**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io && rm -rf .next && npm run build
```
Expected: build succeeds; all pages prerender as before; routes for `/favicon.ico`, `/icon.svg`, `/apple-icon.png`, `/manifest.webmanifest` present.

- [ ] **Step 2: Confirm the working tree is clean and nothing stray remains**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io && git status
```
Expected: clean tree (no `favicon/`, no root `icon.png` / `icon-negative-v2.png`, no untracked assets). If any source asset is still untracked, it was missed — resolve before the PR.

- [ ] **Step 3: Open the PR (base `main`)**

```bash
cd /Users/murilo/Workspace/capanema.io
git push -u origin feat/favicon-and-navbar-icon
gh pr create --base main --title "feat: favicon set + theme-aware navbar brand icon" --body "$(cat <<'EOF'
## What
- Wire the generated favicon set into Next.js via file conventions (`app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png`) plus a typed `app/manifest.ts`.
- Add a theme-aware brand icon to the left of the "Murilo Capanema" wordmark in the site header (light + dark variants, 64px assets served at ~32px).

## Why
The site had no favicon wired and no brand mark in the navbar.

## How
- Favicons use Next 16 file-based metadata conventions — Next auto-injects the `<link>` tags; no manual `metadata.icons`. `icon.svg` self-switches light/dark via its embedded media query.
- The navbar logo is two plain `<img>`s swapped in pure CSS that mirrors the existing `color-scheme` / `data-theme` theme mechanism in `globals.css` — tracks the OS by default, respects the persisted ThemeToggle choice, no JS, no flash. No `dark:` variants, no hardcoded colors.

## Tradeoffs
- Dropped the redundant `favicon-96x96.png` (covered by `favicon.ico` + `icon.svg`).
- Logos served as raster PNGs (no `next/image`, consistent with the rest of the repo); resized to 64px so the files are a few KB.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
Expected: PR URL printed. Leave it open for Murilo to review and merge.

---

## Self-Review (performed against the spec)

- **Spec coverage:** favicon wiring (Task 1) ✅; navbar icon, light + dark variants (Tasks 2–4) ✅; icon left of wordmark + ~32px size (Task 4, per the confirmed decisions) ✅; uses the provided `favicon/` set and `icon.png` / `icon-negative-v2.png` ✅.
- **Placeholder scan:** every code/CSS step shows complete content; every command has expected output. No TODOs.
- **Type/name consistency:** CSS classes `logo-light` / `logo-dark` are defined in Task 3 and consumed verbatim in Task 4; asset paths `/logo-light.png` / `/logo-dark.png` match between Task 2 (creation) and Task 4 (use); manifest icon paths match the files moved into `public/` in Task 1.
- **Constraint check:** no `dark:` variants, no raw hex in components, no `next/image`, no remark/rehype plugins touched, branch-from-`main` workflow honored.
