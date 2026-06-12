import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { Button } from "./Button";
import { Metric } from "./Metric";

// DS: Case Study Discovery → Featured block. Elevated card with content on the
// left and a dark metric panel on the right (Metric master, onDark tone).
export function FeaturedCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const { slug, category, title, summary, metrics } = caseStudy;
  return (
    <div className="flex flex-col gap-16 rounded-xl border border-border-subtle bg-surface-elevated p-12 shadow-[0_1px_3px_var(--shadow-1a)] lg:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <span className="font-mono text-xs uppercase tracking-[1px] text-text-accent">
          Featured · {category}
        </span>
        <h3 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.5px] text-text-primary">
          {title}
        </h3>
        <p className="text-base leading-[1.6] text-text-secondary">{summary}</p>
        <div className="pt-2">
          <Button href={`/case-studies/${slug}`} icon={<ArrowRight className="size-4" />}>
            Read the case study
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-8 rounded-xl bg-surface-dark p-10 lg:w-[300px]">
        {metrics.slice(0, 3).map((m) => (
          <Metric key={m.label} value={m.value} label={m.label} tone="onDark" />
        ))}
      </div>
    </div>
  );
}
