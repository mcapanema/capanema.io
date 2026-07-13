import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/types";

// DS master: Case Study Card (BtcCZ). radius 12, surface-elevated, border-subtle,
// soft shadow, padding space-7. Category eyebrow, H4 title, summary, divider,
// outcome metrics (H3), "Read case study" link. The whole card is the link.
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const { slug, category, title, summary, outcomes } = caseStudy;
  return (
    <Link
      href={`/case-studies/${slug}`}
      className="group border-border-subtle bg-surface-elevated hover:border-border-strong hover:shadow-[0_4px_16px_var(--shadow-1a)] flex flex-col gap-6 rounded-xl border p-10 shadow-[0_1px_3px_var(--shadow-1a)] transition-[box-shadow,border-color] duration-fast ease-standard"
    >
      <span className="text-text-tertiary font-mono text-xs tracking-[1px] uppercase">
        {category}
      </span>
      <h3 className="text-text-primary text-h4 font-semibold">
        {title}
      </h3>
      <p className="text-text-secondary text-body-m font-medium">{summary}</p>
      <div className="bg-border-subtle h-px w-full" />
      <dl className="flex flex-wrap items-end gap-8">
        {outcomes.map((o) => (
          // dt precedes dd in the DOM (valid <dl>, label-first for screen
          // readers); flex order keeps the value visually on top.
          <div key={o.label} className="flex flex-col gap-1">
            <dt className="text-text-secondary order-2 text-sm font-medium">{o.label}</dt>
            <dd className="text-text-primary order-1 text-h3 font-semibold">
              {o.value}
            </dd>
          </div>
        ))}
      </dl>
      <span className="text-link group-hover:text-link-hover inline-flex items-center gap-2 pt-2 text-sm font-semibold transition-colors duration-fast ease-standard">
        Read case study
        <ArrowRight className="size-4 transition-transform duration-fast ease-standard group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
