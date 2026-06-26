"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";
import { ThemeToggle } from "./ThemeToggle";

// Site chrome derived from the Hero Pattern top row: brand wordmark left,
// primary navigation right. Active section is resolved from the pathname.
const links = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/articles", label: "Articles" },
  { href: "/resume", label: "About me" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-border-subtle bg-surface-primary border-b">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between gap-6 px-6 py-4 md:px-8">
        <Link
          href="/"
          aria-label="Murilo Capanema – Home"
          className="text-text-primary inline-flex shrink-0 items-center gap-4 text-base font-semibold tracking-[-0.3px]"
        >
          <span className="logo-light-picture">
            <Image
              src="/logo-light.png"
              alt=""
              width={32}
              height={32}
              className="logo-light h-8 w-8"
              unoptimized
            />
          </span>
          <span className="logo-dark-picture">
            <Image
              src="/logo-dark.png"
              alt=""
              width={32}
              height={32}
              className="logo-dark h-8 w-8"
              unoptimized
            />
          </span>
          <span className="hidden sm:inline">Murilo Capanema</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <nav aria-label="Primary">
            <ul className="flex items-center gap-3 sm:gap-6 md:gap-8">
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
