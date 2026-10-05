import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { transitions, TENSORRT_ROWS, VRAM_ROWS, type Transition } from "@/data/thinking";
import { projectBySlug } from "@/data/projects";
import { cn, pad2 } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, EASE } from "../ui/Reveal";
import { ConcurrencyChart } from "../charts/ConcurrencyChart";
import { BeforeAfter } from "../charts/BeforeAfter";
import { ClocksVisual, DocVisual, QueueVisual } from "./Visuals";

function VisualFor({ t }: { t: Transition }) {
  switch (t.visual) {
    case "concurrency":
      return <ConcurrencyChart />;
    case "tensorrt":
      return <BeforeAfter title="Same model, same host, TensorRT config path fixed" rows={TENSORRT_ROWS} note="Cost: +772 MB VRAM and a one-time ~90 s engine build, cached." />;
    case "vram":
      return <BeforeAfter title="ONNX Runtime arena: per-request release + budget-derived ceiling" rows={VRAM_ROWS} note="Measured on 1080p camera frames at concurrency 8; throughput also rose 23%." />;
    case "queue":
      return <QueueVisual />;
    case "doc":
      return <DocVisual />;
    case "clocks":
      return <ClocksVisual />;
    default:
      return null;
  }
}

function Detail({ t }: { t: Transition }) {
  const project = projectBySlug(t.project);
  return (
    <div className="grid min-w-0 grid-cols-1 gap-8">
      <dl className="grid grid-cols-1 gap-6">
        <Row label="The tempting move">
          <p className="text-muted">{t.trap}</p>
        </Row>
        <Row label="What I did" accent>
          <p className="text-fg">{t.move}</p>
        </Row>
        <Row label="Evidence">
          <p className="text-muted">{t.evidence}</p>
        </Row>
      </dl>
      <div className="min-w-0 rounded-2xl border border-line/80 bg-surface p-4 sm:p-5">
        <VisualFor t={t} />
      </div>
      {project && (
        <Link
          to={`/work/${project.slug}`}
          state={{ fromHome: true }}
          preventScrollReset
          className="group inline-flex items-center gap-2 hl-text text-[0.88rem] text-muted"
        >
          From <span className="text-fg">{project.title}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
        </Link>
      )}
    </div>
  );
}

function Row({ label, accent, children }: { label: string; accent?: boolean; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <dt className={cn("font-mono text-[0.66rem] uppercase tracking-[0.16em]", accent ? "text-accent" : "text-dim")}>{label}</dt>
      <dd className="text-[1rem] leading-relaxed text-pretty">{children}</dd>
    </div>
  );
}

export function Thinking() {
  const [active, setActive] = useState(0);
  const desktop = useMediaQuery("(min-width: 1024px)", true);
  const current = transitions[active];

  return (
    <section id="systems" aria-labelledby="systems-title" className="section section-tint border-y border-line/60">
      <div className="container">
        <SectionHeading
          id="systems-title"
          index="02"
          label="How I think"
          title={
            <>
              Most AI problems are <span className="serif-accent text-accent">systems problems.</span>
            </>
          }
          lead="The tempting move, what I did, and what the numbers said."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <Reveal className="min-w-0">
            <ul className="border-t border-line/80" role={desktop ? "tablist" : undefined} aria-label="Engineering decisions" aria-orientation="vertical">
              {transitions.map((t, i) => {
                const selected = i === active;
                const panelId = `thinking-panel-${t.id}`;
                return (
                  <li key={t.id} className="border-b border-line/80" role={desktop ? "presentation" : undefined}>
                    <button
                      type="button"
                      role={desktop ? "tab" : undefined}
                      aria-selected={desktop ? selected : undefined}
                      aria-expanded={desktop ? undefined : selected}
                      aria-controls={panelId}
                      id={`thinking-tab-${t.id}`}
                      onClick={() => setActive(i)}
                      className={cn(
                        "group grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 py-5 text-left transition-colors duration-300",
                        selected ? "text-fg" : "text-muted hover:text-accent-hover",
                      )}
                    >
                      <span className={cn("font-mono text-[0.7rem]", selected ? "text-accent" : "text-dim")}>{pad2(i + 1)}</span>
                      <span className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[1.05rem] leading-snug sm:text-[1.15rem]">
                        <span className={cn(selected ? "text-muted" : "text-dim", "line-through decoration-line decoration-1")}>{t.from}</span>
                        <ArrowRight className={cn("h-4 w-4 shrink-0", selected ? "text-accent" : "text-dim")} aria-hidden />
                        <span>{t.to}</span>
                      </span>
                      <span
                        aria-hidden
                        className={cn("h-1.5 w-1.5 rounded-full transition-colors", selected ? "bg-accent" : "bg-transparent group-hover:bg-accent/60")}
                      />
                    </button>
                    {!desktop && (
                      <AnimatePresence initial={false}>
                        {selected && (
                          <motion.div
                            id={panelId}
                            key="panel"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="pb-8 pt-1">
                              <Detail t={t} />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {desktop && (
            <div className="relative">
              <div className="sticky top-28">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.id}
                    id={`thinking-panel-${current.id}`}
                    role="tabpanel"
                    aria-labelledby={`thinking-tab-${current.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="card p-6 xl:p-8"
                  >
                    <p className="mb-6 text-display-md font-medium leading-tight">
                      <span className="text-muted">{current.from}</span>{" "}
                      <span className="text-accent">→</span> {current.to}
                    </p>
                    <Detail t={current} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
