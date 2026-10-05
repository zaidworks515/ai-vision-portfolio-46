import { useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/data/projects";
import { cn, drive } from "@/lib/utils";
import { ProjectMedia } from "../work/ProjectMedia";

/**
 * The real demo recordings live on Google Drive. Nothing from Drive loads until
 * the visitor presses play. Before that it is our own poster (and a few-second
 * muted loop), so the case study opens instantly.
 */
export function VideoEmbed({ project }: { project: Project }) {
  const videos = project.videos ?? [];
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    setActive(0);
    setPlaying(false);
  }, [project.slug]);

  if (!videos.length || !project.poster) return null;
  const video = videos[active];
  const portrait = project.poster.ratio < 1;

  return (
    <div>
      <div
        className={cn(
          "relative overflow-hidden rounded-[1.25rem] border border-line/80 bg-ink",
          portrait ? "mx-auto h-[min(72vh,760px)] max-w-full" : "aspect-video",
        )}
        style={portrait ? { aspectRatio: String(project.poster.ratio) } : undefined}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
      >
        {playing ? (
          <iframe
            key={video.driveId}
            src={drive.preview(video.driveId)}
            title={`${project.title}: ${video.label}`}
            allow="autoplay; fullscreen; picture-in-picture"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 block h-full w-full text-left"
            aria-label={`Play ${video.label}${video.duration ? `, ${video.duration}` : ""}`}
          >
            <ProjectMedia poster={{ ...project.poster, fit: portrait ? "contain" : project.poster.fit }} clip={project.clip} clipSm={project.clipSm} hovered={hover} eager showBadge={false} sizes="(min-width: 1100px) 1100px, 100vw" />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <span className="absolute bottom-4 left-4 right-4 flex items-center gap-3 sm:bottom-6 sm:left-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-fg text-ink shadow-xl transition-transform duration-500 ease-out-expo group-hover:scale-110 sm:h-14 sm:w-14">
                <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden />
              </span>
              <span>
                <span className="block text-[0.95rem] font-medium text-fg">{video.label}</span>
                <span className="block font-mono text-[0.68rem] text-muted">
                  {video.duration ? `${video.duration} · ` : ""}full recording<span className="max-sm:hidden"> · loads from Google Drive</span>
                </span>
              </span>
            </span>
          </button>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        {videos.length > 1 ? (
          <div role="tablist" aria-label="Demo recordings" className="flex flex-wrap gap-1.5">
            {videos.map((v, i) => (
              <button
                key={v.driveId}
                role="tab"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i);
                  setPlaying(true);
                }}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-[0.78rem] transition-colors",
                  i === active ? "border-fg bg-fg text-ink" : "border-line text-muted hover:text-fg",
                )}
              >
                {v.label}
                {v.duration && <span className="ml-1.5 font-mono text-[0.66rem] opacity-70">{v.duration}</span>}
              </button>
            ))}
          </div>
        ) : (
          <span />
        )}
        <a
          href={drive.view(video.driveId)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 font-mono text-[0.7rem] text-muted transition-colors hover:text-fg"
        >
          Open in Google Drive <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>
    </div>
  );
}
