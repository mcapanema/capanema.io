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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-tertiary"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search case studies"
            aria-label="Search case studies"
            className="h-11 w-full rounded-lg border border-border-default bg-surface-elevated pl-11 pr-4 text-sm text-text-primary placeholder:text-text-tertiary"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <span className="font-mono text-xs uppercase tracking-[0.5px] text-text-tertiary">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort case studies"
            className="h-11 rounded-lg border border-border-default bg-surface-elevated px-3 text-sm text-text-primary"
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
      <div className="flex flex-wrap gap-2">
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

      {showFeatured && <FeaturedCaseStudy caseStudy={featured} />}

      {grid.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {grid.map((cs) => (
            <CaseStudyCard key={cs.slug} caseStudy={cs} />
          ))}
        </div>
      ) : (
        <p className="py-12 text-center text-text-secondary">
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
