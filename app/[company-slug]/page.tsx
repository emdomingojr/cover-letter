import type { Metadata } from "next";
import { CoverLetterHero } from "@/components/cover-letter/CoverLetterHero";
import { PseoInteractiveFlowchart } from "@/components/cover-letter/PseoInteractiveFlowchart";
import { HeroForceVideo } from "@/components/cover-letter/HeroForceVideo";
import { PricingMatrixReveal } from "@/components/cover-letter/PricingMatrixReveal";
import { NarrativeTimeline } from "@/components/cover-letter/NarrativeTimeline";
import { ClosingCTA } from "@/components/cover-letter/ClosingCTA";

interface PageProps {
  params: Promise<{ "company-slug": string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "company-slug": slug } = await params;
  const company = slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return {
    title: `Cover Letter — ${company}`,
    description: `A tailored application from Emerson Jr for ${company}.`,
    robots: { index: false, follow: false },
  };
}

export default async function CoverLetterPage({ params }: PageProps) {
  // Slug available for future personalisation (company name, CMS lookup, etc.)
  const { "company-slug": _slug } = await params;

  return (
    <article className="flex flex-col pb-32">
      <NarrativeTimeline />
      <CoverLetterHero />
      <PseoInteractiveFlowchart />
      <HeroForceVideo />
      <PricingMatrixReveal />
      <ClosingCTA />
    </article>
  );
}
