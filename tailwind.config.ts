import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1280px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["'Geist Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
        serif: ["'Instrument Serif'", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        ink: "hsl(var(--ink) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        raised: "hsl(var(--raised) / <alpha-value>)",
        line: "hsl(var(--line) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        dim: "hsl(var(--dim) / <alpha-value>)",
        accent: "hsl(var(--accent) / <alpha-value>)",
        "accent-hover": "hsl(var(--accent-hover) / <alpha-value>)",
        tint: "hsl(var(--tint) / <alpha-value>)",
        gold: "hsl(var(--gold) / <alpha-value>)",
        live: "hsl(var(--live) / <alpha-value>)",
      },
      fontSize: {
        "display-xl": ["clamp(2.6rem, 6.4vw, 6rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.1rem, 4.6vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(1.6rem, 2.8vw, 2.4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
      },
      maxWidth: {
        prose: "68ch",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        "dash-flow": {
          to: { strokeDashoffset: "-24" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2.2s ease-in-out infinite",
        "dash-flow": "dash-flow 1.2s linear infinite",
        scan: "scan 6s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
