import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans:  ["var(--font-sans)", "system-ui", "sans-serif"],
        mono:          ["var(--font-mono)",         "ui-monospace", "monospace"],
        "display-mono": ["var(--font-display-mono)", "ui-monospace", "monospace"],
        "serif-display": ["var(--font-serif-display)", "Georgia", "serif"],
      },
      colors: {
        canvas:         "rgb(var(--color-canvas) / <alpha-value>)",
        surface:        "rgb(var(--color-surface) / <alpha-value>)",
        "surface-2":    "rgb(var(--color-surface-2) / <alpha-value>)",
        border:         "rgb(var(--color-border) / <alpha-value>)",
        "border-hover": "rgb(var(--color-border-hover) / <alpha-value>)",
        muted:          "rgb(var(--color-muted) / <alpha-value>)",
        subtle:         "rgb(var(--color-subtle) / <alpha-value>)",
        primary:        "rgb(var(--color-primary) / <alpha-value>)",
        heading:        "rgb(var(--color-heading) / <alpha-value>)",
        accent:         "rgb(var(--color-accent-rgb) / <alpha-value>)",
      },
      transitionDuration: {
        "120": "120ms",
        "150": "150ms",
      },
    },
  },
  plugins: [],
};

export default config;
