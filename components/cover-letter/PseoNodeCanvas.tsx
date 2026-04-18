"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionConfig, AnimatePresence, useDragControls } from "framer-motion";
import Image from "next/image";

const NODES = [
  { id: "hub", label: "Hub Page" },
  { id: "org", label: "Organisation Page" },
  { id: "position", label: "Position Page" },
] as const;

const NODE_W = 280;
const NODE_H = 238;

const IMAGE_MAP: Record<string, string> = {
  hub: "/cover-letter/images/pseo-1home.webp",
  org: "/cover-letter/images/pseo-3company-profile.webp",
  position: "/cover-letter/images/pseo-4job-listing.webp",
};

function NodeCard({ node, onHoverStart, onHoverEnd, onClick }: { node: typeof NODES[number], onHoverStart: () => void, onHoverEnd: () => void, onClick?: () => void }) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      onClick={onClick}
      className="flex-1 flex flex-col w-full h-full text-left cursor-pointer z-20 outline-none focus-visible:ring-2 focus-visible:ring-[#0094FF] rounded-xl"
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      draggable={false}
    >
      {/* Top Banner */}
      <div className="p-3 border-b border-border bg-canvas flex justify-between items-center transition-colors w-full">
        <p className="font-mono text-xs uppercase tracking-widest text-heading">{node.label}</p>
        <div className="w-2 h-2 rounded-full bg-heading" />
      </div>

      {/* Image Area */}
      <div className="flex-1 w-full relative bg-surface-2 overflow-hidden">
        {imgError ? (
          <div className="absolute inset-4 border-4 border-dashed border-border flex items-center justify-center font-mono text-xs text-muted text-center p-4">
            [ NATIVE CSS WIREFRAME ]<br />MISSING ASSET
          </div>
        ) : (
          <Image
            src={IMAGE_MAP[node.id] || "/cover-letter/images/pseo-1home.webp"}
            alt={node.label}
            fill
            className="object-cover pointer-events-none"
            onError={() => setImgError(true)}
            draggable={false}
          />
        )}
      </div>
    </button>
  );
}

function DraggableDesktopNode({
  node, x, y, canvasRef, onHoverStart, onHoverEnd, onClick
}: {
  node: typeof NODES[number],
  x: any,
  y: any,
  canvasRef: React.RefObject<HTMLDivElement | null>,
  onHoverStart: () => void,
  onHoverEnd: () => void,
  onClick: () => void
}) {
  const controls = useDragControls();
  const isDragging = useRef(false);

  return (
    <motion.div
      style={{ x, y, position: "absolute", top: 0, left: 0 }}
      className="h-[238px] w-[280px] bg-surface border border-border hover:border-accent rounded-xl shadow-sm z-10 flex flex-col grayscale hover:grayscale-0 transition-[filter,border-color] duration-150 overflow-hidden cursor-grab active:cursor-grabbing"
      drag
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={canvasRef}
      onPointerDown={(e) => controls.start(e)}
      onDragStart={() => { isDragging.current = true; }}
      onDragEnd={() => { setTimeout(() => { isDragging.current = false; }, 50); }}
      onClickCapture={(e) => {
        if (isDragging.current) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <NodeCard
        node={node}
        onHoverStart={onHoverStart}
        onHoverEnd={onHoverEnd}
        onClick={() => {
          if (!isDragging.current) onClick();
        }}
      />
    </motion.div>
  );
}

export function PseoNodeCanvas() {
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Custom Cursor state
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const smoothCursorX = useSpring(cursorX, { stiffness: 300, damping: 20, mass: 0.5 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 300, damping: 20, mass: 0.5 });

  useEffect(() => {
    setIsMounted(true);
    const checkWidth = () => setIsDesktop(window.innerWidth >= 768);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    const updateMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX + 15);
      cursorY.set(e.clientY + 15);
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, [isDesktop, cursorX, cursorY]);

  // Body Lock & Escape Key
  useEffect(() => {
    if (activeNode) {
      document.body.style.overflow = "hidden";
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") setActiveNode(null);
      };
      window.addEventListener("keydown", handleEscape);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleEscape);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeNode]);

  // Derived motion values
  const x1 = useMotionValue(50);
  const y1 = useMotionValue(100);
  const x2 = useMotionValue(450);
  const y2 = useMotionValue(250);
  const x3 = useMotionValue(850);
  const y3 = useMotionValue(150);

  const path1 = useTransform(() => {
    const sx = x1.get() + NODE_W;
    const sy = y1.get() + 119;
    const ex = x2.get();
    const ey = y2.get() + 119;
    const cx = (sx + ex) / 2;
    return `M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ey}, ${ex} ${ey}`;
  });

  const path2 = useTransform(() => {
    const sx = x2.get() + NODE_W;
    const sy = y2.get() + 119;
    const ex = x3.get();
    const ey = y3.get() + 119;
    const cx = (sx + ex) / 2;
    return `M ${sx} ${sy} C ${cx} ${sy}, ${cx} ${ey}, ${ex} ${ey}`;
  });

  const canvasRef = useRef<HTMLDivElement>(null);

  const nodePositions = [
    { x: x1, y: y1 },
    { x: x2, y: y2 },
    { x: x3, y: y3 },
  ];

  return (
    <section id="pseo" className="em-landing">
      {/* ── Magnetic Cursor Badge ────────────────────────────────────────── */}
      {isMounted && isDesktop && !activeNode && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center px-3 py-1.5 rounded-full bg-heading text-surface font-mono text-xs shadow-md transition-opacity duration-300"
          style={{ x: smoothCursorX, y: smoothCursorY, opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
        >
          View Step
        </motion.div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-0 md:px-6 pt-24 pb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          Acquisition Architecture
        </h2>
        <h3 className="mb-8 max-w-2xl font-serif text-3xl text-heading md:text-4xl">
          Scaling organic traffic via a connected page system.
        </h3>

        <div className="grid grid-cols-1 gap-12 border-t border-border pt-8 md:grid-cols-[1fr_300px]">
          {/* Narrative Column */}
          <div className="flex flex-col gap-4 font-sans text-base leading-relaxed text-subtle">
            <p>
              Employment Hero needed to compete for job-seeker traffic monopolised by incumbents like Seek and Indeed. Out-bidding them on paid search was financially unsustainable. The strategy was to build a parallel acquisition channel. We designed a programmatic SEO system capable of generating thousands of highly targeted landing pages without manual engineering overhead.
            </p>
            <p>
              The architecture funnels broad search intent through four tiers. Local hub pages catch the widest discovery traffic and route them down. Role-specific pages narrow the intent. Employer profiles build company trust. Position pages close the loop into an application. One template system, thousands of pages, each one ranking on as many queries.
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
          </div>
        </div>
      </div>

      {/* ── Canvas ───────────────────────────────────────────────────────── */}
      {isMounted && isDesktop ? (
        <div className="w-[100vw] mt-8 border-y border-border" style={{ marginLeft: "calc(50% - 50vw)" }}>
          <div
            ref={canvasRef}
            className="w-full h-[700px] bg-surface-2 relative overflow-hidden"
            style={{
              backgroundImage: [
                "repeating-linear-gradient(rgb(var(--color-border) / 0.4) 0 1px, transparent 1px 100%)",
                "repeating-linear-gradient(90deg, rgb(var(--color-border) / 0.4) 0 1px, transparent 1px 100%)",
              ].join(", "),
              backgroundSize: "32px 32px",
            }}
          >
            {/* SVG Connectors */}
            <svg className="absolute inset-0 z-0 min-w-full min-h-full pointer-events-none" aria-hidden>
              <defs>
                <marker id="workflow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgb(var(--color-border-hover))" />
                </marker>
              </defs>
              <motion.path
                d={path1}
                stroke="rgb(var(--color-border-hover) / 0.6)"
                strokeWidth="1"
                fill="none"
                markerEnd="url(#workflow-arrow)"
              />
              <motion.path
                d={path2}
                stroke="rgb(var(--color-border-hover) / 0.6)"
                strokeWidth="1"
                fill="none"
                markerEnd="url(#workflow-arrow)"
              />
            </svg>

            {/* Draggable Nodes */}
            {NODES.map((node, i) => (
              <DraggableDesktopNode
                key={node.id}
                node={node}
                x={nodePositions[i].x}
                y={nodePositions[i].y}
                canvasRef={canvasRef}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
                onClick={() => setActiveNode(node.id)}
              />
            ))}
          </div>
        </div>
      ) : isMounted && !isDesktop ? (
        /* ── Mobile Fallback ─────────────────────────────────────────────── */
        <MotionConfig reducedMotion="user">
          <div
            className="w-[100vw] h-[300px] bg-surface-2 relative flex flex-row overflow-x-auto snap-x snap-mandatory px-0 gap-4 border-y border-border items-center mt-8"
            style={{ marginLeft: "calc(50% - 50vw)" }}
          >
            {NODES.map((node) => (
              <div
                key={node.id}
                className="rounded-xl min-w-[280px] h-[238px] snap-center bg-surface border border-border flex flex-col overflow-hidden"
              >
                <NodeCard
                  node={node}
                  onHoverStart={() => { }}
                  onHoverEnd={() => { }}
                  onClick={() => setActiveNode(node.id)}
                />
              </div>
            ))}
          </div>
        </MotionConfig>
      ) : null}

      {/* ── Lightbox Overlay ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-[1000] bg-canvas/95 backdrop-blur-md overflow-y-auto flex justify-center items-start p-4 md:p-12"
            onClick={(e) => {
              if (e.target === e.currentTarget) setActiveNode(null);
            }}
          >
            <button
              onClick={() => setActiveNode(null)}
              className="fixed top-6 right-6 md:top-8 md:right-8 z-[1010] p-4 bg-surface border border-border rounded-full text-primary hover:border-accent hover:text-accent transition-colors"
              aria-label="Close full preview"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="relative w-full max-w-5xl mt-16 md:mt-0 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden"
            >
              <Image
                src={IMAGE_MAP[activeNode as keyof typeof IMAGE_MAP] || "/cover-letter/images/pseo-1home.webp"}
                alt={`Full preview of ${activeNode} page`}
                width={1024}
                height={2000}
                className="w-full h-auto block"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
