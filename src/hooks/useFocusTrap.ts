import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab focus inside `ref` while active, closes on Escape, and returns focus
 * to whatever was focused before it opened.
 */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean, onEscape?: () => void) {
  const escapeRef = useRef(onEscape);
  escapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    // Containers marked data-focus-self take focus themselves (no ring on a button
    // the visitor never chose); otherwise the [data-autofocus] element or the first control.
    const first = node.hasAttribute("data-focus-self")
      ? node
      : (node.querySelector<HTMLElement>("[data-autofocus]") ?? node.querySelector<HTMLElement>(FOCUSABLE));
    (first ?? node).focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        escapeRef.current?.();
        return;
      }
      if (e.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      const current = document.activeElement;
      if (current === node || !node.contains(current)) {
        e.preventDefault();
        (e.shiftKey ? lastEl : firstEl).focus();
      } else if (e.shiftKey && current === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && current === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused?.focus?.({ preventScroll: true });
    };
  }, [ref, active]);
}
