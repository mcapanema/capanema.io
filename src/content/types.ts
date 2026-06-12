// Content metadata models. Long-form bodies live as MDX (added per page);
// these typed records drive listings, cards, and aggregation.

export type Outcome = { value: string; label: string };

export type CaseStudy = {
  slug: string;
  category: string; // e.g. "Healthcare · Optimization"
  title: string;
  summary: string;
  date: string; // ISO yyyy-mm-dd
  tags: string[];
  readingMinutes: number;
  outcomes: Outcome[]; // headline metrics shown on the card
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
