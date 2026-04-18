"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Resolving missing heroicons gracefully by declaring immutable inline SVGs
const MagnifyingGlassIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const XMarkIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

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

export function PseoInteractiveFlowchart() {
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

    const buildPath = (start: {x: number, y: number}, end: {x: number, y: number}) => {
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

  // Modal Render Sequence Blocking
  useEffect(() => {
    if (activeLightboxNode !== null) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveLightboxNode(null);
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleEsc);
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [activeLightboxNode]);

  const NodeHoverAffordance = () => (
    <div className="absolute inset-0 bg-surface-2/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 z-20">
      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent flex items-center justify-center">
        <MagnifyingGlassIcon className="w-5 h-5 text-accent" />
      </div>
      <span className="font-mono text-xs font-medium tracking-wide text-heading">Click to expand</span>
    </div>
  );

  return (
    <section id="pseo-flowchart" className="em-landing">
      {/* ── Narrative Header (Strict 5xl Container) ──────────────────────── */}
      <div className="mx-auto max-w-5xl px-6 pt-8 pb-16">
        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Acquisition Architecture
        </div>
        <h2 className="mb-8 max-w-2xl text-heading">
          Scaling organic traffic via a connected page system.
        </h2>
        
        <div className="grid grid-cols-1 gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          {/* Narrative Column */}
          <div className="flex flex-col gap-4 text-subtle">
            <p>
              Employment Hero needed to compete for job-seeker traffic monopolised by Seek and Indeed. Out-bidding them on paid search was financially unsustainable, so I worked with our PM to build a parallel acquisition channel — a programmatic SEO system that could generate thousands of highly targeted landing pages without manual engineering overhead.
            </p>
            <p>
              The insight was that scale, not craft-per-page, was the competitive lever here. Incumbents own the obvious queries; the long-tail is unguarded. The architecture I designed filters broad search intent down through three template tiers: category-level hub pages capture discovery traffic, dedicated employer brand templates route users toward specific companies, and hyper-specific position pages close the loop into direct applications. One template system, thousands of pages, each one earning its rank on a query Seek and Indeed aren't optimising for.
            </p>
          </div>

          {/* Metrics Column */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">12,000+</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Indexed pages</div>
            </div>
            <div>
              <div className="font-display-mono text-3xl font-semibold tabular-nums text-heading">300%</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">Lift in organic acquisition</div>
            </div>

            {/* Credits Strip */}
            <div className="mt-2 flex flex-col gap-4 border-t border-border/50 pt-6">
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">My Role</div>
                <div className="font-sans text-sm text-heading">Lead product designer — system design, templates, dev handoff</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Collaborators</div>
                <div className="font-sans text-sm text-heading">Product manager, engineering lead, [TODO: confirm — SEO specialist?]</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Timeline</div>
                <div className="font-sans text-sm text-heading">[TODO: confirm — 8 weeks?]</div>
              </div>
              <div>
                <div className="mb-1 font-mono text-[10px] uppercase tracking-widest text-muted">Tools</div>
                <div className="font-sans text-sm text-heading">Figma, design tokens, Notion</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dynamic Layout Envelope (Viewport Breakout) ──────────────────── */}
      <div ref={containerRef} className="relative w-[100vw] left-1/2 -translate-x-1/2 px-4 md:px-12 lg:px-24 pb-24">
        
        {/* Dynamic SVG Connectors */}
        {isMounted && lineCoords && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
            <path d={lineCoords.node1ToNode2} fill="none" stroke="#CBD5E1" strokeWidth="2" />
            <path d={lineCoords.node2ToNode3} fill="none" stroke="#CBD5E1" strokeWidth="2" />
            <path d={lineCoords.node2ToNode4} fill="none" stroke="#CBD5E1" strokeWidth="2" />
          </svg>
        )}

        {/* 3-Column Component Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 relative z-10 w-full">
          
          {/* Column 1: Local Hub Node */}
          <div className="flex flex-col items-start justify-center">
            <div ref={node1Ref} className="bg-surface border border-border rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[280px]">
              <div className="font-mono text-xs uppercase text-muted mb-3">Node 1: Local Hub</div>
              <button 
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-2 border border-border w-full cursor-pointer"
                onClick={() => setActiveLightboxNode(1)}
              >
                <Image src="/cover-letter/images/pseo-1home.webp" alt="PSEO Hub Matrix" fill className="object-cover object-top" unoptimized />
                <NodeHoverAffordance />
              </button>
            </div>
          </div>

          {/* Column 2: Search Intent Engine (Static Base Canvas) */}
          <div className="flex flex-col items-center justify-center relative z-10">
            <div ref={node2Ref} className="bg-surface border border-border rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[320px] flex flex-col gap-4">
              <div className="font-mono text-xs uppercase text-muted">Node 2: Search Intent</div>
              <button 
                className="group relative aspect-square rounded-lg overflow-hidden bg-surface-2 border border-border w-full cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveLightboxNode(2)}
              >
                <Image 
                  src="/cover-letter/images/pseo-2search-results.webp" 
                  alt="Search Engine State Payload" 
                  fill 
                  className="object-cover object-top" 
                  unoptimized
                />
                <NodeHoverAffordance />
              </button>
            </div>
          </div>

          {/* Column 3: Splitter Track (Profile & Target) */}
          <div className="flex flex-col items-end justify-between gap-12 lg:gap-32 py-8">
            <div ref={node3Ref} className="bg-surface border border-border rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[280px]">
              <div className="font-mono text-xs uppercase text-muted mb-3">Node 3: Employer Profile</div>
              <button 
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-2 border border-border w-full cursor-pointer"
                onClick={() => setActiveLightboxNode(3)}
              >
                <Image src="/cover-letter/images/pseo-3company-profile.webp" alt="Employer Geometry" fill className="object-cover object-top" unoptimized />
                <NodeHoverAffordance />
              </button>
            </div>

            <div ref={node4Ref} className="bg-surface border border-border rounded-2xl shadow-sm p-4 relative z-10 w-full max-w-[280px]">
              <div className="font-mono text-xs uppercase text-muted mb-3">Node 4: Position App</div>
              <button 
                className="group relative aspect-[4/3] rounded-lg overflow-hidden bg-surface-2 border-l-2 border-accent w-full cursor-pointer"
                onClick={() => setActiveLightboxNode(4)}
              >
                <Image src="/cover-letter/images/pseo-4job-listing.webp" alt="Target Position Matrix" fill className="object-cover object-top" unoptimized />
                <NodeHoverAffordance />
              </button>
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
