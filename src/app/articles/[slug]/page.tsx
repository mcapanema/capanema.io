import Link from "next/link";
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
      <main id="main-content" tabIndex={-1} className="mx-auto flex max-w-[680px] flex-col gap-8 px-6 py-12 md:py-16 focus:outline-none">
        <div className="animate-fade-up">
          <Breadcrumb
            items={[
              { label: "Articles", href: "/articles" },
              { label: title },
            ]}
          />
        </div>

        <header className="animate-fade-up-delay-1 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-text-accent font-mono text-xs tracking-[1px] uppercase">
              {category}
            </span>
            <span aria-hidden className="text-text-tertiary text-xs">
              ·
            </span>
            <span className="text-text-tertiary font-mono text-xs">
              {formatStamp(date)}
            </span>
            <span aria-hidden className="text-text-tertiary text-xs">
              ·
            </span>
            <span className="text-text-tertiary font-mono text-xs tracking-[0.5px] uppercase">
              {readingMinutes} min read
            </span>
          </div>
          <h1 className="text-text-primary text-[34px] leading-[1.12] font-semibold tracking-[-0.8px] sm:text-[44px] sm:tracking-[-1px]">
            {title}
          </h1>
        </header>

        <article className="[&>*:first-child]:mt-0">
          <Body />
        </article>

        <footer className="border-border-subtle border-t pt-8">
          <Link
            href="/articles"
            className="text-link hover:text-link-hover text-sm font-semibold transition-colors"
          >
            ← All articles
          </Link>
        </footer>
      </main>
      <Footer />
    </>
  );
}
