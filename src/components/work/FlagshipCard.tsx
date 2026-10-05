import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { prefetchCaseStudy } from "@/lib/lazy";
import { Metric } from "../ui/Metric";
import { ProjectMedia } from "./ProjectMedia";

export function FlagshipCard({ project, dimmed }: { project: Project; dimmed?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const metrics = project.metrics?.slice(0, 3) ?? [];
  const reel = project.videos?.[0];
  const to = `/work/${project.slug}`;

  return (
    <article
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] border border-line/80 bg-surface shadow-card transition-[opacity,filter] duration-500",
        dimmed && "opacity-30 grayscale-[60%]",
      )}
      onPointerEnter={(e) => {
        prefetchCaseStudy();
        if (e.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30 [background-size:40px_40px] mask-radial" />
      <div className="relative grid items-center gap-10 p-5 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14 lg:p-12">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-gold/60 bg-gold/20 text-fg">01 · Flagship</span>
            <span className="chip">{project.kind}</span>
            {project.status && (
              <span className="chip">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" aria-hidden />
                {project.status}
              </span>
            )}
          </div>
          <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.16em] text-dim">
            {project.context} · {project.year}
          </p>
          <h3 className="mt-2 text-display-md font-medium">{project.title}</h3>
          <p className="mt-4 max-w-[38rem] text-[1.02rem] leading-relaxed text-muted text-pretty">{project.oneLiner}</p>

          <div className="mt-8 grid grid-cols-1 gap-6 border-t border-line/80 pt-6 sm:grid-cols-3">
            {metrics.map((m) => (
              <Metric key={m.value} value={m.value} label={m.label} />
            ))}
          </div>
          {project.metricsSource && <p className="mt-5 font-mono text-[0.64rem] leading-relaxed text-dim">{project.metricsSource}</p>}

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto lg:pt-8">
            <Link
              to={to}
              state={{ fromHome: true }}
              preventScrollReset
              onFocus={prefetchCaseStudy}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-fg px-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-accent"
            >
              Read the case study
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
            </Link>
          </div>
        </div>

        {project.poster && (
          <figure className="mx-auto w-full max-w-[20rem] lg:w-[20rem] xl:w-[22rem] xl:max-w-none">
            <Link
              to={to}
              state={{ fromHome: true }}
              preventScrollReset
              aria-label={`${project.title}: watch the ${reel?.duration ?? ""} reel`}
              className="group relative block aspect-[9/16] overflow-hidden rounded-[1.6rem] border border-line/80 bg-ink shadow-[0_30px_70px_-30px_hsl(211_80%_25%/0.45)] ring-1 ring-accent/10"
            >
              <ProjectMedia
                poster={project.poster}
                clip={project.clip}
                clipSm={project.clipSm}
                hovered={hovered}
                showBadge={false}
                eager
                sizes="(min-width: 1280px) 352px, 320px"
              />
              <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[hsl(213_100%_10%/0.75)] to-transparent" />
              <span className="pointer-events-none absolute left-3 top-3">
                <span className="chip border-line/60 bg-ink/85 text-fg backdrop-blur">
                  <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" aria-hidden /> Reel{reel?.duration ? ` · ${reel.duration}` : ""}
                </span>
              </span>
              <span className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center gap-3 text-white">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-[#0b1f3a] shadow-lg transition-transform duration-500 ease-out-expo group-hover:scale-110">
                  <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
                </span>
                <span className="text-[0.92rem] font-medium leading-tight">
                  Watch the reel
                  <span className="block font-mono text-[0.66rem] font-normal opacity-80">with sound · in the case study</span>
                </span>
              </span>
            </Link>
          </figure>
        )}
      </div>
    </article>
  );
}
