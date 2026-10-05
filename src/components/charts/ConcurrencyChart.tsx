import { useState, type KeyboardEvent } from "react";
import { concurrencySweep } from "@/data/thinking";
import { useElementWidth } from "@/hooks/useElementWidth";
import { CHART } from "./chartTokens";

/**
 * Concurrency sweep (PERFORMANCE.md, TensorRT on, live stack).
 * Two measures with different units → two small multiples on a shared x-axis,
 * never a dual-axis plot. Crosshair snaps to the nearest concurrency level and
 * the readout lists both measures. Arrow keys move it when focused.
 */

const PANEL_H = 112;
const M = { top: 22, right: 56, bottom: 8, left: 40 };
const KNEE = 2; // index of concurrency 4

type Panel = { key: "rps" | "p50"; title: string; unit: string; max: number; ticks: number[] };
const PANELS: Panel[] = [
  { key: "rps", title: "Throughput", unit: "req/s", max: 140, ticks: [0, 70, 140] },
  { key: "p50", title: "Latency p50", unit: "ms", max: 300, ticks: [0, 150, 300] },
];

export function ConcurrencyChart() {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const data = concurrencySweep;
  const innerW = width - M.left - M.right;
  const x = (i: number) => M.left + (innerW * i) / (data.length - 1);
  const shown = hover ?? KNEE;

  const nearest = (clientX: number, rect: DOMRect) => {
    const px = clientX - rect.left - M.left;
    return Math.max(0, Math.min(data.length - 1, Math.round((px / innerW) * (data.length - 1))));
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const cur = hover ?? KNEE;
    setHover(Math.max(0, Math.min(data.length - 1, cur + (e.key === "ArrowRight" ? 1 : -1))));
  };

  const d = data[shown];

  return (
    <figure className="w-full min-w-0">
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <figcaption className="text-[0.85rem] text-fg">Throughput and latency vs. in-flight requests</figcaption>
        <p className="font-mono text-[0.68rem] text-dim">YOLO-seg · TensorRT · 8 GB budget</p>
      </div>

      <p aria-hidden className="mb-2 flex flex-wrap items-baseline gap-x-2 rounded-lg border border-line/70 bg-raised/60 px-3 py-1.5 text-[0.82rem]">
        <span className="font-mono text-[0.66rem] text-dim">concurrency {d.c}</span>
        <span className="font-medium text-fg">
          {d.rps} <span className="font-normal text-muted">req/s</span> · {d.p50} <span className="font-normal text-muted">ms p50</span>
        </span>
        {shown === KNEE && <span className="font-mono text-[0.66rem] text-accent">operating point</span>}
        <span className="ml-auto hidden font-mono text-[0.62rem] text-dim sm:inline">hover or ← → to inspect</span>
      </p>

      <div
        ref={ref}
        role="img"
        tabIndex={0}
        aria-label="Two line charts sharing an x-axis of concurrency 1 to 32. Throughput rises to 117.8 requests per second at concurrency 4, then stays flat near 120. Median latency stays near 33 ms up to concurrency 4, then roughly doubles with every doubling of concurrency, reaching 266 ms at 32."
        onKeyDown={onKey}
        onBlur={() => setHover(null)}
        onPointerMove={(e) => setHover(nearest(e.clientX, e.currentTarget.getBoundingClientRect()))}
        onPointerLeave={() => setHover(null)}
        className="relative w-full min-w-0 touch-pan-y overflow-hidden rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        {PANELS.map((p) => {
          const y = (v: number) => M.top + (PANEL_H - M.top - M.bottom) * (1 - v / p.max);
          const path = data.map((row, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(row[p.key]).toFixed(1)}`).join(" ");
          const last = data[data.length - 1];
          return (
            <svg key={p.key} width={width} height={PANEL_H} className="block overflow-visible" aria-hidden>
              <text x={M.left} y={11} fill="hsl(var(--fg))" fontSize={11.5} fontFamily="Geist, sans-serif">
                {p.title} <tspan fill={CHART.axis}>({p.unit})</tspan>
              </text>
              {/* operating-point band */}
              <rect x={x(KNEE) - 10} y={M.top - 4} width={20} height={PANEL_H - M.top - M.bottom + 4} fill="hsl(var(--accent) / 0.07)" rx={4} />
              {p.ticks.map((t) => (
                <g key={t}>
                  <line x1={M.left} x2={width - M.right} y1={y(t)} y2={y(t)} stroke={CHART.grid} strokeWidth={1} />
                  <text x={M.left - 8} y={y(t) + 3.5} textAnchor="end" fill={CHART.axis} fontSize={10} fontFamily="'Geist Mono', monospace" style={{ fontVariantNumeric: "tabular-nums" }}>
                    {t}
                  </text>
                </g>
              ))}
              <path d={path} fill="none" stroke={CHART.series} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              {data.map((row, i) => (
                <circle key={i} cx={x(i)} cy={y(row[p.key])} r={i === shown ? 5 : 3.5} fill={CHART.series} stroke={CHART.surface} strokeWidth={2} />
              ))}
              {/* direct label at the line end */}
              <text x={x(data.length - 1) + 10} y={y(last[p.key]) + 4} fill="hsl(var(--muted))" fontSize={10.5} fontFamily="'Geist Mono', monospace">
                {last[p.key]}
              </text>
            </svg>
          );
        })}

        {/* x axis */}
        <svg width={width} height={26} className="block" aria-hidden>
          {data.map((row, i) => (
            <text key={row.c} x={x(i)} y={14} textAnchor="middle" fill={i === shown ? "hsl(var(--fg))" : CHART.axis} fontSize={10} fontFamily="'Geist Mono', monospace">
              {row.c}
            </text>
          ))}
          {width >= 420 && (
            <text x={width - M.right + 10} y={14} fill={CHART.axis} fontSize={10} fontFamily="'Geist Mono', monospace">
              in-flight
            </text>
          )}
        </svg>

        {/* crosshair */}
        <span aria-hidden className="pointer-events-none absolute bottom-[26px] top-[18px] w-px bg-fg/30 transition-[left] duration-150" style={{ left: x(shown) }} />

      </div>

      <details className="mt-3 text-[0.8rem] text-muted">
        <summary className="hl-text cursor-pointer font-mono text-[0.68rem] text-dim">Show data table</summary>
        <table className="mt-2 w-full max-w-sm text-left font-mono text-[0.72rem] tabular">
          <thead className="text-dim">
            <tr>
              <th className="py-1 font-normal">Concurrency</th>
              <th className="py-1 font-normal">req/s</th>
              <th className="py-1 font-normal">p50 (ms)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((r) => (
              <tr key={r.c} className="border-t border-line/60">
                <td className="py-1">{r.c}</td>
                <td className="py-1">{r.rps}</td>
                <td className="py-1">{r.p50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
