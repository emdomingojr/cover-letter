import { CaseStudyData } from "@/data/applications";
import { FormsStateExplorer } from "./FormsStateExplorer";

export function FormsCaseStudy({ data }: { data: CaseStudyData }) {
  if (!data) return null;

  return (
    <section id="forms" className="em-landing">
      {/* ── Narrative Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-0 pt-0 pb-5 md:pb-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          {data.eyebrow}
        </div>
        <h2 className="mb-6 max-w-2xl text-heading">
          {data.heading}
        </h2>

        <div className="grid grid-cols-1 gap-10 md:gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          {/* Narrative Column */}
          <div className="flex flex-col gap-4 text-subtle">
            {data.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Metrics Column */}
          <div className="flex flex-col gap-8">
            {data.stats.map((stat, i) => (
              <div key={i}>
                <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">{stat.value}</div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">{stat.label}</div>
              </div>
            ))}

            {/* Credits Strip */}
            <div className="mt-12 flex flex-col gap-6 border-t border-border/50 pt-6">
              {data.meta.map((m, i) => (
                <div key={i}>
                  <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">{m.label}</div>
                  <div className="font-sans text-sm text-heading">{m.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Breakout Interactivity ──────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-0">
        <FormsStateExplorer />
      </div>
    </section>
  );
}
