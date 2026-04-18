export function HeroForceVideo() {
  return (
    <section id="velocity" className="em-landing">
      {/* ── Narrative Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-16">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Execution Velocity
        </h2>
        <h3 className="mb-8 max-w-2xl font-serif text-3xl text-heading md:text-4xl">
          Zero developer dependency. Richer interactions.
        </h3>
        
        <div className="grid grid-cols-1 gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          {/* Narrative Column */}
          <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-subtle">
            <p>
              The go-to-market motion for HeroForce required a highly engaging acquisition surface, but core engineering cycles were locked. Relying on traditional development pipelines would have delayed the launch by over a month.
            </p>
            <p>
              By leveraging agentic AI workflows and strict design system tokens, we bypassed the engineering bottleneck entirely. We shipped a high-fidelity, interactive product page that drives higher user engagement, moving from concept to production in a fraction of the standard time.
            </p>
          </div>

          {/* Metrics Column */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">2 Weeks</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Time to launch (vs 6 weeks standard)</div>
            </div>
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">0</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Engineering dependencies</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── macOS Browser Breakout ───────────────────────────────────────── */}
      <div 
        className="w-[100vw] pt-0 pb-24 px-6 md:px-12 flex justify-center" 
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <div className="w-full max-w-7xl overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
          {/* macOS Title Bar */}
          <div className="flex h-12 items-center gap-2 border-b border-border bg-canvas px-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
          </div>
          
          {/* Looping YouTube Video */}
          <div className="relative aspect-video w-full bg-canvas">
            <iframe
              className="absolute inset-0 h-full w-full"
              src="https://www.youtube-nocookie.com/embed/Opg0W36HaKk?autoplay=1&mute=1&loop=1&playlist=Opg0W36HaKk&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1"
              allow="autoplay; encrypted-media"
              allowFullScreen={false}
              title="HeroForce demo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
