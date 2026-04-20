export function HeroForceVideo() {
  return (
    <section id="velocity" className="em-landing">
      {/* ── Narrative Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-0 pt-0 pb-5 md:pb-12">
        <div className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
          Designer-led Delivery
        </div>
        <h2 className="mb-6 max-w-2xl text-heading">
          Shipped without the handoff. Production code, faster.
        </h2>

        <div className="grid grid-cols-1 gap-10 md:gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          {/* Narrative Column */}
          <div className="flex flex-col gap-4 text-subtle">
            <p>
              HeroForce needed a high-engagement launch page, but engineering was locked on core product cycles. A traditional design-to-dev handoff would have pushed launch by a month.
            </p>
            <p>
              The bet was that design system tokens plus AI prototyping could close the fidelity gap between design and dev — the gap that normally makes handoff so expensive. I designed and prototyped in v0 and Claude Code, polished in Figma, and shipped the production code directly using our existing tokens. Two weeks, concept to live. The page went out with the motion, interactions, and craft the brief asked for, without borrowing an engineering sprint to get there.
            </p>
          </div>

          {/* Metrics Column */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">2 Weeks</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Time to launch, vs 6 weeks standard</div>
            </div>
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">0</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Engineering sprints borrowed</div>
            </div>

            {/* Credits Strip */}
            <div className="mt-12 flex flex-col gap-6 border-t border-border/50 pt-6">
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">My Role</div>
                <div className="font-sans text-sm text-heading">Lead designer and shipping engineer: concept to production code</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Collaborators</div>
                <div className="font-sans text-sm text-heading">Product marketing, motion designer, content manager </div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Timeline</div>
                <div className="font-sans text-sm text-heading">2 weeks</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Tools</div>
                <div className="font-sans text-sm text-heading">Figma, v0, Claude Code</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── macOS Browser Breakout ───────────────────────────────────────── */}
      <div
        className="w-[100vw] pt-0 pb-32 px-2 md:px-12 flex justify-center mt-16"
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
    </section>
  );
}
