import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, X } from "lucide-react";
import { capabilities, projects, type Project } from "@/data/projects";
import { TENSORRT_ROWS } from "@/data/thinking";
import { cn, pad2 } from "@/lib/utils";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useScrollLock } from "@/hooks/useScrollLock";
import { EASE } from "../ui/Reveal";
import { Metric } from "../ui/Metric";
import { VideoEmbed } from "./VideoEmbed";
import { PipelineStepper } from "./PipelineStepper";
import { ArchitectureDiagram } from "../work/ArchitectureDiagram";
import { ConcurrencyChart } from "../charts/ConcurrencyChart";
import { BeforeAfter } from "../charts/BeforeAfter";

const capLabel = (id: string) => capabilities.find((c) => c.id === id)?.label ?? id;

export default function CaseStudy({ project }: { project: Project }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dialogRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const i = projects.findIndex((p) => p.slug === project.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const fromHome = Boolean((location.state as { fromHome?: boolean } | null)?.fromHome);

  const close = useCallback(() => {
    if (fromHome) navigate(-1);
    else navigate("/", { replace: true, state: { scrollTo: "work" } });
  }, [fromHome, navigate]);

  useScrollLock(true);
  useFocusTrap(dialogRef, true, close);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    const prevTitle = document.title;
    document.title = `${project.title} | Zaid Ahmed`;
    return () => {
      document.title = prevTitle;
    };
  }, [project.slug, project.title]);

  const go = (p: Project) => navigate(`/work/${p.slug}`, { replace: true, state: location.state, preventScrollReset: true });
  const isTriton = project.slug === "triton-inference-platform";

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-title"
      tabIndex={-1}
      data-focus-self
      className="fixed inset-0 z-[80] outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div aria-hidden className="absolute inset-0 bg-[hsl(216_45%_6%/0.5)] backdrop-blur-sm" onClick={close} />

      <motion.div
        ref={scrollRef}
        onScroll={(e) => setScrolled((e.target as HTMLDivElement).scrollTop > 220)}
        className="absolute inset-0 overflow-y-auto overscroll-contain bg-ink sm:inset-x-3 sm:bottom-0 sm:top-3 sm:rounded-t-[1.75rem] sm:border sm:border-b-0 sm:border-line/80"
        initial={{ y: 40, opacity: 0.6 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* top bar */}
        <div className="sticky top-0 z-20 border-b border-line/70 bg-ink/85 backdrop-blur-xl">
          <div className="mx-auto flex h-14 max-w-[1180px] items-center justify-between gap-3 px-4 sm:px-6">
            <button
              type="button"
              onClick={close}
              className="inline-flex h-9 items-center gap-2 rounded-full border border-line px-3 text-[0.82rem] text-muted transition-colors hover:border-fg/40 hover:text-fg"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden /> <span className="max-sm:sr-only">All work</span>
            </button>
            <p className={cn("min-w-0 truncate text-[0.9rem] font-medium transition-opacity duration-300", scrolled ? "opacity-100" : "opacity-0")} aria-hidden={!scrolled}>
              {project.title}
            </p>
            <div className="flex items-center gap-1.5">
              <button type="button" onClick={() => go(prev)} className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-fg sm:inline-flex" aria-label={`Previous: ${prev.title}`}>
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => go(next)} className="hidden h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-fg sm:inline-flex" aria-label={`Next: ${next.title}`}>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={close} className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-fg text-ink" aria-label="Close case study">
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <article key={project.slug} className="mx-auto max-w-[1180px] px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
          {/* intro */}
          <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}>
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip text-accent">{pad2(i + 1)} / {pad2(projects.length)}</span>
              <span className="chip">{project.kind}</span>
              <span className="chip">{project.context}</span>
              <span className="chip">{project.year}</span>
              {project.status && (
                <span className="chip text-fg">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" aria-hidden /> {project.status}
                </span>
              )}
            </div>
            <h1 id="case-title" className="mt-6 max-w-[18ch] text-display-lg font-medium text-balance">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[46rem] text-[1.1rem] leading-relaxed text-muted text-pretty sm:text-[1.25rem]">{project.oneLiner}</p>

            {(project.github?.length || project.links?.length || project.liveUrl) && (
              <div className="mt-7 flex flex-wrap gap-2">
                {project.liveUrl && <ExtLink href={project.liveUrl}>Live</ExtLink>}
                {project.github?.map((g) => (
                  <ExtLink key={g.href} href={g.href} icon={<Github className="h-3.5 w-3.5" aria-hidden />}>
                    {g.label}
                  </ExtLink>
                ))}
                {project.links?.map((l) => (
                  <ExtLink key={l.href} href={l.href}>
                    {l.label}
                  </ExtLink>
                ))}
              </div>
            )}
          </motion.header>

          {/* media */}
          <motion.div className="mt-10" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.18 }}>
            {project.videos?.length ? (
              <VideoEmbed project={project} />
            ) : isTriton ? (
              <div className="rounded-[1.25rem] border border-line/80 bg-surface/60 p-4 sm:p-8">
                <ArchitectureDiagram />
                {project.videoNote && <p className="mt-4 font-mono text-[0.7rem] text-dim">{project.videoNote}</p>}
              </div>
            ) : null}
          </motion.div>

          {/* body: every aspect, at a glance */}
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <Panel label="Problem">
              <p className="text-[1.02rem] leading-relaxed text-fg text-pretty">{project.problem}</p>
              {project.challenges.length > 0 && (
                <ul className="mt-4 space-y-1.5 border-t border-line/70 pt-4">
                  {project.challenges.map((c) => (
                    <Bullet key={c}>{c}</Bullet>
                  ))}
                </ul>
              )}
            </Panel>

            <Panel label="What I built">
              <ul className="space-y-1.5">
                {project.built.map((b) => (
                  <Bullet key={b} accent>
                    {b}
                  </Bullet>
                ))}
              </ul>
            </Panel>

            <Panel label="How it works" className="md:col-span-2">
              {isTriton && project.videos?.length ? (
                <div className="mb-6">
                  <ArchitectureDiagram />
                </div>
              ) : null}
              <PipelineStepper steps={project.pipeline} />
            </Panel>

            <Panel label="Key insight" accent>
              <p className="text-[1.25rem] font-medium leading-snug tracking-tight">{project.insight.title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted text-pretty">{project.insight.body}</p>
            </Panel>

            <Panel label="Result">
              <p className="text-[1.02rem] leading-relaxed text-fg text-pretty">{project.outcome}</p>
              {project.metrics?.length ? (
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line/70 pt-4">
                  {project.metrics.map((m) => (
                    <Metric key={m.value} value={m.value} label={m.label} />
                  ))}
                </div>
              ) : null}
              {project.metricsSource && <p className="mt-4 font-mono text-[0.64rem] leading-relaxed text-dim">{project.metricsSource}</p>}
            </Panel>

            {isTriton && (
              <>
                <Panel label="Measured · concurrency">
                  <ConcurrencyChart />
                </Panel>
                <Panel label="Measured · TensorRT">
                  <BeforeAfter title="Once the config path actually applied it" rows={TENSORRT_ROWS} note="Cost: +772 MB VRAM, one-time ~90 s engine build." />
                </Panel>
              </>
            )}

            <Panel label="Stack" className="md:col-span-2">
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s} className="chip text-fg/85">{s}</li>
                ))}
                {project.capabilities.map((c) => (
                  <li key={c} className="chip border-accent/30 bg-accent/[0.06] text-accent">{capLabel(c)}</li>
                ))}
              </ul>
              {project.provenance && <p className="mt-3 text-[0.82rem] text-dim">{project.provenance}</p>}
            </Panel>

            {project.gallery?.length ? (
              <div className="grid gap-4 sm:grid-cols-2 md:col-span-2">
                {project.gallery.map((g) => (
                  <figure key={g.src} className="overflow-hidden rounded-2xl border border-line/80 bg-ink">
                    <img src={g.src} alt={g.alt} loading="lazy" decoding="async" width={1280} height={Math.round(1280 / g.ratio)} className="media-dim w-full" />
                    <figcaption className="border-t border-line/70 px-4 py-2.5 text-[0.8rem] text-muted">{g.alt}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
          </div>

          {/* next */}
          <Link
            to={`/work/${next.slug}`}
            replace
            state={location.state}
            preventScrollReset
            className="group mt-12 flex items-center justify-between gap-6 rounded-[1.5rem] border border-line/80 bg-surface/60 p-6 transition-colors hover:border-fg/30 sm:p-10"
          >
            <span className="min-w-0">
              <span className="eyebrow">Next case study</span>
              <span className="mt-3 block truncate text-display-md font-medium">{next.title}</span>
              <span className="mt-2 line-clamp-2 block max-w-[40rem] text-[0.95rem] text-muted">{next.oneLiner}</span>
            </span>
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 ease-out-expo group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
              <ArrowRight className="h-5 w-5" aria-hidden />
            </span>
          </Link>
        </article>
      </motion.div>
    </motion.div>
  );
}

function Panel({ label, children, className, accent }: { label: string; children: ReactNode; className?: string; accent?: boolean }) {
  return (
    <section className={cn("min-w-0 rounded-2xl border p-5 sm:p-6", accent ? "border-accent/30 bg-accent/[0.05]" : "border-line/80 bg-surface shadow-card", className)}>
      <h2 className="eyebrow mb-4 flex items-center gap-2.5">
        <span aria-hidden className="h-px w-5 bg-accent" />
        {label}
      </h2>
      {children}
    </section>
  );
}

function Bullet({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <li className="grid grid-cols-[1.1rem_1fr] gap-2 text-[0.95rem] leading-relaxed text-muted">
      <span aria-hidden className={cn("mt-[0.72rem] h-px w-3", accent ? "bg-accent" : "bg-fg/40")} />
      <span className="text-pretty">{children}</span>
    </li>
  );
}

function ExtLink({ href, children, icon }: { href: string; children: ReactNode; icon?: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3.5 text-[0.82rem] text-muted transition-colors hover:border-fg/40 hover:text-fg"
    >
      {icon}
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
    </a>
  );
}
