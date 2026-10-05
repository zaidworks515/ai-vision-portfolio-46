import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Monogram } from "@/components/ui/Icons";

export default function NotFound() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Page not found | Zaid Portfolio";
  }, []);

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
      <Monogram className="h-12 w-12" />
      <p className="mt-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-dim">404 · no route for</p>
      <p className="mt-2 max-w-full break-all font-mono text-sm text-muted">{pathname}</p>
      <h1 className="mt-8 text-display-md font-medium">This signal went nowhere.</h1>
      <Link
        to="/"
        className="mt-10 inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-[0.9rem] font-medium text-ink"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Back to the portfolio
      </Link>
    </main>
  );
}
