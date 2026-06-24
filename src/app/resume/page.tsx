import { Download } from "lucide-react";
import {
  Button,
  ContactSection,
  Footer,
  MetricCard,
  SiteHeader,
  Tag,
  TimelineItem,
} from "@/components/ui";
import { resume } from "@/content/resume";
import type { Credential } from "@/content/resume";

export const metadata = {
  title: "About me",
  description: resume.summary,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-text-tertiary font-mono text-xs tracking-[1px]">
      {children}
    </h2>
  );
}

function CredentialList({
  label,
  items,
}: {
  label: string;
  items: Credential[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <SectionLabel>{label}</SectionLabel>
      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.title} className="flex flex-col gap-0.5">
            <span className="text-text-primary text-base font-semibold">
              {item.title}
            </span>
            <span className="text-text-secondary text-sm">{item.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutMePage() {
  const {
    name,
    summary,
    resumePdf,
    metrics,
    experience,
    education,
    focusAreas,
    contact,
  } = resume;

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto flex max-w-[920px] flex-col gap-16 px-6 py-16 md:py-20">
        {/* Header */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="animate-fade-up text-text-primary text-[32px] leading-[1.1] font-semibold tracking-[-0.8px] sm:text-[40px]">
              {name}
            </h1>
            <p className="animate-fade-up-delay-1 text-text-secondary max-w-[760px] text-[17px] leading-[1.6]">
              {summary}
            </p>
          </div>
          <div className="animate-fade-up-delay-2">
            <Button
              variant="secondary"
              href={resumePdf}
              download
              icon={<Download className="size-4" />}
            >
              Download résumé
            </Button>
          </div>
        </header>

        {/* Key achievements */}
        <div className="animate-on-scroll grid grid-cols-2 gap-4 lg:grid-cols-4">
          {metrics.map((m) => (
            <MetricCard
              key={m.label}
              eyebrow={m.eyebrow}
              value={m.value}
              label={m.label}
            />
          ))}
        </div>

        {/* Experience */}
        <section className="flex flex-col gap-6">
          <div className="animate-on-scroll">
            <SectionLabel>EXPERIENCE</SectionLabel>
          </div>
          <ul className="flex flex-col">
            {experience.map((role, i) => (
              <li key={role.title} className="animate-on-scroll">
                <TimelineItem
                  date={role.date}
                  title={role.title}
                  description={role.description}
                  outcome={role.outcome}
                  isLast={i === experience.length - 1}
                />
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <div className="animate-on-scroll">
          <CredentialList label="EDUCATION" items={education} />
        </div>

        {/* Focus areas */}
        <section className="animate-on-scroll flex flex-col gap-4">
          <SectionLabel>FOCUS AREAS</SectionLabel>
          <ul className="flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <li key={area}>
                <Tag>{area}</Tag>
              </li>
            ))}
          </ul>
        </section>

        <div className="animate-on-scroll">
          <ContactSection
            email={contact.email}
            links={contact.links}
            headline="Let's talk."
            sub="Whether you're scaling a technology organization, modernizing a platform, or exploring the role of AI in your business, I'm always interested in exchanging ideas."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
