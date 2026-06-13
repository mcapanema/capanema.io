# Rename "Writing" Section to "Articles" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rename the user-facing "Writing" section label to "Articles" across the site, including internal code comments and the home-page meta description.

**Architecture:** Pure copy/label change. The routes (`/articles`), files (`articles.ts`, `ArticlesExplorer.tsx`, etc.), component names, and content layer are *already* named "articles" — only display strings and a couple of comments still say "Writing"/"writing". No route changes, no file renames, no logic changes. Verification is a `grep` assertion (only the Design System pattern-name comment may keep the word "Writing") plus a clean `npm run build`.

**Tech Stack:** Next.js 16 (App Router), React, TypeScript, Tailwind v4.

**Scope decisions (locked with the user):**
- Change all user-facing copy AND internal code comments.
- Change the home-page meta description word "writing" → "articles".
- **Keep** the Design System reference comment `// DS: Writing Pattern → Featured Essay…` in `src/components/ui/FeaturedArticle.tsx:5` — it names the actual Pencil DS pattern and must mirror the source of truth.

---

### Task 1: Write the verification assertion (the "failing test")

There is no unit-test harness for static copy; the regression gate is a `grep` that proves no stray user-facing "Writing"/"writing" survives except the allowed DS pattern comment.

**Files:**
- None modified in this task — this only establishes and runs the assertion.

- [ ] **Step 1: Run the assertion against the current (unmodified) tree to confirm it FAILS**

Run:
```bash
grep -rniE "writing" --include="*.ts" --include="*.tsx" /Users/murilo/Workspace/capanema.io/src | grep -v "DS: Writing Pattern"
```

Expected: **FAIL** (non-empty output). You should see exactly these 14 lines (paths abbreviated):
```
src/app/page.tsx:93:            <SectionHeader title="Writing" href="/articles" cta="All writing" />
src/app/layout.tsx:27:    "Case studies, writing, and a professional profile from Murilo Capanema — scaling engineering organizations and the platforms they ship.",
src/app/articles/page.tsx:6:  title: "Writing",
src/app/articles/page.tsx:20:          eyebrow="WRITING"
src/app/articles/page.tsx:21:          title="Writing"
src/app/articles/[slug]/page.tsx:45:            { label: "Writing", href: "/articles" },
src/app/articles/[slug]/page.tsx:82:            ← All writing
src/app/articles/ArticlesExplorer.tsx:9:// Discoverability layer for the Writing index: search + category filter + sort,
src/app/articles/ArticlesExplorer.tsx:69:            placeholder="Search writing"
src/app/articles/ArticlesExplorer.tsx:70:            aria-label="Search writing"
src/app/articles/ArticlesExplorer.tsx:81:            aria-label="Sort writing"
src/app/articles/ArticlesExplorer.tsx:123:          No writing matches your search.
src/components/ui/SiteHeader.tsx:11:  { href: "/articles", label: "Writing" },
src/components/ui/Footer.tsx:6:  { href: "/articles", label: "Writing" },
```

If the output differs from this list (e.g. new occurrences were added since this plan was written), reconcile before continuing — every line above must be addressed by Tasks 2–6, and any *extra* line must be evaluated against the scope decisions.

---

### Task 2: Rename navigation chrome (header + footer)

These two arrays drive the primary nav and the footer "EXPLORE" column. The `href` stays `/articles`; only the `label` changes.

**Files:**
- Modify: `src/components/ui/SiteHeader.tsx:11`
- Modify: `src/components/ui/Footer.tsx:6`

- [ ] **Step 1: Update the header nav label**

In `src/components/ui/SiteHeader.tsx`, change line 11:

```ts
  { href: "/articles", label: "Writing" },
```
to:
```ts
  { href: "/articles", label: "Articles" },
```

- [ ] **Step 2: Update the footer nav label**

In `src/components/ui/Footer.tsx`, change line 6:

```ts
  { href: "/articles", label: "Writing" },
```
to:
```ts
  { href: "/articles", label: "Articles" },
```

---

### Task 3: Rename the home-page section header

**Files:**
- Modify: `src/app/page.tsx:93`

- [ ] **Step 1: Update the SectionHeader title and CTA**

In `src/app/page.tsx`, change line 93:

```tsx
            <SectionHeader title="Writing" href="/articles" cta="All writing" />
```
to:
```tsx
            <SectionHeader title="Articles" href="/articles" cta="All articles" />
```

---

### Task 4: Rename the Articles index page (metadata, eyebrow, title)

**Files:**
- Modify: `src/app/articles/page.tsx:6,20,21`

- [ ] **Step 1: Update the page metadata title**

In `src/app/articles/page.tsx`, change line 6:

```ts
  title: "Writing",
```
to:
```ts
  title: "Articles",
```

- [ ] **Step 2: Update the PageHeader eyebrow and title**

In `src/app/articles/page.tsx`, change lines 20–21:

```tsx
          eyebrow="WRITING"
          title="Writing"
```
to:
```tsx
          eyebrow="ARTICLES"
          title="Articles"
```

(Leave the `description` prop on line 22 unchanged — it already reads naturally and does not contain the word "writing".)

---

### Task 5: Rename the Articles Explorer copy and comment

**Files:**
- Modify: `src/app/articles/ArticlesExplorer.tsx:9,69,70,81,123`

- [ ] **Step 1: Update the internal comment**

In `src/app/articles/ArticlesExplorer.tsx`, change line 9:

```tsx
// Discoverability layer for the Writing index: search + category filter + sort,
```
to:
```tsx
// Discoverability layer for the Articles index: search + category filter + sort,
```

- [ ] **Step 2: Update the search input placeholder and aria-label**

In the same file, change lines 69–70:

```tsx
            placeholder="Search writing"
            aria-label="Search writing"
```
to:
```tsx
            placeholder="Search articles"
            aria-label="Search articles"
```

- [ ] **Step 3: Update the sort select aria-label**

In the same file, change line 81:

```tsx
            aria-label="Sort writing"
```
to:
```tsx
            aria-label="Sort articles"
```

- [ ] **Step 4: Update the empty-state message**

In the same file, change line 123. Note the verb agreement: "writing matches" → "articles match" (plural).

```tsx
          No writing matches your search.
```
to:
```tsx
          No articles match your search.
```

---

### Task 6: Rename the article detail page (breadcrumb + back link) and the root meta description

**Files:**
- Modify: `src/app/articles/[slug]/page.tsx:45,82`
- Modify: `src/app/layout.tsx:27`

- [ ] **Step 1: Update the breadcrumb label**

In `src/app/articles/[slug]/page.tsx`, change line 45:

```tsx
            { label: "Writing", href: "/articles" },
```
to:
```tsx
            { label: "Articles", href: "/articles" },
```

- [ ] **Step 2: Update the "back" link text**

In the same file, change line 82:

```tsx
            ← All writing
```
to:
```tsx
            ← All articles
```

- [ ] **Step 3: Update the root meta description**

In `src/app/layout.tsx`, change line 27:

```ts
    "Case studies, writing, and a professional profile from Murilo Capanema — scaling engineering organizations and the platforms they ship.",
```
to:
```ts
    "Case studies, articles, and a professional profile from Murilo Capanema — scaling engineering organizations and the platforms they ship.",
```

---

### Task 7: Verify the assertion passes, build, and commit

**Files:**
- None modified — verification and commit only.

- [ ] **Step 1: Re-run the grep assertion — it must now PASS**

Run:
```bash
grep -rniE "writing" --include="*.ts" --include="*.tsx" /Users/murilo/Workspace/capanema.io/src | grep -v "DS: Writing Pattern"
```

Expected: **PASS** — empty output (exit code 1 from the outer `grep`, which is correct: no remaining matches). The only surviving "Writing" in `src/` is the intentionally-kept DS pattern comment in `FeaturedArticle.tsx`, which the `grep -v` filters out.

- [ ] **Step 2: Sanity-check the kept DS comment is still present**

Run:
```bash
grep -rn "DS: Writing Pattern" /Users/murilo/Workspace/capanema.io/src/components/ui/FeaturedArticle.tsx
```

Expected: one match (line 5). This confirms we did not over-reach the scope.

- [ ] **Step 3: Build to verify nothing broke**

Run:
```bash
cd /Users/murilo/Workspace/capanema.io && npm run build
```

Expected: build completes successfully with no errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/murilo/Workspace/capanema.io && git add src/ && git commit -m "feat(content): rename Writing section to Articles

Rename all user-facing labels and internal comments from
\"Writing\"/\"writing\" to \"Articles\"/\"articles\" across the nav,
home section, articles index, explorer, and article detail page,
plus the root meta description. Routes and files were already
named 'articles'. Keeps the DS 'Writing Pattern' reference comment."
```

(Routes, filenames, and component names were already `articles`, so no route or import changes are required.)

---

## Notes for the implementer

- **Do not** rename the route `/articles`, any file, or any component (`ArticlesExplorer`, `ArticleCard`, `FeaturedArticle`, `getArticles`, etc.) — those are already correct.
- **Do not** touch `src/components/ui/FeaturedArticle.tsx:5` (`// DS: Writing Pattern → Featured Essay…`) — it intentionally mirrors the Pencil Design System pattern name.
- Per the repo's git workflow (CLAUDE.md): you are on a feature branch already (`feat/favicon-and-navbar-icon`). Confirm whether this rename should go on that branch or a fresh one branched from `main` (`feat/rename-writing-to-articles`) before committing. **Never commit to `main`; always base a new branch on `main`.**
