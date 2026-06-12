import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Breadcrumb,
  CaseStudyCard,
  Footer,
  Metric,
  SiteHeader,
  ToCRail,
} from "@/components/ui";
import { getCaseStudies, getCaseStudy } from "@/content/case-studies";
import { slugify } from "@/content/types";

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return { title: cs.title, description: cs.summary };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudy(slug);
  if (!caseStudy) notFound();

  // Relative dynamic import so Turbopack bundles every case-study body.
  const mod = await import(`../../../content/case-studies/${slug}.mdx`).catch(
    () => null,
  );
  if (!mod) notFound();
  const Body = mod.default as () => React.ReactNode;

  const { category, period, title, metrics, sections } = caseStudy;
  const eyebrow = [category.toUpperCase(), period].filter(Boolean).join(" · ");
  const tocItems = sections.map((label) => ({ id: slugify(label), label }));
  const related = getCaseStudies()
    .filter((c) => c.slug !== slug)
    .slice(0, 2);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1120px] flex-col gap-8 px-6 py-12 md:px-8 md:py-16">
        <Breadcrumb
          items={[
            { label: "Case Studies", href: "/case-studies" },
            { label: category.split("·")[0].trim(), href: "/case-studies" },
            { label: title },
          ]}
        />

        {/* Title block */}
        <div className="flex flex-col gap-4">
          <span className="font-mono text-[13px] tracking-[1px] text-text-accent">
            {eyebrow}
          </span>
          <h1 className="max-w-[1100px] text-[36px] font-semibold leading-[1.1] tracking-[-0.8px] text-text-primary sm:text-[48px] sm:tracking-[-1px]">
            {title}
          </h1>
        </div>

        {/* Metrics band */}
        <div className="flex flex-wrap gap-x-16 gap-y-8 border-y border-border-subtle py-8">
          {metrics.map((m) => (
            <Metric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        {/* Body: sticky ToC + prose */}
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <aside className="hidden shrink-0 lg:block lg:w-60">
            <div className="sticky top-24">
              <ToCRail items={tocItems} />
            </div>
          </aside>
          <article className="w-full max-w-[680px] [&>*:first-child]:mt-0">
            <Body />
          </article>
        </div>

        {/* Related */}
        <section className="flex flex-col gap-8 border-t border-border-subtle pt-12">
          <h2 className="text-2xl font-semibold tracking-[-0.3px] text-text-primary">
            Related case studies
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((cs) => (
              <CaseStudyCard key={cs.slug} caseStudy={cs} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
