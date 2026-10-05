import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Linkedin, Mail, MessageCircle } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { EASE } from "./ui/Reveal";

const WHATSAPP_TEXT = "Hi Zaid, I saw your portfolio and would like to talk about a project.";

const options = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    detail: profile.phone,
    href: `https://wa.me/${profile.phoneHref.replace(/\D/g, "")}?text=${encodeURIComponent(WHATSAPP_TEXT)}`,
    icon: MessageCircle,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    detail: "Opens my profile. Tap Message there.",
    href: "https://www.linkedin.com/in/zaidworks515/",
    icon: Linkedin,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    detail: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
] as const;

/** "Start a conversation" asks how the visitor wants to reach out instead of assuming a mail app. */
export function ContactChooser() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    itemRefs.current[0]?.focus();
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onMenuKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    const i = items.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = (i + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
      items[next]?.focus();
    }
    if (e.key === "Tab") setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="contact-menu"
        onClick={() => setOpen((v) => !v)}
        className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[0.95rem] font-medium text-ink hl-solid shadow-[0_8px_20px_-10px_hsl(var(--accent)/0.6)]"
      >
        Start a conversation
        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id="contact-menu"
            role="menu"
            aria-label="Choose how to reach Zaid"
            onKeyDown={onMenuKey}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="absolute left-0 top-full z-30 mt-3 w-[min(21rem,calc(100vw-2rem))] origin-top-left rounded-2xl border border-line bg-surface p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.6)] sm:left-auto sm:right-0 sm:origin-top-right"
          >
            <p className="px-3 pb-1.5 pt-2 font-mono text-[0.64rem] uppercase tracking-[0.16em] text-dim">How would you like to reach me?</p>
            {options.map((o, i) => (
              <a
                key={o.id}
                ref={(el) => (itemRefs.current[i] = el)}
                role="menuitem"
                href={o.href}
                target={o.external ? "_blank" : undefined}
                rel={o.external ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 hl rounded-xl px-3 py-2.5 outline-none"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-raised text-accent">
                  <o.icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-[0.92rem] font-medium text-fg">{o.label}</span>
                  <span className="block truncate text-[0.78rem] text-muted">{o.detail}</span>
                </span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
