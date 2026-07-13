import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/content/types";
import { Button } from "./Button";
import { Metric } from "./Metric";

// DS: Case Study Discovery → Featured block. Elevated card with content on the
// left and a dark metric panel on the right (Metric master, onDark tone).
export function FeaturedCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const { slug, category, title, summary, metrics } = caseStudy;
  return (
    <div className="border-border-subtle bg-surface-elevated flex flex-col gap-16 rounded-xl border p-12 shadow-[0_1px_3px_var(--shadow-1a)] lg:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <span className="text-text-accent font-mono text-xs tracking-[1px] uppercase">
          Featured · {category}
        </span>
        <h3 className="text-text-primary text-h3 font-semibold">
          {title}
        </h3>
        <p className="text-text-secondary text-body-m">{summary}</p>
        <div className="pt-2">
          <Button href={`/case-studies/${slug}`} icon={<ArrowRight className="size-4" />}>
            Read the case study
          </Button>
        </div>
      </div>
      <div className="bg-surface-dark flex flex-col gap-8 rounded-xl p-10 lg:w-75">
        {metrics.slice(0, 3).map((m) => (
          <Metric key={m.label} value={m.value} label={m.label} tone="onDark" />
        ))}
      </div>
    </div>
  );
}
