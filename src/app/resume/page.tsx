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
    <span className="font-mono text-xs tracking-[1px] text-text-tertiary">
      {children}
    </span>
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
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex flex-col gap-0.5">
            <span className="text-base font-semibold text-text-primary">
              {item.title}
            </span>
            <span className="text-sm text-text-secondary">{item.detail}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AboutMePage() {
  const {
    name,
    role,
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
      <main className="mx-auto flex max-w-[920px] flex-col gap-16 px-6 py-16 md:py-20">
        {/* Header */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-0.8px] text-text-primary sm:text-[40px]">
              {name}
            </h1>
            <p className="text-xl font-medium text-text-accent">{role}</p>
            <p className="max-w-[760px] text-[17px] leading-[1.6] text-text-secondary">
              {summary}
            </p>
          </div>
          <div>
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
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
          <SectionLabel>EXPERIENCE</SectionLabel>
          <div className="flex flex-col">
            {experience.map((role, i) => (
              <TimelineItem
                key={role.title}
                date={role.date}
                title={role.title}
                description={role.description}
                outcome={role.outcome}
                isLast={i === experience.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Education */}
        <div>
          <CredentialList label="EDUCATION" items={education} />
        </div>

        {/* Focus areas */}
        <section className="flex flex-col gap-4">
          <SectionLabel>FOCUS AREAS</SectionLabel>
          <div className="flex flex-wrap gap-3">
            {focusAreas.map((area) => (
              <Tag key={area}>{area}</Tag>
            ))}
          </div>
        </section>

        <ContactSection email={contact.email} links={contact.links} />
      </main>
      <Footer />
    </>
  );
}
