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
      className="group flex flex-col gap-3 rounded-xl border border-border-subtle bg-surface-elevated p-12 shadow-[0_1px_3px_var(--shadow-1a)] transition-colors hover:border-border-strong"
    >
      <span className="font-mono text-xs uppercase tracking-[1px] text-text-accent">
        Featured essay · {formatStamp(date)}
      </span>
      <h2 className="max-w-[900px] text-[32px] font-semibold leading-[1.2] tracking-[-0.5px] text-text-primary transition-colors group-hover:text-link">
        {title}
      </h2>
      <p className="max-w-[760px] text-[17px] leading-[1.6] text-text-prose">
        {excerpt}
      </p>
      <div className="flex items-center gap-3 pt-2">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-link">
          Read essay
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
        <span className="font-mono text-xs uppercase tracking-[0.5px] text-text-tertiary">
          · {readingMinutes} min read
        </span>
      </div>
    </a>
  );
}
