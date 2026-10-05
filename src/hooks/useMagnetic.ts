import { useCallback, useRef } from "react";
import { useFinePointer, usePrefersReducedMotion } from "./useMediaQuery";

/** A small pull toward the cursor. Only on precise pointers, never with reduced motion. */
export function useMagnetic<T extends HTMLElement>(strength = 0.22) {
  const ref = useRef<T>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const enabled = fine && !reduced;

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (!enabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      ref.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    [enabled, strength],
  );

  const onPointerLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "";
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
