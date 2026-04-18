"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export function PricingMatrixReveal() {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
    mass: 0.1
  });

  const panY = useTransform(smoothProgress, [0, 1], ["0%", "-50%"]);
  const clipPath = useTransform(smoothProgress, [0.3, 0.7], ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]);
  const beforeOpacity = useTransform(smoothProgress, [0.4, 0.5], [1, 0]);
  const afterOpacity = useTransform(smoothProgress, [0.5, 0.6], [0, 1]);

  return (
    <section id="pricing-reveal" className="em-landing">
      {/* ── Narrative Header ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pt-16 pb-16">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Information Architecture
        </h2>
        <h3 className="mb-8 max-w-2xl font-serif text-3xl text-heading md:text-4xl">
          Solving analysis paralysis.
        </h3>
        
        <div className="grid grid-cols-1 gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-subtle">
            <p>
              The original Employment Hero pricing matrix presented a flat wall of 100+ features. Bottom-of-funnel plan selection suffered; visitors stalled at the comparison.
            </p>
            <p>
              The insight was that visitors weren't asking "what do you cost" — they were asking "is this for me." A feature-by-feature comparison answers the first question. It doesn't help with the second. I restructured the data into a three-level taxonomy with progressive disclosure, reframing the table as a decision engine: pick your team size, see the answer, go. The structural clarity produced a 96% lift in demo requests and pushed the funnel 120% past its CVR goal.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">+96%</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Lift in demo requests</div>
            </div>
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">120%</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Of CVR goal achieved</div>
            </div>

            {/* Credits Strip */}
            <div className="mt-2 flex flex-col gap-4 border-t border-border/50 pt-6">
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">My Role</div>
                <div className="font-sans text-sm text-heading">Lead product designer — research, IA, visual design, A/B test</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Collaborators</div>
                <div className="font-sans text-sm text-heading">Product manager, [TODO: confirm — growth/CRO partner?], 1 engineer</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Timeline</div>
                <div className="font-sans text-sm text-heading">[TODO: confirm — 4 weeks?]</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Tools</div>
                <div className="font-sans text-sm text-heading">Figma, [TODO: confirm experimentation tool — Optimizely? VWO?]</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Cinematic Sandbox (Full Viewport Takeover) ─────────────────── */}
      <div 
        ref={containerRef} 
        className="h-[250vh] w-[100vw] relative"
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <div className="sticky top-0 h-screen w-full bg-canvas flex items-center justify-center px-4 md:px-0">
          
          {/* ── Massive macOS Window ─────────────────────────────────────── */}
          <div className="w-full md:w-[92vw] max-w-7xl h-[85vh] md:h-[90vh] min-h-[500px] rounded-2xl border border-border shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)] bg-canvas flex flex-col relative overflow-hidden">
            
            {/* The Chrome Bar */}
            <div className="h-12 border-b border-border bg-surface flex items-center px-4 shrink-0 relative">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              
              <div className="absolute left-1/2 -translate-x-1/2 w-full max-w-[200px] md:max-w-sm h-7 bg-surface-2 rounded-md flex items-center justify-center border border-border">
                <span className="font-mono text-[10px] text-muted">emersonjr.com/ia-simulator</span>
              </div>
            </div>

            {/* The Visual Assets & Wipe Mechanic */}
            <div className="flex-1 relative bg-canvas overflow-hidden">
              {/* Base Layer (Old Pricing) */}
              <div className="absolute inset-0">
                <motion.img 
                  style={{ y: panY }} 
                  src="/1pricing-old.webp" 
                  alt="Old pricing matrix"
                  className="w-full h-auto absolute top-0 left-0 origin-top"
                />
              </div>

              {/* Reveal Layer (New Pricing with Wipe) */}
              {isMounted && (
                <motion.div 
                  style={{ clipPath }} 
                  className="absolute inset-0 z-10"
                >
                  <motion.img 
                    style={{ y: panY }} 
                    src="/2pricing-new.webp" 
                    alt="New structured pricing matrix"
                    className="w-full h-auto absolute top-0 left-0 origin-top"
                  />
                </motion.div>
              )}
            </div>

            {/* The Floating Status Pill (Preventing Layout Shift) */}
            {isMounted && (
              <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md border border-border shadow-xl rounded-full h-10 w-[240px] flex items-center justify-center z-50">
                
                {/* Before Text */}
                <motion.div style={{ opacity: beforeOpacity }} className="absolute flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <span className="font-mono text-xs text-subtle">Flat Architecture (Before)</span>
                </motion.div>

                {/* After Text */}
                <motion.div style={{ opacity: afterOpacity }} className="absolute flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="font-mono text-xs text-heading">Structured Taxonomy (After)</span>
                </motion.div>

              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}
