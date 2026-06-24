import { Footer, PageHeader, SiteHeader } from "@/components/ui";
import { getCaseStudies, getAllCaseStudyTags } from "@/content/case-studies";
import { CaseStudiesExplorer } from "./CaseStudiesExplorer";

export const metadata = {
  title: "Case Studies",
  description:
    "Long-form case studies on building platforms, scaling engineering organizations, and the decisions behind them.",
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();
  const tags = getAllCaseStudyTags();

  return (
    <>
      <SiteHeader />
      <main id="main-content" className="mx-auto flex max-w-[1120px] flex-col gap-12 px-6 py-16 md:px-8 md:py-20">
        <div className="animate-fade-up">
          <PageHeader
            eyebrow="CASE STUDIES"
            title="Case studies"
            description="Deep dives into platforms built, organizations scaled, and the strategic decisions behind them — written to show the thinking, not just the result."
          />
        </div>
        <CaseStudiesExplorer caseStudies={caseStudies} tags={tags} />
      </main>
      <Footer />
    </>
  );
}
