"use client";

import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { ThemeToggle } from "./ThemeToggle";

// Site chrome derived from the Hero Pattern top row: brand wordmark left,
// primary navigation right. Active section is resolved from the pathname.
const links = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/articles", label: "Articles" },
  { href: "/resume", label: "Resume" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border-subtle bg-surface-primary">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-6 py-4 md:px-8">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-base font-semibold tracking-[-0.3px] text-text-primary"
        >
          <img
            src="/logo-light.png"
            alt=""
            width={32}
            height={32}
            className="logo-light h-8 w-8"
          />
          <img
            src="/logo-dark.png"
            alt=""
            width={32}
            height={32}
            className="logo-dark h-8 w-8"
          />
          Murilo Capanema
        </a>
        <div className="flex items-center gap-4 md:gap-6">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-6 md:gap-8">
              {links.map((link) => (
                <li key={link.href}>
                  <NavItem
                    href={link.href}
                    active={pathname.startsWith(link.href)}
                  >
                    {link.label}
                  </NavItem>
                </li>
              ))}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
