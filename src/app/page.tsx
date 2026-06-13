import { ArrowRight } from "lucide-react";
import { getImageProps } from "next/image";
import {
  ArticleCard,
  Button,
  CaseStudyCard,
  CredibilityStrip,
  Footer,
  SiteHeader,
} from "@/components/ui";
import { getCaseStudies } from "@/content/case-studies";
import { getArticles } from "@/content/articles";
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
      <h2 className="text-[32px] font-semibold leading-[1.2] tracking-[-0.5px] text-text-primary">
        {title}
      </h2>
      <a
        href={href}
        className="group inline-flex items-center gap-2 text-sm font-semibold text-link transition-colors hover:text-link-hover"
      >
        {cta}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

export default function Home() {
  const caseStudies = getCaseStudies().slice(0, 2);
  const articles = getArticles().slice(0, 3);

  const {
    props: { srcSet: tabletDesktopSrcSet },
  } = getImageProps({
    src: meImage,
    alt: "Murilo Capanema",
    quality: 90,
    sizes: "(min-width: 1024px) 680px, 520px",
  });

  const {
    props: { srcSet: mobileSrcSet, loading: _loading, ...heroImgProps },
  } = getImageProps({
    src: meImage,
    alt: "Murilo Capanema",
    quality: 90,
    sizes: "300px",
  });

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1120px] px-6 md:px-8">
        {/* Hero — DS Hero Pattern */}
        <section className="flex flex-col gap-12 py-16 md:py-24">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
            {/* Headline + subline + actions — lead the page on mobile, left on desktop */}
            <div className="flex flex-col gap-6 lg:min-w-0 lg:flex-1">
              <span className="font-mono text-sm tracking-[1px] text-text-accent">
                CTO · PLATFORM &amp; AI · ORG SCALING
              </span>
              <h1 className="max-w-[900px] text-[40px] font-semibold leading-[1.05] tracking-[-1px] text-text-primary sm:text-[56px] sm:tracking-[-1.1px] lg:text-[64px] lg:tracking-[-1.3px]">
                Scaling engineering organizations and the platforms they ship.
              </h1>
              <p className="max-w-[640px] text-lg leading-[1.6] text-text-secondary">
                Two decades helping organizations navigate through
                growth, complexity, and change.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
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
            {/* Portrait — supporting role below the actions on mobile, right on desktop */}
            <div className="lg:shrink-0">
              <picture>
                {/* tablet + desktop: doubled sizes for 1x-display sharpness */}
                <source media="(min-width: 640px)" srcSet={tabletDesktopSrcSet} />
                {/* mobile fallback: accurate sizes, bandwidth-optimal on retina phones */}
                <img
                  {...heroImgProps}
                  srcSet={mobileSrcSet}
                  loading="eager"
                  fetchPriority="high"
                  className="h-auto w-[150px] rounded-xl border border-border-subtle shadow-[0_1px_3px_var(--shadow-1a)] sm:w-[260px] lg:w-[340px]"
                />
              </picture>
            </div>
          </div>
          <CredibilityStrip companies={COMPANIES} />
        </section>

        {/* Latest Updates — the home dashboard */}
        <div className="flex flex-col gap-16 border-t border-border-subtle py-16">
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
      </main>
      <Footer />
    </>
  );
}
