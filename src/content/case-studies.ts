import { byNewest, type CaseStudy } from "./types";

// Sample case-study metadata, coherent with the DS reference content. Bodies
// (MDX) are wired in the Case Study page phase.
const caseStudies: CaseStudy[] = [
  {
    slug: "clinical-scheduling-network",
    category: "Healthcare · Optimization",
    title: "Rebuilding clinical scheduling for a 40-hospital network",
    summary:
      "Rebuilt scheduling across a 40-hospital network, cutting wait times while lifting utilization.",
    date: "2026-04-01",
    tags: ["Healthcare", "Platform", "Optimization"],
    readingMinutes: 12,
    outcomes: [
      { value: "98%", label: "schedule accuracy" },
      { value: "−42%", label: "patient wait time" },
    ],
    featured: true,
  },
  {
    slug: "unifying-payment-stacks",
    category: "Fintech · Platform",
    title: "Consolidating four payment stacks into one ledger",
    summary:
      "Unified a sprawl of regional services into a single, auditable platform — without a freeze.",
    date: "2026-02-12",
    tags: ["Fintech", "Platform", "Migration"],
    readingMinutes: 10,
    outcomes: [
      { value: "98%", label: "coverage" },
      { value: "−42%", label: "latency p95" },
    ],
  },
  {
    slug: "first-ml-platform",
    category: "Data · AI",
    title: "Standing up the company's first ML platform",
    summary:
      "From notebooks to a governed platform serving every product team, end to end.",
    date: "2025-11-20",
    tags: ["Data", "AI", "Platform"],
    readingMinutes: 11,
    outcomes: [
      { value: "9", label: "teams onboarded" },
      { value: "−42%", label: "time to ship" },
    ],
  },
  {
    slug: "scaling-engineering-12-to-140",
    category: "Leadership · Org Design",
    title: "Growing engineering from 12 to 140 in three years",
    summary:
      "Org design, leveling, and hiring that held quality while the team grew tenfold.",
    date: "2025-09-05",
    tags: ["Leadership", "Org Design", "Hiring"],
    readingMinutes: 9,
    outcomes: [
      { value: "12→140", label: "engineers led" },
      { value: "−42%", label: "regretted attrition" },
    ],
  },
];

export function getCaseStudies(): CaseStudy[] {
  return byNewest(caseStudies);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
