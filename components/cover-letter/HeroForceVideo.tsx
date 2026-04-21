import { CaseStudyData } from "@/data/applications";

export function HeroForceVideo({ data }: { data: CaseStudyData }) {
  if (!data) return null;

  return (
    <section id="velocity" className="py-16 md:py-32">
      {/* ── Tier 1: Narrative & Impact ───────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 md:px-0">
        <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {data.eyebrow}
        </div>
        <h2 className="mb-6 max-w-2xl text-heading text-3xl font-semibold leading-tight">
          {data.heading}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-border pt-8">
          <div className="md:col-span-7 flex flex-col gap-4 text-subtle">
            {data.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="md:col-span-5 flex flex-col space-y-8">
          {data.stats.map((stat, i) => (
            <div key={i}>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">{stat.value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* ── Tier 2: Visual Asset (Full Viewport Breakout) ────── */}
      <div
        className="w-[100vw] px-2 md:px-12 flex justify-center mt-12 mb-12"
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <div className="w-full max-w-7xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          {/* macOS Title Bar */}
          <div className="h-8 md:h-12 border-b border-border bg-canvas flex items-center px-4 shrink-0 relative">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[200px] md:max-w-sm h-5 md:h-7 bg-surface-2 rounded-md flex items-center justify-center border border-border">
              <span className="font-mono text-[9px] md:text-[10px] text-muted">emersonjr.com/heroforce-demo</span>
            </div>
          </div>

          {/* Looping Demo Video */}
          <div className="relative aspect-video w-full bg-canvas">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://player.vimeo.com/video/1184361384?autoplay=1&muted=1&loop=1&background=1"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="HeroForce demo"
            />
          </div>
        </div>
      </div>

      {/* ── Tier 3: The Meta Footer ──────────────────────────── */}
      <div className="max-w-5xl mx-auto mt-8 flex flex-col md:flex-row flex-wrap gap-6 md:gap-16 px-6 md:px-0">
        {data.meta.map((m, i) => (
          <div key={i}>
            <div className="text-xs text-muted uppercase tracking-wider mb-1 font-mono">{m.label}</div>
            <div className="font-sans text-sm text-heading">{m.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
