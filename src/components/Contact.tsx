import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, MapPin, Phone } from "lucide-react";
import { profile, socials } from "@/data/profile";
import { ButtonLink } from "./ui/Button";
import { ContactChooser } from "./ContactChooser";
import { Monogram, SocialIcon } from "./ui/Icons";
import { Reveal } from "./ui/Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="theme-blue relative isolate overflow-hidden pb-10 pt-24 md:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem] bg-[radial-gradient(60%_80%_at_50%_100%,hsl(var(--accent)/0.16),transparent_70%)]" />

      <div className="container">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-accent">06</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            Contact
          </p>
          <h2 id="contact-title" className="max-w-[18ch] text-display-xl font-medium text-balance">
            Have a model that works in a notebook <span className="serif-accent text-accent">but not yet in production?</span>
          </h2>
          <p className="mt-8 max-w-[36rem] text-lg leading-relaxed text-muted text-pretty">
            Whether it&apos;s cameras, calls or documents, I can help with the models and the GPUs that run them. Tell me what you&apos;re building.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-3">Email</p>
            <div className="flex flex-wrap items-center gap-3">
              <a href={`mailto:${profile.email}`} className="link-underline break-all text-[1.35rem] font-medium tracking-tight text-fg sm:text-[2rem]">
                {profile.email}
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-10 items-center gap-2 hl rounded-full border border-line px-3.5 text-[0.8rem] text-muted"
                aria-label="Copy email address"
              >
                {copied ? <Check className="h-4 w-4 text-live" aria-hidden /> : <Copy className="h-4 w-4" aria-hidden />}
                <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <ContactChooser />
            <ButtonLink href={profile.resume.href} target="_blank" rel="noreferrer" variant="secondary" size="lg" icon={<ArrowUpRight className="h-4 w-4" aria-hidden />}>
              Resume
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socials
            .filter((s) => s.id !== "email")
            .map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-2xl hl border border-line/80 bg-surface/50 px-5 py-4"
              >
                <span className="flex items-center gap-3">
                  <SocialIcon id={s.id} className="h-[18px] w-[18px] text-muted transition-colors group-hover:text-fg" />
                  <span>
                    <span className="block text-[0.95rem] text-fg">{s.label}</span>
                    <span className="block font-mono text-[0.68rem] text-dim">{s.handle}</span>
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-muted transition-transform duration-300 group-hover:rotate-45" aria-hidden />
              </a>
            ))}
          <div className="flex flex-col justify-center gap-1.5 rounded-2xl border border-line/80 bg-surface/50 px-5 py-4">
            <a href={profile.phoneHref} className="hl-text flex items-center gap-2.5 text-[0.9rem] text-fg">
              <Phone className="h-4 w-4 text-muted" aria-hidden /> {profile.phone}
            </a>
            <p className="flex items-center gap-2.5 text-[0.9rem] text-muted">
              <MapPin className="h-4 w-4" aria-hidden /> {profile.location}
            </p>
          </div>
        </Reveal>

        <footer className="mt-24 flex flex-col gap-6 border-t border-line/70 pt-8 text-[0.82rem] text-dim sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Monogram className="h-7 w-7" />
          </div>
          <a href="#top" className="inline-flex items-center gap-2 hl-text self-start text-muted sm:self-auto">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden />
          </a>
        </footer>
      </div>
    </section>
  );
}
