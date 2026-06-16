import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/types";

// DS master: Case Study Card (BtcCZ). radius 12, surface-elevated, border-subtle,
// soft shadow, padding space-7. Category eyebrow, H4 title, summary, divider,
// outcome metrics (H3), "Read case study" link. The whole card is the link.
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const { slug, category, title, summary, outcomes } = caseStudy;
  return (
    <a
      href={`/case-studies/${slug}`}
      className="group border-border-subtle bg-surface-elevated hover:border-border-strong hover:shadow-[0_4px_16px_var(--shadow-1a)] flex flex-col gap-6 rounded-xl border p-10 shadow-[0_1px_3px_var(--shadow-1a)] transition-[box-shadow,border-color] duration-[var(--duration-fast)] ease-[var(--ease-standard)]"
    >
      <span className="text-text-accent font-mono text-xs tracking-[1px] uppercase">
        {category}
      </span>
      <h3 className="text-text-primary text-2xl leading-[1.3] font-semibold tracking-[-0.3px]">
        {title}
      </h3>
      <p className="text-text-secondary text-[15px] leading-[1.6]">{summary}</p>
      <div className="bg-border-subtle h-px w-full" />
      <div className="flex flex-wrap items-end gap-8">
        {outcomes.map((o) => (
          <div key={o.label} className="flex flex-col gap-1">
            <span className="text-text-primary text-[32px] leading-[1.1] font-semibold tracking-[-0.5px]">
              {o.value}
            </span>
            <span className="text-text-secondary text-[13px]">{o.label}</span>
          </div>
        ))}
      </div>
      <span className="text-link group-hover:text-link-hover inline-flex items-center gap-2 pt-2 text-sm font-semibold transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]">
        Read case study
        <ArrowRight className="size-4 transition-transform duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
