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
  role: "CTO & Engineering Executive",
  summary:
    "I build engineering organizations and the platforms they ship — across healthcare, fintech, and data/AI, from first hire to nine-figure scale.",
  resumePdf: "/Murilo-Capanema-Resume.pdf",

  metrics: [
    { eyebrow: "EXPERIENCE", value: "20+", label: "years in engineering leadership" },
    { eyebrow: "SCALE", value: "12→140", label: "engineers led & grown" },
    { eyebrow: "PLATFORMS", value: "9", label: "platforms shipped to production" },
    { eyebrow: "RELIABILITY", value: "99.99%", label: "uptime on flagship systems" },
  ] satisfies ResumeMetric[],

  experience: [
    {
      date: "2021 — PRESENT",
      title: "VP Engineering · HealthCo",
      description:
        "Lead a 140-person org across platform, product, and data for a 40-hospital network.",
      outcome: "−38% infra cost · 3.2M patients served / yr",
    },
    {
      date: "2017 — 2021",
      title: "Director of Platform · FinScale",
      description:
        "Built the platform org and consolidated four payment stacks onto one ledger.",
      outcome: "4 → 40 services · 99.98% uptime",
    },
    {
      date: "2013 — 2017",
      title: "Eng Manager → Sr. EM · DataWorks",
      description:
        "Grew the first data team and shipped the company's initial ML platform.",
      outcome: "0 → 1 ML platform · 12 engineers hired",
    },
  ] satisfies Role[],

  education: [
    {
      title: "M.Sc. Computer Science",
      detail: "Distributed systems & optimization",
    },
    {
      title: "B.Sc. Computer Engineering",
      detail: "Software engineering",
    },
  ] satisfies Credential[],

  certifications: [
    { title: "Executive Leadership Program", detail: "Technology leadership" },
    { title: "Cloud Architecture", detail: "Professional certification" },
  ] satisfies Credential[],

  focusAreas: [
    "Org Design",
    "Platform Engineering",
    "Data & AI",
    "Reliability",
    "Hiring & Leveling",
    "Executive Strategy",
  ],

  contact: {
    email: "hello@capanema.io",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/mcapanema" },
      { label: "GitHub", href: "https://github.com/mcapanema" },
      { label: "X", href: "https://x.com/mcapanema" },
    ],
  },
};
