import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * A step counter for live diagrams: 0 → count-1 → 0 … every `ms`, but only while
 * the element is on screen and the visitor hasn't asked for reduced motion.
 * When it isn't running, `index` is `fallback` (by default the last step, so a
 * static diagram shows its complete state).
 */
export function useLoop<T extends Element>(count: number, ms: number, fallback = count - 1) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const running = inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % count), ms);
    return () => window.clearInterval(id);
  }, [running, count, ms]);

  return { ref, index: running ? index : fallback, running };
}
