import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PipelineStep } from "@/data/projects";
import { cn, pad2 } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const STEP_MS = 1100; // time for the signal to travel one connector
const HOLD_MS = 1800; // pause on the last stage before the loop restarts

/**
 * "How it works" as a live flow: a signal travels along each arrowed connector
 * and lights the next stage, looping while the diagram is on screen. Hover or
 * focus pins a stage. Reduced motion shows the whole flow, static, with arrows.
 */
export function PipelineStepper({ steps }: { steps: PipelineStep[] }) {
  const rootRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const last = steps.length - 1;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const running = inView && !reduced && pinned === null;

  useEffect(() => {
    if (!running) return;
    const id = window.setTimeout(() => setActive((a) => (a >= last ? 0 : a + 1)), active >= last ? HOLD_MS : STEP_MS);
    return () => window.clearTimeout(id);
  }, [running, active, last]);

  const current = reduced ? last : (pinned ?? active);

  return (
    <ol ref={rootRef} className="relative grid gap-0 md:grid-cols-5 md:gap-3" aria-label="Pipeline, step by step">
      {steps.map((s, i) => {
        const done = i < current;
        const now = i === current;
        const travelling = running && now && i < last;
        return (
          <li
            key={s.label}
            tabIndex={0}
            onPointerEnter={() => setPinned(i)}
            onPointerLeave={() => setPinned(null)}
            onFocus={() => setPinned(i)}
            onBlur={() => setPinned(null)}
            aria-current={now ? "step" : undefined}
            className="relative flex gap-4 pb-7 outline-none md:flex-col md:gap-0 md:pb-0"
          >
            <div className="relative flex flex-col items-center md:mb-4 md:flex-row">
              {/* node */}
              <span
                className={cn(
                  "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border font-mono text-[0.68rem] transition-colors duration-500",
                  now ? "border-accent bg-accent text-ink" : done ? "border-accent/60 bg-accent/10 text-accent" : "border-line bg-raised text-muted",
                )}
              >
                {now && !reduced && (
                  <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-accent/30 [animation-duration:1.6s]" />
                )}
                <span className="relative">{pad2(i + 1)}</span>
              </span>

              {/* connector with arrowhead and travelling signal */}
              {i < last && (
                <span
                  aria-hidden
                  className="absolute left-1/2 top-9 h-[calc(100%+1.75rem)] w-px -translate-x-1/2 md:left-9 md:top-1/2 md:h-px md:w-[calc(100%-1.5rem)] md:translate-x-0"
                >
                  <span className={cn("absolute inset-0 transition-colors duration-500", done ? "bg-accent/70" : "bg-line")} />
                  {/* arrowhead */}
                  <span
                    className={cn(
                      "absolute h-2 w-2 border-b border-r transition-colors duration-500",
                      "-bottom-0.5 left-1/2 -translate-x-1/2 rotate-45",
                      "md:-right-0.5 md:bottom-auto md:left-auto md:top-1/2 md:-translate-x-0 md:-translate-y-1/2 md:-rotate-45",
                      done || travelling ? "border-accent" : "border-dim",
                    )}
                  />
                  {travelling && (
                    <motion.span
                      key={`sig-${active}`}
                      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_3px_hsl(var(--accent)/0.55)]"
                      initial={{ top: "0%", left: "0%", opacity: 0 }}
                      animate={{ top: ["0%", "100%"], left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                      transition={{ duration: STEP_MS / 1000, ease: "easeInOut", times: [0, 0.15, 0.85, 1] }}
                    />
                  )}
                </span>
              )}
            </div>

            <div className="min-w-0 pt-1 md:pr-2 md:pt-0">
              <p className={cn("font-mono text-[0.7rem] uppercase tracking-[0.16em] transition-colors duration-500", now ? "text-accent" : "text-fg")}>
                {s.label}
              </p>
              <p className={cn("mt-1.5 text-[0.88rem] leading-snug transition-colors duration-500", now ? "text-fg" : "text-muted")}>{s.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
