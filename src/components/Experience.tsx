import { useMemo, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, MapPin } from "lucide-react";
import { roles, type Highlight } from "@/data/experience";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal, EASE } from "./ui/Reveal";

/** "Name: what I did", where the name links to its case study when there is one. */
function NamedHighlight({ name, text, slug, confidential }: Exclude<Highlight, string>) {
  return (
    <>
      {slug ? (
        <Link
          to={`/work/${slug}`}
          state={{ fromHome: true }}
          preventScrollReset
          title={`Open the ${name} case study`}
          className="hl-text font-medium text-fg underline decoration-accent/40 decoration-1 underline-offset-4"
        >
          {name}
        </Link>
      ) : (
        <span className="font-medium text-fg">{name}</span>
      )}
      {": "}
      {text}
      {confidential && (
        <span className="chip ml-2 align-[0.1em]">
          <Lock className="h-3 w-3" aria-hidden /> Confidential
        </span>
      )}
    </>
  );
}

const toMonths = (ym: string) => {
  const [y, m] = ym.split("-").map(Number);
  return y * 12 + (m - 1);
};

/**
 * An interactive timeline. Roles overlap (contract work runs alongside
 * full-time roles), so they are drawn as spans on a shared time axis rather
 * than a single list. Each span is also the control that opens the role.
 */
export function Experience() {
  const [active, setActive] = useState(0);
  const role = roles[active];

  const axis = useMemo(() => {
    const now = new Date();
    const end = now.getFullYear() * 12 + now.getMonth();
    const start = Math.min(...roles.map((r) => toMonths(r.start)));
    const years: number[] = [];
    for (let y = Math.floor(start / 12); y <= Math.floor(end / 12); y++) years.push(y);
    return { start, end, span: end - start + 1, years };
  }, []);

  const pos = (ym?: string) => (((ym ? toMonths(ym) : axis.end) - axis.start) / axis.span) * 100;

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + roles.length) % roles.length;
    setActive(next);
    document.getElementById(`role-tab-${roles[next].id}`)?.focus();
  };

  return (
    <section id="experience" aria-labelledby="experience-title" className="section border-t border-line/60">
      <div className="container">
        <SectionHeading
          id="experience-title"
          index="03"
          label="Experience"
          title={
            <>
              Where the work <span className="serif-accent text-accent">happened.</span>
            </>
          }
          lead="Select a role."
        />

        <Reveal>
          <div className="card p-4 sm:p-6">
            {/* year axis */}
            <div className="relative ml-0 h-6 sm:ml-[13rem]" aria-hidden>
              {axis.years.map((y) => {
                const left = ((y * 12 - axis.start) / axis.span) * 100;
                if (left < 0 || left > 100) return null;
                return (
                  <span key={y} className="absolute top-0 -translate-x-1/2 font-mono text-[0.66rem] text-dim" style={{ left: `${left}%` }}>
                    {y}
                  </span>
                );
              })}
            </div>

            <div role="tablist" aria-label="Roles" aria-orientation="vertical" className="space-y-1.5">
              {roles.map((r, i) => {
                const selected = i === active;
                const left = pos(r.start);
                const width = Math.max(2.5, pos(r.end) - left + 100 / axis.span);
                return (
                  <button
                    key={r.id}
                    id={`role-tab-${r.id}`}
                    role="tab"
                    aria-selected={selected}
                    aria-controls="role-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKey(e, i)}
                    className={cn(
                      "group grid w-full items-center gap-x-4 gap-y-1.5 rounded-xl px-2 py-2 text-left transition-colors sm:grid-cols-[12.5rem_1fr]",
                      selected ? "bg-raised/70" : "hl",
                    )}
                  >
                    <span className="min-w-0">
                      <span className={cn("block truncate text-[0.9rem]", selected ? "text-fg" : "text-muted transition-colors group-hover:text-accent-hover")}>{r.company}</span>
                      <span className="block font-mono text-[0.64rem] text-dim">{r.period}</span>
                    </span>
                    <span className="relative block h-3 w-full rounded-full bg-raised">
                      {axis.years.map((y) => {
                        const l = ((y * 12 - axis.start) / axis.span) * 100;
                        return l > 0 && l < 100 ? <span key={y} aria-hidden className="absolute inset-y-0 w-px bg-line/70" style={{ left: `${l}%` }} /> : null;
                      })}
                      <span
                        className={cn(
                          "absolute inset-y-0 rounded-full transition-colors duration-300",
                          selected ? "bg-accent" : "bg-fg/25 group-hover:bg-accent/60",
                        )}
                        style={{ left: `${left}%`, width: `${Math.min(width, 100 - left)}%` }}
                      />
                      {r.current && (
                        <span aria-hidden className={cn("absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 animate-pulse-dot rounded-full", selected ? "bg-accent" : "bg-fg/40")} />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div id="role-panel" role="tabpanel" aria-labelledby={`role-tab-${role.id}`} className="mt-5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={role.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="card grid gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12"
            >
              {/* who and when, plus the tools used */}
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  {role.current && (
                    <span className="chip text-fg">
                      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" aria-hidden /> Current
                    </span>
                  )}
                  <span className="chip">{role.period}</span>
                  <span className="chip">
                    <MapPin className="h-3 w-3" aria-hidden /> {role.location}
                  </span>
                </div>
                <h3 className="mt-5 text-display-md font-medium">{role.title}</h3>
                <p className="mt-1 text-[1rem] text-muted">
                  {role.company}
                  {role.companyNote && <span className="text-dim"> · {role.companyNote}</span>}
                </p>
                <p className="mt-4 text-[0.92rem] italic text-dim">{role.context}</p>
                <p className="eyebrow mb-3 mt-8">Stack</p>
                <ul className="flex flex-wrap gap-1.5">
                  {role.stack.map((s) => (
                    <li key={s} className="chip text-fg/85">{s}</li>
                  ))}
                </ul>
              </div>

              {/* what the role delivered */}
              <div className="lg:border-l lg:border-line/80 lg:pl-10">
                <p className="eyebrow mb-4">Highlights</p>
                <ul className="space-y-3.5">
                  {role.highlights.map((h) => (
                    <li key={typeof h === "string" ? h : h.name} className="grid grid-cols-[1rem_1fr] gap-2 text-[0.95rem] leading-relaxed text-muted">
                      <span aria-hidden className="mt-[0.7rem] h-px w-3 bg-accent" />
                      <span className="text-pretty">
                        {typeof h === "string" ? h : <NamedHighlight {...h} />}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
