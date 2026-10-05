import { useEffect, useRef, useState } from "react";
import { formatNumber, parseMetric } from "@/lib/utils";
import { usePrefersReducedMotion } from "./useMediaQuery";

/**
 * Counts a real metric up from zero the first time it scrolls into view.
 * Non-numeric values and reduced-motion users get the final value immediately.
 */
export function useCountUp<T extends HTMLElement>(value: string, duration = 1400) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const parsed = parseMetric(value);
  const [display, setDisplay] = useState(() =>
    parsed && !reduced ? `${parsed.prefix}${formatNumber(0, parsed.decimals, parsed.grouped)}${parsed.suffix}` : value,
  );

  useEffect(() => {
    const node = ref.current;
    const p = parseMetric(value);
    if (!node || !p || reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          setDisplay(`${p.prefix}${formatNumber(p.num * eased, p.decimals, p.grouped)}${p.suffix}`);
          if (t < 1) raf = requestAnimationFrame(tick);
          else setDisplay(value);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration, reduced]);

  return { ref, display };
}
