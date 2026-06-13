# Theme Toggle (Light / Dark) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a header toggle that switches the site between light and dark themes independently of the OS setting, persists the choice across reloads, and keeps "follow system preference" as the default behavior when no choice has been made.

**Architecture:** Move theming from a `@media (prefers-color-scheme: dark)` block to the CSS `light-dark()` function driven by `color-scheme`. `:root` keeps `color-scheme: light dark` (= follow OS) by default; a `data-theme` attribute on `<html>` overrides it to `light` or `dark`. A pre-hydration inline script reads `localStorage` and applies `data-theme` before first paint (no flash). A small client `ThemeToggle` component reads/writes `localStorage` and flips the attribute. Each themed token keeps both its light and dark value in **one** declaration, so there is no duplicated dark-mode block to drift (honors DESIGN.md §1 Simplicity and §7 Maintainability).

**Tech Stack:** Next.js 16 (App Router), Tailwind CSS v4 (`@theme inline`), CSS `light-dark()` / `color-scheme`, `lucide-react` icons, React 19 client component.

**Why `light-dark()` instead of a duplicated `[data-theme="dark"]` block?** The classic data-attribute approach would require copying the entire ~50-line dark token set into a second selector (one inside `@media`, one under `[data-theme="dark"]`), because declarations can't be shared across a media-query boundary. DESIGN.md explicitly warns against drift and prioritizes maintainability, and every themed token here is a color — exactly what `light-dark()` is for. Browser support is broad (Chrome/Edge 123+, Firefox 120+, Safari 17.5+, all shipped 2024). `color-scheme` also themes native form controls/scrollbars correctly, which helps the index-page inputs/selects (DESIGN.md §11).

**Two product decisions (locked):**
1. **2-state toggle** (light ⇄ dark). "Default = system preference" is satisfied by the *initial* state when `localStorage` has no `theme` key; once the user clicks, the choice is explicit and persists. Returning to pure system-follow means clearing the stored key (out of scope; possible future "Auto" option).
2. **Placement:** in `SiteHeader`, right of the primary nav — global, so `/styleguide` and every page inherit it.

**Verification note (no TDD framework):** This repo has no test runner (`package.json` scripts = `dev`/`build`/`start`/`lint`). CLAUDE.md and DESIGN.md §12 mandate verification via `npm run build` passing + manual checks in **both** themes. Per instruction priority (project instructions over skill defaults) and YAGNI, this plan does **not** introduce a test framework; it verifies via `npm run build`, `npm run lint`, and concrete manual cross-theme/persistence checks. Theme-resolution logic is kept as tiny pure helpers so correctness is inspectable.

---

## File structure

| File | Responsibility | Change |
|---|---|---|
| `src/app/globals.css` | Token layer | Convert themed tokens to `light-dark()`; replace `@media (prefers-color-scheme: dark)` with `color-scheme` + `[data-theme]` rules |
| `src/app/layout.tsx` | Root layout | Add pre-hydration theme-init `<script>`; `suppressHydrationWarning` on `<html>` |
| `src/components/ui/ThemeToggle.tsx` | The toggle control (client) | New file |
| `src/components/ui/index.ts` | UI barrel | Export `ThemeToggle` |
| `src/components/ui/SiteHeader.tsx` | Site chrome | Mount `ThemeToggle` |
| `DESIGN.md` / `CLAUDE.md` | DS docs | Document the new theming mechanism (keep token layer + docs in sync, DESIGN.md §12) |

---

### Task 0: Branch from `main`

CLAUDE.md: never commit to `main`, never stack branches. Current branch is `feat/docs`; branch fresh from `main`.

- [ ] **Step 1: Create the feature branch from `main`**

```bash
cd /Users/murilo/Workspace/capanema.io
git fetch origin
git switch -c feat/theme-toggle origin/main
```

- [ ] **Step 2: Confirm the branch**

Run: `git status -sb`
Expected: `## feat/theme-toggle...origin/main` and a clean tree.

---

### Task 1: Convert the token layer to `light-dark()` + `color-scheme`

**Files:**
- Modify: `src/app/globals.css:1-159` (replace the comment header, `:root`, and the entire `@media (prefers-color-scheme: dark)` block; everything from `@theme inline {` onward is unchanged)

- [ ] **Step 1: Replace lines 1–159 of `globals.css` with the block below**

The Foundation primitives are unchanged. Every token that previously had a dark override now carries both values via `light-dark(<light>, <dark>)`; tokens with no dark override keep a single value. The `@media (prefers-color-scheme: dark)` block is deleted and replaced by three `color-scheme` rules at the end.

```css
@import "tailwindcss";

/* ============================================================================
   capanema.io — Design System token layer
   Source of truth: design-system-v2.pen (Pencil)

   Five-layer governance chain: Foundation → Tokens → Components → Patterns.
   - Foundation primitives are STATIC and never themed.
   - Semantic tokens carry a value per Mode (Light / Dark) via the CSS
     light-dark() function and re-resolve automatically from the element's
     `color-scheme`. Components reference semantic tokens only — never
     primitives, never raw hex — so they need zero per-mode overrides.
   - Theme selection: :root defaults to `color-scheme: light dark` (follow the
     OS). A `data-theme="light|dark"` attribute on <html> (set from a persisted
     choice by the pre-hydration script in layout.tsx) forces one mode and wins
     over the OS setting. See DESIGN.md §2 and §13.
   ========================================================================== */

:root {
  /* Follow the OS by default; light-dark() resolves against this. */
  color-scheme: light dark;

  /* --- Foundation · primitives (static, never themed) --------------------- */
  --neutral-0: #ffffff;
  --neutral-50: #f8fafc;
  --neutral-200: #e2e8f0;
  --neutral-300: #cbd5e1;
  --neutral-400: #94a3b8;
  --neutral-500: #64748b;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1e293b;
  --neutral-900: #0f172a;

  --accent-200: #93c5fd;
  --accent-300: #60a5fa;
  --accent-400: #3b82f6;
  --accent-500: #2563eb;
  --accent-600: #1d4ed8;
  --accent-700: #1e40af;

  --primary-700: #334155;
  --primary-900: #0f172a;

  --dark-700: #172033;
  --dark-800: #111827;
  --dark-900: #0b1020;

  /* --- Tokens · text (light, dark) --------------------------------------- */
  --text-primary: light-dark(var(--primary-900), var(--neutral-50));
  --text-secondary: light-dark(var(--neutral-600), var(--neutral-300));
  --text-tertiary: light-dark(var(--neutral-500), var(--neutral-400));
  --text-muted: light-dark(var(--neutral-500), var(--neutral-400));
  --text-prose: light-dark(var(--neutral-800), var(--neutral-200));
  --text-accent: light-dark(var(--accent-500), var(--accent-300));
  --text-inverse: light-dark(var(--neutral-0), var(--primary-900));
  --text-on-accent: var(--neutral-0);
  --text-on-dark: var(--neutral-50);
  --text-on-dark-muted: var(--neutral-400);
  --text-success: light-dark(var(--accent-500), var(--accent-300));

  /* --- Tokens · surface (light, dark) ------------------------------------ */
  --surface-primary: light-dark(var(--neutral-0), var(--dark-900));
  --surface-secondary: light-dark(var(--neutral-50), var(--dark-800));
  --surface-tertiary: light-dark(var(--neutral-200), var(--neutral-800));
  --surface-subtle: light-dark(#f8fafc, var(--dark-800));
  --surface-elevated: light-dark(var(--neutral-0), var(--dark-700));
  --surface-inverse: light-dark(var(--primary-900), var(--neutral-50));
  --surface-dark: light-dark(var(--primary-900), var(--dark-700));
  --surface-dark-raised: var(--neutral-800);
  --surface-accent: var(--accent-500);

  /* --- Tokens · border (light, dark) ------------------------------------- */
  --border-subtle: light-dark(var(--neutral-200), var(--neutral-800));
  --border-default: light-dark(var(--neutral-300), var(--neutral-700));
  --border-strong: light-dark(var(--neutral-400), var(--neutral-600));
  --border-accent: light-dark(var(--accent-500), var(--accent-400));

  /* --- Tokens · action / link / focus / disabled (light, dark) ----------- */
  --action-primary: var(--accent-500);
  --action-primary-hover: light-dark(var(--accent-600), var(--accent-400));
  --action-primary-pressed: light-dark(var(--accent-700), var(--accent-600));
  --action-secondary: light-dark(var(--primary-900), var(--neutral-50));
  --action-secondary-hover: light-dark(var(--primary-700), var(--neutral-200));
  --link: light-dark(var(--accent-500), var(--accent-300));
  --link-hover: light-dark(var(--accent-600), var(--accent-200));
  --focus-ring: light-dark(var(--accent-500), var(--accent-400));
  --disabled: light-dark(var(--neutral-300), var(--neutral-700));
  --disabled-text: var(--neutral-500);

  /* --- Tokens · status (light, dark) ------------------------------------- */
  --status-success-fg: light-dark(#15803d, #4ade80);
  --status-success-surface: light-dark(#f0fdf4, #11271a);
  --status-warning-fg: light-dark(#b45309, #fbbf24);
  --status-warning-surface: light-dark(#fffbeb, #2a2009);
  --status-error-fg: light-dark(#b91c1c, #f87171);
  --status-error-surface: light-dark(#fef2f2, #2a1414);
  --status-info-fg: light-dark(var(--accent-500), var(--accent-300));
  --status-info-surface: light-dark(#eff6ff, var(--dark-700));

  /* --- Tokens · elevation shadow colors (light, dark) -------------------- */
  --shadow-1a: light-dark(#0f172a14, #00000059);
  --shadow-1b: light-dark(#0f172a0f, #00000040);

  /* --- Tokens · typography & reading (not themed) ----------------------- */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.6;
  --leading-prose: 1.7;
  --measure-prose: 680px;
}

/* Explicit, persisted choice overrides the OS setting. The pre-hydration
   script in layout.tsx sets data-theme before first paint to avoid a flash. */
:root[data-theme="light"] {
  color-scheme: light;
}
:root[data-theme="dark"] {
  color-scheme: dark;
}
```

- [ ] **Step 2: Update the stale `@theme inline` comment**

The comment at `globals.css` (the block starting "Tailwind v4 theme mapping…") still says the mapping re-resolves on a "prefers-color-scheme swap". Replace that sentence so it matches the new mechanism.

Find:

```css
   inline` keeps utilities pointing at the live
   CSS vars so the prefers-color-scheme swap above re-resolves every utility.
```

Replace with:

```css
   inline` keeps utilities pointing at the live
   CSS vars so the light-dark()/color-scheme resolution re-resolves every utility.
```

- [ ] **Step 3: Verify the build still compiles the CSS**

Run: `npm run build`
Expected: build succeeds; all pages prerender as before. No "unknown function light-dark" or PostCSS errors.

- [ ] **Step 4: Manually confirm OS-follow still works (default behavior intact)**

Run: `npm run dev`, open http://localhost:3000. In Chrome DevTools → ⋮ → More tools → **Rendering** → "Emulate CSS prefers-color-scheme":
- Set **light** → site renders light.
- Set **dark** → site renders dark.
Expected: both modes look identical to before this change (no `data-theme` is set yet).

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(theme): drive tokens with light-dark()/color-scheme

Replaces the prefers-color-scheme media block with single-declaration
light-dark() tokens, and adds data-theme overrides for an explicit choice.

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Apply the persisted theme before first paint (no flash)

**Files:**
- Modify: `src/app/layout.tsx`

The inline script must run before the body paints, so the stored choice is applied before React hydrates. It is placed as the **first child of `<body>`** (executes synchronously before the rest of the body renders) — version-robust, no dependency on `next/script` head-injection semantics. `suppressHydrationWarning` on `<html>` silences the expected attribute mismatch caused by the script mutating `data-theme`.

- [ ] **Step 1: Add the theme-init script constant above the component**

Insert after the `metadata` export (before `export default function RootLayout`):

```tsx
// Runs before first paint: apply a persisted theme choice so there is no
// flash. No stored choice = leave data-theme unset, so :root's
// `color-scheme: light dark` keeps following the OS (the default behavior).
const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`;
```

- [ ] **Step 2: Add `suppressHydrationWarning` to `<html>` and inject the script as the first body child**

Find:

```tsx
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
    >
      {/* Colors come from semantic tokens; they re-resolve per Mode via
          prefers-color-scheme, so no `dark:` variants are needed. */}
      <body className="min-h-full bg-surface-primary text-text-primary">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
```

Replace with:

```tsx
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      {/* Colors come from semantic tokens that re-resolve per Mode via
          light-dark()/color-scheme, so no `dark:` variants are needed. */}
      <body className="min-h-full bg-surface-primary text-text-primary">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
```

- [ ] **Step 3: (Next 16 sanity check) confirm an inline body `<script>` is allowed**

AGENTS.md warns this is not the Next.js you know. A plain `<script dangerouslySetInnerHTML>` in the body tree is standard App Router and needs no `next/script`. If the build flags it, fall back to `next/script` with `strategy="beforeInteractive"`; check `node_modules/next/dist/docs/` for the current Script guidance before switching.

Run: `npm run build`
Expected: build succeeds, no warning about the script.

- [ ] **Step 4: Commit**

```bash
git add src/app/layout.tsx
git commit -m "feat(theme): apply persisted theme pre-hydration to avoid flash

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 3: Create the `ThemeToggle` component

**Files:**
- Create: `src/components/ui/ThemeToggle.tsx`
- Modify: `src/components/ui/index.ts`

Reuses the existing `IconButton` primitive (button mode, `min-h-11 min-w-11`, tokenized). Effective theme is resolved on mount from `localStorage` (explicit choice) falling back to `matchMedia` (system). Before mount the theme is unknown, so a fixed-size placeholder reserves the icon space (no layout shift, no hydration mismatch). Icons: lucide `Sun` (shown in dark mode → click goes light) and `Moon` (shown in light mode → click goes dark), sized 18 per the DS Icon Button spec.

- [ ] **Step 1: Create `src/components/ui/ThemeToggle.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "./IconButton";

type Theme = "light" | "dark";

// Persisted explicit choice, or null when the visitor is following the OS.
function getStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  // null until mounted: server can't know the effective theme, so we render a
  // neutral placeholder first to avoid a hydration mismatch.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getStoredTheme() ?? getSystemTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    document.documentElement.dataset.theme = next;
  }

  const isDark = theme === "dark";
  const label =
    theme === null
      ? "Toggle theme"
      : isDark
        ? "Switch to light theme"
        : "Switch to dark theme";

  return (
    <IconButton label={label} onClick={toggle}>
      {theme === null ? (
        <span aria-hidden className="block h-[18px] w-[18px]" />
      ) : isDark ? (
        <Sun aria-hidden size={18} />
      ) : (
        <Moon aria-hidden size={18} />
      )}
    </IconButton>
  );
}
```

- [ ] **Step 2: Export it from the barrel**

In `src/components/ui/index.ts`, add after the `Footer` export (keeping chrome components together):

```ts
export { ThemeToggle } from "./ThemeToggle";
```

- [ ] **Step 3: Confirm the lucide icon names exist and it type-checks**

Run: `npm run build`
Expected: build succeeds. If `Sun`/`Moon` fail to import (the repo pins `lucide-react@^1.18.0`), run `node -e "console.log(Object.keys(require('lucide-react')).filter(n=>/sun|moon/i.test(n)))"` to find the exact export names and update the import.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/ThemeToggle.tsx src/components/ui/index.ts
git commit -m "feat(theme): add ThemeToggle component (light/dark, persisted)

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 4: Mount the toggle in `SiteHeader`

**Files:**
- Modify: `src/components/ui/SiteHeader.tsx`

Place the toggle to the right of the primary nav. Group nav + toggle in a flex row so spacing stays consistent.

- [ ] **Step 1: Import `ThemeToggle`**

Find:

```tsx
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
```

Replace with:

```tsx
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { ThemeToggle } from "./ThemeToggle";
```

- [ ] **Step 2: Render the toggle next to the nav**

Find:

```tsx
        <nav aria-label="Primary">
          <ul className="flex items-center gap-6 md:gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <NavItem
                  href={link.href}
                  active={pathname.startsWith(link.href)}
                >
                  {link.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>
```

Replace with:

```tsx
        <div className="flex items-center gap-4 md:gap-6">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-6 md:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <NavItem
                    href={link.href}
                    active={pathname.startsWith(link.href)}
                  >
                    {link.label}
                  </NavItem>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
```

- [ ] **Step 3: Build**

Run: `npm run build`
Expected: build succeeds; Home and all pages still prerender.

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/SiteHeader.tsx
git commit -m "feat(theme): mount ThemeToggle in the site header

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 5: Update the design-system docs

**Files:**
- Modify: `DESIGN.md`
- Modify: `CLAUDE.md`

DESIGN.md §12 requires the token layer and docs to move together. The theming mechanism changed (media query → `light-dark()`/`color-scheme` + explicit `data-theme`), and a new component exists.

- [ ] **Step 1: Update DESIGN.md §2 (Architecture) theming paragraph**

Find:

```markdown
**Dark mode is token-driven.** `globals.css` defines Light values in `:root` and Dark overrides in `@media (prefers-color-scheme: dark)`. Because every component uses semantic token utilities, dark mode needs **zero `dark:` variants and zero per-component overrides**. Never hardcode a color or add a `dark:` class.

All tokens are defined in `src/app/globals.css` and mapped into Tailwind v4 via `@theme inline`, which keeps utilities pointing at the live CSS vars so the media-query swap re-resolves them.
```

Replace with:

```markdown
**Dark mode is token-driven.** `globals.css` defines each themed token once with `light-dark(<light>, <dark>)` in `:root`, which resolves against the element's `color-scheme`. `:root` defaults to `color-scheme: light dark` (follow the OS). An explicit, persisted choice sets `data-theme="light|dark"` on `<html>`, which switches `color-scheme` and overrides the OS. Because every component uses semantic token utilities, dark mode needs **zero `dark:` variants and zero per-component overrides**. Never hardcode a color or add a `dark:` class.

All tokens are defined in `src/app/globals.css` and mapped into Tailwind v4 via `@theme inline`, which keeps utilities pointing at the live CSS vars so the `light-dark()`/`color-scheme` resolution re-resolves them. See §13 for the theme-toggle mechanism.
```

- [ ] **Step 2: Add `ThemeToggle` to DESIGN.md §5 components (Chrome / layout list)**

Find:

```markdown
- `SiteHeader` — brand + primary nav (client; active section from pathname).
```

Replace with:

```markdown
- `SiteHeader` — brand + primary nav + `ThemeToggle` (client; active section from pathname).
- `ThemeToggle` — `IconButton` that flips light/dark and persists the choice to `localStorage` (client; see §13).
```

- [ ] **Step 3: Add a new DESIGN.md §13 documenting the theme toggle**

Append at the end of DESIGN.md:

```markdown
---

## 13. Theming & the theme toggle

Three layers cooperate:

1. **Tokens (`globals.css`).** Each themed token is `light-dark(<light>, <dark>)`, resolved against `color-scheme`. `:root` is `color-scheme: light dark` (follow OS). `:root[data-theme="light"|"dark"]` forces one mode.
2. **Pre-hydration script (`layout.tsx`).** First child of `<body>`; reads `localStorage.theme` and, if it is `"light"`/`"dark"`, sets `data-theme` on `<html>` before first paint (no flash). No stored value = attribute unset = follow OS. `<html>` carries `suppressHydrationWarning` because the script mutates the attribute.
3. **`ThemeToggle` (`components/ui/ThemeToggle.tsx`).** On mount resolves the effective theme (`localStorage` else `matchMedia`); on click flips it, writes `localStorage.theme`, and sets `data-theme`. Renders a fixed-size placeholder until mounted to avoid layout shift / hydration mismatch.

**Default behavior is preserved:** with nothing stored, the site follows the OS live. Persistence is opt-in (set on first click). Returning to pure OS-follow means clearing `localStorage.theme` (no "Auto" control yet — a possible future addition).

Adding a new themed token: define it once with `light-dark()` in `:root` and map it in `@theme inline`. Never add a `@media (prefers-color-scheme)` block or a `dark:` variant.
```

- [ ] **Step 4: Update CLAUDE.md key constraint about dark mode**

Find:

```markdown
- **Dark mode is token-driven** — semantic tokens carry a per-mode value and re-resolve via `prefers-color-scheme` in `globals.css`. **Do NOT use `dark:` variants and do NOT hardcode colors.** Use semantic token utilities (`bg-surface-primary`, `text-text-primary`, `border-border-subtle`, …) and dark mode is automatic. See DESIGN.md for the full token list.
```

Replace with:

```markdown
- **Dark mode is token-driven** — semantic tokens carry both mode values via `light-dark()` and re-resolve from `color-scheme` in `globals.css`. Default is `color-scheme: light dark` (follow OS); the header `ThemeToggle` sets `data-theme` on `<html>` to force a persisted choice (see DESIGN.md §13). **Do NOT use `dark:` variants and do NOT hardcode colors.** Use semantic token utilities (`bg-surface-primary`, `text-text-primary`, `border-border-subtle`, …) and dark mode is automatic. See DESIGN.md for the full token list.
```

- [ ] **Step 5: Build (docs-only, sanity) and commit**

Run: `npm run build`
Expected: build succeeds (docs changes don't affect it, but confirm nothing else regressed).

```bash
git add DESIGN.md CLAUDE.md
git commit -m "docs(theme): document light-dark()/color-scheme theming + ThemeToggle

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 6: Full verification (build, lint, both themes, persistence, no-flash)

**Files:** none (verification only)

- [ ] **Step 1: Build and lint clean**

Run: `npm run build && npm run lint`
Expected: build succeeds, all routes prerender as static; lint reports no errors.

- [ ] **Step 2: Default = follow OS (no stored choice)**

Run `npm run dev`. In a fresh profile / after `localStorage.removeItem('theme')` and reload:
- DevTools → Rendering → emulate `prefers-color-scheme: light` → site light.
- emulate `dark` → site dark.
Expected: tracks the OS, no `data-theme` on `<html>` (check Elements panel).

- [ ] **Step 3: Toggle flips and the icon is correct**

Click the header toggle.
Expected: theme flips immediately; `<html>` gains `data-theme="light"` or `"dark"`; icon shows **Sun** in dark mode and **Moon** in light mode; focus ring visible on keyboard focus; target is ≥ 44×44px.

- [ ] **Step 4: Choice persists across reload**

Set theme to the opposite of your OS, then reload.
Expected: chosen theme stays after reload; `localStorage.theme` holds the value.

- [ ] **Step 5: Explicit choice overrides the OS**

With an explicit choice set, flip the DevTools `prefers-color-scheme` emulation.
Expected: the site does **not** change — the explicit `data-theme` wins.

- [ ] **Step 6: No flash of the wrong theme**

With `localStorage.theme = "dark"` and OS = light, hard-reload (Cmd-Shift-R).
Expected: the page paints dark immediately — no white flash before settling.

- [ ] **Step 7: Return to OS-follow**

In console: `localStorage.removeItem('theme')`, remove `data-theme` from `<html>` (or reload), then reload.
Expected: site follows OS again (default behavior restored).

- [ ] **Step 8: Both themes pass a spot a11y/contrast check**

Verify on Home, a case study, and `/styleguide` in both themes: text legible, borders visible, status colors paired with icon/label (DESIGN.md §8). No regressions vs. pre-change.

---

### Task 7: Open the PR

- [ ] **Step 1: Push the branch**

```bash
git push -u origin feat/theme-toggle
```

- [ ] **Step 2: Open the PR against `main`**

```bash
gh pr create --base main --title "feat: light/dark theme toggle with persistence" --body "$(cat <<'EOF'
## What
Adds a header toggle to switch between light and dark themes independently of the OS, persisted in localStorage. Default behavior (follow system preference) is preserved when no choice has been made.

## How
- Token layer now uses CSS \`light-dark()\` resolved by \`color-scheme\` — each themed token keeps both values in one declaration (replaces the duplicated \`@media (prefers-color-scheme: dark)\` block).
- \`:root\` = \`color-scheme: light dark\` (follow OS); \`data-theme="light|dark"\` on \`<html>\` forces a persisted choice.
- Pre-hydration inline script in \`layout.tsx\` applies the stored choice before first paint (no flash); \`<html>\` gets \`suppressHydrationWarning\`.
- New \`ThemeToggle\` (reuses \`IconButton\`, Sun/Moon icons) in \`SiteHeader\`.
- DESIGN.md (§2, §5, new §13) and CLAUDE.md updated to match.

## Verification
- \`npm run build\` + \`npm run lint\` pass.
- Manual checks in both themes: OS-follow default, toggle flips, choice persists across reload, explicit choice overrides OS, no flash on hard reload, returns to OS-follow when storage cleared.

## Tradeoffs
- 2-state toggle (light ⇄ dark); no explicit "Auto" control — clearing \`localStorage.theme\` restores OS-follow. Could add an Auto state later.
- Requires \`light-dark()\` support (all major browsers since 2024).
EOF
)"
```

- [ ] **Step 3: Leave the PR open for Murilo to review (do not merge).**

---

## Self-review

**Spec coverage:**
- "Toggle to switch dark/light without changing system preference" → Tasks 3–4 (`ThemeToggle` sets `data-theme`, overriding OS).
- "Persist the choice" → Task 3 (`localStorage`) + Task 2 (pre-hydration apply).
- "Keep default = match system preference" → Task 1 (`color-scheme: light dark` when no `data-theme`); verified Tasks 6.2 / 6.7.
- No-flash on persisted choice → Task 2; verified 6.6.

**Placeholder scan:** none — every code/edit step shows complete content and exact find/replace targets; every verification step has an exact command and expected result.

**Type/name consistency:** `Theme = "light" | "dark"`, `getStoredTheme`, `getSystemTheme`, `localStorage` key `"theme"`, attribute `data-theme`, and CSS selectors `:root[data-theme="light"|"dark"]` are consistent across Tasks 1–4. `ThemeToggle` export name matches the barrel and `SiteHeader` import. `IconButton` is used in button mode (no `href`), so `onClick` is valid per its `AsButton` type.
