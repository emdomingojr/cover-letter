"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { CaseStudyData } from "@/data/applications";

export function PricingMatrixReveal({ data }: { data: CaseStudyData }) {
  if (!data) return null;

  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
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
    <section id="pricing-reveal" className="py-16 md:py-32">
      {/* ── Tier 1: Narrative & Impact ───────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 md:px-0">
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

      {/* ── Tier 2: Cinematic Sandbox (Full Viewport Takeover) ── */}
      <div
        ref={containerRef}
        className="h-[250vh] w-[100vw] relative mt-16 mb-16"
        style={{ marginLeft: "calc(50% - 50vw)" }}
      >
        <div className="sticky top-0 h-screen w-full bg-canvas flex items-center justify-center px-2 md:px-0">

            {/* ── Massive macOS Window ─────────────────────────────────────── */}
            <div className="w-full max-w-7xl h-auto md:h-[80vh] rounded-2xl border border-border bg-canvas flex flex-col relative overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.3)]">

              {/* The Chrome Bar */}
              <div className="h-8 md:h-12 border-b border-border bg-surface flex items-center px-4 shrink-0 relative">
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
              <div className="flex-1 relative bg-canvas overflow-hidden flex flex-col">
                
                {/* Invisible layout placeholder to force native image height on mobile */}
                <img 
                  src="/cover-letter/1pricing-old.webp" 
                  className="w-full h-auto opacity-0 pointer-events-none block md:hidden" 
                  alt="" 
                  aria-hidden="true" 
                />

                {/* Base Layer (Old Pricing) */}
                <div className="absolute inset-0">
                  <motion.img
                    style={{ y: isMobile ? "0%" : panY }}
                    src="/cover-letter/1pricing-old.webp"
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
                      style={{ y: isMobile ? "0%" : panY }}
                      src="/cover-letter/2pricing-new.webp"
                      alt="New structured pricing matrix"
                      className="w-full h-auto absolute top-0 left-0 origin-top"
                    />
                  </motion.div>
                )}
              </div>

              {/* The Floating Status Pill (Preventing Layout Shift) */}
              {isMounted && (
                <div className="absolute top-12 md:top-20 left-1/2 -translate-x-1/2 bg-surface/90 backdrop-blur-md border border-border shadow-xl rounded-full h-10 w-[240px] flex items-center justify-center z-50">

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
