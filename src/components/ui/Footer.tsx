// DS master: Footer (JkvM5). surface-dark, padding space-9, vertical gap
// space-8. Brand + link columns over a divider, legal row beneath. Text uses
// on-dark tokens (this surface is dark in both modes).
const explore = [
  { href: "/case-studies", label: "Case Studies" },
  { href: "/articles", label: "Articles" },
  { href: "/resume", label: "About me" },
];

const connect = [
  { href: "mailto:murilo@capanema.io", label: "Email" },
  { href: "https://www.linkedin.com/in/mcapanema", label: "LinkedIn" },
  { href: "https://github.com/mcapanema", label: "GitHub" },
];

function LinkColumn({
  heading,
  links,
}: {
  heading: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-on-dark-muted font-mono text-[11px] tracking-[1px]">
        {heading}
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("http") ? "_blank" : undefined}
          rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
          className="text-text-on-dark text-sm transition-opacity hover:opacity-70"
        >
          {link.label}
          {link.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-surface-dark">
      <div className="mx-auto flex max-w-[1120px] flex-col gap-8 px-6 py-16 md:px-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="flex max-w-80 flex-col gap-2">
            <span className="text-text-on-dark text-xl font-semibold tracking-[-0.3px]">
              Murilo Capanema
            </span>
            <p className="text-text-on-dark-muted text-sm leading-[1.55]">
              Engineering executive — building platforms, teams, and the systems
              that scale them.
            </p>
          </div>
          <div className="flex gap-16">
            <LinkColumn heading="EXPLORE" links={explore} />
            <LinkColumn heading="CONNECT" links={connect} />
          </div>
        </div>
        <div className="bg-surface-dark-raised h-px w-full" />
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <span className="text-text-on-dark-muted font-mono text-xs">
            © 2026 CAPANEMA.IO
          </span>
          <span className="text-text-on-dark-muted font-mono text-xs">
            DESIGNED &amp; BUILT WITH INTENT
          </span>
        </div>
      </div>
    </footer>
  );
}
