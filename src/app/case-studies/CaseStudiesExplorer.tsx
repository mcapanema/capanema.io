"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CaseStudyCard, FeaturedCaseStudy } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { CaseStudy } from "@/content/types";

// Discoverability layer for the Case Studies index. The DS defines the cards
// and the featured block but no form controls, so search/filter/sort are
// composed from tokenised primitives (documented gap). Filtering happens
// client-side over the in-memory metadata.
type Sort = "newest" | "oldest" | "reading";

const sortLabels: Record<Sort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  reading: "Reading time",
};

export function CaseStudiesExplorer({
  caseStudies,
  tags,
}: {
  caseStudies: CaseStudy[];
  tags: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const filtering = query.trim() !== "" || activeTag !== null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = caseStudies.filter((c) => {
      const matchesTag = !activeTag || c.tags.includes(activeTag);
      const matchesQuery =
        q === "" ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTag && matchesQuery;
    });
    const sorted = [...filtered];
    if (sort === "newest") sorted.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") sorted.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "reading")
      sorted.sort((a, b) => a.readingMinutes - b.readingMinutes);
    return sorted;
  }, [caseStudies, query, activeTag, sort]);

  const featured = caseStudies.find((c) => c.featured);
  const showFeatured = !filtering && sort === "newest" && featured;
  const grid = showFeatured
    ? results.filter((c) => c.slug !== featured.slug)
    : results;

  return (
    <div className="flex flex-col gap-10">
      {/* Toolbar: search + sort */}
      <div className="animate-fade-up-delay-1 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="text-text-tertiary pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies"
            aria-label="Search case studies"
            className="border-border-default bg-surface-elevated text-text-primary placeholder:text-text-tertiary h-11 w-full rounded-lg border pr-4 pl-11 text-sm"
          />
        </div>
        <label htmlFor="sort-case-studies" className="text-text-secondary flex items-center gap-2 text-sm">
          <span className="text-text-tertiary font-mono text-xs tracking-[0.5px] uppercase">
            Sort
          </span>
          <select
            id="sort-case-studies"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort case studies"
            className="border-border-default bg-surface-elevated text-text-primary h-11 rounded-lg border px-3 text-sm"
          >
            {Object.entries(sortLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* Tag filters */}
      <div className="animate-fade-up-delay-2 flex flex-wrap gap-2">
        <FilterChip
          active={activeTag === null}
          onClick={() => setActiveTag(null)}
        >
          All
        </FilterChip>
        {tags.map((tag) => (
          <FilterChip
            key={tag}
            active={activeTag === tag}
            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
          >
            {tag}
          </FilterChip>
        ))}
      </div>

      {showFeatured && (
        <div className="animate-fade-up-delay-3">
          <FeaturedCaseStudy caseStudy={featured} />
        </div>
      )}

      {grid.length > 0 ? (
        <>
          <p aria-live="polite" className="sr-only">
            {grid.length} case studies found
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            {grid.map((cs) => (
              <div key={cs.slug} className="animate-on-scroll">
                <CaseStudyCard caseStudy={cs} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-text-secondary py-12 text-center">
          No case studies match your search.
        </p>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-9 items-center rounded-full border px-3 font-mono text-xs font-medium tracking-[0.5px] transition-colors",
        active
          ? "border-border-accent bg-surface-accent text-text-on-accent"
          : "border-border-default bg-surface-tertiary text-text-secondary hover:border-border-strong hover:text-text-primary",
      )}
    >
      {children}
    </button>
  );
}
