import { Footer, PageHeader, SiteHeader } from "@/components/ui";
import { getArticles, getAllArticleCategories } from "@/content/articles";
import { ArticlesExplorer } from "./ArticlesExplorer";

export const metadata = {
  title: "Articles",
  description:
    "Essays on engineering leadership, org design, platforms, and the craft of building technology organizations.",
};

export default function ArticlesPage() {
  const articles = getArticles();
  const categories = getAllArticleCategories();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex max-w-[1120px] flex-col gap-12 px-6 py-16 md:px-8 md:py-20">
        <div className="animate-fade-up">
          <PageHeader
            eyebrow="ARTICLES"
            title="Articles"
            description="Essays on engineering leadership, org design, and the craft of building technology organizations — a working notebook, not a feed."
          />
        </div>
        <ArticlesExplorer articles={articles} categories={categories} />
      </main>
      <Footer />
    </>
  );
}
