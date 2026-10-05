import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { archive, type CapabilityId } from "@/data/projects";
import { cn } from "@/lib/utils";
import { EASE } from "../ui/Reveal";

const INITIAL = 6;

export function Archive({ filter }: { filter: CapabilityId | null }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = filter
    ? [...archive].sort((a, b) => Number(b.capabilities.includes(filter)) - Number(a.capabilities.includes(filter)))
    : archive;
  const items = expanded ? sorted : sorted.slice(0, INITIAL);

  return (
    <div className="mt-24">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow mb-3">More from the archive</p>
          <h3 className="text-display-md font-medium">
            Smaller builds, <span className="serif-accent text-accent">same habits.</span>
          </h3>
        </div>
        <p className="font-mono text-[0.7rem] text-dim">{archive.length} projects · client and product work</p>
      </div>

      <ul className="border-t border-line/80">
        <AnimatePresence initial={false}>
          {items.map((item) => {
            const match = !filter || item.capabilities.includes(filter);
            const link = item.links?.[0];
            return (
              <motion.li
                key={item.title}
                layout="position"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn("border-b border-line/80 transition-opacity duration-500", !match && "opacity-30")}
              >
                <div className="grid gap-x-8 gap-y-2 py-5 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)_auto] md:items-baseline">
                  <div>
                    <p className="text-[1.02rem] font-medium leading-snug">{item.title}</p>
                    <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-dim">
                      {item.kind}
                      {item.year && ` · ${item.year}`}
                      {item.status && <span className="text-accent"> · {item.status}</span>}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.92rem] leading-relaxed text-muted text-pretty">{item.oneLiner}</p>
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      {item.metric && <span className="chip border-live/30 text-fg">{item.metric}</span>}
                      {item.tags.map((t) => (
                        <span key={t} className="font-mono text-[0.66rem] text-dim after:ml-1.5 after:content-['·'] last:after:content-none">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:text-right">
                    {link && (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 hl-text font-mono text-[0.72rem] text-muted"
                        aria-label={`${item.title}: ${link.label}`}
                      >
                        {link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    )}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>

      {archive.length > INITIAL && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-6 inline-flex items-center gap-2 hl rounded-full border border-line px-4 py-2 text-[0.85rem] text-muted"
        >
          <Plus className={cn("h-4 w-4 transition-transform duration-300", expanded && "rotate-45")} aria-hidden />
          {expanded ? "Show fewer" : `Show all ${archive.length}`}
        </button>
      )}
    </div>
  );
}
