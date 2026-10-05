import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/useMagnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-300 ease-out-expo will-change-transform disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink shadow-[0_8px_20px_-10px_hsl(var(--accent)/0.6)] hover:bg-accent-hover",
  secondary: "border border-line bg-surface text-fg hover:border-accent/50 hover:text-accent",
  ghost: "text-muted hover:text-fg",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

type Common = { variant?: Variant; size?: Size; icon?: ReactNode; magnetic?: boolean; className?: string; children: ReactNode };

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  magnetic,
  className,
  children,
  ...rest
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  const m = useMagnetic<HTMLAnchorElement>();
  return (
    <a
      ref={m.ref}
      onPointerMove={magnetic ? m.onPointerMove : undefined}
      onPointerLeave={magnetic ? m.onPointerLeave : undefined}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      <span className="relative">{children}</span>
      {icon && <span className="relative transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">{icon}</span>}
    </a>
  );
}

export function Button({
  variant = "secondary",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button type="button" className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
