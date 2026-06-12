import { ArrowRight, ArrowUpRight, Download } from "lucide-react";
import {
  Breadcrumb,
  Button,
  Callout,
  Footer,
  IconButton,
  Metric,
  MetricCard,
  Pullquote,
  SiteHeader,
  Tag,
} from "@/components/ui";

export const metadata = { title: "Style Guide" };

function Section({
  n,
  title,
  description,
  children,
}: {
  n: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-6 border-t border-border-subtle pt-10">
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs tracking-[1px] text-text-accent">
          {n}
        </span>
        <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.5px] text-text-primary">
          {title}
        </h2>
        {description && (
          <p className="max-w-[680px] text-base leading-[1.6] text-text-secondary">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

// Full literal class strings so Tailwind can detect them (no dynamic concat).
const textTokens: [string, string][] = [
  ["text-primary", "text-text-primary"],
  ["text-secondary", "text-text-secondary"],
  ["text-tertiary", "text-text-tertiary"],
  ["text-muted", "text-text-muted"],
  ["text-prose", "text-text-prose"],
  ["text-accent", "text-text-accent"],
  ["text-success", "text-text-success"],
];

const surfaceSwatches = [
  ["surface-primary", "bg-surface-primary"],
  ["surface-secondary", "bg-surface-secondary"],
  ["surface-tertiary", "bg-surface-tertiary"],
  ["surface-subtle", "bg-surface-subtle"],
  ["surface-elevated", "bg-surface-elevated"],
  ["surface-dark", "bg-surface-dark"],
  ["surface-dark-raised", "bg-surface-dark-raised"],
  ["surface-accent", "bg-surface-accent"],
  ["surface-inverse", "bg-surface-inverse"],
] as const;

const calloutVariants = ["info", "success", "warning", "error"] as const;

const typeScale = [
  ["Display XL", "72/1.05/-1.5", "text-[72px] leading-[1.05] tracking-[-1.5px] font-semibold"],
  ["Display L", "64/1.05/-1.3", "text-[64px] leading-[1.05] tracking-[-1.3px] font-semibold"],
  ["Display M", "56/1.08/-1.1", "text-[56px] leading-[1.08] tracking-[-1.1px] font-semibold"],
  ["H1", "48/1.1/-1", "text-[48px] leading-[1.1] tracking-[-1px] font-semibold"],
  ["H2", "40/1.15/-0.8", "text-[40px] leading-[1.15] tracking-[-0.8px] font-semibold"],
  ["H3", "32/1.2/-0.5", "text-[32px] leading-[1.2] tracking-[-0.5px] font-semibold"],
  ["H4", "24/1.3/-0.3", "text-2xl leading-[1.3] tracking-[-0.3px] font-semibold"],
  ["H5", "20/1.4", "text-xl leading-[1.4] font-semibold"],
  ["Body L", "18/1.6", "text-lg leading-[1.6]"],
  ["Body M", "16/1.6", "text-base leading-[1.6]"],
  ["Body S", "14/1.5", "text-sm leading-[1.5]"],
  ["Caption", "12/1.4", "text-xs leading-[1.4] font-medium"],
] as const;

export default function StyleGuide() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1120px] flex-col gap-12 px-6 py-16 md:px-8">
        <header className="flex flex-col gap-3">
          <span className="font-mono text-xs tracking-[1px] text-text-accent">
            FOUNDATION PREVIEW
          </span>
          <h1 className="text-[48px] font-semibold leading-[1.1] tracking-[-1px] text-text-primary">
            Design System foundation
          </h1>
          <p className="max-w-[680px] text-lg leading-[1.6] text-text-secondary">
            Tokens and base components rendered from the live token layer. Toggle
            your OS appearance to verify Light and Dark resolve with zero
            per-component overrides.
          </p>
        </header>

        <Section
          n="01"
          title="Type scale"
          description="Inter for every display and UI surface. Values mirror the Foundation board exactly."
        >
          <div className="flex flex-col gap-5">
            {typeScale.map(([name, meta, cls]) => (
              <div key={name} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8">
                <span className="w-44 shrink-0 font-mono text-xs text-text-tertiary">
                  {name} · {meta}
                </span>
                <span className={`text-text-primary ${cls}`}>
                  Systems that scale
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section n="02" title="Text tokens">
          <div className="flex flex-col gap-2">
            {textTokens.map(([name, cls]) => (
              <p key={name} className={`text-lg ${cls}`}>
                <span className="font-mono text-sm text-text-tertiary">{name}</span>
                {"  —  "}
                The structures that work at twenty engineers break at a hundred.
              </p>
            ))}
          </div>
        </Section>

        <Section n="03" title="Surfaces & borders">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {surfaceSwatches.map(([name, bg]) => (
              <div
                key={name}
                className="flex h-24 flex-col justify-end rounded-xl border border-border-subtle p-3"
              >
                <div className={`mb-2 h-10 w-full rounded-lg border border-border-default ${bg}`} />
                <span className="font-mono text-xs text-text-tertiary">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section n="04" title="Buttons & actions">
          <div className="flex flex-wrap items-center gap-4">
            <Button href="/case-studies" icon={<ArrowRight className="size-4" />}>
              View case studies
            </Button>
            <Button variant="secondary" href="/resume">
              Read resume
            </Button>
            <Button variant="secondary" icon={<Download className="size-4" />}>
              Download PDF
            </Button>
            <IconButton label="Open external link" href="https://example.com">
              <ArrowUpRight className="size-[18px]" />
            </IconButton>
          </div>
        </Section>

        <Section n="05" title="Tags">
          <div className="flex flex-wrap gap-3">
            <Tag>Platform</Tag>
            <Tag dot>Leadership</Tag>
            <Tag dot>Healthcare</Tag>
            <Tag>6 min read</Tag>
          </div>
        </Section>

        <Section n="06" title="Metrics">
          <div className="flex flex-wrap gap-12">
            <Metric value="3.2M" label="patients served / year" />
            <Metric value="−42%" label="average wait time" />
            <Metric value="12→140" label="engineers led" />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard eyebrow="SCALE" value="140" label="engineers led across 6 teams" />
            <MetricCard eyebrow="UPTIME" value="99.99%" label="platform availability" />
            <MetricCard eyebrow="SPAN" value="20+" label="years building software" />
            <MetricCard eyebrow="TEAMS" value="9" label="products shipped to production" />
          </div>
        </Section>

        <Section n="07" title="Callouts">
          <div className="flex max-w-[680px] flex-col gap-4">
            {calloutVariants.map((variant) => (
              <Callout key={variant} variant={variant} title={variant[0].toUpperCase() + variant.slice(1)}>
                Color is paired with an icon and a label, so the meaning never
                rests on color alone.
              </Callout>
            ))}
          </div>
        </Section>

        <Section n="08" title="Pullquote">
          <Pullquote attribution={'— from "Org design at scale"'}>
            The structures that work at twenty engineers quietly break at a
            hundred. The job is to see it coming.
          </Pullquote>
        </Section>

        <Section n="09" title="Breadcrumb">
          <Breadcrumb
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Healthcare", href: "/case-studies?tag=healthcare" },
              { label: "Clinical Operations" },
            ]}
          />
        </Section>
      </main>
      <Footer />
    </>
  );
}
