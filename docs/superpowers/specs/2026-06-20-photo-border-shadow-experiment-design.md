# Photo Border + Shadow Experiment — Design Spec

**Date:** 2026-06-20
**Author:** murilo
**Status:** Approved

---

## 1. Concept & Vision

Replace the "Layered Plate" hero portrait treatment with a plain border + soft layered shadow. The MDX content images get the same treatment for consistency. The goal is a cleaner, more refined look — the photo floats with subtle depth without the visual weight of an offset color plate.

---

## 2. Design Language

**Shadow (layered, no new token needed):**
```
shadow-[0_2px_4px_var(--shadow-1a),0_4px_12px_var(--shadow-1a)]
```
Stacked shadow technique: a tight inner shadow (2px blur, 4px offset) + a broader outer shadow (4px blur, 12px offset), both using the existing `shadow-1a` token. Creates a refined floating effect. Uses only existing tokens.

**Border:** `border-border-subtle` (1px, existing semantic token).

**Radius:**
- Hero portrait: `rounded-[var(--radius-lg)]` (16px) — unchanged
- MDX images: `rounded-xl` (12px) — unchanged

---

## 3. Changes

### 3.1 HeroPortrait (`src/app/page.tsx`)

**Before:**
```tsx
<div className={cn("relative w-full", className)}>
  <div aria-hidden className="bg-surface-accent absolute inset-0 translate-x-3 translate-y-3 rounded-[var(--radius-lg)] sm:translate-x-4 sm:translate-y-4" />
  <picture>
    <source ... />
    <img
      {...imgProps}
      className={cn(
        "relative block h-auto w-full rounded-[var(--radius-lg)] shadow-[0_1px_3px_var(--shadow-1a)]",
        imgClassName,
      )}
    />
  </picture>
</div>
```

**After:**
```tsx
<div className={cn("relative w-full", className)}>
  <picture>
    <source ... />
    <img
      {...imgProps}
      className={cn(
        "relative block h-auto w-full rounded-[var(--radius-lg)] border border-border-subtle shadow-[0_2px_4px_var(--shadow-1a),0_4px_12px_var(--shadow-1a)]",
        imgClassName,
      )}
    />
  </picture>
</div>
```

Changes:
1. Remove the decorative `bg-surface-accent` plate `<div>` (aria-hidden element)
2. Add `border border-border-subtle` to the `<img>`
3. Upgrade shadow from single `shadow-[0_1px_3px_var(--shadow-1a)]` to layered `shadow-[0_2px_4px_var(--shadow-1a),0_4px_12px_var(--shadow-1a)]`

### 3.2 MDX Images (`mdx-components.tsx`)

**Before:**
```tsx
<img
  {...props}
  className="border-border-subtle mt-8 w-full rounded-xl border"
/>
```

**After:**
```tsx
<img
  {...props}
  className="mt-8 w-full rounded-xl border border-border-subtle shadow-[0_2px_4px_var(--shadow-1a),0_4px_12px_var(--shadow-1a)]"
/>
```

Changes:
1. Add layered shadow `shadow-[0_2px_4px_var(--shadow-1a),0_4px_12px_var(--shadow-1a)]`
2. Keep `border border-border-subtle` and `rounded-xl` unchanged

---

## 4. Files Affected

| File | Change |
|------|--------|
| `src/app/page.tsx` | Remove plate div, add border + layered shadow to hero `<img>` |
| `mdx-components.tsx` | Add layered shadow to MDX `<img>` |

---

## 5. Verification

- [ ] Both themes (light/dark) — visual check hero portrait and any MDX content images
- [ ] Mobile viewport — portrait renders correctly (square crop, 256px max-width)
- [ ] Desktop viewport — portrait renders correctly (natural 4:5, 340px width)
- [ ] `npm run build` passes (no TypeScript errors, SSG prerender)
- [ ] Accessibility: `alt` text present on all images (existing, unchanged)

---

## 6. Rationale

The layered plate was the original v3 design. This experiment removes the offset cobalt plate and replaces it with a plain border + layered shadow — reducing visual weight while maintaining depth. The border keeps the photo edge defined (important on light backgrounds), and the dual-shadow creates a refined floating effect. Both changes use only existing tokens, so no new design system additions are required.