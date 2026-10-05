/**
 * "How I think": engineering transitions, each grounded in a specific project
 * and, where it exists, a measured result.
 */

export type Transition = {
  id: string;
  from: string;
  to: string;
  trap: string;
  move: string;
  evidence: string;
  project: string; // slug
  visual?: "concurrency" | "vram" | "tensorrt" | "doc" | "clocks" | "queue";
};

export const transitions: Transition[] = [
  {
    id: "throughput",
    from: "More concurrency",
    to: "The right operating point",
    trap: "Keep adding parallel requests and expect more throughput.",
    move: "I swept concurrency and found the knee. Past 4 requests in flight, throughput stays flat and latency just grows.",
    evidence: "At 4 in flight: 117.8 req/s at 33 ms. At 32: 119.7 req/s at 266 ms.",
    project: "triton-inference-platform",
    visual: "concurrency",
  },
  {
    id: "tensorrt",
    from: "A flag that's “on”",
    to: "A change I verified",
    trap: "Set TRT_ENABLE=1 and assume TensorRT is running.",
    move: "I measured it and nothing had changed. I fixed the config path, then measured again.",
    evidence: "59.5 to 121.3 req/s (+104%), and p50 dropped from 132 to 66 ms.",
    project: "triton-inference-platform",
    visual: "tensorrt",
  },
  {
    id: "vram",
    from: "Budget on current usage",
    to: "Budget on reservations",
    trap: "Load a model whenever VRAM looks free.",
    move: "Each model now reserves its full ceiling. If a load won't fit, it gets a clear 409 instead of crashing the GPU.",
    evidence: "Peak model VRAM fell from 4,340 to 845 MB and stopped creeping up under load.",
    project: "triton-inference-platform",
    visual: "vram",
  },
  {
    id: "queue",
    from: "Add a queue",
    to: "Find where requests wait",
    trap: "Put Kafka in front of inference.",
    move: "I measured first. The queues were empty and the GPU was maxed out, so Kafka only handles async jobs.",
    evidence: "Jobs are partitioned by tenant and pipeline, delivered at least once and de-duplicated.",
    project: "triton-inference-platform",
    visual: "queue",
  },
  {
    id: "ocr",
    from: "Raw OCR",
    to: "Structured documents",
    trap: "Run OCR on the whole page and trust the fluent text.",
    move: "Detect the layout first, then send each block with the right prompt, in reading order. Stamps are never read.",
    evidence: "These mistakes don't throw errors, so I pinned them down with tests.",
    project: "triton-inference-platform",
    visual: "doc",
  },
  {
    id: "realtime",
    from: "The big model on every frame",
    to: "Two clocks on one GPU",
    trap: "Run the smartest model on every frame.",
    move: "The detector runs on every frame and the VLM on a window of frames. When the GPU is busy, frames get dropped instead of queued.",
    evidence: "About 30 FPS of detections next to a running Gemma 4 description.",
    project: "live-stream-analysis",
    visual: "clocks",
  },
];

/** PERFORMANCE.md: concurrency sweep with TensorRT on the live stack */
export const concurrencySweep = [
  { c: 1, rps: 43.4, p50: 22.8 },
  { c: 2, rps: 76.3, p50: 26.2 },
  { c: 4, rps: 117.8, p50: 33.1 },
  { c: 8, rps: 119.8, p50: 66.4 },
  { c: 16, rps: 119.8, p50: 133.1 },
  { c: 32, rps: 119.7, p50: 266.3 },
];

/** Before/after pairs from the platform's performance and optimisation audits */
export type BeforeAfterRow = {
  label: string;
  unit: string;
  before: number;
  after: number;
  better: "higher" | "lower";
};

export const TENSORRT_ROWS: BeforeAfterRow[] = [
  { label: "Throughput", unit: "req/s", before: 59.5, after: 121.3, better: "higher" },
  { label: "Latency p50", unit: "ms", before: 132, after: 66, better: "lower" },
  { label: "GPU compute per request", unit: "ms", before: 34.0, after: 16.5, better: "lower" },
];

export const VRAM_ROWS: BeforeAfterRow[] = [
  { label: "Peak model VRAM", unit: "MB", before: 4340, after: 845, better: "lower" },
  { label: "VRAM held after traffic stops", unit: "MB", before: 3556, after: 264, better: "lower" },
];
