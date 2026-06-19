import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  ChevronRight,
  Download,
  ExternalLink,
  GitBranch,
  Link,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import {
  Breadcrumb,
  Button,
  Callout,
  Eyebrow,
  Footer,
  IconButton,
  Metric,
  MetricCard,
  NavItem,
  Pullquote,
  SectionTick,
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
    <section className="border-border-subtle flex flex-col gap-6 border-t pt-10">
      <div className="flex flex-col gap-2">
        <span className="text-text-accent font-mono text-xs tracking-[1px]">
          {n}
        </span>
        <h2 className="text-text-primary text-h3 font-semibold">{title}</h2>
        {description && (
          <p className="text-text-secondary max-w-[680px] text-base leading-[1.6]">
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

// v3.1: type scale rendered with the tokenized utilities (size + line-height +
// tracking baked into each text-* utility via globals.css @theme).
const typeScale = [
  ["Display XL", "72/1.05/-1.5", "text-display-xl font-semibold"],
  ["Display L", "64/1.05/-1.3", "text-display-l font-semibold"],
  ["Display M", "56/1.08/-1.1", "text-display-m font-semibold"],
  ["H1", "48/1.1/-1", "text-h1 font-semibold"],
  ["H2", "40/1.15/-0.8", "text-h2 font-semibold"],
  ["H3", "32/1.2/-0.5", "text-h3 font-semibold"],
  ["H4", "24/1.3/-0.3", "text-h4 font-semibold"],
  ["H5", "20/1.4", "text-h5 font-semibold"],
  ["Body L", "18/1.6", "text-body-l"],
  ["Body M", "16/1.6", "text-body-m"],
  ["Body S", "14/1.5", "text-body-s"],
  ["Caption", "12/1.4", "text-caption font-medium"],
] as const;

// v3.1 radius scale. radius-lg (16) has no remapped utility (rounded-lg/xl are
// in use at their defaults), so it is consumed via an arbitrary utility.
const radiusTokens = [
  ["radius-sm", "8px", "rounded-sm"],
  ["radius-md", "12px", "rounded-md"],
  ["radius-lg", "16px", "rounded-[var(--radius-lg)]"],
  ["radius-pill", "999px", "rounded-pill"],
] as const;

const durationTokens = [
  ["duration-fast", "120ms"],
  ["duration-base", "200ms"],
  ["duration-slow", "320ms"],
] as const;

const easingTokens = [
  ["ease-standard", "cubic-bezier(0.2, 0, 0, 1)"],
  ["ease-emphasized", "cubic-bezier(0.3, 0, 0, 1)"],
] as const;

// v3.1 motion choreography: the interaction→token map from the Foundation board.
const motionMap = [
  ["Button hover", "duration-fast", "ease-standard", "background + shadow"],
  ["Link hover", "duration-fast", "ease-standard", "color + underline"],
  ["Nav active change", "duration-base", "ease-standard", "underline offset"],
  ["Card hover lift", "duration-base", "ease-standard", "translateY + shadow"],
  ["Theme toggle", "duration-base", "ease-emphasized", "color cross-fade"],
  ["Overlay / dialog", "duration-slow", "ease-emphasized", "opacity + translateY"],
] as const;

// Button state ladder — the v3.1 motion-choreography deliverable. Each chip
// shows the fill at a state; transitions run on duration-fast / ease-standard.
const buttonStates = [
  ["Rest", "bg-action-primary"],
  ["Hover", "bg-action-primary-hover"],
  ["Active", "bg-action-primary-pressed"],
] as const;

const iconSizes = [
  ["icon-sm", "16px", "size-[var(--icon-sm)]"],
  ["icon-md", "20px", "size-[var(--icon-md)]"],
  ["icon-lg", "24px", "size-[var(--icon-lg)]"],
] as const;

const breakpointTokens = [
  ["breakpoint-sm", "640px", "large phones — single column"],
  ["breakpoint-md", "768px", "tablets — 2-col cards, inline nav"],
  ["breakpoint-lg", "1024px", "laptops — 3-col discovery, ToC rail"],
  ["breakpoint-xl", "1280px", "desktop — max measure, wide margins"],
] as const;

// v3.1 spacing ramp (4 → 128, 4px-based). The codebase consumes it via
// Tailwind's default scale — identical px values, different index (DS space-6 =
// 32px = Tailwind's `8`); literal width classes so Tailwind detects them.
const spacingTokens = [
  ["space-1", "4px", "w-1"],
  ["space-2", "8px", "w-2"],
  ["space-3", "12px", "w-3"],
  ["space-4", "16px", "w-4"],
  ["space-5", "24px", "w-6"],
  ["space-6", "32px", "w-8"],
  ["space-7", "40px", "w-10"],
  ["space-8", "48px", "w-12"],
  ["space-9", "64px", "w-16"],
  ["space-10", "80px", "w-20"],
  ["space-11", "96px", "w-24"],
  ["space-12", "128px", "w-32"],
] as const;

// v3.1 elevation — four levels built from the shadow-1a token; offset/blur grow
// with elevation. Cards use level 1; overlays use level 3. (Codebase ships the
// shadow-1a/1b colors; the levels are composed via arbitrary shadow utilities.)
const elevationLevels = [
  ["0 · Flat", "base surfaces", "shadow-none"],
  ["1 · Raised", "cards, default · y1 · 3px", "shadow-[0_1px_3px_var(--shadow-1a)]"],
  ["2 · Hover", "lifted on hover · y4 · 12px", "shadow-[0_4px_12px_var(--shadow-1a)]"],
  ["3 · Overlay", "menus, modals · y12 · 24px", "shadow-[0_12px_24px_var(--shadow-1a)]"],
] as const;

// v3.1 icon inventory — representative lucide line icons used across the site,
// shown at icon-md. Mirrors the DS Iconography "inventory · in use" grid.
const iconInventory = [
  [ArrowRight, "arrow-right"],
  [ArrowUpRight, "arrow-up-right"],
  [ArrowLeft, "arrow-left"],
  [ChevronRight, "chevron-right"],
  [Download, "download"],
  [ExternalLink, "external-link"],
  [Mail, "mail"],
  [Calendar, "calendar"],
  [GitBranch, "git-branch"],
  [Link, "link"],
  [Menu, "menu"],
  [X, "x"],
  [Sun, "sun"],
  [Moon, "moon"],
] as const;

export default function StyleGuide() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1120px] flex-col gap-12 px-6 py-16 md:px-8">
        <header className="flex flex-col gap-3">
          <Eyebrow>FOUNDATION PREVIEW · V3.1</Eyebrow>
          <SectionTick />
          <h1 className="text-text-primary text-h1 font-semibold">
            Design System foundation
          </h1>
          <p className="text-text-secondary max-w-[680px] text-lg leading-[1.6]">
            Tokens and base components rendered from the live token layer. Toggle
            your OS appearance to verify Light and Dark resolve with zero
            per-component overrides.
          </p>
        </header>

        <Section
          n="01"
          title="Type scale"
          description="Inter for every display and UI surface. v3.1 tokenizes the ramp — each step is a text-* utility carrying size, line-height, and tracking."
        >
          <div className="flex flex-col gap-5">
            {typeScale.map(([name, meta, cls]) => (
              <div
                key={name}
                className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8"
              >
                <span className="text-text-tertiary w-44 shrink-0 font-mono text-xs">
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
                <span className="text-text-tertiary font-mono text-sm">{name}</span>
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
                className="border-border-subtle flex h-24 flex-col justify-end rounded-xl border p-3"
              >
                <div
                  className={`border-border-default mb-2 h-10 w-full rounded-lg border ${bg}`}
                />
                <span className="text-text-tertiary font-mono text-xs">{name}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          n="04"
          title="Spacing"
          description="v3.1 spacing ramp (4 → 128, 4px-based). The codebase maps it onto Tailwind's default scale — identical px values, different index (DS space-6 = 32px = Tailwind's `8`)."
        >
          <div className="flex flex-col gap-2">
            {spacingTokens.map(([name, value, w]) => (
              <div key={name} className="flex items-center gap-4">
                <span className="text-text-tertiary w-28 shrink-0 font-mono text-xs">
                  {name} · {value}
                </span>
                <span className={`bg-surface-accent h-3 ${w}`} />
              </div>
            ))}
          </div>
        </Section>

        <Section
          n="05"
          title="Radius"
          description="v3.1 radius scale. radius-sm/md/pill map to rounded-sm/md/pill; radius-lg is used via rounded-[var(--radius-lg)]."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {radiusTokens.map(([name, value, cls]) => (
              <div key={name} className="flex flex-col gap-2">
                <div
                  className={`border-border-default bg-surface-secondary h-20 w-full border ${cls}`}
                />
                <span className="text-text-tertiary font-mono text-xs">
                  {name} · {value}
                </span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          n="06"
          title="Elevation"
          description="v3.1 elevation — four levels built from the shadow-1a token; offset/blur grow with elevation. Cards use level 1; overlays use level 3."
        >
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {elevationLevels.map(([name, use, shadow]) => (
              <div key={name} className="flex flex-col gap-3">
                <div
                  className={`bg-surface-elevated border-border-subtle h-20 w-full rounded-md border ${shadow}`}
                />
                <div className="flex flex-col gap-0.5">
                  <span className="text-text-primary font-mono text-xs">{name}</span>
                  <span className="text-text-tertiary text-xs">{use}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section
          n="07"
          title="Motion"
          description="v3.1 motion tokens, the interaction→token map, and the four-state button ladder — the motion-choreography deliverable. Hover uses duration-fast · ease-standard; nav/card/theme use duration-base; overlays use duration-slow · ease-emphasized."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-8">
              <div className="flex flex-col gap-2">
                <span className="text-text-tertiary font-mono text-xs">DURATION</span>
                {durationTokens.map(([name, value]) => (
                  <span key={name} className="text-text-secondary text-sm">
                    <span className="font-mono">{name}</span> · {value}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-text-tertiary font-mono text-xs">EASING</span>
                {easingTokens.map(([name, value]) => (
                  <span key={name} className="text-text-secondary text-sm">
                    <span className="font-mono">{name}</span> · {value}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-border-subtle overflow-hidden rounded-md border">
              <div className="bg-surface-secondary text-text-tertiary flex gap-4 px-4 py-2 font-mono text-[11px] tracking-[1px]">
                <span className="w-44 shrink-0">INTERACTION</span>
                <span className="w-32 shrink-0">DURATION</span>
                <span className="w-36 shrink-0">EASING</span>
                <span>PROPERTY</span>
              </div>
              {motionMap.map(([interaction, duration, easing, property]) => (
                <div
                  key={interaction}
                  className="border-border-subtle flex gap-4 border-t px-4 py-2 text-sm"
                >
                  <span className="text-text-primary w-44 shrink-0 font-medium">
                    {interaction}
                  </span>
                  <span className="text-text-secondary w-32 shrink-0 font-mono text-[13px]">
                    {duration}
                  </span>
                  <span className="text-text-secondary w-36 shrink-0 font-mono text-[13px]">
                    {easing}
                  </span>
                  <span className="text-text-secondary">{property}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-4">
              {buttonStates.map(([label, bg]) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className={`h-12 w-24 rounded-lg ${bg}`} />
                  <span className="text-text-tertiary font-mono text-xs">{label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <div className="bg-action-primary outline-focus-ring h-12 w-24 rounded-lg outline-2 outline-offset-2" />
                <span className="text-text-tertiary font-mono text-xs">Focus</span>
              </div>
            </div>
          </div>
        </Section>

        <Section
          n="08"
          title="Iconography"
          description="v3.1 formalizes the icon system: lucide line icons at three sizes (icon-sm/md/lg) plus the working inventory. Consistent stroke weight; sizes consumed via size-[var(--icon-sm)], size-[var(--icon-md)], size-[var(--icon-lg)]."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-text-tertiary font-mono text-xs tracking-[1px]">
                SIZES
              </span>
              <div className="flex flex-wrap items-end gap-8">
                {iconSizes.map(([name, value, cls]) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <ArrowRight className={`text-text-secondary ${cls}`} />
                    <span className="text-text-tertiary font-mono text-xs">
                      {name} · {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-text-tertiary font-mono text-xs tracking-[1px]">
                INVENTORY · LUCIDE
              </span>
              <div className="flex flex-wrap gap-4">
                {iconInventory.map(([Icon, name]) => (
                  <div
                    key={name}
                    className="border-border-subtle flex size-12 items-center justify-center rounded-md border"
                  >
                    <Icon className="text-text-secondary size-[var(--icon-md)]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section
          n="09"
          title="Breakpoints"
          description="v3.1 responsive contract (matches Tailwind's sm/md/lg/xl)."
        >
          <div className="flex flex-col gap-2">
            {breakpointTokens.map(([name, value, note]) => (
              <div
                key={name}
                className="border-border-subtle flex flex-col gap-1 border-b py-2 sm:flex-row sm:items-baseline sm:gap-6"
              >
                <span className="text-text-primary w-40 shrink-0 font-mono text-sm">
                  {name}
                </span>
                <span className="text-text-tertiary w-20 shrink-0 font-mono text-sm">
                  {value}
                </span>
                <span className="text-text-secondary text-sm">{note}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section
          n="10"
          title="Buttons & navigation"
          description="Controls — buttons, icon buttons, and primary nav. The active nav item carries the v3.1 accent underline (a 2px border-accent rule + weight 600); inactive items are neutral. Accent is reserved for the active item."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4">
              <Button href="/case-studies" icon={<ArrowRight className="size-4" />}>
                View case studies
              </Button>
              <Button variant="secondary" href="/resume">
                About me
              </Button>
              <Button variant="secondary" icon={<Download className="size-4" />}>
                Download PDF
              </Button>
              <IconButton label="Open external link" href="https://example.com">
                <ArrowUpRight className="size-[18px]" />
              </IconButton>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-text-tertiary font-mono text-xs tracking-[1px]">
                NAV ITEM · ACTIVE + REST
              </span>
              <nav aria-label="Style guide navigation sample">
                <ul className="flex items-center gap-6">
                  <li>
                    <NavItem href="/case-studies" active>
                      Case Studies
                    </NavItem>
                  </li>
                  <li>
                    <NavItem href="/articles">Writing</NavItem>
                  </li>
                  <li>
                    <NavItem href="/resume">Resume</NavItem>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </Section>

        <Section n="11" title="Tags">
          <div className="flex flex-wrap gap-3">
            <Tag>Platform</Tag>
            <Tag dot>Leadership</Tag>
            <Tag dot>Healthcare</Tag>
            <Tag>6 min read</Tag>
          </div>
        </Section>

        <Section n="12" title="Metrics">
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

        <Section n="13" title="Callouts">
          <div className="flex max-w-[680px] flex-col gap-4">
            {calloutVariants.map((variant) => (
              <Callout
                key={variant}
                variant={variant}
                title={variant[0].toUpperCase() + variant.slice(1)}
              >
                Color is paired with an icon and a label, so the meaning never
                rests on color alone.
              </Callout>
            ))}
          </div>
        </Section>

        <Section n="14" title="Pullquote">
          <Pullquote attribution={'— from "Org design at scale"'}>
            The structures that work at twenty engineers quietly break at a
            hundred. The job is to see it coming.
          </Pullquote>
        </Section>

        <Section n="15" title="Breadcrumb">
          <Breadcrumb
            items={[
              { label: "Case Studies", href: "/case-studies" },
              { label: "Healthcare", href: "/case-studies?tag=healthcare" },
              { label: "Clinical Operations" },
            ]}
          />
        </Section>

        <Section
          n="16"
          title="Eyebrow & accent texture"
          description="v3.1 makes the accent structural. Accent is reserved for eyebrows, CTAs, links, and active nav; categories and tags are neutral; metrics and outcomes are ink. Emphasis comes from size, weight, and the eyebrow accent-bar texture — never from spreading color."
        >
          <div className="flex flex-col gap-6">
            <Eyebrow>CASE STUDY</Eyebrow>
            <div className="flex flex-col gap-3">
              <SectionTick />
              <h3 className="text-text-primary text-h3 font-semibold">
                Scaling Clinical Operations Through Optimization
              </h3>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
