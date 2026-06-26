"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ArticleCard, FeaturedArticle } from "@/components/ui";
import { cn } from "@/lib/cn";
import type { Article } from "@/content/types";

// Discoverability layer for the Articles index: search + category filter + sort,
// composed from tokenised primitives (the DS defines cards, not form controls).
type Sort = "newest" | "oldest" | "reading";

const sortLabels: Record<Sort, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  reading: "Reading time",
};

export function ArticlesExplorer({
  articles,
  categories,
}: {
  articles: Article[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const filtering = query.trim() !== "" || activeCategory !== null;

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = articles.filter((a) => {
      const matchesCategory = !activeCategory || a.category === activeCategory;
      const matchesQuery =
        q === "" ||
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
    const sorted = [...filtered];
    if (sort === "newest") sorted.sort((a, b) => b.date.localeCompare(a.date));
    if (sort === "oldest") sorted.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "reading")
      sorted.sort((a, b) => a.readingMinutes - b.readingMinutes);
    return sorted;
  }, [articles, query, activeCategory, sort]);

  const featured = articles.find((a) => a.featured);
  const showFeatured = !filtering && sort === "newest" && featured;
  const grid = showFeatured
    ? results.filter((a) => a.slug !== featured.slug)
    : results;

  return (
    <div className="flex flex-col gap-10">
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
            placeholder="Search articles"
            aria-label="Search articles"
            className="border-border-default bg-surface-elevated text-text-primary placeholder:text-text-tertiary h-11 w-full rounded-lg border pr-4 pl-11 text-sm"
          />
        </div>
        <label htmlFor="sort-articles" className="text-text-secondary flex items-center gap-2 text-sm">
          <span className="text-text-tertiary font-mono text-xs tracking-[0.5px] uppercase">
            Sort
          </span>
          <select
            id="sort-articles"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Sort articles"
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

      <div className="animate-fade-up-delay-2 flex flex-wrap gap-2">
        <FilterChip
          active={activeCategory === null}
          onClick={() => setActiveCategory(null)}
        >
          All
        </FilterChip>
        {categories.map((category) => (
          <FilterChip
            key={category}
            active={activeCategory === category}
            onClick={() =>
              setActiveCategory(activeCategory === category ? null : category)
            }
          >
            {category}
          </FilterChip>
        ))}
      </div>

      {showFeatured && (
        <div className="animate-fade-up-delay-3">
          <FeaturedArticle article={featured} />
        </div>
      )}

      {grid.length > 0 ? (
        <>
          <p aria-live="polite" className="sr-only">
            {grid.length} articles found
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((a) => (
              <div key={a.slug} className="animate-on-scroll">
                <ArticleCard article={a} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-text-secondary py-12 text-center">
          No articles match your search.
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
