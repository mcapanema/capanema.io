import type { Article } from "@/content/types";
import { formatStamp } from "@/content/types";

// DS master: Article Card (WGvhC). radius 12, surface-primary, border-subtle,
// padding space-6. Meta row (category · date), H5 title, excerpt, read time.
// Whole card links to the article.
export function ArticleCard({ article }: { article: Article }) {
  const { slug, category, title, excerpt, date, readingMinutes } = article;
  return (
    <a
      href={`/articles/${slug}`}
      className="group border-border-subtle bg-surface-primary hover:border-border-strong hover:shadow-[0_4px_12px_var(--shadow-1b)] flex flex-col gap-3 rounded-xl border p-8 shadow-[0_1px_2px_var(--shadow-1b)] transition-[box-shadow,border-color,color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
    >
      <div className="flex items-center gap-3">
        <span className="text-text-accent font-mono text-xs tracking-[1px] uppercase">
          {category}
        </span>
        <span aria-hidden className="text-text-tertiary text-xs">
          ·
        </span>
        <span className="text-text-tertiary font-mono text-xs">
          {formatStamp(date)}
        </span>
      </div>
      <h3 className="text-text-primary group-hover:text-link text-xl leading-[1.35] font-semibold tracking-[-0.3px] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]">
        {title}
      </h3>
      <p className="text-text-secondary text-[15px] leading-[1.6] font-medium">{excerpt}</p>
      <span className="text-text-tertiary font-mono text-xs tracking-[0.5px] uppercase">
        {readingMinutes} min read
      </span>
    </a>
  );
}
