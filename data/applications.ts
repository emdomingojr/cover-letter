export type Part = { type: "text"; content: string } | { type: "token"; id: number };

export interface HoverToken {
  id: number;
  text: string;
  image: string;
  label: string;
  href: string;
}

export interface HeroData {
  companyLogo: string;
  badgeLabel: string;
  headingParts: Part[];
  tokens: HoverToken[];
  subheading: string[];
}

export interface CaseStudyData {
  eyebrow: string;
  heading: string;
  body: string[];
  stats: { value: string; label: string }[];
  meta: { label: string; value: string }[];
}

export interface ClosingData {
  eyebrow: string;
  heading: string;
  body: string[];
}

export interface ApplicationData {
  slug: string;
  companyName: string;
  sequence: string[];
  hero: HeroData;
  cases: {
    heroforce?: CaseStudyData;
    pricing?: CaseStudyData;
    forms?: CaseStudyData;
    pseo?: CaseStudyData;
  };
  closing: ClosingData;
}

export const APPLICATIONS: Record<string, ApplicationData> = {
  envato: {
    slug: "envato",
    companyName: "Envato",
    sequence: ["pseo", "heroforce", "pricing"],
    hero: {
      companyLogo: "https://lever-client-logos.s3.us-west-2.amazonaws.com/c11956a5-1cb9-45f6-b2ef-a36290dffe66-1722470303592.png",
      badgeLabel: "Application / Senior Product Designer",
      headingParts: [
        { type: "text", content: "I design acquisition surfaces that " },
        { type: "token", id: 0 },
        { type: "text", content: ", " },
        { type: "token", id: 1 },
        { type: "text", content: ", " },
        { type: "token", id: 2 },
        { type: "text", content: ", and " },
        { type: "token", id: 3 },
        { type: "text", content: "." },
      ],
      tokens: [
        {
          id: 0,
          text: "scale organic traffic",
          image: "/cover-letter/images/pseo-2search-results.webp",
          label: "+96% DEMO REQUESTS",
          href: "#pseo-flowchart",
        },
        {
          id: 1,
          text: "tighten design systems",
          image: "https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/69258161486026ce196d6839_DSystem-Guardrails.png",
          label: "3X FASTER BUILDS",
          href: "https://www.emersonjr.com/work/eos-design-system",
        },
        {
          id: 2,
          text: "reduce cognitive load",
          image: "/cover-letter/2pricing-new.webp",
          label: "120% CVR ACHIEVED",
          href: "#pricing-reveal",
        },
        {
          id: 3,
          text: "ship via designer-led code",
          image: "https://player.vimeo.com/video/1184361384?autoplay=1&muted=1&loop=1&background=1",
          label: "SHIPPED WITHOUT HANDOFF",
          href: "#velocity",
        },
      ],
      subheading: [
        "Hi, I'm Em. This page is my application for Senior Product Designer at Envato. I designed, coded, and shipped it in a couple of days.",
        "Keep scrolling. The work responds.",
      ],
    },
    cases: {
      pseo: {
        eyebrow: "Acquisition Architecture",
        heading: "Scaling organic traffic via a connected page system.",
        body: [
          "Employment Hero needed to compete for job-seeker traffic monopolised by Seek and Indeed. Out-bidding them on paid search was financially unsustainable, so I worked with our global website lead to build a parallel acquisition channel — a programmatic SEO system that could generate thousands of highly targeted landing pages without manual engineering overhead.",
          "The insight was that scale, not craft-per-page, was the competitive lever here. Incumbents own the obvious queries, and the long-tail is unguarded. The architecture I designed filters broad search intent down through three template tiers: category-level hub pages capture discovery traffic, dedicated employer brand templates route users toward specific companies, and hyper-specific position pages close the loop into direct applications. One template system, thousands of pages, each one earning its rank on a query Seek and Indeed aren't optimising for.",
        ],
        stats: [
          { value: "12,000+", label: "Indexed pages" },
          { value: "300%", label: "Lift in organic acquisition" },
        ],
        meta: [
          { label: "My Role", value: "Lead product designer: system design, templates, dev handoff" },
          { label: "Collaborators", value: "Global website lead, Product manager, software engineer, SEO specialist" },
          { label: "Tools", value: "Figma, Confluence" },
        ],
      },
      heroforce: {
        eyebrow: "Designer-led Delivery",
        heading: "Shipped without the handoff. Production code, faster.",
        body: [
          "HeroForce needed a high-engagement launch page, but engineering was locked on core product cycles. A traditional design-to-dev handoff would have pushed launch by a month.",
          "The bet was that design system tokens plus AI prototyping could close the fidelity gap between design and dev — the gap that normally makes handoff so expensive. I designed and prototyped in v0 and Claude Code, polished in Figma, and shipped the production code directly using our existing tokens. Two weeks, concept to live. The page went out with the motion, interactions, and craft the brief asked for, without borrowing an engineering sprint to get there.",
        ],
        stats: [
          { value: "2 Weeks", label: "Time to launch, vs 6 weeks standard" },
          { value: "0", label: "Engineering sprints borrowed" },
        ],
        meta: [
          { label: "My Role", value: "Lead designer and shipping engineer: concept to production code" },
          { label: "Collaborators", value: "Product marketing, motion designer, content manager" },
          { label: "Timeline", value: "2 weeks" },
          { label: "Tools", value: "Figma, v0, Claude Code" },
        ],
      },
      pricing: {
        eyebrow: "Information Architecture",
        heading: "Solving analysis paralysis.",
        body: [
          "The original Employment Hero pricing matrix presented a flat wall of 100+ features. Bottom-of-funnel plan selection suffered; visitors stalled at the comparison.",
          "The insight was that visitors weren't asking \"what do you cost\", they were asking \"is this for me.\" A feature-by-feature comparison answers the first question. It doesn't help with the second. I restructured the data into a strict taxonomy grouped by product pillars. By using progressive disclosure, I reframed the table as a decision engine: locate the specific feature category, compare the tiers, and act. The structural clarity produced a 96% lift in demo requests and pushed the funnel 120% past its CVR goal.",
        ],
        stats: [
          { value: "+96%", label: "Lift in demo requests" },
          { value: "120%", label: "Of CVR goal achieved" },
        ],
        meta: [
          { label: "My Role", value: "Lead product designer: research, IA, visual design" },
          { label: "Collaborators", value: "Product manager, front-end engineers" },
          { label: "Tools", value: "Figma, Maze, Hotjar" },
        ],
      },
    },
    closing: {
      eyebrow: "About working together",
      heading: "How I'd show up at Envato.",
      body: [
        "I design for clarity, customer trust, and operational efficiency. I work autonomously on ambiguous problems, I ship production code when it's the right call, and I read the data that comes back the next week.",
        "I use LLMs every day, not as a novelty but as genuine leverage. Framing problems before I design. Pressure-testing my own assumptions. Synthesising research. Moving from idea to interactive prototype in hours rather than days. I'd bring that workflow to Envato on day one and I'd expect it to compound across the team over time.",
        "Design is also a team sport. I thrive on direct feedback, I lift the baseline quality of whoever I'm working with, and I mentor juniors into the same habits. On the bonus criteria: I haven't designed for creative asset marketplaces specifically, but I've spent years on professional B2B SaaS where the user's job involves complex workflows they need to trust completely. The domain logic changes. The design judgement transfers.",
        "I built this page because I'd rather show you how I think than describe it. Happy to walk you through the Figma files and the Claude Code build whenever suits.",
      ],
    },
  },
  karbon: {
    slug: "karbon",
    companyName: "Karbon",
    sequence: ["heroforce", "pricing", "forms", "pseo"],
    hero: {
      companyLogo: "https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/69e855e9cd54b7ea107469d1_karbon_logo.png",
      badgeLabel: "Application / Product Designer",
      headingParts: [
        { type: "text", content: "I design end-to-end product experiences, " },
        { type: "token", id: 0 },
        { type: "text", content: ", " },
        { type: "token", id: 1 },
        { type: "text", content: ", and " },
        { type: "token", id: 2 },
        { type: "text", content: " and " },
        { type: "token", id: 3 },
        { type: "text", content: "." },
      ],
      tokens: [
        {
          id: 0,
          text: "ship via LLM-assisted design and code",
          image: "https://player.vimeo.com/video/1184361384?autoplay=1&muted=1&loop=1&background=1",
          label: "WORKING PROTOTYPE",
          href: "#velocity", // Same anchor as HeroForce
        },
        {
          id: 1,
          text: "validate early",
          image: "https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/692581ec05b87f568e8f7604_Pricing-Hero.png",
          label: "PRICING MATRIX IA",
          href: "#pricing-reveal",
        },
        {
          id: 2,
          text: "push craft and attention to logic detail",
          image: "https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/69258a6e0adf6285263f3335_Forms-Hero.png",
          label: "FORM OPTIMISATION",
          href: "#forms",
        },
        {
          id: 3,
          text: "system-level decisions",
          image: "/cover-letter/images/pseo-2search-results.webp",
          label: "SYSTEMS ARCHITECTURE",
          href: "#pseo-flowchart",
        },
      ],
      subheading: [
        "Hi, I'm Emerson. This page is my application for Product Designer at Karbon, and I built it the way I'd approach any real brief. I used LLMs to frame the problem and stress-test my thinking, v0 and Claude Code to prototype, and Figma for the details that still need a human eye.",
        "Keep scrolling. Each case study maps to something the role asks for.",
      ],
    },
    cases: {
      heroforce: {
        eyebrow: "AI-Assisted Product Workflow",
        heading: "From brief to production, with LLMs in the loop.",
        body: [
          "HeroForce needed a launch page fast. I used it to test whether LLM tooling could hold up against a normal design-to-dev pipeline, on a piece of work that couldn't look AI-generated.",
          "I pressure-tested the brief with Claude and Gemini first. That alone saved a week and caught two assumptions the team hadn't written down. v0 generated, Claude Code iterated, Figma refined what AI still can't judge. Shipped to production on the existing design system.",
          "Two weeks, concept to live."
        ],
        stats: [
          { value: "2 Weeks", label: "Concept to production" },
          { value: "0", label: "Engineering sprints borrowed" },
        ],
        meta: [
          { label: "My Role", value: "Sole designer. Problem framing, prototyping, production code." },
          { label: "Collaborators", value: "PM, copywriter." },
          { label: "Tools", value: "v0, Claude Code, Figma" },
        ],
      },
      pricing: {
        eyebrow: "Customer-Validated Design",
        heading: "Reducing complexity by listening first.",
        body: [
          "The existing pricing matrix presented 100+ features in a flat comparison table. Bottom-of-funnel conversion was suffering.",
          "I redesigned around this reframe: visitors weren't asking 'what does this cost', they were asking 'is this for me'. Features grouped into a strict taxonomy around product pillars, not feature categories. Progressive disclosure so detail only surfaces once the visitor has committed to a tier. The comparison table became a decision engine instead of a spec sheet. I treated research as a velocity tool rather than a gate, which is the only reason this shipped in the window it did."
        ],
        stats: [
          { value: "+96%", label: "Demo request lift" },
          { value: "120%", label: "Of CVR goal" },
          { value: "3", label: "Customer interviews + Maze + Hotjar" }
        ],
        meta: [
          { label: "My Role", value: "Sole designer, end-to-end. Research, IA, visual design, QA." },
          { label: "Collaborators", value: "PM, front-end engineers" },
          { label: "Tools", value: "Figma, Maze, Hotjar" },
        ],
      },
      forms: {
        eyebrow: "Interaction Craft & State Coverage",
        heading: "Designing the full logic, not just the happy path.",
        body: [
          "The old forms designed for the happy path and left engineers to fill in the gaps. I rebuilt the input component around every state a form can actually be in, from focused to errored to validating to submitted, plus mobile keyboard context. A/B tested the new pattern, watched Hotjar replays of the losing variant, and codified every state into the design system so the logic ships by default on every future form."
        ],
        stats: [
          { value: "+466%", label: "Mobile form completion" },
          { value: "+30%", label: "Demo requests" }
        ],
        meta: [
          { label: "My Role", value: "Interaction designer, component logic, state coverage, design system contribution" },
          { label: "Collaborators", value: "PM, front-end engineers, conversion manager (CRO)" },
          { label: "Tools", value: "Figma, Hotjar" },
        ],
      },
      pseo: {
        eyebrow: "Systems Design",
        heading: "Encoding design judgement into a scaling system.",
        body: [
          "Employment Hero needed to compete for job-seeker traffic monopolised by Seek and Indeed. Paid search wasn't sustainable at scale, so I designed a programmatic system that generates thousands of targeted pages from a single template architecture.",
          "Three template tiers, each built for a different job-to-be-done.",
          "Different searchers want different things. Someone browsing needs a category page. Someone checking out a specific employer needs their profile. Someone ready to apply needs the exact role. My job was designing the system that decides which page each person sees, and making sure every page pulls the right content for the right moment.",
          "I made the design decisions once, then baked them into the system so engineers and content teams could keep building without another designer in the loop. The system scaled to 12,000+ pages without me lifting a finger. All the complicated stuff stays under the hood. The visitor just gets the right page for what they were looking for."
        ],
        stats: [
          { value: "12,000+", label: "Indexed pages" },
          { value: "+300%", label: "Organic lift" }
        ],
        meta: [
          { label: "My Role", value: "Sole designer. System architecture, template design, documentation." },
          { label: "Collaborators", value: "SEO lead, engineering team" },
          { label: "Tools", value: "Figma, Miro, Confluence" },
        ],
      },
    },
    closing: {
      eyebrow: "About working together",
      heading: "How I'd show up at Karbon.",
      body: [
        "I design for clarity, customer trust, and efficiency. I'm comfortable with messy briefs, I'll ship production code when it's faster than a handoff, and I'll go back and read the data a week later to see what worked.",
        "LLMs are part of how I work. I use them to frame problems before I open Figma or Claude Code, to stress-test my own thinking, to make sense of research, and to go from idea to working prototype in hours instead of days. That workflow would show up on day one.",
        "Design is a team sport. I like direct feedback, I lift the standard of whoever I'm working with, and I coach juniors to do the same. ",
        "I built this page because showing you how I think felt more honest than describing it. Happy to walk you through the Figma files and the Claude Code build whenever suits.",
      ],
    },
  }
};
