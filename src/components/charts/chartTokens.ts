/**
 * Chart colours come from CSS variables so they follow the light/dark theme.
 * Both sets were validated with the dataviz palette checker against their own
 * card surface (#ffffff light, #111925 dark): lightness band, chroma floor, CVD
 * separation, normal-vision floor and contrast all pass.
 */
export const CHART = {
  before: "var(--chart-before)",
  after: "var(--chart-after)",
  series: "var(--chart-after)",
  grid: "var(--chart-grid)",
  axis: "var(--chart-axis)",
  surface: "var(--chart-surface)",
} as const;
