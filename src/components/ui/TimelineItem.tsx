import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";

// DS master: Timeline Item (afs6z). A left rail (2px border) with an accent dot,
// then date / title / description / outcome. The final item drops the rail.
export function TimelineItem({
  date,
  title,
  description,
  outcome,
  isLast = false,
}: {
  date: string;
  title: string;
  description: string;
  outcome?: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 pb-10 pl-8",
        !isLast && "border-l-2 border-border-default",
      )}
    >
      {/* Dot sits on the rail line (left edge) */}
      <span
        aria-hidden
        className="absolute -left-[7px] top-1 size-3 rounded-full border-2 border-surface-primary bg-surface-accent"
      />
      <span className="font-mono text-xs tracking-[0.5px] text-text-tertiary">
        {date}
      </span>
      <h3 className="text-lg font-semibold leading-[1.3] text-text-primary">
        {title}
      </h3>
      <p className="text-sm leading-[1.55] text-text-secondary">{description}</p>
      {outcome && (
        <div className="flex items-center gap-2 pt-1">
          <TrendingUp aria-hidden className="size-3.5 text-text-accent" />
          <span className="text-sm font-medium text-text-accent">{outcome}</span>
        </div>
      )}
    </div>
  );
}
