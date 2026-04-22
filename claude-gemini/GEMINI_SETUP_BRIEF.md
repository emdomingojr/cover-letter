# Setup Brief: Interactive Cover Letter Landing Page

## Purpose

This document is a setup brief for Gemini. The goal is to collaborate with Gemini to **plan** (not build) an interactive cover letter landing page for a job application. Gemini will help hash out the interactions, layout, and content strategy for each section — one section at a time. The output from each planning session will then be fed to Claude Code for implementation.

The page must feel like a native extension of the existing portfolio site. To achieve this, the full design system is documented in Appendix A below.

---

## Project Context

- **Framework:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Animation:** Framer Motion (shared across all components)
- **Hosting:** Netlify
- **Repo:** `portfolio-next2`
- **Existing pages:** `/` (home), `/about`, `/work/[slug]`, `/404`
- **Target route:** `/cover-letter/[company-slug]` (or similar — to be decided)

---

## Workflow

1. **One prompt per section** — each Gemini conversation focuses on a single module/section of the page
2. Gemini helps define: content structure, interaction behaviour, responsive breakpoints, animation specs, and any data requirements
3. Each section plan is then handed to Claude Code as a self-contained implementation prompt
4. Claude Code builds against the design system below — the output should be visually and behaviourally indistinguishable from the rest of the site

---

## Internal Agent Loop

When executing complex component builds or refactors, I will sequence the work through four autonomous subagent roles located in `./claude-gemini/`:

1.  **Systems Architect (`architect.md`)**: Ingests requirements and outputs a rigid, deterministic build specification (states, physics, edge cases). Does not write production code.
2.  **Execution Engineer (`engineer.md`)**: Ingests the Architect's spec and writes production-ready `.tsx`. Autonomously runs linting and type-checks (`npm run lint`, `npx tsc`). self-fixes until clean.
3.  **QA Browser (`qa-browser.md`)**: Triggers the browser subagent to interact with the localhost render. Monitors hydration warnings and captures a visual artifact for the Design Director.
4.  **Design Director (`design-director.md`)**: Compares the rendered artifact against the system tokens and Architect's intent. Issues a final `PASS` or `REJECT` command.

I will not present a solution to the user until it has successfully cleared this entire internal quality pipeline.

---

## Sections to Plan (Suggested Order)

Current sections based on our interactions

*(Sections can be added, removed, or reordered during planning.)*

---

## Constraints

- Must work on mobile (responsive-first)
- Must respect `prefers-reduced-motion` (all existing components do)
- Must support light/dark theme via `data-theme` attribute
- No external dependencies beyond what's already installed (Framer Motion, Radix UI, Vaul)
- Page should feel premium but load fast — no heavy assets, prefer CSS/SVG over raster images
- Accessibility: WCAG 2.2 AA baseline (focus rings, semantic HTML, aria labels)

---

## How to talk to me
Your responses must follow these parameters:
* **Tone:** Compassionate but competent expert. Balances friendliness and professionalism. Helpful peer with deep technical knowledge. Warm, insightful, constructive, supportive. Acknowledges difficulty without empty praise. Prioritises clarity and value.
* **Pushback:** Always challenge incorrect reasoning, flawed premises, gaps in logic, or weak ideas. Be direct and constructive. Do not agree just to be agreeable or paint a rosy picture. Highlight what's done well, but never hold back on what needs improvement. Act as a partner pushing the user to be better.
* **Writing standards:** Use Australian and British English spelling throughout (e.g. colour, prioritise, organisation). Use periods over em-dashes.
* **Formatting:** Use headers and lists judiciously, not by default. Avoid single-sentence paragraphs. Conclude every response with an insightful point or actionable next step. Never end with summaries or recaps.
* **Avoid:** False dichotomies, rhetorical openers, permission statements ("Great question!"), the rule of three. Banned words: delve, unpack, resonate, empower, elevate, landscape, synergy, truly, deeply, remarkably. Banned phrases: "in today's fast-paced world", "at the end of the day", "more than just X".
* **Clarification:** Ask clarifying questions before diving in when a request is ambiguous or the user may be heading down the wrong path. Get alignment early rather than assuming intent.
* **Assumptions:** Flag unstated assumptions in the user's reasoning. Surface things the user may not realise they're taking for granted, especially where hidden assumptions carry risk.
* **Quality bar:** Distinguish between "good enough" and "excellent". Be explicit about whether output meets the bar or if there's a meaningful gap between current state and potential. Don't let technically correct feedback mask underperformance.
* **Constructive alternatives:** When pushing back, always pair critique with a concrete alternative or direction. Criticism without a path forward is noise, not partnership.
* **Confidence transparency:** Be direct about confidence levels. State explicitly whether a recommendation is strong or a best guess. Avoid soft hedging language that muddies the signal.
* **V0/Claude Code Prompts:** return this inside an `md` snippet for easy copying
* **Self-critique:** when i type `/sc`, this is what I mean: I want you to look at the above prompt, critique the way it is written, suggest improvements, then return a corrected, more detailed prompt. I want the prompt itself to be structured so that it enables you to answer to the best of your capabilities.
* **UX Exploration:** Whenever I type '/ux3' in the future I want you to do add this to my prompt: "I want to push the visual execution a little bit, so it lands the message better. Explore possible design solutions that address the core problem more efficiently. In your answers, you will reference and glean inspiration from the attached ux reasoning doc. Explore at least 3 alternatives. I want it to be in-depth, questioning all UX decisions, and always going back to the problem we are solving. If you think the existing solution should be rejected, so be it."
* **Tally Mode:** whenever I type `/notyet`, treat it as this command: "do not execute yet. just keep a tally of current commands. I have more commands. acknowledge by saying ready for next instruction."
* `/ux3`: I will ignore the basic request and provide 3 drastically different interaction paradigms that solve the root problem, challenging the fundamental premise.
* `/notyet`: Use this to dump a bunch of arbitrary thoughts into my context window. I will hold it and respond ONLY with "Ready for next instruction."
* `/verify`: This is a mandatory checkpoint. When this macro is used, I must:
    1. **STOP** all tool execution and code generation immediately.
    2. **Echo back** my full understanding of your instructions point by point.
    3. **Present a detailed Implementation Plan** covering architecture, logic, and data changes.
    4. **Demand clarification questions** for any ambiguity or risk identified. 
    5. **Wait for explicit approval** (e.g. "Go ahead", "Execute", or "Approved") before proceeding to create or modify files. 
    Failure to wait for approval after a `/verify` command is a breach of protocol.

---

---

# Appendix A: Design System Reference

Everything below is extracted from the live `portfolio-next2` codebase. Claude Code must match these patterns exactly.

---

## A.1 Typography

### Font Stack

| Role | Font | CSS Variable | Tailwind Class | Usage |
|---|---|---|---|---|
| Heading / Body | Radio Canada Big (400, 500, 700) | `--font-sans` | `font-serif`, `font-sans` | All headings and body copy |
| Mono | JetBrains Mono | `--font-mono` | `font-mono` | Labels, metadata, code, pills, nav links |
| Display Mono | Space Mono (400) | `--font-display-mono` | `font-display-mono` | Impact metric values only |
| Heading Emphasis | Playfair Display (700 italic) | `--font-serif-display` | `font-serif-display` | Specific words within headings — always italic+bold as a compound |

### Font Loading

All fonts loaded via `next/font/google` in `app/layout.tsx` with `display: "swap"`. CSS variables injected on `<html>` element.

### Heading Emphasis Pattern

Used to italicise specific words within a heading. The `TitleWithEmphasis` component splits the title string at a `titleEmphasis` substring and wraps it in `<span className="font-serif-display">`.

```tsx
// Pattern — reuse this exact approach for any heading needing emphasis
function TitleWithEmphasis({ title, emphasis }: { title: string; emphasis?: string }) {
  if (!emphasis) return <>{title}</>;
  const idx = title.indexOf(emphasis);
  if (idx === -1) return <>{title}</>;
  return (
    <>
      {title.slice(0, idx)}
      <span className="font-serif-display">{emphasis}</span>
      {title.slice(idx + emphasis.length)}
    </>
  );
}
```

### Type Scale (Tailwind classes used across the site)

| Element | Classes | Example |
|---|---|---|
| Page h1 | `font-serif text-4xl font-semibold leading-tight tracking-tight text-heading md:text-5xl` | About, Case Study detail |
| Hero h1 | `font-serif text-[clamp(1.75rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-heading` | Homepage |
| Section h2 | `font-mono text-xs uppercase tracking-widest text-muted` | Section labels ("The Problem", "Core Competencies") |
| Card h2 | `font-serif text-lg font-semibold leading-snug md:text-xl` | Case study cards |
| Body copy | `font-sans text-base leading-relaxed text-subtle` | Paragraphs |
| Detail body | `font-sans text-sm leading-relaxed text-subtle` | Case study section content |
| Metadata | `font-mono text-xs text-muted` | Timestamps, indices, captions |
| Tiny label | `font-mono text-[10px] uppercase tracking-widest text-muted` | ThemePanel, tooltip headers |
| Nav links | `font-mono text-sm` | NavBar |
| Impact metrics | `font-mono text-3xl font-semibold leading-none tracking-tight tabular-nums` | Case study detail bento |
| Card metrics | `text-xl font-normal leading-none tabular-nums` with `font-family: var(--font-display-mono)` | Homepage cards |

---

## A.2 Colour Tokens

All tokens use **space-separated RGB channels** so Tailwind opacity modifiers work (`bg-canvas/90`, `text-muted/70`, etc.).

### Light Theme (`[data-theme="light"]`)

| Token | RGB | Hex | Usage |
|---|---|---|---|
| `--color-canvas` | `255 249 238` | `#fff9ee` | Page background |
| `--color-surface` | `236 228 215` | `#ece4d7` | Card backgrounds, panels |
| `--color-surface-2` | `246 239 227` | `#f6efe3` | Nested surfaces, input backgrounds |
| `--color-border` | `196 216 237` | `#c4d8ed` | Default borders |
| `--color-border-hover` | `116 147 178` | `#7493b2` | Hovered borders |
| `--color-muted` | `142 154 170` | `#8e9aaa` | Labels, metadata, captions |
| `--color-subtle` | `109 122 136` | `#6d7a88` | Body copy, secondary text |
| `--color-primary` | `0 0 0` | `#000000` | Primary body text |
| `--color-heading` | `0 42 85` | `#002a55` | Headings (navy) |
| `--color-accent-rgb` | `0 148 255` | `#0094ff` | Interactive accent |

### Dark Theme (`:root`, `[data-theme="dark"]`)

| Token | RGB | Hex | Usage |
|---|---|---|---|
| `--color-canvas` | `18 16 14` | `#12100e` | Page background (warm charcoal) |
| `--color-surface` | `28 25 22` | `#1c1916` | Card backgrounds |
| `--color-surface-2` | `35 31 27` | `#231f1b` | Nested surfaces |
| `--color-border` | `51 46 40` | `#332e28` | Default borders |
| `--color-border-hover` | `74 66 56` | `#4a4238` | Hovered borders |
| `--color-muted` | `138 128 112` | `#8a8070` | Labels, metadata |
| `--color-subtle` | `176 165 148` | `#b0a594` | Body copy |
| `--color-primary` | `245 239 230` | `#f5efe6` | Primary text |
| `--color-heading` | `196 216 237` | `#c4d8ed` | Headings (light blue) |
| `--color-accent-rgb` | `0 148 255` | `#0094ff` | Same accent in both themes |

### Theme Switching

- `data-theme` attribute on `<html>` element
- Anti-flash inline `<script>` in `<head>` reads `localStorage.getItem('theme')` before paint
- Toggle button in NavBar writes `data-theme` + `localStorage`
- Default is dark (`:root` = dark tokens)

### Token Class Overrides

Unlayered CSS (outside `@layer`) overrides Tailwind utilities for guaranteed token reactivity:

```css
.text-primary   { color: rgb(var(--color-primary)); }
.text-heading    { color: rgb(var(--color-heading)); }
.text-subtle     { color: rgb(var(--color-subtle)); }
.text-muted      { color: rgb(var(--color-muted)); }
.bg-canvas       { background-color: rgb(var(--color-canvas)); }
.bg-surface      { background-color: rgb(var(--color-surface)); }
.border-border   { border-color: rgb(var(--color-border)); }
```

---

## A.3 Geometry Tokens

Live-adjustable via DevMode ThemePanel. Defaults in CSS, overridden via `document.documentElement.style`:

| Token | Default | Usage |
|---|---|---|
| `--radius-base` | `8` | Multiplied: `.rounded` = 0.5x, `.rounded-md` = 0.75x, `.rounded-lg` = 1x, `.rounded-xl` = 1.5x |
| `--blur-base` | `4` | `.backdrop-blur-sm` = `blur(calc(var(--blur-base) * 1px))` |

`rounded-full` is excluded — always stays circular.

---

## A.4 Layout & Spacing

### Global Layout

```
<main className="mx-auto max-w-5xl px-6 pt-24">
```

- Max width: `max-w-5xl` (1024px)
- Horizontal padding: `px-6` (24px)
- Top padding: `pt-24` (96px — clears fixed nav)

### NavBar

- Fixed: `fixed top-0 left-0 right-0 z-50`
- Background: `bg-canvas/90 backdrop-blur-sm`
- Border: `border-b border-border`
- Inner: `mx-auto max-w-5xl px-6 py-4`
- Logo swaps to case study title on scroll past hero (200px threshold)

### Section Pattern (Case Study Detail)

```
grid gap-4 border-t border-border pt-8 md:grid-cols-[200px_1fr]
```

- Label column: 200px fixed on desktop
- Content column: flex, max-width 620px for ~70 char line length
- Sections separated by `border-t border-border` with `pt-8` top padding
- Extra spacing before "Outcome" section: `mt-10`

### Card Grid (Homepage)

```
grid grid-cols-1 gap-4 md:grid-cols-2
```

### Bento Card (Case Study Detail)

```
rounded-xl border border-border bg-surface
  └── flex flex-col divide-y divide-border
       ├── Row 1: impact metrics (flex flex-wrap gap-10 p-8)
       └── Row 2: grid grid-cols-2 md:grid-cols-3 (Role | Stack | Team)
```

### Spacing Conventions

| Context | Pattern |
|---|---|
| Page top margin | `pt-4 md:pt-8` (Hero), `pt-8` (About) |
| Section bottom margin | `mb-10` with `border-t border-border pt-8` |
| Page bottom padding | `pb-24` |
| Card internal padding | `p-6` (homepage cards), `p-8` (bento cards) |
| Gap between elements | `gap-4` (cards), `gap-8` (sections), `gap-2` (pills/tags) |
| Label to content | `mb-5` (section label to content) |

---

## A.5 Interactive Components & Patterns

### A.5.1 Case Study Cards (Homepage)

**Structure:** Grid of `motion.div` wrappers containing `Link` elements.

**Hover behaviour:**
- Hovered card: `opacity: 1`, `grayscale(0%)`, `z-index: 10`
- Non-hovered cards: `opacity: 0.2`, `grayscale(50%)`
- Card border: `border-border` default → `hover:border-accent`
- Title colour: `text-heading` default → `text-accent` on hover
- Arrow: shifts `x: 3` on hover

**Floating image panel** (above card on hover):
- `absolute inset-x-0 bottom-full z-50 h-64`
- Fade + slide: `opacity 0→1`, `y 14→0`, duration 0.22s easeOut
- CSS `maskImage: linear-gradient(to top, transparent 0%, black 40%)` for transparency fade
- Canvas-coloured gradient div behind image (`z-index: -1`) to mask card content bleed-through

**Stack marquee** (below card on hover):
- `absolute inset-x-0 top-full z-40 h-7`
- Fade + slide: `opacity 0→1`, `y -14→0`, duration 0.22s easeOut
- Infinite horizontal scroll: `animate={{ x: ["0%", "-50%"] }}`, duration 14s linear
- Tags duplicated for seamless loop

**Magnetic cursor badge:**
- `pointer-events-none`, tracks cursor via `useMotionValue`
- Shows "View Study" pill on hover with `AnimatePresence`
- `cursor-none` on the card Link when hovered

**Entry animation:** `opacity: 0, y: 16` → `opacity: 1, y: 0` with staggered delay (`index * 0.07`, duration 0.35s)

### A.5.2 Hero (Homepage)

**Sentence hover preview:**
- Sentences are inline `<Link>` elements inside the h1
- On hover: floating preview card appears (fixed position, 300px wide)
- Card follows cursor via RAF lerp (factor 0.12) with viewport clamping
- Show delay: 250ms, hide grace period: 80ms
- Content: 16:9 image + mono title
- SVG dashed bezier line from sentence centre to cursor
- Token trace: bounding box with corner nodes + dimension label around active sentence

**Dimming:** Active sentence → `text-accent`; other sentences → `opacity-[0.35]`

**Teaching animation:** On first visit (localStorage gate), auto-reveals preview for sentence[0] after 500ms, hides after 1500ms.

### A.5.3 Segmented Control / Toggle Group (About Page)

```tsx
<div className="flex rounded-lg border border-border bg-surface-2 p-1">
  <button className="relative z-10 flex-1 px-4 py-3 sm:py-1.5 text-sm font-medium">
    {value === opt && (
      <motion.div
        layoutId={`thumb-${groupId}`}
        className="absolute inset-0 -z-10 rounded-md bg-surface shadow-sm"
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
    )}
    {opt}
  </button>
</div>
```

- Sliding thumb via Framer Motion `layoutId`
- Spring: stiffness 400, damping 30
- Active: `text-primary`, inactive: `text-muted hover:text-subtle`
- Touch-safe: `py-3` on mobile (44px min), `py-1.5` on desktop

### A.5.4 Bio Transition (About Page)

```tsx
<AnimatePresence mode="wait">
  <motion.p
    key={bioKey}
    initial={{ opacity: 0, y: 4, filter: "blur(2px)" }}
    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
    exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
    transition={{ duration: 0.15, ease: "circOut" }}
  />
</AnimatePresence>
```

- "Compile" effect: blur + y-shift on enter/exit
- `mode="wait"` ensures clean handoff
- Reduced motion: opacity-only, no blur or y

### A.5.5 Progressive Disclosure (About Page)

- Toggle button: `font-mono text-xs text-muted hover:text-accent`
- Arrow rotates 180deg on expand
- Content: `AnimatePresence` with `opacity + y:16` enter, `opacity + y:8` exit, duration 0.3s easeOut
- Reduced motion: opacity-only

### A.5.6 Inline Glossary Tooltips

**Desktop:** Radix UI Tooltip with 150ms delay
```
max-w-[260px] rounded-lg border border-border bg-surface px-3 py-2.5 shadow-lg
```
- Header: `font-mono text-[10px] uppercase tracking-wider text-muted`
- Body: `font-sans text-xs leading-relaxed text-subtle`
- Arrow fill: `rgb(var(--color-border))`

**Mobile:** Vaul bottom drawer on tap (`pointerType === "touch"`)
```
rounded-t-xl border-t border-border bg-surface
```
- Drag handle: `h-1 w-10 rounded-full bg-border`
- Content padding: `px-6 pt-4 pb-10`

**Trigger:** `cursor-help underline decoration-dotted underline-offset-2`

### A.5.7 Before/After Image Slider

- `role="slider"` with full ARIA attributes
- Drag via pointer events (mouse + touch)
- Keyboard: ArrowLeft/Right in 5% increments
- Divider: 2px white line with circular drag handle (40px, white, shadow-md)
- Labels: `rounded bg-black/50 px-2 py-0.5 font-mono text-xs text-white`
- `clip-path: inset()` for the before image reveal

### A.5.8 Craft List (Homepage)

- List items separated by `border-t border-border`
- Active item: `text-accent`, others: `text-primary`
- Sticky image stage on desktop: `sticky top-32 aspect-video`
- Image swap: `AnimatePresence mode="wait"` with opacity fade (0.2s easeOut)
- Mobile: image stacked below list

### A.5.9 Profile Avatar

- Greyscale by default, colour on hover: `grayscale motion-safe:transition-all motion-safe:duration-300 group-hover:grayscale-0`
- Dev Mode: CSS-driven swap to SVG wireframe overlay (no React re-render)
  - `.avatar-photo { opacity: 1 }` / `body[data-dev-mode="true"] .avatar-photo { opacity: 0 }`
  - Wireframe: SVG with dashed strokes, dimension lines, corner brackets, coordinate labels

### A.5.10 Scroll Progress Bar

```tsx
<div
  className="fixed left-0 top-0 z-[100] h-[2px] transition-none"
  style={{ width: `${progress}%`, backgroundColor: "rgb(var(--color-accent-rgb) / 0.65)" }}
  aria-hidden
/>
```

- 2px fixed bar at top
- Progress calculated from `scrollY / (scrollHeight - innerHeight)`
- Passive scroll listener

### A.5.11 Theme Toggle (NavBar)

- Pill switch: `h-[22px] w-[42px] rounded-full`
- Thumb: `h-[16px] w-[16px] rounded-full bg-white shadow-sm`
- Light: thumb left (`translate-x-[3px]`), dark: thumb right (`translate-x-[23px]`)
- Sun/moon icons flanking, `text-[10px] text-[#9CA3AF]`
- `transition-transform duration-200 ease-in-out`

### A.5.12 Dev Mode Toggle

```tsx
<button className={cn(
  "rounded border px-2 py-1 font-mono text-[10px] transition-colors duration-150",
  devMode
    ? "border-accent/40 bg-accent/5 text-accent"
    : "border-border text-muted hover:border-border-hover hover:text-subtle"
)}>
  [ Dev: {devMode ? "ON" : "OFF"} ]
</button>
```

### A.5.13 Dev Mode ThemePanel

- Fixed: `bottom-6 right-6 z-[900] w-52`
- `rounded-lg border border-border bg-surface/95 p-4 shadow-lg backdrop-blur-sm`
- AnimatePresence: `opacity + y:12` enter/exit, 0.2s easeOut
- Range sliders for geometry tokens
- Reset button: `rounded border border-border hover:border-accent hover:text-accent`

### A.5.14 X-Ray Inspector (Dev Mode CSS)

- Wireframe outline on every element: `outline: 1px solid rgb(var(--color-border) / 0.5)`
- Hovered leaf element: outline becomes accent colour
- Floating tag label via `::after` pseudo-element, positioned with `--mouse-x`/`--mouse-y` CSS variables

---

## A.6 Animation Conventions

### Framer Motion Defaults

| Pattern | Config |
|---|---|
| Page entry | `opacity: 0, y: 10` → `opacity: 1, y: 0`, duration 0.3s easeOut |
| Section stagger | `delay: index * 0.08`, duration 0.35s easeOut |
| Card stagger | `delay: index * 0.07`, duration 0.35s |
| Content swap | `AnimatePresence mode="wait"`, opacity + blur(2px) + y:4, duration 0.15s circOut |
| Hover reveal | `opacity + y`, duration 0.22s easeOut |
| Spring thumb | `type: "spring", stiffness: 400, damping: 30` |
| Expand/collapse | `opacity + y:16` enter / `y:8` exit, duration 0.3s easeOut |
| List item whileInView | `delay: i * 0.06`, duration 0.3s easeOut, `viewport: { once: true, margin: "-20px" }` |
| Tap feedback | `whileTap={{ scale: 0.98 }}`, duration 0.1s easeOut |

### Reduced Motion

Every component checks `useReducedMotion()` (Framer Motion) or `prefers-reduced-motion` media query. When active:
- No y/x transforms, no blur, no springs
- Opacity-only transitions allowed
- Hero: no cursor tracking, no SVG bezier, no teaching animation, preview card positioned statically
- Cards: no magnetic badge, no cursor-none, standard cursor

### MotionConfig

Case study detail page wraps entire article in:
```tsx
<MotionConfig reducedMotion="user">
```

---

## A.7 Interaction States

### Standard Hover

| Element | Default | Hover |
|---|---|---|
| Text links | `text-muted` or `text-subtle` | `text-accent` |
| Bordered elements | `border-border` | `border-accent` |
| Nav links | `text-subtle` | `text-primary` (active: `text-accent`) |
| Contact pill | `bg-accent/10 text-accent` | `bg-accent/20` |
| CTA buttons | `border-border text-primary` | `border-accent text-accent` |

### Transition Defaults

- Colour transitions: `transition-colors duration-150` (consistent across all interactive elements)
- Layout-safe: only `color`, `opacity`, `border-color` transition — never layout properties on hoverable elements (prevents hit-area shift)
- Transform transitions: `transition-transform duration-200 ease-in-out` (theme toggle thumb)

### Focus States

```css
:focus-visible {
  outline: 2px solid #0094FF;
  outline-offset: 2px;
  border-radius: 2px;
}
:focus:not(:focus-visible) {
  outline: none;
}
```

Cards also use: `focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30`

---

## A.8 Responsive Patterns

| Breakpoint | Usage |
|---|---|
| Default (mobile) | Single column, `py-3` for touch targets (44px), stacked layouts |
| `sm:` (640px) | Toggle groups go inline, avatar max-width increases |
| `md:` (768px) | 2-column card grid, section grid `[200px_1fr]`, larger headings |
| `lg:` (1024px) | Side-by-side layouts (avatar + text, craft list + image) |

### Mobile-Specific Patterns

- Touch detection: `window.matchMedia("(hover: none)")` — disables cursor effects
- Glossary terms: tooltip on desktop, Vaul bottom drawer on mobile
- Craft list: image stacked below list (mobile), sticky side panel (desktop)
- Nav: DevMode toggle hidden on mobile (`hidden sm:block`)

---

## A.9 Data Model

### CaseStudy Type

```typescript
type CaseStudy = {
  id: string;
  title: string;
  titleEmphasis?: string;
  client: string;
  oneLinePitch: string;
  impactMetrics: ImpactMetric[];
  cardMetrics?: ImpactMetric[];
  role: string[];
  timeline: string;
  stack: string[];
  imageUrl: string;
  coreProblem: string;
  solutionLogic: string;
  outcome: string;
  constraints?: string;
  strategicDecisions?: string;
  strategicConstraint?: string;
  systemDesign?: string;
  systemConstraint?: string;
  craft?: boolean;
  category?: string;
  primaryMetric: string;
  workedWith?: string[];
  beforeAfterImages?: { before: { src: string; alt: string }; after: { src: string; alt: string }; caption?: string };
};
```

### Content sourced from JSON

- Case studies: `data/case-studies/*.json` → loaded via `data/data.ts`
- Glossary terms: `data/terms.json`
- Site config, sentences, nav links: `data/data.ts`

---

## A.10 Component Patterns to Reuse

| Pattern | Source | When to Use |
|---|---|---|
| `TitleWithEmphasis` | `CaseStudyCard.tsx`, `CaseStudyDetail.tsx` | Any heading needing italic emphasis on a substring |
| `Section` (label + content grid) | `CaseStudyDetail.tsx` | Labelled content sections with consistent layout |
| `ToggleGroup` (segmented control) | `AboutContent.tsx` | Any binary/multi-option selector |
| `ConstraintCallout` | `CaseStudyDetail.tsx` | Highlighted callout within a section |
| `parseTerms` | `lib/parse-terms.tsx` | Inline glossary annotation on any text block |
| `AnimatePresence mode="wait"` | Throughout | Content swaps, tab changes |
| Staggered `whileInView` | `AboutContent.tsx` | Lists that animate in as they scroll into view |
| Magnetic cursor badge | `CaseStudyCard.tsx` | Cursor-following labels on hover |
| Progressive disclosure | `AboutContent.tsx` | Show/hide secondary content |
| Before/after slider | `BeforeAfterSlider.tsx` | Image comparison |
| Craft list + sticky image | `CraftList.tsx` | List with linked preview panel |

---

*This brief is a living document. Update it as planning progresses.*
