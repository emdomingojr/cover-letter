# CLAUDE.md — portfolio-next2

## Project Overview

Interactive portfolio site for Emerson Domingo Jr. The primary active work is building an interactive cover letter landing page at `/cover-letter/[company-slug]` (exact route TBD). This page must feel like a native extension of the existing site — not a separate design.

The full design system reference lives in `GEMINI_SETUP_BRIEF.md`. This file is a condensed implementation guide. When in doubt, read the source components.

---

## Workflow

Prompts arrive **one section at a time**. Each prompt is a self-contained implementation spec that includes layout, content, animation, and interaction details. Do not build ahead of the current prompt. Do not add features or components not specified.

---

## Tech Stack

- **Framework:** Next.js 14, App Router, TypeScript
- **Styling:** Tailwind CSS (token-based, see below)
- **Animation:** Framer Motion — already installed, use it, don't add alternatives
- **UI primitives:** Radix UI (tooltips), Vaul (bottom drawer on mobile)
- **Hosting:** Netlify
- **Fonts:** Loaded via `next/font/google` in `app/layout.tsx`, injected as CSS variables on `<html>`

No new dependencies without explicit approval.

---

## File Conventions

| Type | Location |
|---|---|
| Pages | `app/[route]/page.tsx` |
| Components | `components/` |
| Data | `data/case-studies/*.json`, `data/data.ts`, `data/terms.json` |
| Types | `types/` |
| Utilities | `lib/` |
| Public assets | `public/` |

---

## Design System — Critical Rules

### Typography

All font families are applied via Tailwind utility classes mapped to CSS variables. Use only these:

| Role | Tailwind class | Use for |
|---|---|---|
| Heading / body | `font-serif` or `font-sans` | All headings and body copy |
| Mono | `font-mono` | Labels, metadata, pills, nav |
| Display mono | `font-display-mono` | Impact metric numbers only |
| Heading emphasis | `font-serif-display` | Italic emphasis on substrings within headings — always via `TitleWithEmphasis` |

**Never** use raw `font-family` inline styles. **Never** use a font class not in this list.

**Heading emphasis pattern** — reuse `TitleWithEmphasis` exactly:
```tsx
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

### Colour Tokens

All colours use CSS custom properties with **space-separated RGB channels** so Tailwind opacity modifiers work (`bg-canvas/90`, `text-muted/70`).

| Tailwind class | Token | Usage |
|---|---|---|
| `bg-canvas` | `--color-canvas` | Page background |
| `bg-surface` | `--color-surface` | Cards, panels |
| `bg-surface-2` | `--color-surface-2` | Nested surfaces, inputs |
| `border-border` | `--color-border` | Default borders |
| `text-heading` | `--color-heading` | Headings |
| `text-primary` | `--color-primary` | Body text |
| `text-subtle` | `--color-subtle` | Secondary body copy |
| `text-muted` | `--color-muted` | Labels, captions, metadata |
| `text-accent` / `bg-accent` | `--color-accent-rgb` | Interactive accent (#0094ff) |

**Never** use raw hex values or hardcoded colours. All tokens react to `data-theme` on `<html>`.

### Layout

Global content wrapper — match exactly:
```tsx
<main className="mx-auto max-w-5xl px-6 pt-24">
```

Section pattern (case study detail, reuse for cover letter sections):
```tsx
<div className="grid gap-4 border-t border-border pt-8 md:grid-cols-[200px_1fr]">
  <span className="font-mono text-xs uppercase tracking-widest text-muted">Label</span>
  <div>{/* content, max-w-[620px] for long-form text */}</div>
</div>
```

### Animation Conventions

Use Framer Motion. Match these defaults exactly:

| Pattern | Config |
|---|---|
| Page entry | `opacity: 0, y: 10` → `opacity: 1, y: 0`, `duration: 0.3`, `ease: "easeOut"` |
| Section stagger | `delay: index * 0.08`, `duration: 0.35` |
| Content swap | `AnimatePresence mode="wait"`, opacity + `filter: blur(2px)` + `y: 4`, `duration: 0.15`, `ease: "circOut"` |
| Hover reveal | `opacity + y`, `duration: 0.22`, `ease: "easeOut"` |
| Spring thumb | `type: "spring", stiffness: 400, damping: 30` |
| Expand / collapse | `opacity + y:16` enter, `y:8` exit, `duration: 0.3`, `ease: "easeOut"` |
| Tap feedback | `whileTap={{ scale: 0.98 }}` |
| `whileInView` lists | `delay: i * 0.06`, `duration: 0.3`, `viewport: { once: true, margin: "-20px" }` |

**Always** check `useReducedMotion()` — when true, strip all transforms and blur. Opacity-only transitions are allowed.

### Interaction States

| Element | Default | Hover |
|---|---|---|
| Text links / icons | `text-muted` or `text-subtle` | `text-accent` |
| Bordered elements | `border-border` | `border-accent` |
| CTA buttons | `border-border text-primary` | `border-accent text-accent` |

Colour transitions: `transition-colors duration-150` on all interactive elements. Do not transition layout properties on hoverable elements.

### Focus States

Already defined globally — do not override:
```css
:focus-visible { outline: 2px solid #0094FF; outline-offset: 2px; border-radius: 2px; }
:focus:not(:focus-visible) { outline: none; }
```

For cards add: `focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30`

### Responsive Breakpoints

| Breakpoint | What changes |
|---|---|
| default (mobile) | Single column, `py-3` touch targets, stacked layouts |
| `sm:` 640px | Toggles go inline |
| `md:` 768px | 2-col grids, larger headings, `[200px_1fr]` section layout |
| `lg:` 1024px | Side-by-side compositions |

Touch detection: `window.matchMedia("(hover: none)")` — use this, not `isMobile` booleans.

---

## Reusable Patterns (use these, don't reinvent)

| Pattern | Source file | When to reach for it |
|---|---|---|
| `TitleWithEmphasis` | `CaseStudyCard.tsx` | Heading with italic Playfair substring |
| Section label + grid | `CaseStudyDetail.tsx` | Any labelled content block |
| `ToggleGroup` (segmented control) | `AboutContent.tsx` | Binary or multi-option selector |
| `ConstraintCallout` | `CaseStudyDetail.tsx` | Highlighted callout box |
| `parseTerms` | `lib/parse-terms.tsx` | Inline glossary annotations |
| `AnimatePresence mode="wait"` | Throughout | Content swaps, tab changes |
| Staggered `whileInView` list | `AboutContent.tsx` | Lists that animate in on scroll |
| Before/after slider | `BeforeAfterSlider.tsx` | Image comparison |

---

## Hard Constraints

- **No new dependencies** unless explicitly requested.
- **No raw hex colours** — use token classes only.
- **No inline `font-family`** — use Tailwind font classes only.
- **All animations must respect `prefers-reduced-motion`** — check `useReducedMotion()`.
- **Light and dark themes must both work** — test against both `data-theme="light"` and `data-theme="dark"`.
- **WCAG 2.2 AA baseline** — semantic HTML, aria labels, visible focus rings, 44px touch targets on mobile.
- **No raster images for decorative elements** — prefer CSS/SVG.
- Read source components before implementing anything that resembles an existing pattern.
