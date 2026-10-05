import { lazy, Suspense, useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { projectBySlug } from "@/data/projects";
import { loadCaseStudy } from "@/lib/lazy";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/work/Work";
import { Thinking } from "@/components/thinking/Thinking";
import { Experience } from "@/components/Experience";
import { Recommendations } from "@/components/Recommendations";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";

const CaseStudy = lazy(loadCaseStudy);

export default function Index() {
  const { slug } = useParams();
  const location = useLocation();
  const project = slug ? projectBySlug(slug) : undefined;

  // Land on the right section for /#work style links and after closing a deep-linked case study.
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo ?? location.hash.replace("#", "");
    if (!target || slug) return;
    const id = window.requestAnimationFrame(() => document.getElementById(target)?.scrollIntoView({ block: "start" }));
    return () => window.cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  if (slug && !project) return <Navigate to="/" replace />;

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[90] rounded-full bg-fg px-4 py-2 text-sm text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar hidden={Boolean(project)} />
      <main id="main" aria-hidden={project ? true : undefined}>
        <Hero />
        <Work />
        <Thinking />
        <Experience />
        <Recommendations />
        <About />
        <Contact />
      </main>

      <AnimatePresence>
        {project && (
          <Suspense key="case-study" fallback={null}>
            <CaseStudy project={project} />
          </Suspense>
        )}
      </AnimatePresence>
    </>
  );
}
