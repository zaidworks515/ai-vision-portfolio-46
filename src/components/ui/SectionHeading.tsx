import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  id?: string;
  className?: string;
  aside?: ReactNode;
};

export function SectionHeading({ index, label, title, lead, id, className, aside }: Props) {
  return (
    <div className={cn("mb-12 grid gap-8 md:mb-16 lg:grid-cols-[1fr_auto] lg:items-end", className)}>
      <Reveal>
        <p className="eyebrow mb-5 flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          {label}
        </p>
        <h2 id={id} className="max-w-[22ch] text-display-lg font-medium text-balance">
          {title}
        </h2>
        {lead && <p className="mt-6 max-w-prose text-base leading-relaxed text-muted text-pretty md:text-lg">{lead}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1}>{aside}</Reveal>}
    </div>
  );
}
