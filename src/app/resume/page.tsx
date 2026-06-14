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
    <span className="text-text-tertiary font-mono text-xs tracking-[1px]">
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
            <span className="text-text-primary text-base font-semibold">
              {item.title}
            </span>
            <span className="text-text-secondary text-sm">{item.detail}</span>
          </div>
        ))}
      </div>
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
      <main className="mx-auto flex max-w-[920px] flex-col gap-16 px-6 py-16 md:py-20">
        {/* Header */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-text-primary text-[32px] leading-[1.1] font-semibold tracking-[-0.8px] sm:text-[40px]">
              {name}
            </h1>
            <p className="text-text-secondary max-w-[760px] text-[17px] leading-[1.6]">
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

        <ContactSection
          email={contact.email}
          links={contact.links}
          headline="Let's talk."
          sub="Whether you're scaling a technology organization, modernizing a platform, or exploring the role of AI in your business, I'm always interested in exchanging ideas."
        />
      </main>
      <Footer />
    </>
  );
}
