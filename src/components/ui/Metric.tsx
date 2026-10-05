import { useCountUp } from "@/hooks/useCountUp";
import { cn } from "@/lib/utils";

type Props = { value: string; label: string; className?: string; size?: "md" | "lg" };

/** A measured number that counts up once; screen readers always get the final value. */
export function Metric({ value, label, className, size = "md" }: Props) {
  const { ref, display } = useCountUp<HTMLSpanElement>(value);
  return (
    <div className={cn("min-w-0", className)}>
      <p className={cn("font-medium tracking-tight text-fg", size === "lg" ? "text-[2.1rem] leading-none sm:text-[2.6rem]" : "text-[1.7rem] leading-none")}>
        <span ref={ref} aria-hidden>
          {display}
        </span>
        <span className="sr-only">{value}</span>
      </p>
      <p className="mt-2.5 text-[0.82rem] leading-snug text-muted text-pretty">{label}</p>
    </div>
  );
}
