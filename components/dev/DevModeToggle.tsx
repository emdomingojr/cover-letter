"use client";

import { cn } from "@/lib/utils";
import { useDevMode } from "./DevModeProvider";

export function DevModeToggle() {
  const [devMode, setDevMode] = useDevMode();

  return (
    <button
      onClick={() => setDevMode((v) => !v)}
      aria-pressed={devMode}
      className={cn(
        "rounded border px-2 py-1 font-mono text-[10px] transition-colors duration-150",
        devMode
          ? "border-accent/40 bg-accent/5 text-accent"
          : "border-border text-muted hover:border-border-hover hover:text-subtle"
      )}
    >
      [ Dev: {devMode ? "ON" : "OFF"} ]
    </button>
  );
}
