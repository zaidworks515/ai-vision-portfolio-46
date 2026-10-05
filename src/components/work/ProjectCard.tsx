import { useRef, useState, type PointerEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Play } from "lucide-react";
import { capabilities, type Project } from "@/data/projects";
import { cn, pad2 } from "@/lib/utils";
import { prefetchCaseStudy } from "@/lib/lazy";
import { ProjectMedia } from "./ProjectMedia";

type Props = {
  project: Project;
  index: number;
  dimmed?: boolean;
  layout?: "stacked" | "split";
  className?: string;
};

const capLabel = (id: string) => capabilities.find((c) => c.id === id)?.short ?? id;

export function ProjectCard({ project, index, dimmed, layout = "stacked", className }: Props) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const split = layout === "split";

  return (
    <Link
      ref={ref}
      to={`/work/${project.slug}`}
      state={{ fromHome: true }}
      preventScrollReset
      aria-label={`${project.title}: read the case study`}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") setHovered(true);
        prefetchCaseStudy();
      }}
      onPointerLeave={() => setHovered(false)}
      onPointerMove={onMove}
      onFocus={prefetchCaseStudy}
      className={cn(
        "lift group relative flex overflow-hidden rounded-[1.25rem] border border-line/80 bg-surface shadow-card transition-[opacity,filter] duration-500 ease-out-expo hover:border-accent/30",
        split ? "flex-col md:flex-row" : "flex-col",
        dimmed && "opacity-30 grayscale-[60%] hover:opacity-80",
        className,
      )}
    >
      {/* cursor spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(var(--accent) / 0.06), transparent 45%)" }}
      />

      {project.poster && (
        <div className={cn("relative shrink-0 border-line/80", split ? "aspect-[16/10] md:aspect-auto md:w-[42%] md:border-r" : "aspect-[16/10] border-b")}>
          <ProjectMedia poster={project.poster} clip={project.clip} clipSm={project.clipSm} hovered={hovered} sizes={split ? "(min-width: 768px) 40vw, 100vw" : "(min-width: 1024px) 45vw, 100vw"} />
          <div className="pointer-events-none absolute left-3 top-3 flex gap-1.5">
            <span className="chip border-line/60 bg-ink/70 backdrop-blur">{project.kind}</span>
            {project.videos?.length ? (
              <span className="chip border-line/60 bg-ink/70 backdrop-blur">
                <Play className="h-2.5 w-2.5 fill-current" aria-hidden /> Demo
              </span>
            ) : null}
          </div>
        </div>
      )}

      <div className={cn("relative flex flex-1 flex-col p-5 sm:p-6", split && "md:justify-center md:p-9")}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-dim">
            <span className="text-accent">{pad2(index)}</span> · {project.context}
          </p>
          <span className="font-mono text-[0.68rem] text-dim">{project.year}</span>
        </div>
        <h3 className="text-[1.45rem] font-medium leading-tight tracking-tight sm:text-[1.6rem]">{project.title}</h3>
        <p className={cn("mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty", !split && "line-clamp-4")}>{project.oneLiner}</p>

        <div className="mt-auto flex items-end justify-between gap-4 pt-6">
          <ul className="flex flex-wrap gap-1.5" aria-label="Capabilities">
            {project.capabilities.slice(0, split ? 5 : 3).map((c) => (
              <li key={c} className="chip">{capLabel(c)}</li>
            ))}
          </ul>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
