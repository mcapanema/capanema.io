import { byNewest, type Article } from "./types";

// Sample article metadata, coherent with the DS reference content.
const articles: Article[] = [
  {
    slug: "org-design-at-scale",
    category: "Leadership",
    title: "What scaling to 140 engineers taught me about org design",
    excerpt:
      "The structures that work at 20 break at 100. Here is what actually held.",
    date: "2026-03-01",
    readingMinutes: 6,
    featured: true,
  },
  {
    slug: "build-vs-buy",
    category: "Strategy",
    title: "Build vs buy is the wrong question",
    excerpt:
      "The real decision is where you want your compounding advantage to sit.",
    date: "2026-01-18",
    readingMinutes: 5,
  },
  {
    slug: "on-call-is-a-leadership-artifact",
    category: "Culture",
    title: "On-call is a leadership artifact",
    excerpt:
      "How a team runs on-call tells you more about its health than any survey.",
    date: "2025-12-02",
    readingMinutes: 4,
  },
  {
    slug: "where-ai-belongs-in-the-stack",
    category: "AI",
    title: "Where AI belongs in the stack",
    excerpt:
      "A pragmatic model for what to automate, what to assist, and what to leave alone.",
    date: "2025-10-22",
    readingMinutes: 7,
  },
];

export function getArticles(): Article[] {
  return byNewest(articles);
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getAllArticleCategories(): string[] {
  return [...new Set(articles.map((a) => a.category))].sort();
}
