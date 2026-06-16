import { ArrowRight } from "lucide-react";
import type { Article } from "@/content/types";
import { formatStamp } from "@/content/types";

// DS: Writing Pattern → Featured Essay. Elevated card: mono eyebrow, H3 title,
// prose excerpt, and a "Read essay" meta row with reading time. Whole card links.
export function FeaturedArticle({ article }: { article: Article }) {
  const { slug, title, excerpt, date, readingMinutes } = article;
  return (
    <a
      href={`/articles/${slug}`}
      className="group border-border-subtle bg-surface-elevated hover:border-border-strong hover:shadow-[0_6px_20px_var(--shadow-1a)] flex flex-col gap-3 rounded-xl border p-12 shadow-[0_1px_3px_var(--shadow-1a)] transition-[box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
    >
      <span className="text-text-accent font-mono text-xs tracking-[1px] uppercase">
        Featured essay · {formatStamp(date)}
      </span>
      <h2 className="text-text-primary group-hover:text-link max-w-[900px] text-[32px] leading-[1.2] font-semibold tracking-[-0.5px] transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]">
        {title}
      </h2>
      <p className="text-text-prose max-w-[760px] text-[17px] leading-[1.6]">
        {excerpt}
      </p>
      <div className="flex items-center gap-3 pt-2">
        <span className="text-link inline-flex items-center gap-2 text-sm font-semibold">
          Read essay
          <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
        </span>
        <span className="text-text-tertiary font-mono text-xs tracking-[0.5px] uppercase">
          · {readingMinutes} min read
        </span>
      </div>
    </a>
  );
}
