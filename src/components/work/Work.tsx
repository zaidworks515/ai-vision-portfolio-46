import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { archive, capabilities, projects, type CapabilityId } from "@/data/projects";
import { cn } from "@/lib/utils";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal, EASE } from "../ui/Reveal";
import { FlagshipCard } from "./FlagshipCard";
import { ProjectCard } from "./ProjectCard";
import { Archive } from "./Archive";

/** Desktop column spans for the cards after the flagship, in an alternating rhythm. */
const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7", "md:col-span-7", "md:col-span-5"];

export function Work() {
  const [filter, setFilter] = useState<CapabilityId | null>(null);
  const [flagship, ...rest] = projects;
  const active = capabilities.find((c) => c.id === filter) ?? null;

  const featuredCount = filter ? projects.filter((p) => p.capabilities.includes(filter)).length : projects.length;
  const archiveCount = filter ? archive.filter((p) => p.capabilities.includes(filter)).length : archive.length;
  const isDim = (caps: CapabilityId[]) => Boolean(filter && !caps.includes(filter));

  return (
    <section id="work" aria-labelledby="work-title" className="section">
      <div className="container">
        <SectionHeading
          id="work-title"
          index="01"
          label="Selected work"
          title={
            <>
              Systems I&apos;ve shipped, <span className="serif-accent text-accent">and what made them hard.</span>
            </>
          }
          lead="Problem, approach and measured result for each. Filter by capability."
        />

        {/* Capability → project relationship */}
        <Reveal className="mb-10">
          <div role="group" aria-label="Filter projects by capability" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <FilterChip active={!filter} onClick={() => setFilter(null)}>
              All work
            </FilterChip>
            {capabilities.map((c) => (
              <FilterChip key={c.id} active={filter === c.id} onClick={() => setFilter(filter === c.id ? null : c.id)}>
                {c.label}
              </FilterChip>
            ))}
          </div>

          <div className="mt-4 min-h-[4.5rem]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filter ?? "all"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="flex flex-col gap-3 rounded-2xl border border-line/70 bg-surface/50 px-4 py-3.5 md:flex-row md:items-center md:justify-between"
              >
                <p className="text-[0.9rem] text-muted" aria-live="polite">
                  {active ? (
                    <>
                      <span className="text-fg">{active.label}.</span> {active.blurb}{" "}
                      <span className="whitespace-nowrap font-mono text-[0.72rem] text-dim">
                        {featuredCount} case {featuredCount === 1 ? "study" : "studies"} · {archiveCount} archive
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-fg">{projects.length} case studies</span> · {archive.length} smaller projects
                    </>
                  )}
                </p>
                {active && (
                  <ul className="flex flex-wrap gap-1.5 md:max-w-[50%] md:justify-end" aria-label={`${active.label} tools`}>
                    {active.tools.map((t) => (
                      <li key={t} className="chip text-fg/80">{t}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <Reveal>
          <FlagshipCard project={flagship} dimmed={isDim(flagship.capabilities)} />
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-12">
          {rest.map((p, i) => {
            const last = i === rest.length - 1 && rest.length % 2 === 1;
            return (
              <Reveal key={p.slug} delay={(i % 2) * 0.08} className={cn(last ? "md:col-span-12" : SPANS[i % SPANS.length], "flex")}>
                <ProjectCard project={p} index={i + 2} dimmed={isDim(p.capabilities)} layout={last ? "split" : "stacked"} className="w-full" />
              </Reveal>
            );
          })}
        </div>

        <Archive filter={filter} />
      </div>
    </section>
  );
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 whitespace-nowrap rounded-full border px-3.5 text-[0.82rem] transition-colors duration-300",
        active ? "border-fg bg-fg text-ink" : "hl border-line text-muted",
      )}
    >
      {children}
    </button>
  );
}
