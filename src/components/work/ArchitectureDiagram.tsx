import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The Triton platform as it is actually wired (README §1, §6b, §7): clients →
 * gateway → one Triton with three backends → one GPU budget, with the console
 * watching and controlling the pool. Pure HTML/CSS so it stays crisp and cheap.
 */

const backends = [
  { name: "onnxruntime", models: ["YOLO detect / seg", "SCRFD faces", "custom ONNX"] },
  { name: "vLLM", models: ["Gemma 4 E4B · text + vision", "Qwen2.5-VL (AWQ)", "PaddleOCR-VL"] },
  { name: "python", models: ["Whisper STT", "TTS", "embeddings"] },
];

const reservations = [
  { name: "yolo-seg", w: 20 },
  { name: "gemma-4 · vLLM", w: 40 },
  { name: "whisper", w: 14 },
  { name: "embed", w: 7 },
];

export function ArchitectureDiagram({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <figure className={cn("relative", className)} aria-label="Architecture of the Triton inference platform">
      <div className={cn("grid gap-0", !compact && "md:grid-cols-[1fr_7.5rem] md:gap-3")}>
        <div>
          <Layer label="clients" note="HTTP · WebSocket">
            <div className="flex flex-wrap gap-1.5">
              {["apps", "RTSP cameras", "services", "Postman"].map((c) => (
                <span key={c} className="chip">{c}</span>
              ))}
            </div>
          </Layer>
          <Flow />
          <Layer label="gateway" note="OpenAI-compatible · FastAPI" accent>
            <p className="font-mono text-[0.7rem] leading-relaxed text-muted">
              /v1/chat · /v1/embeddings · /v1/audio · /v1/vision
              <span className="block text-dim">access keys · FIFO per model · per-origin limits · stream leases</span>
            </p>
          </Layer>
          <Flow delay />
          <Layer label="triton" note="explicit model control">
            <div className={cn("grid gap-1.5", compact ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-3")}>
              {backends.map((b) => (
                <div key={b.name} className="rounded-lg border border-line/80 bg-raised/60 px-2.5 py-2">
                  <p className="font-mono text-[0.68rem] text-fg">{b.name}</p>
                  {!compact && (
                    <ul className="mt-1 space-y-0.5">
                      {b.models.map((m) => (
                        <li key={m} className="text-[0.72rem] leading-snug text-muted">{m}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Layer>
          <Flow />
          <Layer label="gpu" note="one card · budget enforced as reservations">
            <div className="flex h-7 w-full overflow-hidden rounded-md bg-raised ring-1 ring-line/80">
              {reservations.map((r, i) => (
                <span
                  key={r.name}
                  style={{ width: `${r.w}%` }}
                  className={cn(
                    "flex h-full items-center overflow-hidden whitespace-nowrap border-r-2 border-surface px-1.5 font-mono text-[0.6rem]",
                    i === 1 ? "bg-accent/15 text-fg" : "bg-gold/25 text-fg",
                  )}
                  title={r.name}
                >
                  {r.w >= (compact ? 20 : 14) && <span className="truncate">{r.name}</span>}
                </span>
              ))}
              <span className="flex flex-1 items-center justify-end px-2 font-mono text-[0.6rem] text-dim">free to reserve</span>
            </div>
          </Layer>
        </div>

        <aside className={cn("mt-3 flex items-stretch", !compact && "md:mt-0")}>
          <div className={cn("flex w-full flex-row items-center justify-between gap-3 rounded-xl border border-dashed border-line px-3 py-3", !compact && "md:flex-col md:justify-center md:text-center")}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-accent">console</p>
            <p className="text-[0.72rem] leading-snug text-muted">
              GPU / VRAM telemetry, load · unload, profiler, logs
            </p>
          </div>
        </aside>
      </div>
      <figcaption className="mt-3 font-mono text-[0.64rem] text-dim">
        Diagram. Each loaded model reserves its full ceiling against the GPU budget. Segment widths are illustrative.
      </figcaption>
    </figure>
  );
}

function Layer({ label, note, accent, children }: { label: string; note: string; accent?: boolean; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl border bg-surface/80 px-3 py-2.5", accent ? "border-accent/40" : "border-line/80")}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className={cn("font-mono text-[0.68rem] uppercase tracking-[0.16em]", accent ? "text-accent" : "text-fg")}>{label}</p>
        <p className="truncate font-mono text-[0.62rem] text-dim">{note}</p>
      </div>
      {children}
    </div>
  );
}

function Flow({ delay }: { delay?: boolean }) {
  return (
    <div aria-hidden className="relative mx-auto h-6 w-px bg-line">
      <span
        className={cn(
          "absolute -left-[2px] top-0 h-[5px] w-[5px] rounded-full bg-accent shadow-[0_0_10px_2px_hsl(var(--accent)/0.5)] motion-reduce:hidden",
          "animate-[flow-down_1.6s_ease-in-out_infinite]",
          delay && "[animation-delay:0.8s]",
        )}
      />
    </div>
  );
}
