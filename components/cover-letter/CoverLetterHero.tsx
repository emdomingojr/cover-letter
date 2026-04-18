"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Constants ─────────────────────────────────────────────────────────────────
const CARD_W  = 300;
const CARD_H  = CARD_W * (9 / 16) + 48; // 16:9 image + label row
const LERP    = 0.12;
const OX      = 40;  // card x-offset from cursor
const OY      = 40;  // card y-offset from cursor
const SHOW_MS = 250; // delay before card appears
const HIDE_MS = 80;  // grace period after leave

// ── Token data ────────────────────────────────────────────────────────────────
const tokens = [
  {
    id: 0,
    text:  "scale organic traffic",
    image: "/cover-letter/images/pseo-2search-results.webp",
    label: "+96% DEMO REQUESTS",
    href:  "#pseo-flowchart",
  },
  {
    id: 1,
    text:  "tighten design systems",
    image: "https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/69258161486026ce196d6839_DSystem-Guardrails.png",
    label: "3X FASTER BUILDS",
    href:  "https://www.emersonjr.com/work/eos-design-system",
  },
  {
    id: 2,
    text:  "reduce cognitive load",
    image: "/cover-letter/2pricing-new.webp",
    label: "120% CVR ACHIEVED",
    href:  "#pricing-reveal",
  },
  {
    id: 3,
    text:  "ship via designer-led code",
    image: "https://player.vimeo.com/video/1184361384?autoplay=1&muted=1&loop=1&background=1",
    label: "SHIPPED WITHOUT HANDOFF",
    href:  "#velocity",
  },
] as const;

// ── h1 content — flat alternation of plain text and token ids ─────────────────
// Defined outside the component; never mutates, so no extra render cost.
type Part =
  | { type: "text";  content: string }
  | { type: "token"; id: number };

const PARTS: Part[] = [
  { type: "text",  content: "Designing acquisition surfaces that " },
  { type: "token", id: 0 },
  { type: "text",  content: ", " },
  { type: "token", id: 1 },
  { type: "text",  content: ", " },
  { type: "token", id: 2 },
  { type: "text",  content: ", and " },
  { type: "token", id: 3 },
  { type: "text",  content: "." },
];

// ── Component ─────────────────────────────────────────────────────────────────
export function CoverLetterHero() {
  // ── State ───────────────────────────────────────────────────────────────────
  // Single integer ID — the only thing event handlers write to.
  const [activeId,       setActiveId]       = useState<number | null>(null);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewLabel,   setPreviewLabel]   = useState<string>(tokens[0].label);
  const [previewSrc,     setPreviewSrc]     = useState<string>(tokens[0].image);
  const [imgFailed,      setImgFailed]      = useState(false);
  const [isTouch,        setIsTouch]        = useState(false);
  const [reducedMotion,  setReducedMotion]  = useState(false);
  const [traceRect, setTraceRect] = useState<{
    left: number; top: number; width: number; height: number;
  } | null>(null);

  // ── Refs ─────────────────────────────────────────────────────────────────────
  const h1Ref    = useRef<HTMLHeadingElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);

  // Cursor position (updated on pointermove — not state, no re-renders)
  const cursorRef = useRef({ x: 0, y: 0 });

  // RAF lerp
  const rafRef    = useRef<number | null>(null);
  const lerpPos   = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });

  // Ref mirrors so timer callbacks read current values without stale closures
  const visibleRef       = useRef(false);
  const reducedMotionRef = useRef(false);

  // Show / hide timers
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // One ref per token for getBoundingClientRect in trace / SVG
  const tokenRefs  = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeIdRef = useRef<number | null>(null);
  const svgPathRef  = useRef<SVGPathElement | null>(null);

  // ── Helpers ──────────────────────────────────────────────────────────────────

  function applyTransform(x: number, y: number) {
    if (cardRef.current) cardRef.current.style.transform = `translate(${x}px,${y}px)`;
  }

  // Clamp card so it never overflows the viewport edge.
  function clamp(cx: number, cy: number) {
    let x = cx + OX;
    let y = cy + OY;
    if (x + CARD_W > window.innerWidth  - 16) x = cx - CARD_W - OX;
    if (y + CARD_H > window.innerHeight - 16) y = cy - CARD_H - OY;
    return { x, y };
  }

  // Reduced-motion fallback: place card just below the h1.
  function h1Below() {
    if (!h1Ref.current) return { x: 0, y: 0 };
    const r = h1Ref.current.getBoundingClientRect();
    return { x: r.left, y: r.bottom + 16 };
  }

  // SVG bezier from token centre → cursor, called from RAF tick.
  function updateSvgPath() {
    if (!svgPathRef.current) return;
    const id = activeIdRef.current;
    if (id === null) { svgPathRef.current.setAttribute("d", ""); return; }
    const el = tokenRefs.current[id];
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const mx = cursorRef.current.x;
    const my = cursorRef.current.y;
    svgPathRef.current.setAttribute(
      "d",
      `M ${cx} ${cy} Q ${(cx + mx) / 2} ${(cy + my) / 2 - 40} ${mx} ${my}`,
    );
  }

  function startRaf() {
    if (rafRef.current !== null) return;
    function tick() {
      const lp = lerpPos.current, tp = targetPos.current;
      lp.x += (tp.x - lp.x) * LERP;
      lp.y += (tp.y - lp.y) * LERP;
      applyTransform(lp.x, lp.y);
      updateSvgPath();
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
  }

  function stopRaf() {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (svgPathRef.current) svgPathRef.current.setAttribute("d", "");
  }

  function clearShow() {
    if (showTimerRef.current) { clearTimeout(showTimerRef.current); showTimerRef.current = null; }
  }

  function clearHide() {
    if (hideTimerRef.current) { clearTimeout(hideTimerRef.current); hideTimerRef.current = null; }
  }

  // Hard-clear everything (called on h1 leave).
  function hideNow() {
    clearShow();
    clearHide();
    visibleRef.current = false;
    setPreviewVisible(false);
    setTraceRect(null);
    stopRaf();
  }

  // ── Reactive logic — watches activeId, manages timers ───────────────────────
  //
  // Event handlers are pure state setters. All show/hide logic lives here so
  // the DOM is never driven directly from event callbacks.
  useEffect(() => {
    activeIdRef.current = activeId;

    if (activeId !== null) {
      // ── Token entered ────────────────────────────────────────────────────────
      clearHide();

      // Update content unconditionally (safe whether card is visible or not)
      setPreviewLabel(tokens[activeId].label);
      setPreviewSrc(tokens[activeId].image);
      setImgFailed(false);

      // Update trace rect unconditionally — snaps to the active token immediately
      // even when moving between tokens while the card is already up.
      if (!reducedMotionRef.current) {
        const el = tokenRefs.current[activeId];
        if (el) {
          const r = el.getBoundingClientRect();
          setTraceRect({ left: r.left, top: r.top, width: r.width, height: r.height });
        }
      }

      if (visibleRef.current) {
        // Card is already up — content + trace swap above is all we need.
        return;
      }

      // Card is hidden — schedule appearance after SHOW_MS.
      clearShow();
      showTimerRef.current = setTimeout(() => {
        const pos = reducedMotionRef.current
          ? h1Below()
          : clamp(cursorRef.current.x, cursorRef.current.y);
        lerpPos.current  = pos;
        targetPos.current = pos;
        applyTransform(pos.x, pos.y);
        visibleRef.current = true;
        setPreviewVisible(true);
        if (!reducedMotionRef.current) startRaf();
      }, SHOW_MS);

    } else {
      // ── Token left ───────────────────────────────────────────────────────────
      clearShow();
      clearHide();
      hideTimerRef.current = setTimeout(() => {
        visibleRef.current = false;
        setPreviewVisible(false);
        setTraceRect(null);
        stopRaf();
      }, HIDE_MS);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  // ── One-time mount effect ────────────────────────────────────────────────────
  useEffect(() => {
    const touch  = window.matchMedia("(hover: none)").matches;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsTouch(touch);
    setReducedMotion(motion);
    reducedMotionRef.current = motion;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cleanup on unmount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => { stopRaf(); clearShow(); clearHide(); }, []);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <section className="mx-auto max-w-5xl px-0 md:px-8 pb-8 pt-4 md:pt-8">
      
      {/* ── Envato Context Badge ─────────────────────────────────────────────────── */}
      <div className="flex flex-col items-start sm:flex-row sm:items-center gap-3 mb-8 md:mb-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://lever-client-logos.s3.us-west-2.amazonaws.com/c11956a5-1cb9-45f6-b2ef-a36290dffe66-1722470303592.png" 
          alt="Envato"
          className="h-6 w-auto" 
        />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
          Application / Senior Product Designer
        </span>
      </div>

      {/*
        H1 — owns cursor tracking only.
        onPointerMove: keeps cursorRef and lerp target current.
        onPointerLeave: hard-clears everything when cursor exits the heading.
        No dimming logic lives here — only opacity/color transitions, never
        layout properties, so the h1 dimensions remain completely static.
      */}
      <h1
        ref={h1Ref}
        onPointerMove={!isTouch ? (e) => {
          cursorRef.current = { x: e.clientX, y: e.clientY };
          if (!reducedMotionRef.current && visibleRef.current) {
            targetPos.current = clamp(e.clientX, e.clientY);
          }
        } : undefined}
        onPointerLeave={!isTouch ? () => hideNow() : undefined}
        className="text-balance font-serif text-[clamp(1.75rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-tight text-heading"
      >
        {PARTS.map((part, i) => {
          if (part.type === "text") {
            return (
              <span
                key={i}
                className={cn(
                  // Only opacity — never layout properties — so the hit area
                  // cannot shift and accidentally re-trigger pointer events.
                  "transition-opacity duration-200",
                  activeId !== null && "opacity-[0.35]",
                )}
              >
                {part.content}
              </span>
            );
          }

          const token = tokens[part.id];
          const isActive = activeId === token.id;
          const isDimmed = !isActive && activeId !== null;

          return (
            /*
              Each <Link> is a pure state trigger — it ONLY sets/clears activeId.
              No show/hide logic, no timer manipulation, no direct DOM writes.
            */
            <Link
              key={i}
              href={token.href}
              target={token.href.startsWith("http") ? "_blank" : undefined}
              rel={token.href.startsWith("http") ? "noopener noreferrer" : undefined}
              onClick={(e) => {
                if (token.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(token.href)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              ref={(el) => { tokenRefs.current[part.id] = el; }}
              onPointerEnter={!isTouch ? () => setActiveId(token.id) : undefined}
              onPointerLeave={!isTouch ? () => setActiveId(null)     : undefined}
              onFocus={!isTouch ? () => setActiveId(token.id) : undefined}
              onBlur={!isTouch  ? () => setActiveId(null)     : undefined}
              className={cn(
                "text-heading underline underline-offset-5 decoration-2 decoration-accent/50 hover:text-accent",
                "transition-[color,opacity] duration-200",
                isDimmed && "opacity-[0.35]",
              )}
            >
              {token.text}
            </Link>
          );
        })}
      </h1>

      {/* ── Subheading Narrative ──────────────────────────────────────────────── */}
      <div className="mt-6 flex max-w-2xl flex-col gap-4 text-subtle">
        <p>
          Hi, I&apos;m Em. This page is my application for Senior Product Designer at Envato. I designed, coded, and shipped it in a couple of days.
        </p>
        <p>
          Scroll. The work responds.
        </p>
      </div>

      {/*
        Preview card — sibling to the h1, never nested inside it.
        pointer-events-none on the outermost div; no child can steal events.
        Positioned via GPU transform; left/top fixed at 0.
      */}
      <div
        ref={cardRef}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[200]",
          "will-change-transform"
        )}
        aria-hidden
      >
        <AnimatePresence>
          {previewVisible && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "w-[300px] overflow-hidden rounded-lg",
                "border border-border bg-surface shadow-[0_4px_20px_rgba(0,0,0,0.12)] origin-top-left"
              )}
            >
              {/* 16:9 media area */}
              <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-surface-2">
                {imgFailed ? (
                  <div className="absolute inset-0 flex items-center justify-center border-dashed border-border px-4">
                    <span className="text-center font-mono text-xs text-muted">{previewLabel}</span>
                  </div>
                ) : previewSrc.includes("vimeo.com") ? (
                  <iframe
                    src={previewSrc}
                    className="absolute inset-0 h-full w-full pointer-events-none scale-[1.05]"
                    allow="autoplay; fullscreen"
                    frameBorder="0"
                  />
                ) : previewSrc.endsWith(".mp4") ? (
                  <video
                    src={previewSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    onError={() => setImgFailed(true)}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={previewSrc}
                    alt={previewLabel}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    onError={() => setImgFailed(true)}
                  />
                )}
              </div>

              {/* Label */}
              <div className="px-3 py-2 bg-canvas">
                <p className="font-mono text-xs uppercase leading-snug text-muted">{previewLabel}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Token trace — bounding box around the active token */}
      {!reducedMotion && !isTouch && traceRect && (
        <div
          className="pointer-events-none fixed z-[150]"
          style={{
            left: traceRect.left,
            top: traceRect.top,
            width: traceRect.width,
            height: traceRect.height,
          }}
        >
          {/* Outline */}
          <div className="absolute inset-0 border border-accent/30" />
          {/* Corner nodes */}
          <div className="absolute -left-0.5 -top-0.5 h-1 w-1 bg-accent/60" />
          <div className="absolute -right-0.5 -top-0.5 h-1 w-1 bg-accent/60" />
          <div className="absolute -bottom-0.5 -left-0.5 h-1 w-1 bg-accent/60" />
          <div className="absolute -bottom-0.5 -right-0.5 h-1 w-1 bg-accent/60" />
          {/* Dimension label */}
          <span className="absolute right-0 top-0 -translate-y-full px-0.5 font-mono text-[9px] text-muted/70 whitespace-nowrap">
            {Math.round(traceRect.width)}×{Math.round(traceRect.height)}
          </span>
        </div>
      )}

      {/* Kinetic SVG — dashed bezier from token centre to cursor */}
      {!reducedMotion && !isTouch && (
        <svg
          className="pointer-events-none fixed inset-0 z-[150]"
          width="100%"
          height="100%"
          aria-hidden
        >
          <path
            ref={svgPathRef}
            d=""
            fill="none"
            style={{ stroke: "rgb(var(--color-accent-rgb) / 0.4)" }}
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      )}
    </section>
  );
}
