import { ArrowRight } from "lucide-react";
import { Button } from "./Button";

// DS: Contact Pattern. Dark block — eyebrow, headline, sub, an email CTA and a
// row of social links. Text uses on-dark tokens (dark surface in both modes).
type Link = { label: string; href: string };

export function ContactSection({
  email = "hello@capanema.io",
  headline = "Let's talk about what you're building.",
  sub = "Advisory, fractional leadership, or a conversation about scaling your platform and team.",
  links = [],
}: {
  email?: string;
  headline?: string;
  sub?: string;
  links?: Link[];
}) {
  return (
    <section className="bg-surface-dark flex flex-col gap-12 rounded-xl p-10 sm:p-16">
      <div className="flex flex-col gap-4">
        <h2 className="text-text-accent font-mono text-xs tracking-[1px]">
          CONTACT
        </h2>
        <h3 className="text-text-on-dark text-h3 sm:text-h2 lg:text-h1 max-w-225 font-semibold">
          {headline}
        </h3>
        <p className="text-text-on-dark-muted text-body-l max-w-155">
          {sub}
        </p>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Button href={`mailto:${email}`} icon={<ArrowRight className="size-4" />}>
          {email}
        </Button>
        {links.length > 0 && (
          <div className="flex flex-wrap gap-5">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-on-dark text-sm font-medium transition-opacity hover:opacity-70"
              >
                {link.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
