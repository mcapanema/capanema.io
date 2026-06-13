import { cn } from "@/lib/cn";

// DS master: Nav Item (M8kBKi). Inter 14/500 text-secondary, padding [space-2,0].
// Active state lifts to text-primary (set via aria-current).
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
        "inline-flex items-center whitespace-nowrap py-2 text-sm font-medium transition-colors hover:text-text-primary",
        active ? "text-text-primary" : "text-text-secondary",
        className,
      )}
    >
      {children}
    </a>
  );
}
