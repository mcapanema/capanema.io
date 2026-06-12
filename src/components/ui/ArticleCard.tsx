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
      className="group flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface-primary p-8 transition-colors hover:border-border-strong"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs uppercase tracking-[1px] text-text-accent">
          {category}
        </span>
        <span aria-hidden className="text-xs text-text-tertiary">
          ·
        </span>
        <span className="font-mono text-xs text-text-tertiary">
          {formatStamp(date)}
        </span>
      </div>
      <h3 className="text-xl font-semibold leading-[1.35] tracking-[-0.3px] text-text-primary transition-colors group-hover:text-link">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.6] text-text-secondary">{excerpt}</p>
      <span className="font-mono text-xs uppercase tracking-[0.5px] text-text-tertiary">
        {readingMinutes} min read
      </span>
    </a>
  );
}
