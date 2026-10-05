import { ArrowUpRight, Award, Database, Download, FileText, GraduationCap, Languages } from "lucide-react";
import type { ReactNode } from "react";
import { awards, certifications, education, languages, openSource, profile } from "@/data/profile";
import { capabilities } from "@/data/projects";
import { SectionHeading } from "./ui/SectionHeading";
import { Reveal } from "./ui/Reveal";
import { ButtonLink } from "./ui/Button";

const datasets = [
  { name: "Cow Pose Estimation", href: "https://www.kaggle.com/datasets/zaidworks0508/cow-pose-estimation-dataset" },
  { name: "Cow Segmentation", href: "https://www.kaggle.com/datasets/zaidworks0508/cow-segmentation-dataset" },
  { name: "Cow Breed Classification", href: "https://www.kaggle.com/datasets/zaidworks0508/cow-breed-classification-dataset" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-t border-line/60">
      <div className="container">
        <SectionHeading
          id="about-title"
          index="05"
          label="About & resume"
          title={
            <>
              The short <span className="serif-accent text-accent">version.</span>
            </>
          }
        />

        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Portrait + summary + resume */}
          <Reveal className="card relative overflow-hidden">
            <div className="relative h-[19rem] overflow-hidden border-b border-line/80 bg-[radial-gradient(120%_90%_at_50%_100%,hsl(var(--accent)/0.18),transparent_60%)] sm:h-[22rem]">
              <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [background-size:32px_32px] mask-radial" />
              <img
                src={profile.photo}
                alt={`Portrait of ${profile.name}`}
                width={500}
                height={500}
                loading="lazy"
                decoding="async"
                className="absolute bottom-0 left-1/2 h-[112%] w-auto max-w-none -translate-x-1/2 object-contain object-bottom"
              />
              <span className="chip absolute left-4 top-4 bg-ink/70 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" aria-hidden /> {profile.location}
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-[1.5rem] font-medium tracking-tight">{profile.name}</p>
              <p className="text-muted">
                {profile.role} · {profile.currentCompany}
              </p>
              <p className="mt-5 text-[0.98rem] leading-relaxed text-muted text-pretty">{profile.summary}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={profile.resume.href} target="_blank" rel="noreferrer" icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}>
                  <span className="inline-flex items-center gap-2">
                    <FileText className="h-4 w-4" aria-hidden /> View resume
                  </span>
                </ButtonLink>
                <ButtonLink href={profile.resume.href} download={profile.resume.fileName} variant="secondary" icon={<Download className="h-4 w-4" aria-hidden />}>
                  Download PDF
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          {/* Core expertise */}
          <Reveal delay={0.08} className="card p-6 sm:p-8">
            <p className="eyebrow mb-6">Core expertise</p>
            <dl className="divide-y divide-line/70">
              {capabilities.map((c) => (
                <div key={c.id} className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_1fr] sm:gap-6">
                  <dt className="text-[0.92rem] text-fg">{c.label}</dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-1 text-[0.86rem] text-muted">
                    {c.tools.map((t) => (
                      <span key={t} className="after:ml-3 after:text-line after:content-['/'] last:after:content-none">
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard icon={<GraduationCap className="h-4 w-4" aria-hidden />} title="Education" delay={0}>
            <ul className="space-y-4">
              {education.map((e) => (
                <li key={e.title}>
                  <p className="text-[0.95rem] text-fg">{e.title}</p>
                  <p className="text-[0.85rem] text-muted">{e.org}</p>
                  <p className="font-mono text-[0.66rem] text-dim">
                    {e.period} · {e.place}
                  </p>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard icon={<Award className="h-4 w-4" aria-hidden />} title="Recognition" delay={0.05}>
            <ul className="space-y-3">
              {awards.map((a) => (
                <li key={a.title} className="grid grid-cols-[2.6rem_1fr] gap-2">
                  <span className="font-mono text-[0.7rem] text-accent">{a.year}</span>
                  <span className="text-[0.88rem] leading-snug text-muted">{a.title}</span>
                </li>
              ))}
            </ul>
          </InfoCard>

          <InfoCard icon={<FileText className="h-4 w-4" aria-hidden />} title="Certifications" delay={0.1}>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.title}>
                  <p className="text-[0.9rem] leading-snug text-fg">{c.title}</p>
                  <p className="font-mono text-[0.66rem] text-dim">{c.issuer}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-line/70 pt-5">
              <p className="mb-2 flex items-center gap-2 text-[0.85rem] text-fg">
                <Languages className="h-4 w-4 text-muted" aria-hidden /> Languages
              </p>
              <p className="text-[0.85rem] text-muted">
                {languages.map((l) => `${l.name} (${l.level.toLowerCase()})`).join(" · ")}
              </p>
            </div>
          </InfoCard>

          <InfoCard icon={<Database className="h-4 w-4" aria-hidden />} title="Open source" delay={0.15}>
            <p className="text-[0.88rem] leading-relaxed text-muted">
              Training data behind MeasureMates, published {openSource.date}.
            </p>
            <ul className="mt-4 space-y-1.5">
              {datasets.map((d) => (
                <li key={d.name}>
                  <a href={d.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-1.5 text-[0.88rem] text-fg">
                    <span className="link-underline">{d.name}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform group-hover:rotate-45" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[0.66rem] text-dim">1,300+ downloads on Kaggle · Oct 2026</p>
          </InfoCard>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon, title, children, delay }: { icon: ReactNode; title: string; children: ReactNode; delay: number }) {
  return (
    <Reveal delay={delay} className="card p-6">
      <p className="mb-5 flex items-center gap-2 text-[0.8rem] font-medium uppercase tracking-[0.14em] text-muted">
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-line text-fg">{icon}</span>
        {title}
      </p>
      {children}
    </Reveal>
  );
}
