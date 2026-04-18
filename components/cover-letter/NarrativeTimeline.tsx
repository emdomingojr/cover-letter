"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ── Horizontal Reading Progress Bar ───────────────────────────────────────
 * Renders a thin, kinetic horizontal line locked directly underneath the 
 * NavBar to track overall page scroll velocity without disrupting grid layout.
 */
export function NarrativeTimeline() {
  const { scrollYProgress } = useScroll();

  // Throttled scale logic to ensure smooth GPU interpolation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="pointer-events-none fixed top-[60px] md:top-[72px] left-0 right-0 z-[60] w-full">
      {/* Progress Execution Line */}
      <motion.div 
        style={{ scaleX }} 
        className="h-1 w-full bg-accent origin-left"
        transition={{ type: "spring", stiffness: 400, damping: 90 }}
      />
    </div>
  );
}
