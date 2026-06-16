import { cn } from "@/lib/cn";

// DS master: Nav Item (M8kBKi). Inter 14/500 text-secondary, padding [space-2,0].
// Active state (v3.1): text-primary + weight 600 + a 2px accent bottom border
// (border-accent), set via aria-current. Accent is reserved for active nav, so
// inactive items carry a transparent bottom border to keep equal height.
export function NavItem({
  href,
  children,
  active = false,
  className,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "hover:text-text-primary inline-flex items-center border-b-2 py-2 text-sm whitespace-nowrap transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
        active
          ? "border-border-accent text-text-primary font-semibold"
          : "border-transparent text-text-secondary font-medium",
        className,
      )}
    >
      {children}
    </a>
  );
}
