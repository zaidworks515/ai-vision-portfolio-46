import { useEffect, useState } from "react";

/**
 * Tracks which section is under the reading line (a third of the way down the
 * viewport). Uses IntersectionObserver, so there is no scroll handler doing layout.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting));
        const current = ids.find((id) => visible.get(id));
        setActive(current ?? null);
      },
      { rootMargin: "-33% 0px -66% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return active;
}
