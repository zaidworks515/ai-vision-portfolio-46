import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle({ className, withLabel = false }: { className?: string; withLabel?: boolean }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const label = dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-full hl border border-line bg-surface text-fg",
        withLabel ? "px-3.5 text-[0.8rem]" : "w-10",
        className,
      )}
    >
      <span className="relative h-[18px] w-[18px]" aria-hidden>
        {/* the icon shows the mode a click switches to */}
        <Sun className={cn("absolute inset-0 h-[18px] w-[18px] transition-all duration-500", dark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0")} />
        <Moon className={cn("absolute inset-0 h-[18px] w-[18px] transition-all duration-500", dark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100")} />
      </span>
      {withLabel && <span>{dark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
