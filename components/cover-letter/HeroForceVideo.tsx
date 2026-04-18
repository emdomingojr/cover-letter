export function HeroForceVideo() {
  return (
    <section id="velocity" className="em-landing">
      {/* ── Narrative Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-16">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Designer-led Delivery
        </div>
        <h2 className="mb-8 max-w-2xl text-heading">
          Shipped without the handoff. Production code, faster.
        </h2>
        
        <div className="grid grid-cols-1 gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          {/* Narrative Column */}
          <div className="flex flex-col gap-4 text-subtle">
            <p>
              HeroForce needed a high-engagement launch page, but engineering was locked on core product cycles. A traditional design-to-dev handoff would have pushed launch by a month.
            </p>
            <p>
              The bet was that design system tokens plus AI prototyping could close the fidelity gap between design and dev — the gap that normally makes handoff so expensive. I designed the page in Figma, prototyped in v0, polished in Cursor, and shipped the production code directly using our existing tokens. Two weeks, concept to live. The page went out with the motion, interactions, and craft the brief asked for, without borrowing an engineering sprint to get there.
            </p>
          </div>

          {/* Metrics Column */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">2 Weeks</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Time to launch, vs 6 weeks standard</div>
            </div>
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">0</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Engineering sprints borrowed</div>
            </div>

            {/* Credits Strip */}
            <div className="mt-2 flex flex-col gap-4 border-t border-border/50 pt-6">
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">My Role</div>
                <div className="font-sans text-sm text-heading">Lead designer and shipping engineer — concept to production code</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Collaborators</div>
                <div className="font-sans text-sm text-heading">Product marketing, brand designer, [TODO: confirm — engineering reviewer?]</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Timeline</div>
                <div className="font-sans text-sm text-heading">2 weeks</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Tools</div>
                <div className="font-sans text-sm text-heading">Figma, v0, Cursor, Claude Code</div>
              </div>
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
