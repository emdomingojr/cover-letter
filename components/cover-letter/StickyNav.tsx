"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface StickyNavProps {
  sections: { id: string; label: string }[];
}

export function StickyNav({ sections }: StickyNavProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const navContainerRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero section (~400px threshold)
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Intersection Observer for ScrollSpy logic
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const timeoutId = setTimeout(() => {
      sections.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) observer.observe(element);
      });
    }, 1000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [sections]);

  // Auto-scroll the active pill into view on mobile
  useEffect(() => {
    if (!activeId) return;

    const scrollTimeout = setTimeout(() => {
      const activePill = pillRefs.current[activeId];
      if (activePill && navContainerRef.current) {
        activePill.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }, 100); // 100ms slight delay for high-quality feel

    return () => clearTimeout(scrollTimeout);
  }, [activeId]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      className={cn(
        "fixed left-0 right-0 z-[110] pointer-events-none transition-all duration-500",
        "top-0 md:pt-8", // Lock to exact NavBar pt-8
        "max-md:top-auto max-md:bottom-8 max-md:h-auto" 
      )}
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6 w-full flex justify-center md:justify-end">
        <div className="h-7 flex items-center"> {/* Strict h-7 matching logo */}
          <AnimatePresence>
            {isVisible && (
              <motion.nav
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                  "bg-canvas/80 backdrop-blur-md border border-border rounded-full p-1 shadow-[0_4px_20px_rgba(0,0,0,0.08),0_1px_4px_rgba(0,0,0,0.04)] pointer-events-auto h-[38px] flex items-center",
                  "max-md:max-w-[92vw] px-1"
                )}
              >
                <div 
                  ref={navContainerRef}
                  className="flex items-center gap-0.5 max-w-full overflow-x-auto scrollbar-hide"
                  style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none'
                  }}
                >
                  {sections.map((section) => {
                    const isActive = activeId === section.id;
                    return (
                      <button
                        key={section.id}
                        ref={(el) => { pillRefs.current[section.id] = el; }}
                        onClick={() => scrollToSection(section.id)}
                        className={cn(
                          "px-3.5 py-1.5 rounded-full text-[13px] font-sans font-medium transition-all duration-300 relative whitespace-nowrap",
                          isActive 
                            ? "text-white" 
                            : "text-muted hover:text-heading"
                        )}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="nav-pill-bg"
                            className="absolute inset-0 bg-heading rounded-full -z-10 shadow-sm"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        {section.label}
                      </button>
                    );
                  })}
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
