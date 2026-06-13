import type { Outcome } from "./types";

export type Role = {
  date: string;
  title: string;
  description: string;
  outcome?: string;
};

export type Credential = { title: string; detail: string };

export type ResumeMetric = Outcome & { eyebrow: string };

export const resume = {
  name: "Murilo Capanema",
  role: "VP of Technology · Genial Care",
  summary:
    "Technology executive operating at the intersection of business strategy, product, and engineering. I build high-performance organizations and AI-enabled platforms that turn domain expertise into measurable business outcomes — from seed stage to scale.",
  resumePdf: "/Murilo-Capanema-Resume.pdf",

  metrics: [
    { eyebrow: "EXPERIENCE", value: "15+", label: "years in tech & product leadership" },
    { eyebrow: "TEAM SCALE", value: "60+", label: "engineers led across organizations" },
    { eyebrow: "ENGAGEMENT", value: "20%→75%", label: "DAU growth in 6 months" },
    { eyebrow: "AI IMPACT", value: "2mo→3d", label: "time-to-intervention, AI-driven" },
  ] satisfies ResumeMetric[],

  experience: [
    {
      date: "2023 — PRESENT",
      title: "VP of Technology · Genial Care",
      description:
        "Lead a 25-person engineering organization building AI-enabled clinical products on top of a proprietary dataset. Own technical strategy, organizational design, and AI integration across product, operations, and billing.",
      outcome: "DAU 20%→75% · time-to-intervention 2mo→3d · billing non-receipt rate <1%",
    },
    {
      date: "2020 — 2023",
      title: "Head of Technology · Genial Care",
      description:
        "Joined at seed stage with full ownership of product, design, engineering, and IT. Built the technical organization from scratch and led the product strategy that delivered product-market fit and scaled operations.",
      outcome: "0→25 engineers, zero voluntary attrition · $10M Series A (General Catalyst, 2023)",
    },
    {
      date: "2020",
      title: "Senior Engineering Manager · Creditas",
      description:
        "Led the creation of the product platform tribe — the company's most strategic initiative — to unify lending infrastructure across all product lines. Owned technical direction and organizational design for ~60 engineers.",
      outcome: "~60 engineers · 8 direct reports · digital transformation cell model",
    },
    {
      date: "2017 — 2020",
      title: "Tech Lead · Creditas",
      description:
        "Created a new engineering tribe for Creditas's expansion into funding and loan servicing, working directly with the founder on product vision, technical roadmap, and architecture. Owned hiring, culture, and engineering practices from day one.",
      outcome: "Greenfield tribe · TDD · DDD · Clean Architecture",
    },
    {
      date: "2015 — 2017",
      title: "Software Engineer · Creditas",
      description:
        "Joined as one of the first engineers (~15 employees). Built the entire AWS cloud infrastructure from scratch, the company's first data platform and analytics infrastructure, and led the shift toward a DevOps culture as the team scaled.",
      outcome: "AWS infrastructure from scratch · first data platform · DevOps adoption",
    },
  ] satisfies Role[],

  education: [
    {
      title: "B.Sc. Computer Science",
      detail: "Universidade Paulista (UNIP) · 2009–2012",
    },
  ] satisfies Credential[],

  focusAreas: [
    "AI/ML Product Integration",
    "Platform Engineering",
    "Organizational Design",
    "Product-Led Growth",
    "Data Platform Design",
    "Digital Transformation",
    "Cloud Architecture",
    "OKR-Driven Execution",
  ],

  contact: {
    email: "murilo.capanema@gmail.com",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mcapanema" },
      { label: "GitHub", href: "https://github.com/mcapanema" },
      { label: "X", href: "https://x.com/mcapanema" },
    ],
  },
};
