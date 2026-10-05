import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEME_COLOR: Record<Theme, string> = { light: "#ffffff", dark: "#0a101a" };

const current = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

const EVENT = "themechange";

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Light/dark theme. `public/theme-init.js` sets the initial value before paint;
 * this hook keeps React in sync, persists the visitor's choice, and follows the
 * system setting until the visitor picks one.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === "undefined" ? "light" : current()));

  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystem = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      if (saved === "light" || saved === "dark") return;
      apply(mql.matches ? "dark" : "light");
    };
    const onChange = () => setTheme(current());
    mql.addEventListener("change", onSystem);
    window.addEventListener(EVENT, onChange);
    return () => {
      mql.removeEventListener("change", onSystem);
      window.removeEventListener(EVENT, onChange);
    };
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = current() === "dark" ? "light" : "dark";
    apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* private mode: the choice just won't persist */
    }
  }, []);

  return { theme, toggle };
}
