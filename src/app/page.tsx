import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getImageProps } from "next/image";
import {
  ArticleCard,
  Button,
  CaseStudyCard,
  ContactSection,
  CredibilityStrip,
  Footer,
  SiteHeader,
} from "@/components/ui";
import { getCaseStudies } from "@/content/case-studies";
import { getArticles } from "@/content/articles";
import { resume } from "@/content/resume";
import { cn } from "@/lib/cn";
import meImage from "./me.png";

const COMPANIES = ["Genial Care", "Creditas", "and more"];

function SectionHeader({
  title,
  href,
  cta,
}: {
  title: string;
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <h2 className="text-text-primary text-h3 font-semibold">
        {title}
      </h2>
      <Link
        href={href}
        className="group text-link hover:text-link-hover inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-fast ease-standard"
      >
        {cta}
        <ArrowRight className="size-4 transition-transform duration-fast ease-standard group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}

// Hero portrait — a photo card floating over an offset cobalt plate (the
// "Layered Plate" treatment). The plate is bg-surface-accent (Cobalt Deep),
// absolutely positioned at inset-0 and nudged down-right so it peeks out behind
// the bottom-right edge of the photo. The caller sizes the wrapper via
// `className` and may reshape the photo via `imgClassName` (e.g. a square crop
// on mobile vs. the natural 4:5 portrait on desktop). aria-hidden on the plate
// — it is purely decorative.
function HeroPortrait({
  className,
  imgClassName,
  imgProps,
  mobileSrcSet,
  tabletDesktopSrcSet,
}: {
  className?: string;
  imgClassName?: string;
  imgProps: ComponentPropsWithoutRef<"img">;
  mobileSrcSet: string;
  tabletDesktopSrcSet: string;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <div
        aria-hidden
        className="bg-surface-accent absolute inset-0 rounded-[var(--radius-lg)] translate-3 sm:translate-4"
      />
      <picture>
        {/* tablet + desktop: doubled sizes for 1x-display sharpness */}
        <source media="(min-width: 640px)" srcSet={tabletDesktopSrcSet} />
        {/* mobile fallback: accurate sizes, bandwidth-optimal on retina phones */}
        <img
          {...imgProps}
          alt="Murilo Capanema"
          srcSet={mobileSrcSet}
          loading="eager"
          fetchPriority="high"
          className={cn(
            "relative block h-auto w-full rounded-[var(--radius-lg)] shadow-[0_1px_3px_var(--shadow-1a)]",
            imgClassName,
          )}
        />
      </picture>
    </div>
  );
}

export default function Home() {
  const caseStudies = getCaseStudies().slice(0, 2);
  const articles = getArticles().slice(0, 3);

  const {
    props: { srcSet: tabletDesktopSrcSetRaw },
  } = getImageProps({
    src: meImage,
    alt: "Murilo Capanema",
    quality: 90,
    sizes: "(min-width: 1024px) 680px, 520px",
  });
  const tabletDesktopSrcSet = tabletDesktopSrcSetRaw ?? "";

  const {
    props: { srcSet: mobileSrcSetRaw, loading: _loading, ...heroImgProps },
  } = getImageProps({
    src: meImage,
    alt: "Murilo Capanema",
    quality: 90,
    sizes: "300px",
    // Blurred background while the photo decodes — avoids the flash of bare
    // cobalt plate on first paint (LCP element).
    placeholder: "blur",
  });
  const mobileSrcSet = mobileSrcSetRaw ?? "";

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto max-w-280 px-6 md:px-8">
        {/* Hero — DS Hero Pattern */}
        <section className="flex flex-col gap-12 py-16 md:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Portrait + headline + subline + actions — lead the page on mobile, left column on desktop */}
            <div className="flex flex-col gap-6 lg:min-w-0 lg:flex-1">
              <span className="animate-fade-up text-text-accent font-mono text-sm tracking-[1px]">
                CTO · PLATFORM &amp; AI · ORG SCALING
              </span>
              <h1 className="animate-fade-up-delay-1 text-text-primary max-w-225 text-h2 sm:text-display-m lg:text-display-l font-semibold text-balance">
                Scaling engineering organizations and the platforms they ship.
              </h1>
              <p className="animate-fade-up-delay-2 text-text-secondary max-w-160 text-body-l text-pretty">
                Two decades helping organizations navigate through growth,
                complexity, and change.
              </p>
              {/* Portrait — between the subline and the actions on mobile/tablet (squared off); the desktop copy lives in the right column */}
              <HeroPortrait
                className="animate-fade-up-delay-3 max-w-64 lg:hidden"
                imgClassName="aspect-square object-cover"
                imgProps={heroImgProps}
                mobileSrcSet={mobileSrcSet}
                tabletDesktopSrcSet={tabletDesktopSrcSet}
              />
              <div className="animate-fade-up-delay-3 flex flex-wrap gap-3 pt-2">
                <Button variant="secondary" href="/resume">
                  About me
                </Button>
                <Button
                  href="/case-studies"
                  icon={<ArrowRight className="size-4" />}
                >
                  View case studies
                </Button>
              </div>
            </div>
            {/* Portrait — right column on desktop only (natural 4:5 portrait) */}
            <HeroPortrait
              className="animate-fade-up-delay-1 hidden lg:block lg:w-85 lg:shrink-0"
              imgProps={heroImgProps}
              mobileSrcSet={mobileSrcSet}
              tabletDesktopSrcSet={tabletDesktopSrcSet}
            />
          </div>
          <CredibilityStrip companies={COMPANIES} />
        </section>

        {/* Latest Updates — the home dashboard */}
        <div className="border-border-subtle flex flex-col gap-16 border-t py-16">
          <section className="flex flex-col gap-8">
            <SectionHeader
              title="Case studies"
              href="/case-studies"
              cta="All case studies"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {caseStudies.map((cs) => (
                <CaseStudyCard key={cs.slug} caseStudy={cs} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-8">
            <SectionHeader title="Articles" href="/articles" cta="All articles" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        </div>

        {/* Contact close — DS Contact Pattern, home-specific copy. Generous
            bottom air so the dark panel reads as the page's deliberate close
            rather than butting into the (also dark) footer. */}
        <div className="pb-16 md:pb-24">
          <ContactSection
            email={resume.contact.email}
            links={resume.contact.links}
            headline="Let's compare notes."
            sub="If something here overlaps with what you're working on — or you see it differently — I'm always glad to talk."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
