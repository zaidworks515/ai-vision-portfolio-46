import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/data/profile";
import { SignalRouter } from "./SignalRouter";
import { QuoteTicker } from "./QuoteTicker";
import { ButtonLink } from "./ui/Button";
import { SocialIcon } from "./ui/Icons";
import { Metric } from "./ui/Metric";
import { EASE } from "./ui/Reveal";

const evidence = [
  { value: "3+", label: "years building AI and ML systems" },
  { value: "20+", label: "AI projects delivered" },
  { value: "5", label: "kinds of models running on one GPU: vision, language, speech, search and OCR" },
  { value: "1,300+", label: "downloads of my open datasets on Kaggle" },
];

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

/** Portrait on the deep-blue band, the first thing a visitor sees. */
function IdentityCard() {
  return (
    <div className="theme-blue relative isolate flex min-h-[10.5rem] items-center rounded-[1.5rem] py-5 pl-[12rem] pr-5 shadow-[0_24px_50px_-28px_hsl(213_100%_20%/0.6)] sm:min-h-[12.5rem] sm:pl-[15.5rem] sm:pr-6">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden rounded-[1.5rem]">
        <div className="absolute inset-0 bg-grid opacity-60 [background-size:28px_28px]" />
        <div className="absolute -bottom-16 left-6 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,hsl(var(--gold)/0.35),transparent)]" />
      </div>
      {/* Shown at about its native 500 px on 2x screens, so it stays sharp. */}
      <img
        src={profile.photo}
        alt={`Portrait of ${profile.name}`}
        width={500}
        height={500}
        loading="eager"
        decoding="async"
        className="absolute bottom-0 left-[-6px] h-[196px] w-auto sm:h-[248px]"
      />
      <div className="flex flex-col justify-center">
        <p className="text-[1.25rem] font-medium leading-tight text-fg sm:text-[1.5rem]">{profile.name}</p>
        <p className="mt-1 text-[0.9rem] text-muted sm:text-[0.95rem]">
          {profile.role} · {profile.location.split(",")[0]}
        </p>
        <p className="mt-3 flex items-start gap-2 text-[0.8rem] leading-snug text-dim sm:text-[0.85rem]">
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 animate-pulse-dot rounded-full bg-live" aria-hidden />
          <span>
            Building AI systems at <span className="text-fg">{profile.currentCompany}</span>
          </span>
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-hidden pt-[calc(var(--nav-h)+2.5rem)] sm:pt-[calc(var(--nav-h)+3.5rem)]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,hsl(var(--tint))_0%,hsl(var(--ink))_88%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-radial opacity-90" />
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(closest-side,hsl(var(--gold)/0.16),transparent)]" />

      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div>
            <motion.div {...rise(0.05)} className="mb-10 mt-12 lg:hidden">
              <IdentityCard />
            </motion.div>

            <h1 id="hero-title" className="text-[clamp(2.4rem,4.4vw,4rem)] font-medium leading-[1] tracking-[-0.035em]">
              <motion.span {...rise(0.12)} className="block">
                I build models
              </motion.span>
              <motion.span {...rise(0.2)} className="block text-muted">
                that see, listen, read,
              </motion.span>
              <motion.span {...rise(0.28)} className="serif-accent block text-balance text-accent">
                and turn your words into action.
              </motion.span>
            </h1>

            <motion.p {...rise(0.34)} className="mt-8 max-w-[34rem] text-[1.05rem] leading-relaxed text-muted text-pretty sm:text-lg">
              I work on computer vision, speech and language models. I collect the data, train and fine-tune the models, and
              serve them on GPUs.
            </motion.p>

            <motion.div {...rise(0.4)} className="mt-8">
              <QuoteTicker />
            </motion.div>

            <motion.div {...rise(0.44)} className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink href="#work" size="lg" magnetic icon={<ArrowDown className="h-4 w-4" aria-hidden />}>
                See the work
              </ButtonLink>
              <ButtonLink
                href={profile.resume.href}
                target="_blank"
                rel="noreferrer"
                variant="secondary"
                size="lg"
                icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}
              >
                Resume
              </ButtonLink>
            </motion.div>

            <motion.ul {...rise(0.52)} className="mt-10 flex items-center gap-2" aria-label="Profiles">
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target={s.id === "email" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={s.id === "email" ? `Email ${s.handle}` : `${s.label}: ${s.handle}`}
                    title={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-line/80 text-muted transition-colors duration-300 hover:border-fg/40 hover:text-fg"
                  >
                    <SocialIcon id={s.id} className="h-[17px] w-[17px]" />
                  </a>
                </li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
          >
            <div className="mb-6 mt-16 hidden lg:block">
              <IdentityCard />
            </div>
            <SignalRouter />
          </motion.div>
        </div>

        <motion.div {...rise(0.7)} className="mt-20 border-t border-line/80 pt-8 sm:mt-24">
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {evidence.map((e) => (
              <Metric key={e.value} value={e.value} label={e.label} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
