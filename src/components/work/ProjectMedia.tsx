import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useFinePointer, usePrefersReducedMotion, useSaveData } from "@/hooks/useMediaQuery";

type Props = {
  poster: NonNullable<Project["poster"]>;
  clip?: string;
  /** ≤960 px version, used when the tile is small on screen (phones). */
  clipSm?: string;
  /** Parent hover state (precise pointers). Touch devices play while in view instead. */
  hovered?: boolean;
  sizes?: string;
  className?: string;
  eager?: boolean;
  showBadge?: boolean;
};

/**
 * Poster first; a short muted loop of the real demo only when the visitor shows
 * interest. The video element is not even created until then, so nothing heavy
 * loads with the page.
 */
export function ProjectMedia({ poster, clip, clipSm, hovered = false, sizes = "(min-width: 1024px) 50vw, 100vw", className, eager, showBadge = true }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const saveData = useSaveData();
  const [inView, setInView] = useState(false);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);

  const canPlay = Boolean(clip) && !reduced && !saveData;
  const wantPlay = canPlay && (fine ? hovered : inView);

  useEffect(() => {
    if (fine || !canPlay || !wrapRef.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.intersectionRatio >= 0.6), { threshold: [0, 0.6, 1] });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, [fine, canPlay]);

  // Pick the source once, when first armed: full resolution everywhere except phones.
  const [src, setSrc] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!wantPlay || src || !clip) return;
    setSrc(clipSm && window.innerWidth < 768 ? clipSm : clip);
  }, [wantPlay, src, clip, clipSm]);

  useEffect(() => {
    if (wantPlay) setArmed(true);
    const v = videoRef.current;
    if (!v) return;
    if (wantPlay) {
      v.play().catch(() => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  }, [wantPlay, armed, src]);

  const contain = poster.fit === "contain";
  const w = poster.width ?? 1280;
  const h = Math.round(w / poster.ratio);

  return (
    <div ref={wrapRef} className={cn("relative h-full w-full overflow-hidden bg-ink", className)}>
      <img
        src={poster.src}
        srcSet={`${poster.srcSm} ${Math.round(w / 2)}w, ${poster.src} ${w}w`}
        sizes={sizes}
        alt={poster.alt}
        width={w}
        height={h}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        style={poster.position && !contain ? { objectPosition: poster.position } : undefined}
        className={cn(
          "media-dim absolute inset-0 h-full w-full transition-transform duration-[1.2s] ease-out-expo",
          contain ? "object-contain p-4" : "object-cover object-center",
          hovered && "scale-[1.03]",
        )}
      />
      {armed && src && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          style={poster.position && !contain ? { objectPosition: poster.position } : undefined}
          className={cn(
            "media-dim absolute inset-0 h-full w-full transition-opacity duration-500",
            contain ? "object-contain p-4" : "object-cover object-center",
            playing ? "opacity-100" : "opacity-0",
            hovered && "scale-[1.03] transition-[opacity,transform] duration-[1.2s] ease-out-expo",
          )}
        />
      )}
      {clip && canPlay && showBadge && (
        <span
          aria-hidden
          className={cn(
            "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-ink/70 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted backdrop-blur transition-opacity duration-300",
            playing ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" /> demo loop
        </span>
      )}
    </div>
  );
}
