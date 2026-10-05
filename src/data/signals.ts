/**
 * The hero "signal router": the same five stages, four kinds of input.
 * Every stage description is lifted from a deployed project.
 */

export type StageId = "input" | "ingest" | "model" | "serve" | "outcome";

export const stages: { id: StageId; label: string }[] = [
  { id: "input", label: "Input" },
  { id: "ingest", label: "Ingest" },
  { id: "model", label: "Model" },
  { id: "serve", label: "Serve" },
  { id: "outcome", label: "Outcome" },
];

export type Route = {
  id: "video" | "voice" | "document" | "language";
  label: string;
  steps: Record<StageId, string>;
  telemetry: string;
};

export const routes: Route[] = [
  {
    id: "video",
    label: "Video",
    steps: {
      input: "Live RTSP camera feeds",
      ingest: "GPU decode, batched across cameras",
      model: "YOLO detect + track · Gemma 4 VLM",
      serve: "Triton behind an OpenAI-compatible gateway",
      outcome: "Counts at ~30 FPS + a plain-English scene summary",
    },
    telemetry: "Counts people live, about 30 frames a second",
  },
  {
    id: "voice",
    label: "Voice",
    steps: {
      input: "Contact-centre call audio",
      ingest: "Diarize · normalise · denoise",
      model: "Whisper ASR → sentiment · language · translation",
      serve: "Agentic workflows, semantic index, Kafka streaming",
      outcome: "Searchable calls, compliance flags, live EN/AR agent",
    },
    telemetry: "Understands English and Arabic, searchable by meaning",
  },
  {
    id: "document",
    label: "Document",
    steps: {
      input: "Scanned page or form",
      ingest: "Layout detection, 25 block types",
      model: "PaddleOCR-VL reads each block with its own prompt",
      serve: "Reading order rebuilt; tables stay tables",
      outcome: "A structured document, not a run-on string",
    },
    telemetry: "Tables stay tables, stamps are never read",
  },
  {
    id: "language",
    label: "Language",
    steps: {
      input: "A typed or spoken request",
      ingest: "Speech-to-text, plus conversation context",
      model: "LLM splits it into structured intents",
      serve: "Tools: on-chain lookups, market data, actions",
      outcome: "One sentence → two executable intents",
    },
    telemetry: "One sentence becomes two actions",
  },
];
