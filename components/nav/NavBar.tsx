"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useNavigation } from "./NavigationProvider";
import { NarrativeTimeline } from "../cover-letter/NarrativeTimeline";
import { cn } from "@/lib/utils";

/**
 * ── Navigation Architecture ──────────────────────────────────────────────────
 * A dual-state header that transforms from a hero-integrated logo 
 * into a persistent utility bar with segmented control navigation.
 */
export function NavBar({ companyName }: { companyName: string }) {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const { sections, activeId, setIsScrolled, isScrolled } = useNavigation();
  const pillRefs = useRef(new Map<string, HTMLElement | null>());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Scrolled styling threshold (scaled logo, blurred bg)
      setIsScrolled(scrollY > 400);

      // Visibility threshold (slide in/out)
      const shouldBeVisible = scrollY > 150;
      setIsNavVisible((prev) => {
        if (prev !== shouldBeVisible) return shouldBeVisible;
        return prev;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setIsScrolled]);

  // Auto-scroll active pill into view
  useEffect(() => {
    const activeNode = pillRefs.current.get(activeId || "");
    if (activeNode) {
      activeNode.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeId]);

  return (
    <>
      <nav 
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled 
            ? "bg-canvas/80 backdrop-blur-md border-b border-border py-3" 
            : "bg-transparent py-8"
        )}
      >
        <div className="px-2 md:px-12">
          <div className="flex items-center justify-between">
            <div className="w-[140px] flex justify-start">
              <Link 
                href="https://www.emersonjr.com" 
                className="group flex items-center gap-3 no-underline"
              >
                <motion.div 
                  animate={{ 
                    scale: isScrolled ? 0.75 : 1,
                    x: isScrolled ? -10 : 0 
                  }}
                  className="relative flex items-center"
                >
                  <img 
                    src="https://cdn.prod.website-files.com/663992d0436f4e870a059cc3/664075cbd0c0f5402916553b_Emerson%20Jr%20Logo.svg"
                    alt="Emerson Domingo Jr"
                    className="h-8 w-auto"
                  />
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation (Center) */}
            <div className={cn(
              "hidden md:block transition-all duration-300 ease-in-out",
              isNavVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-4 pointer-events-none"
            )}>
              <LayoutGroup id="nav-pills-desktop">
                <div className="flex items-center gap-1 rounded-full bg-surface-2 p-1 border border-border shadow-sm">
                  {sections.map((section) => {
                    const isActive = activeId === section.id;
                    return (
                      <button
                        key={section.id}
                        ref={(el) => { if (el) pillRefs.current.set(section.id, el); else pillRefs.current.delete(section.id); }}
                        onClick={() => {
                          document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className={cn(
                          "relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200 whitespace-nowrap",
                          isActive ? "text-white" : "text-muted hover:text-heading"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            className="absolute inset-0 z-0 rounded-full bg-accent"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <span className="relative z-10">{section.label}</span>
                      </button>
                    );
                  })}
                </div>
              </LayoutGroup>
            </div>

            <div className="hidden md:block w-[140px]" /> 
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <NarrativeTimeline />
          </div>
        </div>
      </nav>

      {/* Mobile Floating Navigation Island */}
      <div className="md:hidden fixed bottom-6 left-0 w-full flex justify-center z-50">
        <motion.div 
          initial={false}
          animate={{ 
            opacity: isNavVisible ? 1 : 0,
            y: isNavVisible ? 0 : 16,
            scale: isNavVisible ? 1 : 0.95
          }}
          className={cn(
            "pointer-events-auto bg-canvas/80 backdrop-blur-md border border-border shadow-lg rounded-full p-1.5 flex items-center overflow-x-auto whitespace-nowrap snap-x snap-mandatory scrollbar-hide max-w-[92vw]",
            !isNavVisible && "pointer-events-none"
          )}
        >
          <LayoutGroup id="nav-pills-mobile">
            {sections.map((section) => {
              const isActive = activeId === section.id;
              return (
                <button
                  key={section.id}
                  ref={(el) => { if (el) pillRefs.current.set(section.id, el); else pillRefs.current.delete(section.id); }}
                  onClick={() => {
                    document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={cn(
                    "relative rounded-full px-5 py-2 text-xs font-medium transition-colors duration-200 snap-center",
                    isActive ? "text-white" : "text-muted"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-pill-mob"
                      className="absolute inset-0 z-0 rounded-full bg-accent"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">{section.label}</span>
                </button>
              );
            })}
          </LayoutGroup>
        </motion.div>
      </div>
    </>
  );
}
