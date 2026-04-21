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
    annotation: "Errors expand the container downward rather than overlaying, preserving the visibility of adjacent UI.",
  },
  errored: {
    label: "Errored",
    category: "System",
    annotation: "System-level failures are prioritised without clearing user progress.",
  },
  disabled: {
    label: "Disabled",
    category: "System",
    annotation: "Visual and functional locking prevents accidental submissions during heavy processing.",
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

export function FormsStateExplorer() {
  const [activeState, setActiveState] = useState<FormState>("default");

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
    <div className="w-full flex flex-col gap-12 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">
        
        {/* ── Control Board (Left/Top) ────────────────────────────────────── */}
        <div className="flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex flex-wrap gap-x-12 gap-y-8">
            {(["Interaction", "Validation", "System"] as const).map((cat) => (
              <div key={cat} className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {cat}
                </span>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(STATES_META)
                    .filter(([_, meta]) => meta.category === cat)
                    .map(([id, meta]) => (
                      <button
                        key={id}
                        onClick={() => setActiveState(id as FormState)}
                        className={cn(
                          "px-4 py-2 rounded-full border font-mono text-xs transition-all duration-200",
                          activeState === id
                            ? "bg-accent border-accent text-white shadow-md shadow-accent/20"
                            : "bg-surface border-border text-subtle hover:border-accent/40"
                        )}
                      >
                        {meta.label}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Dynamic Annotation */}
          <motion.div
            key={activeState}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-xl bg-surface-2 border border-dashed border-border max-w-md"
          >
            <p className="font-sans text-sm leading-relaxed text-subtle italic">
              &ldquo;{STATES_META[activeState].annotation}&rdquo;
            </p>
          </motion.div>
        </div>

        {/* ── Interactive Input (Right/Center) ────────────────────────────── */}
        <div className="flex flex-col order-1 lg:order-2">
          <div className={cn(
            "transition-opacity duration-300",
            isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"
          )}>
            <div className="relative flex flex-col">
              {/* Input Wrapper */}
              <div
                className={cn(
                  "relative h-[64px] rounded-xl border transition-all duration-300 bg-surface flex items-center px-4",
                  activeState === "focused" ? "border-accent ring-4 ring-accent/10" : "border-border",
                  isInvalid ? "border-red-500 bg-red-50/30" : "",
                  isValid ? "border-green-500 bg-green-50/30" : "",
                  isSystemError ? "border-red-500" : ""
                )}
              >
                {/* Floating Label / Placeholder */}
                <span
                  className={cn(
                    "absolute left-4 transition-all duration-200 pointer-events-none origin-left",
                    isFloating 
                      ? "top-2 text-[10px] text-muted translate-y-0" 
                      : "top-1/2 -translate-y-1/2 text-sm text-subtle"
                  )}
                >
                  Work Email
                </span>

                {/* Actual Input Value (Simulated) */}
                <div className={cn(
                  "pt-4 text-sm font-medium text-heading transition-opacity duration-200",
                  isFloating ? "opacity-100" : "opacity-0"
                )}>
                  {getInputValue()}
                </div>

                {/* Caret (Blinking if focused but empty, or just visible) */}
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
                      >
                        <CheckCircleIcon />
                      </motion.div>
                    )}
                    {isInvalid && (
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
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
                      className="mt-2 text-[11px] text-muted leading-relaxed"
                    >
                      We ask for this because it lets us send important updates related to your enquiry.
                    </motion.p>
                  )}
                  {isInvalid && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-[11px] text-red-500 font-medium"
                    >
                      Must be valid email format e.g. email@sample.com
                    </motion.p>
                  )}
                  {isSystemError && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-2 text-[11px] text-red-500 font-medium bg-red-50 border border-red-100 rounded-lg p-2 flex items-center gap-2"
                    >
                      <ExclamationCircleIcon />
                      Connection timeout. Please try submitting again.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
