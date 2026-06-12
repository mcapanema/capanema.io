// Content metadata models. Long-form bodies live as MDX (added per page);
// these typed records drive listings, cards, and aggregation.

export type Outcome = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  category: string; // e.g. "Healthcare · Optimization"
  period?: string; // e.g. "2021–2023" — appended to the detail eyebrow
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  readingMinutes: number;
  outcomes: Outcome[]; // two headline metrics shown on the card
  metrics: Outcome[]; // 3–4 metrics for the detail band / featured panel
  sections: string[]; // H2 labels, in order — drives the ToC + anchors
  featured?: boolean;
};

export type Article = {
  slug: string;
  category: string; // e.g. "Leadership"
  title: string;
  excerpt: string;
  date: string; // ISO yyyy-mm-dd
  readingMinutes: number;
  featured?: boolean;
};

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

// "2026-03-01" -> "MAR 2026" (mono metadata style used across the DS).
export function formatStamp(iso: string): string {
  const [y, m] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function byNewest<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

// Stable anchor id from heading text. Mirrored by the MDX h2 renderer so ToC
// links resolve without a rehype-slug plugin (unavailable under Turbopack).
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
