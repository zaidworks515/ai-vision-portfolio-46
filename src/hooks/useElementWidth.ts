import { useEffect, useRef, useState } from "react";

export function useElementWidth<T extends HTMLElement>(fallback = 300) {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(fallback);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    setWidth(Math.max(240, Math.round(node.getBoundingClientRect().width)));
    const ro = new ResizeObserver(([entry]) => setWidth(Math.max(240, Math.round(entry.contentRect.width))));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}
