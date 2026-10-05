import { useEffect, useState } from "react";

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? initial : window.matchMedia(query).matches,
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

export const usePrefersReducedMotion = () => useMediaQuery("(prefers-reduced-motion: reduce)");
export const useFinePointer = () => useMediaQuery("(hover: hover) and (pointer: fine)");

/** True when the visitor has asked the browser to save data. */
export function useSaveData() {
  const [saveData] = useState(() => {
    const nav = typeof navigator !== "undefined" ? (navigator as Navigator & { connection?: { saveData?: boolean } }) : undefined;
    return Boolean(nav?.connection?.saveData);
  });
  return saveData;
}
