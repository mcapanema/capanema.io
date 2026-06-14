"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

// DS master: ToC Rail (Br6Rv). "ON THIS PAGE" eyebrow over left-border items;
// the active section gets the accent border + emphasised label. Active state is
// resolved with a scroll-spy (IntersectionObserver) over the section anchors.
export type ToCItem = { id: string; label: string };

export function ToCRail({ items }: { items: ToCItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="flex flex-col gap-3">
      <span className="text-text-tertiary px-4 font-mono text-xs tracking-[1px]">
        ON THIS PAGE
      </span>
      {items.map((item) => {
        const isActive = item.id === active;
        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "border-l-2 px-4 py-1 text-sm leading-[1.4] transition-colors",
              isActive
                ? "border-border-accent text-text-primary font-semibold"
                : "border-border-subtle text-text-secondary hover:text-text-primary",
            )}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
