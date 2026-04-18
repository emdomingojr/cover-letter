export type ImpactMetric = {
  value: string;
  label: string;
  attribution?: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  titleEmphasis?: string;
  client: string;
  oneLinePitch: string;
  impactMetrics: ImpactMetric[];
  role: string[];
  timeline: string;
  stack: string[];
  imageUrl: string;
  // Core detail page fields
  coreProblem: string;
  solutionLogic: string;
  outcome: string;
  // Optional extended detail fields
  constraints?: string;
  strategicDecisions?: string;
  strategicConstraint?: string;
  strategyImageLabel?: string;
  systemDesign?: string;
  systemConstraint?: string;
  contribution?: string;
  craft?: boolean;
  category?: string;
  cardMetrics?: ImpactMetric[];
  heroStats?: Array<{ value: string; label: string }>;
  strategyImageCaption?: string;
  systemImageCaptions?: [string, string];
  // Section images — populated via CMS; fall back to placeholder when absent
  strategyImageUrl?: string;
  systemImageUrl?: string;
  // Navigation — explicit prev/next slugs defined in JSON
  previousSlug?: string | null;
  nextSlug?: string | null;
  // Sticky header metric — short stat shown next to title on scroll (required across all studies)
  primaryMetric: string;
  // Closing moment
  keyTakeaway?: string;
  // Collaborators
  workedWith?: string[];
  // Before/after image comparison slider
  beforeAfterImages?: {
    before: { src: string; alt: string };
    after: { src: string; alt: string };
    caption?: string;
  };
};

export type CraftProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  url?: string;
  imageUrl?: string;
};
