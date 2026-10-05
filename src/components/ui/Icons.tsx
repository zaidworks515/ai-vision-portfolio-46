import { useId } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import type { SocialLink } from "@/data/profile";

/** Kaggle's mark simplified to a "k" glyph, since lucide has no Kaggle icon. */
export function KaggleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.6 21.6c-.1.3-.4.4-.7.4h-2.6c-.3 0-.5-.1-.7-.4l-4.3-5.5-1.2 1.2v4c0 .4-.3.7-.7.7H5.4c-.4 0-.7-.3-.7-.7V2.7c0-.4.3-.7.7-.7h2c.4 0 .7.3.7.7v11.6l5.2-5.3c.2-.2.4-.3.7-.3h2.7c.3 0 .5.1.6.4.1.3 0 .5-.2.7L11.8 15l5.7 6c.2.2.2.4.1.6Z" />
    </svg>
  );
}

export function SocialIcon({ id, className }: { id: SocialLink["id"]; className?: string }) {
  switch (id) {
    case "github":
      return <Github className={className} aria-hidden />;
    case "linkedin":
      return <Linkedin className={className} aria-hidden />;
    case "kaggle":
      return <KaggleIcon className={className} />;
    default:
      return <Mail className={className} aria-hidden />;
  }
}

/** The "ZA" monogram, the same mark as the favicon: navy→blue tile, white Z, gold A. */
export function Monogram({ className }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={className}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#002552" />
          <stop offset="1" stopColor="#0063cc" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill={`url(#${id})`} />
      <path d="M8.5 10h8.2l-8.2 12h8.2" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.6 22l3.4-12 3.4 12M19.7 18.3h4.6" fill="none" stroke="#ffc105" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
