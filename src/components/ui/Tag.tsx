import { cn } from "@/lib/cn";

// DS master: Tag (UsMEV). pill, surface-tertiary, JetBrains Mono 12/500
// text-secondary, letter-spacing 0.5, padding [space-1, space-3], optional
// accent dot.
export function Tag({
  children,
  dot = false,
  className,
}: {
  children: React.ReactNode;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-surface-tertiary text-text-secondary inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs font-medium tracking-[0.5px]",
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden
          className="bg-text-accent size-1.5 rounded-full"
        />
      )}
      {children}
    </span>
  );
}
