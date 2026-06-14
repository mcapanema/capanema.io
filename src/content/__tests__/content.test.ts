import { describe, it, expect } from "vitest";
import * as fs from "node:fs";
import * as path from "node:path";
import { getCaseStudies } from "../case-studies";
import { getArticles } from "../articles";

const CONTENT_ROOT = path.resolve(process.cwd(), "src/content");

// ---------------------------------------------------------------------------
// Case studies
// ---------------------------------------------------------------------------

describe("case studies", () => {
  const all = getCaseStudies();

  it("has at least one entry", () => {
    expect(all.length).toBeGreaterThan(0);
  });

  it("has no duplicate slugs", () => {
    const slugs = all.map((c) => c.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it.each(all)("$slug — required fields non-empty", (cs) => {
    expect(cs.slug.length).toBeGreaterThan(0);
    expect(cs.title.length).toBeGreaterThan(0);
    expect(cs.summary.length).toBeGreaterThan(0);
    expect(cs.category.length).toBeGreaterThan(0);
    expect(cs.date.length).toBeGreaterThan(0);
    expect(cs.tags.length).toBeGreaterThan(0);
    expect(cs.outcomes.length).toBeGreaterThan(0);
    expect(cs.metrics.length).toBeGreaterThan(0);
    expect(cs.sections.length).toBeGreaterThan(0);
    expect(cs.readingMinutes).toBeGreaterThan(0);
  });

  it.each(all)("$slug — date is valid ISO yyyy-mm-dd", ({ date }) => {
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const parsed = new Date(date);
    expect(parsed.toString()).not.toBe("Invalid Date");
  });

  it.each(all)("$slug — MDX body file exists", ({ slug }) => {
    const mdxPath = path.join(CONTENT_ROOT, "case-studies", `${slug}.mdx`);
    expect(
      fs.existsSync(mdxPath),
      `Missing body file: src/content/case-studies/${slug}.mdx`,
    ).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Articles
// ---------------------------------------------------------------------------

describe("articles", () => {
  const all = getArticles();

  it("has at least one entry", () => {
    expect(all.length).toBeGreaterThan(0);
  });

  it("has no duplicate slugs", () => {
    const slugs = all.map((a) => a.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it.each(all)("$slug — required fields non-empty", (article) => {
    expect(article.slug.length).toBeGreaterThan(0);
    expect(article.title.length).toBeGreaterThan(0);
    expect(article.excerpt.length).toBeGreaterThan(0);
    expect(article.category.length).toBeGreaterThan(0);
    expect(article.date.length).toBeGreaterThan(0);
    expect(article.readingMinutes).toBeGreaterThan(0);
  });

  it.each(all)("$slug — date is valid ISO yyyy-mm-dd", ({ date }) => {
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    const parsed = new Date(date);
    expect(parsed.toString()).not.toBe("Invalid Date");
  });

  it.each(all)("$slug — MDX body file exists", ({ slug }) => {
    const mdxPath = path.join(CONTENT_ROOT, "articles", `${slug}.mdx`);
    expect(
      fs.existsSync(mdxPath),
      `Missing body file: src/content/articles/${slug}.mdx`,
    ).toBe(true);
  });
});
