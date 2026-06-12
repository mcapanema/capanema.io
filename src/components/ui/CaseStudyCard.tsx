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
      className="group flex flex-col gap-6 rounded-xl border border-border-subtle bg-surface-elevated p-10 shadow-[0_1px_3px_var(--shadow-1a)] transition-colors hover:border-border-strong"
    >
      <span className="font-mono text-xs uppercase tracking-[1px] text-text-accent">
        {category}
      </span>
      <h3 className="text-2xl font-semibold leading-[1.3] tracking-[-0.3px] text-text-primary">
        {title}
      </h3>
      <p className="text-[15px] leading-[1.6] text-text-secondary">{summary}</p>
      <div className="h-px w-full bg-border-subtle" />
      <div className="flex flex-wrap items-end gap-8">
        {outcomes.map((o) => (
          <div key={o.label} className="flex flex-col gap-1">
            <span className="text-[32px] font-semibold leading-[1.1] tracking-[-0.5px] text-text-primary">
              {o.value}
            </span>
            <span className="text-[13px] text-text-secondary">{o.label}</span>
          </div>
        ))}
      </div>
      <span className="inline-flex items-center gap-2 pt-2 text-sm font-semibold text-link transition-colors group-hover:text-link-hover">
        Read case study
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}
