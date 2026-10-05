import { useCallback, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const THEME_COLOR: Record<Theme, string> = { light: "#f1f4f8", dark: "#171a21" };

const current = (): Theme => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");

const EVENT = "themechange";

function apply(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  window.dispatchEvent(new Event(EVENT));
}

/**
 * Light/dark theme. Bright mode is the default for every visitor;
 * `public/theme-init.js` applies a saved choice before paint, and this hook
 * keeps every toggle in sync and remembers the visitor's choice.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => (typeof document === "undefined" ? "light" : current()));

  useEffect(() => {
    const onChange = () => setTheme(current());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
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
