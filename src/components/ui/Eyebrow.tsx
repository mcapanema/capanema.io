import { cn } from "@/lib/cn";

// DS master: Eyebrow (v3.1 structural-accent texture). A short accent bar
// (3×14, pill) followed by a JetBrains Mono accent label. Eyebrows are one of
// the reserved accent surfaces (eyebrows / CTA / links / active nav); elsewhere
// the accent is held back (categories and tags neutral, metrics ink).
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span aria-hidden className="bg-surface-accent h-3.5 w-[3px] rounded-pill" />
      <span className="text-text-accent font-mono text-xs font-medium tracking-[1px]">
        {children}
      </span>
    </span>
  );
}

// Codebase-only helper (NOT a DS master): a 24×3 accent rule for section
// headlines, derived from the Eyebrow's accent texture. Purely decorative, so
// it is aria-hidden.
export function SectionTick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("bg-surface-accent block h-[3px] w-6 rounded-pill", className)}
    />
  );
}
