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
                    className="text-text-tertiary hover:text-text-primary text-[13px] transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={last ? "page" : undefined}
                    className={
                      last
                        ? "text-text-primary text-[13px] font-semibold"
                        : "text-text-tertiary text-[13px]"
                    }
                  >
                    {item.label}
                  </span>
                )}
              </li>
              {!last && (
                <li aria-hidden className="flex items-center">
                  <ChevronRight className="text-text-tertiary size-3.5" />
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
