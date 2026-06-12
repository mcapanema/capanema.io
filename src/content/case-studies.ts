import { byNewest, type CaseStudy } from "./types";

// Sample case-study metadata, coherent with the DS reference content. Long-form
// bodies live as MDX in ./case-studies/<slug>.mdx; `sections` mirrors the H2
// headings in that body, in order, and drives the ToC + anchors.
const caseStudies: CaseStudy[] = [
  {
    slug: "clinical-scheduling-network",
    category: "Healthcare · Optimization",
    period: "2021–2023",
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
    metrics: [
      { value: "3.2M", label: "patients / year" },
      { value: "−42%", label: "wait time" },
      { value: "99.98%", label: "uptime" },
      { value: "12→140", label: "eng team" },
    ],
    sections: ["The mandate", "What we changed", "Outcomes", "What I'd do again"],
    featured: true,
  },
  {
    slug: "unifying-payment-stacks",
    category: "Fintech · Platform",
    period: "2019–2021",
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
    metrics: [
      { value: "4→1", label: "payment stacks" },
      { value: "−42%", label: "latency p95" },
      { value: "$0", label: "downtime cost" },
    ],
    sections: ["The mandate", "What we changed", "Outcomes", "What I'd do again"],
  },
  {
    slug: "first-ml-platform",
    category: "Data · AI",
    period: "2018–2020",
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
    metrics: [
      { value: "9", label: "teams onboarded" },
      { value: "−42%", label: "time to ship" },
      { value: "30+", label: "models in prod" },
    ],
    sections: ["The mandate", "What we changed", "Outcomes", "What I'd do again"],
  },
  {
    slug: "scaling-engineering-12-to-140",
    category: "Leadership · Org Design",
    period: "2016–2019",
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
    metrics: [
      { value: "12→140", label: "engineers led" },
      { value: "6", label: "teams formed" },
      { value: "−42%", label: "regretted attrition" },
    ],
    sections: ["The mandate", "What we changed", "Outcomes", "What I'd do again"],
  },
];

export function getCaseStudies(): CaseStudy[] {
  return byNewest(caseStudies);
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

export function getAllCaseStudyTags(): string[] {
  return [...new Set(caseStudies.flatMap((c) => c.tags))].sort();
}
