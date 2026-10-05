import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, socials } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useScrollLock } from "@/hooks/useScrollLock";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { Monogram, SocialIcon } from "./ui/Icons";
import { EASE } from "./ui/Reveal";
import { ThemeToggle } from "./ui/ThemeToggle";

export const NAV = [
  { id: "work", label: "Work" },
  { id: "systems", label: "Systems" },
  { id: "experience", label: "Experience" },
  { id: "recommendations", label: "Recommendations" },
  { id: "about", label: "About" },
] as const;

const SECTION_IDS = [...NAV.map((n) => n.id), "contact"];

export function Navbar({ hidden = false }: { hidden?: boolean }) {
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const sheetRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);
  useFocusTrap(sheetRef, open, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,opacity] duration-500 ease-out-expo",
          hidden && "pointer-events-none -translate-y-full opacity-0",
        )}
      >
        <div className={cn("mx-auto transition-[padding,max-width] duration-500 ease-out-expo", compact ? "max-w-[920px] px-3 pt-3" : "max-w-[1280px] px-4 pt-4 sm:px-6 lg:px-8")}>
          <nav
            aria-label="Primary"
            className={cn(
              "flex h-[3.25rem] items-center justify-between gap-4 rounded-full border transition-[background-color,border-color,padding,box-shadow] duration-500 ease-out-expo",
              compact
                ? "border-line/80 bg-ink/80 pl-2 pr-1.5 shadow-[0_10px_34px_-14px_hsl(215_45%_25%/0.35)] backdrop-blur-xl"
                : "border-transparent bg-transparent px-0",
            )}
          >
            <a href="#top" className="flex items-center gap-2.5 rounded-full pr-2" aria-label={`${profile.name}, back to top`}>
              <Monogram className="h-8 w-8" />
              <span className={cn("text-sm font-medium tracking-tight transition-opacity", compact && "max-sm:sr-only")}>{profile.name}</span>
            </a>

            <ul className="hidden items-center gap-0.5 lg:flex">
              {NAV.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3.5 py-2 text-[0.84rem] transition-colors duration-300",
                        isActive ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute inset-0 rounded-full bg-raised ring-1 ring-line"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      )}
                      <span className="relative">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1.5">
              <ThemeToggle />
              <a
                href="#contact"
                className={cn(
                  "hidden h-10 items-center gap-1.5 rounded-full px-4 text-[0.84rem] font-medium transition-colors sm:inline-flex",
                  active === "contact" ? "bg-fg text-ink" : "bg-accent text-ink hover:bg-accent-hover",
                )}
              >
                Get in touch
              </a>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-raised/60 text-fg lg:hidden"
                aria-label="Open menu"
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen(true)}
              >
                <Menu className="h-[18px] w-[18px]" aria-hidden />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            tabIndex={-1}
            className="fixed inset-0 z-[70] flex flex-col bg-ink/95 px-4 pb-8 pt-4 backdrop-blur-xl sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-[3.25rem] items-center justify-between">
              <span className="flex items-center gap-2.5">
                <Monogram className="h-8 w-8" />
                <span className="text-sm font-medium">{profile.name}</span>
              </span>
              <button
                type="button"
                data-autofocus
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-raised/60"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X className="h-[18px] w-[18px]" aria-hidden />
              </button>
            </div>

            <ul className="mt-10 flex flex-col">
              {[...NAV, { id: "contact", label: "Contact" } as const].map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.04 * i + 0.05 }}
                  className="border-b border-line/70"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="flex items-baseline justify-between py-4 text-[1.9rem] font-medium tracking-tight"
                  >
                    <span className={active === item.id ? "text-accent" : "text-fg"}>{item.label}</span>
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="mt-8">
              <ThemeToggle withLabel />
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-8">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target={s.id === "email" ? undefined : "_blank"}
                  rel="noreferrer"
                  className="chip h-10 px-3.5 text-[0.75rem]"
                >
                  <SocialIcon id={s.id} className="h-3.5 w-3.5" />
                  {s.label}
                </a>
              ))}
              <a href={profile.resume.href} target="_blank" rel="noreferrer" className="chip h-10 px-3.5 text-[0.75rem]">
                Resume <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
