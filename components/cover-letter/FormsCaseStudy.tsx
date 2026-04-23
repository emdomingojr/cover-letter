import { CaseStudyData } from "@/data/applications";
import { FormsStateExplorer } from "./FormsStateExplorer";

export function FormsCaseStudy({ data }: { data: CaseStudyData }) {
  if (!data) return null;

  return (
    <section id="forms" className="py-8">
      {/* ── Tier 1: Narrative & Impact ───────────────────────── */}
      <div className="mx-auto max-w-7xl px-2 md:px-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">{data.eyebrow}</div>
        <h2 className="mb-6 max-w-2xl text-heading text-3xl font-semibold leading-tight">{data.heading}</h2>
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

      {/* ── Tier 1.5: Context Bridge ─────────────────────────── */}
      <div className="max-w-7xl mx-auto mt-8 mb-8 border-t border-border pt-8 px-2 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-start">
          {data.meta.map((m, i) => (
            <div key={i}>
              <div className="text-xs text-muted uppercase tracking-wider mb-2 font-mono">{m.label}</div>
              <div className="font-sans text-sm text-heading">{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tier 2: Breakout Interactivity ───────────────────── */}
      <div className="mx-auto max-w-7xl px-2 md:px-12 mt-16 mb-16">
        <FormsStateExplorer />
      </div>

    </section>
  );
}
