import { Info, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

// DS master: Callout (WlpMe). radius 10, status surface tint, leading icon (20)
// in the matching status fg, vertical body. Variant pairs colour with an icon
// so meaning is never carried by colour alone (accessibility rule).
type Variant = "info" | "success" | "warning" | "error";

const config: Record<
  Variant,
  { surface: string; fg: string; Icon: typeof Info }
> = {
  info: { surface: "bg-status-info-surface", fg: "text-status-info-fg", Icon: Info },
  success: {
    surface: "bg-status-success-surface",
    fg: "text-status-success-fg",
    Icon: CheckCircle2,
  },
  warning: {
    surface: "bg-status-warning-surface",
    fg: "text-status-warning-fg",
    Icon: AlertTriangle,
  },
  error: {
    surface: "bg-status-error-surface",
    fg: "text-status-error-fg",
    Icon: XCircle,
  },
};

export function Callout({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: Variant;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  const { surface, fg, Icon } = config[variant];
  return (
    <div className={cn("flex gap-3 rounded-[10px] p-6", surface, className)}>
      <Icon aria-hidden className={cn("mt-0.5 size-5 shrink-0", fg)} />
      <div className="flex flex-col gap-1">
        {title && (
          <p className={cn("text-sm font-semibold", fg)}>{title}</p>
        )}
        <div className="text-sm leading-[1.6] text-text-prose">{children}</div>
      </div>
    </div>
  );
}
