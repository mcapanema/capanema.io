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
        <span className="text-text-accent font-mono text-[13px] tracking-[1px]">
          CONTACT
        </span>
        <h2 className="text-text-on-dark max-w-[900px] text-[32px] leading-[1.1] font-semibold tracking-[-0.8px] sm:text-[40px] lg:text-[48px] lg:tracking-[-1px]">
          {headline}
        </h2>
        <p className="text-text-on-dark-muted max-w-[620px] text-lg leading-[1.6]">
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
                className="text-text-on-dark text-[15px] font-medium transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
