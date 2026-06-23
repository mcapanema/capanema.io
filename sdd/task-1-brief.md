# Task 1: Fix logo picture elements display property

**Files:**
- Modify: `src/components/ui/SiteHeader.tsx:27-46`

**Root Cause Detail:** The `<picture>` elements are inline by default. When the inner `<img>` is `display: none`, the `<picture>` still exists as an inline element with a whitespace text node sibling. This causes subtle horizontal positioning differences between themes when the visible `<img>` switches from one `<picture>` to another.

**Fix:** Wrap both `<picture>` elements in a `<span>` with `flex shrink-0` to contain both logo pictures, eliminating whitespace issues between inline picture elements.

---

**Step 1: Wrap picture elements in a shrink-0 flex container**

Find:
```tsx
          <picture>
            <source srcSet="/logo-light.webp" type="image/webp" />
            <img
              src="/logo-light.png"
              alt=""
              width={32}
              height={32}
              className="logo-light h-8 w-8"
            />
          </picture>
          <picture>
            <source srcSet="/logo-dark.webp" type="image/webp" />
            <img
              src="/logo-dark.png"
              alt=""
              width={32}
              height={32}
              className="logo-dark h-8 w-8"
            />
          </picture>
```

Replace with:
```tsx
          <span className="flex shrink-0">
            <picture>
              <source srcSet="/logo-light.webp" type="image/webp" />
              <img
                src="/logo-light.png"
                alt=""
                width={32}
                height={32}
                className="logo-light h-8 w-8"
              />
            </picture>
            <picture>
              <source srcSet="/logo-dark.webp" type="image/webp" />
              <img
                src="/logo-dark.png"
                alt=""
                width={32}
                height={32}
                className="logo-dark h-8 w-8"
              />
            </picture>
          </span>
```

**Step 2: Verify the build**

Run: `npm run build`
Expected: Build succeeds; all pages prerender correctly.