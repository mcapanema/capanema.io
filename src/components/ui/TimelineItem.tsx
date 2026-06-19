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
        !isLast && "border-border-default border-l-2",
      )}
    >
      {/* Dot sits on the rail line (left edge) */}
      <span
        aria-hidden
        className="border-surface-primary bg-surface-accent absolute top-1 left-[-7px] size-3 rounded-full border-2"
      />
      <span className="text-text-tertiary font-mono text-xs tracking-[0.5px]">
        {date}
      </span>
      <h3 className="text-text-primary text-lg leading-[1.3] font-semibold">
        {title}
      </h3>
      <p className="text-text-secondary text-sm font-medium leading-[1.55]">{description}</p>
      {outcome && (
        <div className="flex items-center gap-2 pt-1">
          <TrendingUp aria-hidden className="text-text-accent size-3.5" />
          <span className="text-text-accent text-sm font-medium">{outcome}</span>
        </div>
      )}
    </div>
  );
}
