import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

// DS master: Button (WuNSb). radius 8, fill action-primary, label Inter 14/600
// text-on-accent, padding [space-3, space-5], gap space-2, optional trailing
// icon. min-h-11 enforces the ≥44px touch target from the accessibility rules.
type Variant = "primary" | "secondary";

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition duration-[var(--duration-fast)] ease-[var(--ease-standard)] active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary:
    "bg-action-primary text-text-on-accent hover:bg-action-primary-hover active:bg-action-primary-pressed",
  secondary:
    "bg-action-secondary text-text-inverse hover:bg-action-secondary-hover",
};

type CommonProps = {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };
type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = "primary", icon, children, className, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a">;
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
      {icon}
    </button>
  );
}
