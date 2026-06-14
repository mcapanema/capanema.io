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
      <span className="font-mono text-[11px] tracking-[1px] text-text-on-dark-muted">
        {heading}
      </span>
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-sm text-text-on-dark transition-opacity hover:opacity-70"
        >
          {link.label}
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
            <span className="text-xl font-semibold tracking-[-0.3px] text-text-on-dark">
              Murilo Capanema
            </span>
            <p className="text-sm leading-[1.55] text-text-on-dark-muted">
              Engineering executive — building platforms, teams, and the systems
              that scale them.
            </p>
          </div>
          <div className="flex gap-16">
            <LinkColumn heading="EXPLORE" links={explore} />
            <LinkColumn heading="CONNECT" links={connect} />
          </div>
        </div>
        <div className="h-px w-full bg-surface-dark-raised" />
        <div className="flex flex-col justify-between gap-2 sm:flex-row">
          <span className="font-mono text-xs text-text-on-dark-muted">
            © 2026 CAPANEMA.IO
          </span>
          <span className="font-mono text-xs text-text-on-dark-muted">
            DESIGNED &amp; BUILT WITH INTENT
          </span>
        </div>
      </div>
    </footer>
  );
}
