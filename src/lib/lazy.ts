/** The case-study view is code-split; cards start loading it on hover/focus. */
export const loadCaseStudy = () => import("@/components/case/CaseStudy");

let warmed = false;
export function prefetchCaseStudy() {
  if (warmed) return;
  warmed = true;
  loadCaseStudy().catch(() => {
    warmed = false;
  });
}
