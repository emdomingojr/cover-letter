import { ClosingData } from "@/data/applications";

const iconProps = {
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ClosingCTA({ data }: { data: ClosingData }) {
  if (!data) return null;

  return (
    <section className="mx-auto max-w-5xl px-0 pt-32 pb-24 md:pt-32 md:pb-32">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-12 lg:gap-20">
        {/* ── Left: The Pitch ────────────────────────────────── */}
        <div className="flex flex-col gap-6 md:col-span-7">
          <div className="mb-[-1rem] font-mono text-xs uppercase tracking-widest text-muted">
            {data.eyebrow}
          </div>
          <h2 className="text-heading">
            {data.heading}
          </h2>
          {data.body.map((p, i) => (
            <p key={i} className={i === 0 ? "text-primary text-lg" : "text-subtle"}>
              {p}
            </p>
          ))}
        </div>

        {/* ── Right: The Contact Terminal ────────────────────── */}
        <aside className="md:col-span-5">
          <div className="bg-white border-border sticky top-32 flex flex-col gap-6 rounded-2xl border p-6 md:p-8">
            {/* Block 1: Profile */}
            <div>
              <h2 className="text-heading">
                Emerson Domingo Jr.
              </h2>
              <div className="text-muted mt-1 font-mono text-sm uppercase tracking-wider">
                Product Designer
              </div>
            </div>

            {/* Block 2: Direct Contact */}
            <ul className="border-border/50 flex flex-col gap-3 border-t pt-6">
              <li>
                <a
                  href="tel:+61414403069"
                  className="text-subtle hover:text-accent flex items-center gap-3 text-sm transition-colors duration-150"
                >
                  <svg {...iconProps} viewBox="0 0 24 24" className="text-muted">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+61 414 403 069</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:hi@emersonjr.com"
                  className="text-subtle hover:text-accent flex items-center gap-3 text-sm transition-colors duration-150"
                >
                  <svg {...iconProps} viewBox="0 0 24 24" className="text-muted">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span>hi@emersonjr.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/edomingojr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-subtle hover:text-accent flex items-center gap-3 text-sm transition-colors duration-150"
                >
                  <svg {...iconProps} viewBox="0 0 24 24" className="text-muted">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <span>LinkedIn</span>
                  <svg {...iconProps} viewBox="0 0 24 24" className="text-muted ml-auto" width={14} height={14}>
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </li>
            </ul>

            {/* Block 3: Primary Action */}
            <a
              href="https://calendar.app.google/6L9Y8a9pbqWAwrrg6"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent flex w-full items-center justify-center rounded-full py-4 text-center font-medium text-white transition-transform duration-150 hover:scale-[1.02]"
            >
              Schedule a chat
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
