import { useState } from "react";
import { ArrowUpRight, BadgeCheck, ChevronDown, Linkedin } from "lucide-react";
import { RECOMMENDATION_TOTAL, RECOMMENDATIONS_URL, type Recommendation } from "@/data/recommendations";
import { useRecommendations } from "@/hooks/useRecommendations";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";

const asOf = (iso: string) => {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? null : d.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

/** The key line as a pull-quote; falls back to the first sentence when no highlight is set. */
function pullQuote(rec: Recommendation) {
  if (rec.highlight && rec.text.includes(rec.highlight)) return rec.highlight;
  const first = rec.text.split(/(?<=[.!?])\s/)[0];
  return first.length > 160 ? `${first.slice(0, 157)}…` : first;
}

function Avatar({ rec }: { rec: Recommendation }) {
  const [failed, setFailed] = useState(false);
  const initials = rec.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  if (!rec.photo || failed) {
    return (
      <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-raised font-mono text-sm text-muted">
        {initials}
      </span>
    );
  }
  return (
    <img
      src={rec.photo}
      alt={`${rec.name}`}
      width={48}
      height={48}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-12 w-12 shrink-0 rounded-full border border-line object-cover"
    />
  );
}

function Card({ rec }: { rec: Recommendation }) {
  const [open, setOpen] = useState(false);
  const roleLine = rec.designation && rec.company ? `${rec.designation} · ${rec.company}` : rec.company ? `Currently at ${rec.company}` : rec.designation;
  const verified = asOf(rec.verifiedOn);
  return (
    <figure className="lift group card relative flex h-full flex-col p-6 hover:border-accent/30 sm:p-8">
      <span aria-hidden className="serif-accent pointer-events-none absolute right-6 top-2 select-none text-[6rem] leading-none text-gold/70">
        ”
      </span>
      <blockquote cite={RECOMMENDATIONS_URL} className="relative pr-10">
        <p className="text-[1.3rem] font-medium leading-snug tracking-tight text-fg text-balance sm:text-[1.45rem]">
          “{pullQuote(rec)}”
        </p>
      </blockquote>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`rec-full-${rec.id}`}
        className="mt-5 inline-flex items-center gap-1.5 hl-text self-start text-[0.82rem] font-medium text-accent"
      >
        {open ? "Hide full recommendation" : "Read full recommendation"}
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div id={`rec-full-${rec.id}`} className="mt-3 space-y-3 border-l-2 border-gold/60 pl-4 text-[0.95rem] leading-relaxed text-muted">
          {rec.text.split(/\n{2,}/).map((para, k) => (
            <p key={k} className="text-pretty">{para}</p>
          ))}
        </div>
      )}

      <figcaption className="mt-auto pt-7">
        <div className="flex items-center gap-4 border-t border-line/80 pt-6">
          <Avatar rec={rec} />
          <div className="min-w-0">
            <p className="text-[1rem] font-medium text-fg">{rec.name}</p>
            {roleLine && <p className="truncate text-[0.85rem] text-muted">{roleLine}</p>}
            {rec.relationship && <p className="text-[0.8rem] text-dim">{rec.relationship}</p>}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={rec.profileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hl-text text-[0.82rem] text-muted"
            aria-label={`${rec.name} on LinkedIn`}
          >
            <Linkedin className="h-3.5 w-3.5" aria-hidden /> Profile <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          <a
            href={RECOMMENDATIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hl-text text-[0.82rem] text-muted"
            aria-label={`Verify ${rec.name}'s recommendation on LinkedIn`}
          >
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden /> Verify on LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
          {verified && <span className="font-mono text-[0.64rem] text-dim">details as of {verified}</span>}
        </div>
      </figcaption>
    </figure>
  );
}

export function Recommendations() {
  const { items } = useRecommendations();

  return (
    <section id="recommendations" aria-labelledby="recommendations-title" className="section section-tint border-y border-line/60">
      <div className="container">
        <SectionHeading
          id="recommendations-title"
          index="04"
          label="Recommendations"
          title={
            <>
              What it&apos;s like <span className="serif-accent text-accent">to work with me.</span>
            </>
          }
          lead={`${RECOMMENDATION_TOTAL} recommendations on LinkedIn. The public ones, verbatim.`}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {items.map((rec, i) => (
            <Reveal key={rec.id} delay={i * 0.08} className="h-full">
              <Card rec={rec} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-line/70 px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[0.92rem] text-muted">
            <span className="text-fg">{RECOMMENDATION_TOTAL} recommendations</span> on LinkedIn. The rest are visible to signed-in members.
          </p>
          <a
            href={RECOMMENDATIONS_URL}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex h-10 items-center gap-2 hl rounded-full border border-line px-4 text-[0.85rem] text-fg"
          >
            <Linkedin className="h-4 w-4" aria-hidden /> Read all on LinkedIn
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
