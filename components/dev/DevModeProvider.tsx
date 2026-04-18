"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ThemePanel } from "./ThemePanel";

type DevModeCtx = [boolean, Dispatch<SetStateAction<boolean>>];

const DevModeContext = createContext<DevModeCtx>([false, () => {}]);

export function useDevMode(): DevModeCtx {
  return useContext(DevModeContext);
}

export function DevModeProvider({ children }: { children: ReactNode }) {
  const [devMode, setDevMode] = useState(false);

  // ── Sync state → body attribute (global CSS selector) ─────────────────────
  useEffect(() => {
    if (devMode) {
      document.body.setAttribute("data-dev-mode", "true");
    } else {
      document.body.removeAttribute("data-dev-mode");
    }
  }, [devMode]);

  // ── X-Ray: track mouse position + annotate hovered element ────────────────
  // Cursor position is written to --mouse-x / --mouse-y on :root so the
  // CSS ::after label can position itself via `position: fixed`.
  // data-node is set on the currently-hovered element so CSS attr() can
  // read the tag name without a React re-render.
  useEffect(() => {
    if (!devMode) return;

    function handleMove(e: MouseEvent) {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    }

    function handleOver(e: MouseEvent) {
      (e.target as Element).setAttribute(
        "data-node",
        (e.target as Element).nodeName.toLowerCase()
      );
    }

    function handleOut(e: MouseEvent) {
      (e.target as Element).removeAttribute("data-node");
    }

    document.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      // Clean up any lingering data-node attributes
      document.querySelectorAll("[data-node]").forEach((el) =>
        el.removeAttribute("data-node")
      );
    };
  }, [devMode]);

  return (
    <DevModeContext.Provider value={[devMode, setDevMode]}>
      {children}
      <ThemePanel />
    </DevModeContext.Provider>
  );
}
