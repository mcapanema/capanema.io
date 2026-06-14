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
  summary:
    "Technology executive operating at the intersection of business strategy, product, and engineering. I build high-performance organizations and AI-enabled platforms that turn domain expertise into measurable business outcomes — from seed stage to scale.",
  resumePdf: "/Murilo-Capanema-Resume.pdf",

  metrics: [
    { eyebrow: "EXPERIENCE", value: "20+", label: "years building technology organizations" },
    { eyebrow: "TEAM SCALE", value: "~100", label: "engineers scaled across multiple organizations" },
    { eyebrow: "EFFICIENCY", value: "300%", label: "clinical operations efficiency improvement" },
    { eyebrow: "AI IMPACT", value: "2mo → 3d", label: "time-to-intervention through AI" },
  ] satisfies ResumeMetric[],

  experience: [
    {
      date: "2023 — PRESENT",
      title: "VP of Technology · Genial Care",
      description:
        "Led product & technology through Genial Care's scale-up phase, transforming clinical expertise into AI-enabled products, operational systems, and data capabilities that improved clinical outcomes, increased clinic capacity, and accelerated company growth.",
      outcome: "DAU 20%→75% · time-to-intervention 2mo→3d · billing non-receipt rate <1%",
    },
    {
      date: "2020 — 2023",
      title: "Head of Technology · Genial Care",
      description:
        "Joined at seed stage to build the product, platform, and engineering organization from the ground up, helping take the company from early product development to a $10M Series A led by General Catalyst.",
      outcome: "0→25 engineers, zero voluntary attrition · $10M Series A (General Catalyst, 2023)",
    },
    {
      date: "2020",
      title: "Senior Engineering Manager · Creditas",
      description:
        "Led Creditas' Product Platform organization, consolidating shared capabilities across lending products and creating the technical foundations for the company's next stage of growth.",
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
    {
      title: "MBA, Corporate Finance",
      detail: "Saint Paul Escola de Negócios · In Progress",
    },
  ] satisfies Credential[],

  focusAreas: [
    "Engineering Leadership",
    "Organizational Design",
    "Platform Strategy",
    "Data & AI",
    "Product Development",
    "Technology Strategy",
    "Operational Excellence",
    "Scaling Organizations",
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
