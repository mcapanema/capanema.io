import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

// DS master: Icon Button (GPwQ9). radius 8, surface-elevated, border-default,
// icon 18 text-secondary. Requires an accessible label. min 44×44 target.
type CommonProps = {
  label: string;
  children: ReactNode;
  className?: string;
  "aria-pressed"?: boolean;
};

const base =
  "inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border-default bg-surface-elevated text-text-secondary transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)] hover:border-border-strong hover:text-text-primary";

type AsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps> & { href: string };
type AsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };

export function IconButton(props: AsLink | AsButton) {
  const { label, children, className, ...rest } = props;
  const classes = cn(base, className);

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a">;
    return (
      <a href={href} aria-label={label} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      className={classes}
      {...(rest as ComponentPropsWithoutRef<"button">)}
    >
      {children}
    </button>
  );
}
