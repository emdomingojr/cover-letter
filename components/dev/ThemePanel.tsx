"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDevMode } from "./DevModeProvider";

interface SliderConfig {
  label: string;
  varName: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  unit: string;
}

const SLIDERS: SliderConfig[] = [
  {
    label: "Radius",
    varName: "--radius-base",
    min: 0,
    max: 20,
    step: 1,
    defaultValue: 8,
    unit: "px",
  },
  {
    label: "Nav Blur",
    varName: "--blur-base",
    min: 0,
    max: 16,
    step: 1,
    defaultValue: 4,
    unit: "px",
  },
];

export function ThemePanel() {
  const [devMode] = useDevMode();
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(SLIDERS.map((s) => [s.varName, s.defaultValue]))
  );

  // Apply CSS variable changes in real-time
  useEffect(() => {
    SLIDERS.forEach((s) => {
      document.documentElement.style.setProperty(
        s.varName,
        String(values[s.varName])
      );
    });
  }, [values]);

  // Reset CSS vars when panel is closed
  useEffect(() => {
    if (!devMode) {
      SLIDERS.forEach((s) => {
        document.documentElement.style.removeProperty(s.varName);
      });
    }
  }, [devMode]);

  return (
    <AnimatePresence>
      {devMode && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[900] w-52 rounded-lg border border-border bg-surface/95 p-4 shadow-lg backdrop-blur-sm"
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted">
            Theme Config
          </p>

          <div className="flex flex-col gap-4">
            {SLIDERS.map((s) => (
              <div key={s.varName} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-mono text-xs text-subtle">
                    {s.label}
                  </label>
                  <span className="font-mono text-[10px] tabular-nums text-muted">
                    {values[s.varName]}
                    {s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={values[s.varName]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [s.varName]: Number(e.target.value),
                    }))
                  }
                  className="w-full cursor-pointer accent-[#0094FF]"
                />
              </div>
            ))}
          </div>

          <button
            onClick={() =>
              setValues(
                Object.fromEntries(
                  SLIDERS.map((s) => [s.varName, s.defaultValue])
                )
              )
            }
            className="mt-4 w-full rounded border border-border py-1 font-mono text-[10px] text-muted transition-colors duration-150 hover:border-accent hover:text-accent"
          >
            Reset
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
