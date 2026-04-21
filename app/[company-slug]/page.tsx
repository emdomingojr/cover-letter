import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { APPLICATIONS } from "@/data/applications";

import { CoverLetterHero } from "@/components/cover-letter/CoverLetterHero";
import { PseoInteractiveFlowchart } from "@/components/cover-letter/PseoInteractiveFlowchart";
import { HeroForceVideo } from "@/components/cover-letter/HeroForceVideo";
import { PricingMatrixReveal } from "@/components/cover-letter/PricingMatrixReveal";
import { NarrativeTimeline } from "@/components/cover-letter/NarrativeTimeline";
import { ClosingCTA } from "@/components/cover-letter/ClosingCTA";
import { FormsCaseStudy } from "@/components/cover-letter/FormsCaseStudy";

interface PageProps {
  params: Promise<{ "company-slug": string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "company-slug": slug } = await params;
  const appData = APPLICATIONS[slug];
  
  if (!appData) return { title: "Not Found" };

  return {
    title: `Cover Letter — ${appData.companyName}`,
    description: `A tailored application from Emerson Jr for ${appData.companyName}.`,
    robots: { index: false, follow: false },
  };
}

export default async function CoverLetterPage({ params }: PageProps) {
  const { "company-slug": slug } = await params;
  const appData = APPLICATIONS[slug];

  if (!appData) {
    notFound();
  }

  return (
    <article className="flex flex-col pb-32">
      <NarrativeTimeline />
      <CoverLetterHero data={appData.hero} />
      
      {appData.sequence.map((caseId) => {
        if (caseId === "pseo" && appData.cases.pseo) {
          return <PseoInteractiveFlowchart key={caseId} data={appData.cases.pseo} />;
        }
        if (caseId === "heroforce" && appData.cases.heroforce) {
          return <HeroForceVideo key={caseId} data={appData.cases.heroforce} />;
        }
        if (caseId === "pricing" && appData.cases.pricing) {
          return <PricingMatrixReveal key={caseId} data={appData.cases.pricing} />;
        }
        if (caseId === "forms" && appData.cases.forms) {
          return <FormsCaseStudy key={caseId} data={appData.cases.forms} />;
        }
        return null;
      })}

      <ClosingCTA data={appData.closing} />
    </article>
  );
}
