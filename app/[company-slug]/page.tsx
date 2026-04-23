import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { APPLICATIONS } from "@/data/applications";

import { CoverLetterHero } from "@/components/cover-letter/CoverLetterHero";
import { PseoInteractiveFlowchart } from "@/components/cover-letter/PseoInteractiveFlowchart";
import { HeroForceVideo } from "@/components/cover-letter/HeroForceVideo";
import { PricingMatrixReveal } from "@/components/cover-letter/PricingMatrixReveal";
import { ClosingCTA } from "@/components/cover-letter/ClosingCTA";
import { NavSectionRegistrar } from "@/components/nav/NavSectionRegistrar";
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
    openGraph: {
      title: `Cover Letter — ${appData.companyName} | Emerson Domingo Jr`,
      description: `Senior UX/UI Designer (Growth) in B2B SaaS with 7+ years of experience designing high-performing interfaces that drive measurable business growth.`,
      type: "website",
      images: [
        {
          url: "https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/66664b2f5d100f1ebe909004_Preview%20Image%20-%20emersonjr2%20(1).jpg",
          width: 1200,
          height: 630,
          alt: "Emerson Domingo Jr | UI/UX Designer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Cover Letter — ${appData.companyName} | Emerson Domingo Jr`,
      description: `Senior UX/UI Designer (Growth) in B2B SaaS with 7+ years of experience designing high-performing interfaces that drive measurable business growth.`,
      images: ["https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/66664b2f5d100f1ebe909004_Preview%20Image%20-%20emersonjr2%20(1).jpg"],
    },
  };
}

export default async function CoverLetterPage({ params }: PageProps) {
  const { "company-slug": slug } = await params;
  const appData = APPLICATIONS[slug];

  if (!appData) {
    notFound();
  }

  // Generate navigation items based on sequence
  const navSections = appData.sequence.map((caseId) => {
    const caseData = appData.cases[caseId as keyof typeof appData.cases];
    const anchors: Record<string, string> = {
      pseo: "pseo-flowchart",
      heroforce: "velocity",
      pricing: "pricing-reveal",
      forms: "forms",
    };
    return {
      id: anchors[caseId] || caseId,
      label: caseData?.navLabel || caseId,
    };
  });

  // Add closing section to nav
  navSections.push({
    id: "closing",
    label: appData.closing.navLabel,
  });

  return (
    <article className="flex flex-col pb-32">
      <NavSectionRegistrar sections={navSections} />
      <CoverLetterHero data={appData.hero} companyName={appData.companyName} />
      
      {appData.sequence.map((caseId) => {
        if (caseId === "pseo" && appData.cases.pseo) {
          return (
            <div key={caseId} id="pseo-flowchart" className="scroll-mt-32">
              <PseoInteractiveFlowchart data={appData.cases.pseo} />
            </div>
          );
        }
        if (caseId === "heroforce" && appData.cases.heroforce) {
          return (
            <div key={caseId} id="velocity" className="scroll-mt-32">
              <HeroForceVideo data={appData.cases.heroforce} />
            </div>
          );
        }
        if (caseId === "pricing" && appData.cases.pricing) {
          return (
            <div key={caseId} id="pricing-reveal" className="scroll-mt-32">
              <PricingMatrixReveal data={appData.cases.pricing} />
            </div>
          );
        }
        if (caseId === "forms" && appData.cases.forms) {
          return (
            <div key={caseId} id="forms" className="scroll-mt-32">
              <FormsCaseStudy data={appData.cases.forms} />
            </div>
          );
        }
        return null;
      })}

      <div id="closing" className="scroll-mt-32">
        <ClosingCTA data={appData.closing} />
      </div>
    </article>
  );
}
