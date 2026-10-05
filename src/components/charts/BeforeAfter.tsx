import { useState } from "react";
import type { BeforeAfterRow } from "@/data/thinking";
import { cn } from "@/lib/utils";
import { CHART } from "./chartTokens";

/**
 * Paired bars, one comparison per row (each row on its own scale, since the units
 * differ). Legend on top, value at each bar tip, per-bar hover/focus readout,
 * and a table twin.
 */
export function BeforeAfter({ title, rows, note }: { title: string; rows: BeforeAfterRow[]; note?: string }) {
  const [hover, setHover] = useState<string | null>(null);
  const fmt = (n: number) => n.toLocaleString("en-US");

  return (
    <figure className="w-full">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <figcaption className="text-[0.85rem] text-fg">{title}</figcaption>
        <ul className="flex items-center gap-4 font-mono text-[0.66rem] text-muted" aria-label="Legend">
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: CHART.before }} /> Before
          </li>
          <li className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: CHART.after }} /> After
          </li>
        </ul>
      </div>

      <div className="space-y-5">
        {rows.map((r) => {
          const max = Math.max(r.before, r.after) * 1.08;
          const change = ((r.after - r.before) / r.before) * 100;
          const improved = r.better === "higher" ? change > 0 : change < 0;
          return (
            <div key={r.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <p className="text-[0.8rem] text-muted">
                  {r.label} <span className="text-dim">({r.unit}, {r.better} is better)</span>
                </p>
                <p className={cn("font-mono text-[0.72rem]", improved ? "text-fg" : "text-muted")}>
                  {change > 0 ? "+" : "−"}
                  {Math.abs(change).toFixed(0)}%
                </p>
              </div>
              {(["before", "after"] as const).map((k) => {
                const v = r[k];
                const id = `${r.label}-${k}`;
                const pct = (v / max) * 100;
                return (
                  <div
                    key={k}
                    tabIndex={0}
                    role="img"
                    aria-label={`${r.label}, ${k}: ${fmt(v)} ${r.unit}`}
                    onPointerEnter={() => setHover(id)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(id)}
                    onBlur={() => setHover(null)}
                    className="group relative flex h-[18px] items-center outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
                  >
                    <span
                      className="h-[10px] rounded-r-[4px] transition-[filter] duration-200"
                      style={{ width: `${pct}%`, background: CHART[k], filter: hover === id ? "brightness(1.18)" : undefined }}
                    />
                    <span className="ml-2 whitespace-nowrap font-mono text-[0.7rem] text-muted tabular">
                      {fmt(v)}
                      {hover === id && <span className="text-dim"> {r.unit} · {k}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {note && <p className="mt-4 font-mono text-[0.64rem] leading-relaxed text-dim">{note}</p>}

      <details className="mt-3 text-[0.8rem] text-muted">
        <summary className="hl-text cursor-pointer font-mono text-[0.68rem] text-dim">Show data table</summary>
        <table className="mt-2 w-full max-w-md text-left font-mono text-[0.72rem] tabular">
          <thead className="text-dim">
            <tr>
              <th className="py-1 font-normal">Metric</th>
              <th className="py-1 font-normal">Before</th>
              <th className="py-1 font-normal">After</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line/60">
                <td className="py-1">
                  {r.label} ({r.unit})
                </td>
                <td className="py-1">{fmt(r.before)}</td>
                <td className="py-1">{fmt(r.after)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  );
}
