import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

// DS master: Breadcrumb (ahkiC). Inter 13 text-tertiary crumbs, chevron-right
// (14) separators, current page in text-primary 600.
export type Crumb = { label: string; href?: string };

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {item.href && !last ? (
                  <a
                    href={item.href}
                    className="text-[13px] text-text-tertiary transition-colors hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={
                      last
                        ? "text-[13px] font-semibold text-text-primary"
                        : "text-[13px] text-text-tertiary"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!last && (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="size-3.5 text-text-tertiary" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
