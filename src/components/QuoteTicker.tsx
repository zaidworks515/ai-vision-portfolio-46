import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { EASE } from "./ui/Reveal";

const QUOTES = [
  "Quality over quantity. One model that works beats five that almost do.",
  "If I haven't measured it, I don't trust it.",
  "Good data beats a bigger model.",
  "A model isn't done until it runs on real data.",
  "Ship it, watch it, then make it better.",
];

const INTERVAL_MS = 6000;

/**
 * A few working principles on a slow loop. It pauses while hovered or focused
 * and holds still for reduced-motion visitors.
 */
export function QuoteTicker() {
  const reduced = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  const [hovered, setHovered] = useState(false);
  const running = !reduced && !hovered;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % QUOTES.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  return (
    <div
      className="flex max-w-[34rem] items-center gap-3 border-l-2 border-gold pl-4"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      <figure className="min-w-0 flex-1" aria-roledescription="rotating quotes">
        <div className="relative min-h-[3rem] sm:min-h-[1.75rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="serif-accent text-[1.15rem] leading-snug text-fg sm:text-[1.25rem]"
            >
              “{QUOTES[i]}”
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="mt-2 flex items-center gap-1.5" aria-hidden>
          {QUOTES.map((q, n) => (
            <span key={q} className={`h-1 rounded-full transition-all duration-500 ${n === i ? "w-5 bg-gold" : "w-1.5 bg-line"}`} />
          ))}
        </div>
      </figure>
    </div>
  );
}
