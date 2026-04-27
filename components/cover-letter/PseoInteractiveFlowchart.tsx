"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CaseStudyData } from "@/data/applications";
import Image from "next/image";

// Resolving missing heroicons gracefully by declaring immutable inline SVGs
type SearchState = "default" | "unselected" | "empty";

const NODE2_ASSETS: Record<SearchState, string> = {
  default: "/cover-letter/images/pseo-2search-results.webp",
  unselected: "/cover-letter/images/pseo-2a-search-results-unselected.webp",
  empty: "/cover-letter/images/pseo-2b-search-results-empty-state.webp",
};

interface LineCoords {
  node1ToNode2: string;
  node2ToNode3: string;
  node2ToNode4: string;
}

export function PseoInteractiveFlowchart({ data }: { data: CaseStudyData }) {
  if (!data) return null;

  const [isMounted, setIsMounted] = useState(false);
  const [activeLightboxNode, setActiveLightboxNode] = useState<number | null>(null);
  const [node2State, setNode2State] = useState<SearchState>("default");
  const [lineCoords, setLineCoords] = useState<LineCoords | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const node1Ref = useRef<HTMLDivElement>(null);
  const node2Ref = useRef<HTMLDivElement>(null);
  const node3Ref = useRef<HTMLDivElement>(null);
  const node4Ref = useRef<HTMLDivElement>(null);

  // SSR Shield Execution
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Geometry Engine for Dynamic Connectivity Tracking
  const calculateLines = useCallback(() => {
    if (!containerRef.current || !node1Ref.current || !node2Ref.current || !node3Ref.current || !node4Ref.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();

    const getRelativeCoords = (elRef: React.RefObject<HTMLDivElement | null>, anchor: "right" | "left") => {
      const rect = elRef.current!.getBoundingClientRect();
      const xOffset = anchor === "right" ? rect.right : rect.left;

      return {
        x: xOffset - containerRect.left,
        y: rect.top + rect.height / 2 - containerRect.top
      };
    };

    const n1 = getRelativeCoords(node1Ref, "right");
    const n2Left = getRelativeCoords(node2Ref, "left");
    const n2Right = getRelativeCoords(node2Ref, "right");
    const n3 = getRelativeCoords(node3Ref, "left");
    const n4 = getRelativeCoords(node4Ref, "left");

    const buildPath = (start: { x: number, y: number }, end: { x: number, y: number }) => {
      const dx = end.x - start.x;
      const cp1x = start.x + dx * 0.5;
      const cp2x = end.x - dx * 0.5;
      return `M ${start.x} ${start.y} C ${cp1x} ${start.y}, ${cp2x} ${end.y}, ${end.x} ${end.y}`;
    };

    setLineCoords({
      node1ToNode2: buildPath(n1, n2Left),
      node2ToNode3: buildPath(n2Right, n3),
      node2ToNode4: buildPath(n2Right, n4)
    });
  }, []);

  // Structural Resize Monitor
  useEffect(() => {
    if (!isMounted || !containerRef.current) return;

    calculateLines();

    const observer = new ResizeObserver(() => {
      requestAnimationFrame(calculateLines);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isMounted, calculateLines]);



  const XMarkIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );

  return (
    <section id="pseo-flowchart" className="py-8">
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

      {/* ── Tier 2: Dynamic Layout Envelope (Viewport Breakout) ─ */}
      <div ref={containerRef} className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-16 mb-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          {/* Dynamic SVG Connectors */}
          {isMounted && lineCoords && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block text-slate-300">
              <defs>
                <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                  <circle cx="5" cy="5" r="4" fill="currentColor" />
                </marker>
                <marker id="chevron" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                  <path d="M 2 2 L 8 5 L 2 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
              </defs>
              <path d={lineCoords.node1ToNode2} fill="none" stroke="currentColor" strokeWidth="2" markerStart="url(#dot)" markerEnd="url(#chevron)" />
              <path d={lineCoords.node2ToNode3} fill="none" stroke="currentColor" strokeWidth="2" markerStart="url(#dot)" markerEnd="url(#chevron)" />
              <path d={lineCoords.node2ToNode4} fill="none" stroke="currentColor" strokeWidth="2" markerStart="url(#dot)" markerEnd="url(#chevron)" />
            </svg>
          )}

          {/* 3-Column Component Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full relative z-10 md:items-start gap-12 md:gap-0">
            {/* Column 1: Local Hub Node */}
            <div className="flex flex-col items-start justify-start md:justify-self-start">
              <div 
                ref={node1Ref} 
                onClick={() => setActiveLightboxNode(1)}
                className="bg-white border border-border/50 rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[420px] group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="font-mono text-xs uppercase text-muted">Node 1: Local Hub</div>
                </div>
                <div className="relative w-full max-h-[32rem] overflow-hidden rounded-lg bg-surface-2 border border-border">
                  <Image src="/cover-letter/images/pseo-1home.webp" alt="PSEO Hub Matrix" width={1440} height={1080} className="w-full h-auto block object-top" unoptimized />
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between w-full text-accent font-medium text-[10px] sm:text-xs transition-opacity duration-200 group-hover:opacity-80">
                  <span>See design detail</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 2: Search Intent Engine (Static Base Canvas) */}
            <div className="flex flex-col items-center justify-start relative z-10 md:justify-self-center">
              <div 
                ref={node2Ref} 
                onClick={() => setActiveLightboxNode(2)}
                className="bg-white border border-border/50 rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[420px] group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="font-mono text-xs uppercase text-muted">Node 2: Search Intent</div>
                </div>
                <div className="relative w-full max-h-[32rem] overflow-hidden rounded-lg bg-surface-2 border border-border">
                  <Image
                    src="/cover-letter/images/pseo-2search-results.webp"
                    alt="Search Engine State Payload"
                    width={1440} height={1080}
                    className="w-full h-auto block object-top"
                    unoptimized
                  />
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between w-full text-accent font-medium text-[10px] sm:text-xs transition-opacity duration-200 group-hover:opacity-80">
                  <span>See design detail</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 3: Splitter Track (Profile & Target) */}
            <div className="flex flex-col items-end justify-start gap-6 md:gap-32 md:justify-self-end">
              <div 
                ref={node3Ref} 
                onClick={() => setActiveLightboxNode(3)}
                className="bg-white border border-border/50 rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[420px] group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="font-mono text-xs uppercase text-muted">Node 3: Employer Profile</div>
                </div>
                <div className="relative w-full max-h-[32rem] overflow-hidden rounded-lg bg-surface-2 border border-border">
                  <Image src="/cover-letter/images/pseo-3company-profile.webp" alt="Employer Geometry" width={1440} height={1080} className="w-full h-auto block object-top" unoptimized />
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between w-full text-accent font-medium text-[10px] sm:text-xs transition-opacity duration-200 group-hover:opacity-80">
                  <span>See design detail</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div 
                ref={node4Ref} 
                onClick={() => setActiveLightboxNode(4)}
                className="bg-white border border-border/50 rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[420px] group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <div className="font-mono text-xs uppercase text-muted">Node 4: Position App</div>
                </div>
                <div className="relative w-full max-h-[32rem] overflow-hidden rounded-lg bg-surface-2 border-l-2 border-accent">
                  <Image src="/cover-letter/images/pseo-4job-listing.webp" alt="Target Position Matrix" width={1440} height={1080} className="w-full h-auto block object-top" unoptimized />
                  <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                </div>
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between w-full text-accent font-medium text-[10px] sm:text-xs transition-opacity duration-200 group-hover:opacity-80">
                  <span>See design detail</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* ── High-Fidelity Lightbox Overlay (Internal State Mapping) ──────── */}
      {isMounted && (
        <AnimatePresence>
          {activeLightboxNode !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[9999] bg-surface-2/95 backdrop-blur-md flex flex-col items-center justify-center p-4 md:p-12"
              onClick={() => setActiveLightboxNode(null)}
            >
              <button
                onClick={() => setActiveLightboxNode(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center shadow-lg hover:bg-canvas transition-colors z-50"
                aria-label="Close UI Modal"
              >
                <XMarkIcon className="w-5 h-5 text-muted" />
              </button>

              <div
                className="relative w-full max-w-5xl h-[85vh] rounded-2xl overflow-hidden border border-border shadow-2xl bg-canvas flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative flex-1 overflow-x-hidden overflow-y-auto bg-surface-2 p-0">
                  <div className="w-full mx-auto relative origin-top">
                    <AnimatePresence mode="wait">
                      {/* Render standard nodes vs state-driven Node 2 */}
                      {activeLightboxNode === 1 && <motion.div key={1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><Image src="/cover-letter/images/pseo-1home.webp" alt="Home Node" width={1440} height={4000} className="w-full h-auto block" unoptimized /></motion.div>}
                      {activeLightboxNode === 3 && <motion.div key={3} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><Image src="/cover-letter/images/pseo-3company-profile.webp" alt="Employer Node" width={1440} height={4000} className="w-full h-auto block" unoptimized /></motion.div>}
                      {activeLightboxNode === 4 && <motion.div key={4} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><Image src="/cover-letter/images/pseo-4job-listing.webp" alt="Target Node" width={1440} height={4000} className="w-full h-auto block" unoptimized /></motion.div>}

                      {activeLightboxNode === 2 && (
                        <motion.div
                          key={node2State}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="w-full relative"
                        >
                          <Image
                            src={NODE2_ASSETS[node2State]}
                            alt={`Modal Vector Navigation: ${node2State}`}
                            width={1440}
                            height={4000}
                            className="w-full h-auto block"
                            unoptimized
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Lightbox Node 2 Specific Mechanics (Rendered at internal base) */}
                {activeLightboxNode === 2 && (
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface border border-border p-1 rounded-full flex shadow-xl">
                    {(["default", "unselected", "empty"] as SearchState[]).map((state) => (
                      <button
                        key={state}
                        onClick={() => setNode2State(state)}
                        className="relative px-4 py-2 font-mono text-[10px] tracking-wide rounded-full z-10 transition-colors"
                      >
                        {node2State === state && (
                          <motion.div
                            layoutId="searchStatePill"
                            transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                            className="absolute inset-0 bg-canvas shadow-sm rounded-full -z-10"
                          />
                        )}
                        <span className={node2State === state ? "text-heading" : "text-subtle hover:text-muted"}>
                          {state.charAt(0).toUpperCase() + state.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
}
