import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb, Footer, SiteHeader } from "@/components/ui";
import { getArticles, getArticle } from "@/content/articles";
import { formatStamp } from "@/content/types";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const mod = await import(`../../../content/articles/${slug}.mdx`).catch(
    () => null,
  );
  if (!mod) notFound();
  const Body = mod.default as () => React.ReactNode;

  const { category, title, date, readingMinutes } = article;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[680px] flex-col gap-8 px-6 py-12 md:py-16">
        <Breadcrumb
          items={[
            { label: "Articles", href: "/articles" },
            { label: title },
          ]}
        />

        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[1px] text-text-accent">
              {category}
            </span>
            <span aria-hidden className="text-xs text-text-tertiary">
              ·
            </span>
            <span className="font-mono text-xs text-text-tertiary">
              {formatStamp(date)}
            </span>
            <span aria-hidden className="text-xs text-text-tertiary">
              ·
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.5px] text-text-tertiary">
              {readingMinutes} min read
            </span>
          </div>
          <h1 className="text-[34px] font-semibold leading-[1.12] tracking-[-0.8px] text-text-primary sm:text-[44px] sm:tracking-[-1px]">
            {title}
          </h1>
        </header>

        <article className="[&>*:first-child]:mt-0">
          <Body />
        </article>

        <footer className="border-t border-border-subtle pt-8">
          <a
            href="/articles"
            className="text-sm font-semibold text-link transition-colors hover:text-link-hover"
          >
            ← All articles
          </a>
        </footer>
      </main>
      <Footer />
    </>
  );
}
