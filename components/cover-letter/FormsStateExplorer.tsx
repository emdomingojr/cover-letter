"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Icons ───────────────────────────────────────────────────────────────────

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-green-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const ExclamationCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-muted shrink-0">
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836c-.149.598.013 1.222.423 1.633.477.477 1.154.63 1.711.457.19-.059.305-.262.247-.452-.058-.19-.26-.305-.451-.247-.2.063-.518.003-.701-.18a.33.33 0 01-.11-.233l.708-2.834c.311-1.243-.98-2.279-2.125-1.706-.51.255-1.077.29-1.53.072-.486-.233-.803-.708-.803-1.218 0-.199.162-.36.361-.36.198 0 .36.161.361.36 0 .093.07.214.283.316.2.096.48.093.829-.081zM12 7.5a.875.875 0 100 1.75.875.875 0 000-1.75z" clipRule="evenodd" />
  </svg>
);

// ── Types ────────────────────────────────────────────────────────────────────

type FormState = "default" | "focused" | "filled" | "valid" | "invalid" | "errored" | "disabled";

interface StateMetadata {
  label: string;
  category: "Interaction" | "Validation" | "System";
  annotation: string;
}

const STATES_META: Record<FormState, StateMetadata> = {
  default: {
    label: "Default",
    category: "Interaction",
    annotation: "Standard baseline state with helper text for context.",
  },
  focused: {
    label: "Focused",
    category: "Interaction",
    annotation: "Floating labels reduce cognitive load by maintaining context without wasting space.",
  },
  filled: {
    label: "Filled",
    category: "Interaction",
    annotation: "Data persists with high-contrast accessibility and logical containment.",
  },
  valid: {
    label: "Valid",
    category: "Validation",
    annotation: "Immediate positive reinforcement reduces form friction.",
  },
  invalid: {
    label: "Invalid",
    category: "Validation",
    annotation: "Errors expand the container downward rather than overlaying, preserving UI visibility.",
  },
  errored: {
    label: "Errored",
    category: "System",
    annotation: "System-level failures are prioritised without clearing user progress.",
  },
  disabled: {
    label: "Disabled",
    category: "System",
    annotation: "Visual and functional locking prevents accidental submissions.",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function FormsStateExplorer() {
  const [activeState, setActiveState] = useState<FormState>("default");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Determine input values based on state
  const getInputValue = () => {
    if (activeState === "valid") return "m.johnson@sample.com";
    if (activeState === "invalid") return "m.johnsonsample.com";
    if (activeState === "filled" || activeState === "errored" || activeState === "disabled") return "m.johnson@sample.com";
    return "";
  };

  const isFloating = activeState !== "default";
  const isDisabled = activeState === "disabled";
  const isInvalid = activeState === "invalid";
  const isValid = activeState === "valid";
  const isSystemError = activeState === "errored";

  return (
    <div className="w-full border border-border rounded-2xl overflow-hidden bg-surface shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr]">
        
        {/* ── 1. The Canvas (Visual Form - Right on Desktop, First on Mobile) ── */}
        <div className="order-1 lg:order-2 bg-white min-h-[400px] flex items-center justify-center p-8 md:p-12">
          <div className={cn(
            "w-full max-w-sm transition-opacity duration-300",
            isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
          )}>
            <div className="relative flex flex-col">
              {/* Input Wrapper */}
              <div
                className={cn(
                  "relative h-[64px] rounded-xl border transition-all duration-300 bg-surface flex items-center px-4",
                  activeState === "focused" ? "border-accent ring-4 ring-accent/10" : "border-border",
                  isInvalid ? "border-red-500 bg-red-500/5 shadow-[0_0_0_1px_rgba(239,68,68,0.1)]" : "",
                  isValid ? "border-green-500 bg-green-500/5 shadow-[0_0_0_1px_rgba(34,197,94,0.1)]" : "",
                  isSystemError ? "border-red-500" : ""
                )}
              >
                {/* Floating Label / Placeholder */}
                <span
                  className={cn(
                    "absolute left-4 transition-all duration-200 pointer-events-none origin-left font-sans",
                    isFloating 
                      ? "top-2 text-[10px] text-muted translate-y-0" 
                      : "top-1/2 -translate-y-1/2 text-sm text-subtle"
                  )}
                >
                  Work Email
                </span>

                {/* Actual Input Value (Simulated) */}
                <div className={cn(
                  "pt-4 text-sm font-medium text-heading transition-opacity duration-200 font-sans",
                  isFloating ? "opacity-100" : "opacity-0"
                )}>
                  {getInputValue()}
                </div>

                {/* Caret (Blinking if focused but empty) */}
                {activeState === "focused" && !getInputValue() && (
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute left-[105px] top-[34px] w-[2px] h-[18px] bg-accent"
                  />
                )}

                {/* Semantic Icons */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                  <AnimatePresence mode="wait">
                    {isValid && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        key="check"
                      >
                        <CheckCircleIcon />
                      </motion.div>
                    )}
                    {(isInvalid || isSystemError) && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        key="err"
                      >
                        <ExclamationCircleIcon />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Messaging Area (Dynamic Expansion) */}
              <div className="overflow-hidden">
                <AnimatePresence initial={false}>
                  {activeState === "default" && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-[11px] text-muted leading-relaxed font-sans"
                    >
                      We ask for this because it lets us send important updates related to your enquiry.
                    </motion.p>
                  )}
                  {isInvalid && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-[11px] text-red-500 font-semibold font-sans"
                    >
                      Must be valid email format e.g. email@sample.com
                    </motion.p>
                  )}
                  {isSystemError && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-[11px] text-red-600 font-semibold bg-red-500/10 border border-red-500/20 rounded-lg p-2.5 flex items-center gap-2 font-sans"
                    >
                      Connection timeout. Please try submitting again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* ── 2. The Inspector Panel (Toggles - Left on Desktop, Second on Mobile) ── */}
        <div className="order-2 lg:order-1 flex flex-col justify-between bg-surface-2/50 backdrop-blur-sm p-6 md:p-8 border-t lg:border-t-0 lg:border-r border-border min-h-[400px]">
          
          {/* Controls Area */}
          <div className="flex flex-col gap-8">
            {(["Interaction", "Validation", "System"] as const).map((cat) => (
              <div key={cat} className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60 font-semibold">
                  {cat}
                </span>
                <div className="flex flex-nowrap overflow-x-auto pb-1 lg:pb-0 scrollbar-hide gap-1.5 bg-surface/40 p-1 rounded-xl border border-border">
                  {Object.entries(STATES_META)
                    .filter(([_, meta]) => meta.category === cat)
                    .map(([id, meta]) => (
                      <button
                        key={id}
                        onClick={() => setActiveState(id as FormState)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg font-mono text-[11px] transition-all duration-150 flex-1 whitespace-nowrap",
                          activeState === id
                            ? "bg-accent text-white shadow-sm font-bold"
                            : "text-subtle hover:bg-surface/80 hover:text-heading"
                        )}
                      >
                        {meta.label}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Annotation Area */}
          <div className="mt-12 border-t border-border pt-4">
            <motion.div
              key={activeState}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <InfoIcon />
              <p className="text-xs text-subtle font-medium leading-relaxed font-sans italic">
                {STATES_META[activeState].annotation}
              </p>
            </motion.div>
          </div>
          
        </div>

      </div>
    </div>
  );
}
