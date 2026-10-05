import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { AudioLines, FileText, MessageSquareText, Video, type LucideIcon } from "lucide-react";
import { routes, stages } from "@/data/signals";
import { cn, pad2 } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { EASE } from "./ui/Reveal";

const ICONS: Record<string, LucideIcon> = {
  video: Video,
  voice: AudioLines,
  document: FileText,
  language: MessageSquareText,
};

const CYCLE_MS = 6500;
const STEP_DELAY = 0.22;

export function SignalRouter() {
  const [index, setIndex] = useState(0);
  const [interacted, setInteracted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();

  const route = routes[index];
  const autoplay = !reduced && !interacted && inView;
  const paused = hovered;

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(node);
    return () => io.disconnect();
  }, []);

  const select = (i: number, fromUser = true) => {
    setIndex((i + routes.length) % routes.length);
    if (fromUser) setInteracted(true);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const map: Record<string, number> = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: routes.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    const next = (map[e.key] + routes.length) % routes.length;
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      ref={rootRef}
      className="relative"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={() => setHovered(true)}
      onBlurCapture={() => setHovered(false)}
    >
      {/* soft signal glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,hsl(var(--accent)/0.12),transparent)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.4rem] border border-line/90 bg-surface shadow-[0_30px_70px_-34px_hsl(211_80%_30%/0.35)] backdrop-blur-md">
        <Corners />

        {/* header */}
        <div className="flex items-center justify-between border-b border-line/80 px-4 py-3 sm:px-5">
          <p className="font-mono text-[0.7rem] tracking-wide text-muted">
            <span className="text-dim">~/</span>signal<span className="text-accent">.</span>route
          </p>
          <p className="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-dim">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-live" />
            </span>
            {autoplay && !paused ? "auto-routing" : "routing"}
          </p>
        </div>

        {/* tabs */}
        <div role="tablist" aria-label="Choose an input signal" className="grid grid-cols-4 gap-1 border-b border-line/80 p-1.5">
          {routes.map((r, i) => {
            const Icon = ICONS[r.id];
            const selected = i === index;
            return (
              <button
                key={r.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`${uid}-tab-${r.id}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={cn(
                  "relative flex flex-col items-center gap-1.5 overflow-hidden rounded-xl px-1 py-2.5 text-[0.72rem] font-medium transition-colors duration-300 sm:flex-row sm:justify-center sm:gap-2 sm:text-[0.8rem]",
                  selected ? "bg-raised text-fg" : "text-muted hover:bg-raised/50 hover:text-fg",
                )}
              >
                <Icon className={cn("h-4 w-4 transition-colors", selected ? "text-accent" : "text-dim")} aria-hidden />
                {r.label}
                {selected && autoplay && (
                  <span
                    key={`${r.id}-${index}`}
                    aria-hidden
                    className="absolute inset-x-2 bottom-0 h-px origin-left bg-accent/80"
                    style={{
                      animation: `router-progress ${CYCLE_MS}ms linear forwards`,
                      animationPlayState: paused ? "paused" : "running",
                    }}
                    onAnimationEnd={() => select(index + 1, false)}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* pipeline */}
        <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${route.id}`} className="relative px-4 py-5 sm:px-6">
          <div aria-hidden className="absolute bottom-9 left-[1.6rem] top-9 w-px bg-line sm:left-[2.1rem]">
            {!reduced && (
              <motion.span
                key={route.id}
                className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_14px_3px_hsl(var(--accent)/0.55)]"
                initial={{ top: "0%", opacity: 0 }}
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                transition={{ duration: STEP_DELAY * (stages.length - 1) + 0.5, ease: "easeInOut", times: [0, 0.1, 0.9, 1] }}
              />
            )}
          </div>

          <ol className="relative space-y-1">
            {stages.map((stage, i) => (
              <li key={stage.id} className="grid grid-cols-[1.5rem_1fr] items-start gap-3 py-2 sm:grid-cols-[2rem_7.25rem_1fr] sm:gap-4">
                <span className="relative mt-[0.35rem] flex justify-center">
                  <motion.span
                    key={`${route.id}-${stage.id}`}
                    className="h-2.5 w-2.5 rounded-full border"
                    initial={reduced ? false : { backgroundColor: "hsl(var(--surface))", borderColor: "hsl(var(--line))", scale: 1 }}
                    animate={{
                      backgroundColor: i === stages.length - 1 ? "hsl(var(--accent))" : "hsl(var(--raised))",
                      borderColor: i === stages.length - 1 ? "hsl(var(--accent))" : "hsl(var(--fg) / 0.45)",
                      scale: reduced ? 1 : [1, 1.5, 1],
                    }}
                    transition={{ duration: 0.45, delay: reduced ? 0 : i * STEP_DELAY + 0.08 }}
                  />
                </span>
                <span className="col-span-1 font-mono text-[0.66rem] uppercase tracking-[0.16em] text-dim max-sm:col-start-2 sm:mt-[0.2rem]">
                  {pad2(i + 1)} · {stage.label}
                </span>
                <motion.span
                  key={`${route.id}-${stage.id}-text`}
                  className="text-[0.95rem] leading-snug text-fg max-sm:col-start-2 max-sm:-mt-1.5"
                  initial={reduced ? false : { opacity: 0, y: 6, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : i * STEP_DELAY }}
                >
                  {route.steps[stage.id]}
                </motion.span>
              </li>
            ))}
          </ol>
        </div>

        {/* footer */}
        <div className="border-t border-line/80 bg-raised/60 px-4 py-3.5 sm:px-5">
          <p className="truncate font-mono text-[0.7rem] text-muted" title={route.telemetry}>
            <span className="text-accent">›</span> {route.telemetry}
            <span aria-hidden className="ml-0.5 inline-block h-3 w-[6px] translate-y-[2px] animate-pulse-dot bg-muted/70" />
          </p>
        </div>
      </div>
    </div>
  );
}

function Corners() {
  const c = "pointer-events-none absolute h-2.5 w-2.5 border-fg/30";
  return (
    <>
      <span aria-hidden className={cn(c, "left-2 top-2 border-l border-t")} />
      <span aria-hidden className={cn(c, "right-2 top-2 border-r border-t")} />
      <span aria-hidden className={cn(c, "bottom-2 left-2 border-b border-l")} />
      <span aria-hidden className={cn(c, "bottom-2 right-2 border-b border-r")} />
    </>
  );
}
