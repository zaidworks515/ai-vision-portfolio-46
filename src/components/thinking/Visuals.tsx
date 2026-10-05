import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useLoop } from "@/hooks/useLoop";

/** Where requests actually wait: the GPU, not the queue. Also where Kafka does belong. */
export function QueueVisual() {
  const { ref, running } = useLoop<HTMLElement>(2, 100000);
  return (
    <figure
      ref={ref}
      className="space-y-4"
      aria-label="Diagram: the synchronous path has an empty queue in front of a saturated GPU; Kafka sits on a separate asynchronous lane."
    >
      <Lane label="synchronous request path">
        <Box>client</Box>
        <Arrow live={running} />
        <Box accent="muted">
          gateway queue
          <span className="mt-1 block font-mono text-[0.62rem] text-live">0 waiting</span>
        </Box>
        <Arrow live={running} delay />
        <Box accent="primary">
          GPU
          <span className="mt-1.5 block h-1.5 w-full overflow-hidden rounded-full bg-raised">
            <span className={cn("block h-full w-full rounded-full bg-accent", running && "animate-pulse")} />
          </span>
          <span className="mt-1 block font-mono text-[0.62rem] text-accent">saturated</span>
        </Box>
      </Lane>
      <Lane label="asynchronous lane, where Kafka goes">
        <Box>batch job</Box>
        <Arrow live={running} slow />
        <Box accent="gold">
          Kafka
          <span className="mt-1 block font-mono text-[0.62rem] text-muted">key = tenant:pipeline</span>
        </Box>
        <Arrow live={running} slow delay />
        <Box>
          workers
          <span className="mt-1 block font-mono text-[0.62rem] text-muted">retry · DLQ · node 2</span>
        </Box>
      </Lane>
      <figcaption className="font-mono text-[0.64rem] text-dim">Diagram from the platform's Kafka audit.</figcaption>
    </figure>
  );
}

function Lane({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="rounded-xl border border-line/80 bg-raised/50 p-3">
      <p className="mb-2.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-dim">{label}</p>
      <div className="flex items-stretch gap-1">{children}</div>
    </div>
  );
}

function Box({ children, accent }: { children: ReactNode; accent?: "primary" | "gold" | "muted" }) {
  return (
    <div
      className={cn(
        "flex-1 rounded-lg border px-2.5 py-2 text-[0.78rem] text-fg",
        accent === "primary" ? "border-accent/50 bg-accent/10" : accent === "gold" ? "border-gold/50 bg-gold/10" : "border-line bg-surface",
      )}
    >
      {children}
    </div>
  );
}

/** A connector with an arrowhead; while live, a request dot travels along it. */
function Arrow({ live, slow, delay }: { live: boolean; slow?: boolean; delay?: boolean }) {
  return (
    <span aria-hidden className="relative flex w-6 shrink-0 items-center">
      <span className="absolute inset-x-0 top-1/2 h-px bg-dim/60" />
      <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-dim" />
      {live && (
        <span
          className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_8px_2px_hsl(var(--accent)/0.5)]"
          style={{
            animation: `flow-x ${slow ? 2.4 : 1.1}s ease-in-out infinite`,
            animationDelay: delay ? (slow ? "1.2s" : "0.55s") : "0s",
          }}
        />
      )}
    </span>
  );
}

const BLOCKS = [
  { label: "doc_title", prompt: "OCR", h: "h-5", w: "w-2/3", tone: "read" },
  { label: "paragraph", prompt: "OCR", h: "h-10", w: "w-full", tone: "read" },
  { label: "table", prompt: "Table", h: "h-14", w: "w-full", tone: "table" },
  { label: "text · RTL", prompt: "OCR", h: "h-5", w: "w-3/4", tone: "read" },
  { label: "seal", prompt: "skip", h: "h-9", w: "w-1/3", tone: "skip" },
] as const;

/** Layout first, then the right reader per block, in reading order. Some blocks are never read. */
export function DocVisual() {
  const { ref, index, running } = useLoop<HTMLElement>(BLOCKS.length, 1100, -1);
  const active = BLOCKS[index];
  return (
    <figure ref={ref} aria-label="Diagram: a page split into layout blocks, each sent with its own prompt in reading order; the stamp is skipped.">
      <div className="mx-auto max-w-[19rem] rounded-xl border border-line bg-surface p-3">
        <div className="space-y-2">
          {BLOCKS.map((b, i) => {
            const on = i === index;
            const read = running && i < index;
            return (
              <div key={b.label} className="flex items-center gap-2">
                <span className={cn("w-4 shrink-0 text-right font-mono text-[0.6rem] transition-colors", on ? "text-accent" : "text-dim")}>{i + 1}</span>
                <div
                  className={cn(
                    "flex items-start justify-between rounded-md border px-2 py-1 transition-[box-shadow,border-color,background-color] duration-300",
                    b.h,
                    b.w,
                    b.tone === "skip" ? "border-dashed border-line" : b.tone === "table" ? "border-gold/60 bg-gold/[0.08]" : "border-fg/20 bg-fg/[0.04]",
                    on && (b.tone === "skip" ? "border-dim" : "border-accent shadow-[0_0_0_3px_hsl(var(--accent)/0.18)]"),
                    read && b.tone !== "skip" && "opacity-70",
                  )}
                >
                  <span className="font-mono text-[0.58rem] text-muted">{b.label}</span>
                  <span
                    className={cn(
                      "rounded px-1 font-mono text-[0.58rem] transition-transform duration-300",
                      b.tone === "skip" ? "text-dim line-through" : b.tone === "table" ? "bg-gold/25 text-fg" : "bg-accent/20 text-fg",
                      on && "scale-110",
                    )}
                  >
                    {b.prompt}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-3 h-4 border-t border-line/70 pt-2 font-mono text-[0.6rem] text-muted" aria-hidden>
          {running && active
            ? active.tone === "skip"
              ? `block ${index + 1} · ${active.label} → skipped, never sent to the reader`
              : `block ${index + 1} · ${active.label} → reader with prompt "${active.prompt}"`
            : "blocks are read in this order"}
        </p>
      </div>
      <figcaption className="mt-5 text-center font-mono text-[0.64rem] text-dim">
        Reading order · prompt per block · stamps and images never sent to the reader
      </figcaption>
    </figure>
  );
}

const FRAMES = 48;
const WINDOW = 16;
const SUMMARIES = ["“5 people, little movement”", "“quiet scene”", "“2 people walk in”"];

/** Detector per frame, VLM per window. */
export function ClocksVisual() {
  const { ref, index: frame, running } = useLoop<HTMLElement>(FRAMES, 110);
  const doneWindows = running ? Math.floor(frame / WINDOW) : SUMMARIES.length;
  return (
    <figure ref={ref} aria-label="Diagram: the detector ticks on every frame while the vision-language model summarises a window of frames every few seconds.">
      <div className="space-y-4 rounded-xl border border-line/80 bg-raised/50 p-4">
        <div>
          <p className="mb-2 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-dim">
            <span>detector · every frame</span>
            <span className="text-fg">~30 FPS</span>
          </p>
          <div className="flex h-6 items-end gap-[3px]">
            {Array.from({ length: FRAMES }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "w-full rounded-sm transition-colors duration-150",
                  i === frame && running ? "bg-accent" : i <= frame ? "bg-gold/70" : "bg-gold/25",
                )}
                style={{ height: `${55 + ((i * 37) % 45)}%` }}
              />
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 flex justify-between font-mono text-[0.62rem] uppercase tracking-[0.16em] text-dim">
            <span>VLM · per window</span>
            <span className="text-fg">every few seconds</span>
          </p>
          <div className="grid grid-cols-3 gap-[3px]">
            {SUMMARIES.map((t, i) => {
              const ready = i < doneWindows;
              return (
                <span
                  key={t}
                  className={cn(
                    "truncate rounded-md border px-2 py-1.5 text-[0.68rem] transition-all duration-500",
                    ready ? "border-accent/50 bg-accent/10 text-fg" : "border-dashed border-line text-dim",
                  )}
                >
                  {ready ? t : "summarising…"}
                </span>
              );
            })}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[0.64rem] text-dim">Diagram. Summaries paraphrase the kind of output shown in the demo.</figcaption>
    </figure>
  );
}
