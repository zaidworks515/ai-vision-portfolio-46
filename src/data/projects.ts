/**
 * Project knowledge map. Short on purpose: the key point of every part.
 *
 * Sources, in order of trust:
 *   1. The project's own code and docs (Triton platform repo, public GitHub repos)
 *   2. Zaid's own descriptions (LinkedIn "Projects", resume, previous portfolio)
 *   3. What is visible in the demo videos
 * Numbers are only quoted from a measured source, and each metric names it.
 *
 * GitHub links are left out for repos that currently contain committed
 * credentials or personal data.
 */

export type CapabilityId = "vision" | "llm" | "speech" | "docs" | "infra" | "backend" | "data" | "search";

export type Capability = {
  id: CapabilityId;
  label: string;
  short: string;
  blurb: string;
  tools: string[];
};

export const capabilities: Capability[] = [
  { id: "vision", label: "Computer Vision", short: "Vision", blurb: "Detection, tracking, pose and segmentation.", tools: ["YOLO", "InsightFace", "MeshSegNet", "OpenCV", "DeepStream"] },
  { id: "llm", label: "LLMs & Agents", short: "LLM / Agents", blurb: "Models wired into workflows that take actions.", tools: ["Gemma 4", "Qwen2.5-VL", "GPT-4o", "LangChain", "LangGraph", "Agentic workflows"] },
  { id: "speech", label: "Speech AI", short: "Speech", blurb: "Transcription, diarization, translation and TTS.", tools: ["Whisper", "Diarization", "TTS", "WebSocket streaming"] },
  { id: "docs", label: "OCR & Documents", short: "OCR", blurb: "Pages and images turned into structured data.", tools: ["PaddleOCR-VL", "PP-DocLayoutV3", "Custom OCR"] },
  { id: "search", label: "Search & RAG", short: "RAG", blurb: "Semantic search over real data.", tools: ["Vector databases", "Embeddings", "RAG"] },
  { id: "infra", label: "Inference & GPU", short: "Inference", blurb: "Many models on a limited GPU, measured.", tools: ["NVIDIA Triton", "DeepStream", "vLLM", "TensorRT", "ONNX Runtime"] },
  { id: "backend", label: "Backend & Platform", short: "Backend", blurb: "The APIs, queues and deployments around a model.", tools: ["FastAPI", "Kafka", "PostgreSQL", "Docker", "AWS · Azure"] },
  { id: "data", label: "Data & Training", short: "Data", blurb: "Building the dataset when none exists.", tools: ["Annotation", "PyTorch", "TensorFlow", "scikit-learn"] },
];

export type Metric = { value: string; label: string };

export type PipelineStep = { label: string; detail: string };

export type Video = { label: string; driveId: string; duration?: string };

export type Project = {
  slug: string;
  title: string;
  /** Short context line: employer or client type */
  context: string;
  year: string;
  kind: string;
  status?: string;
  oneLiner: string;
  capabilities: CapabilityId[];
  /** `width` is the intrinsic width of `src` (default 1280); `srcSm` is half of it. */
  poster?: { src: string; srcSm: string; alt: string; ratio: number; width?: number; fit?: "cover" | "contain"; position?: string };
  /** Full-resolution hover loop; `clipSm` is the 960 px version used on phones. */
  clip?: string;
  clipSm?: string;
  gallery?: { src: string; alt: string; ratio: number }[];
  videos?: Video[];
  videoNote?: string;
  github?: { label: string; href: string }[];
  links?: { label: string; href: string }[];
  liveUrl?: string;
  problem: string;
  challenges: string[];
  built: string[];
  pipeline: PipelineStep[];
  insight: { title: string; body: string };
  metrics?: Metric[];
  metricsSource?: string;
  outcome: string;
  stack: string[];
  provenance?: string;
};

export const projects: Project[] = [
  {
    slug: "triton-inference-platform",
    title: "Triton Inference Platform",
    context: "Inseyab · internal AI platform",
    year: "2026",
    kind: "Platform",
    status: "Live on an on-prem GPU server",
    oneLiner: "One GPU runs our vision, language, speech, embedding and OCR models, with live camera feeds coming in through DeepStream and one OpenAI-style API in front.",
    capabilities: ["infra", "backend", "vision", "llm", "speech", "docs", "search"],
    poster: {
      src: "/media/posters/triton-reel.webp",
      srcSm: "/media/posters/triton-reel-sm.webp",
      alt: "Triton AI Inference console: inferences served, GPU temperature, device and memory telemetry",
      ratio: 720 / 1280,
      width: 720,
    },
    clip: "/media/clips/triton-reel.mp4",
    clipSm: "/media/clips/triton-reel-sm.mp4",
    videos: [{ label: "Platform reel", driveId: "1rvuvTBYo3_BJhsNgTgNt0aL1LWgb-NjD", duration: "0:55" }],
    liveUrl: "https://triton.inseyab.com/",
    problem: "Every new AI feature tended to bring its own model server. That meant duplicate weights, models fighting over VRAM, and no single place to see what was running.",
    challenges: [
      "Triton's built-in OpenAI frontend crashed on startup, a bug on NVIDIA's side.",
      "An 8 GB budget had to fit an LLM, the detectors and live cameras at the same time.",
    ],
    built: [
      "One Triton server with onnxruntime, vLLM and Python backends, so every kind of model runs in one place.",
      "A DeepStream path for RTSP cameras. Video is decoded on the GPU, frames from all cameras are batched, and they go to the same Triton over gRPC.",
      "An OpenAI-compatible FastAPI gateway over HTTP and WebSocket, with a queue per model and access keys.",
      "An operator console with live GPU and VRAM telemetry, one-click load and unload, and a budget that reserves VRAM per model.",
    ],
    pipeline: [
      { label: "Clients", detail: "Apps, services, RTSP cameras" },
      { label: "DeepStream", detail: "GPU decode, batched frames" },
      { label: "Gateway", detail: "OpenAI API, queues, limits" },
      { label: "Triton", detail: "onnxruntime, vLLM, Python" },
      { label: "Console", detail: "Telemetry, load and unload" },
    ],
    insight: {
      title: "I measured before adding Kafka",
      body: "Under load the queues sat empty and the GPU was the real bottleneck. So Kafka only went where it helps: async jobs, retries and a second GPU node.",
    },
    metrics: [
      { value: "2×", label: "faster object detection after switching on TensorRT (59.5 to 121.3 requests a second)" },
      { value: "76%", label: "less GPU memory for the same model after fixing memory handling (4,340 to 845 MB)" },
      { value: "93 ms", label: "for the vision-language model to start answering about a full-HD image" },
      { value: "333", label: "images a second through face detection" },
      { value: "27", label: "bugs found and fixed during live testing" },
    ],
    metricsSource: "Measured on an RTX 3080 Ti, mostly with an 8 GB memory budget.",
    outcome: "It's now the one serving layer our vision, document and voice features plug into.",
    stack: ["NVIDIA Triton", "DeepStream", "vLLM", "TensorRT", "ONNX Runtime", "Gemma 4", "Qwen2.5-VL", "FastAPI", "Kafka", "Docker"],
  },
  {
    slug: "voice-intelligence",
    title: "Voice Intelligence Platform",
    context: "Inseyab · contact-centre product",
    year: "2025-26",
    kind: "Product",
    oneLiner: "Turns contact-centre calls into transcripts, sentiment and compliance flags, lets supervisors search them in plain language, and answers live in English or Arabic.",
    capabilities: ["speech", "llm", "search", "backend"],
    poster: { src: "/media/posters/voice-intelligence.webp", srcSm: "/media/posters/voice-intelligence-sm.webp", alt: "Conversations view of the Voice Intelligence Platform with a natural-language search query", ratio: 1920 / 884, width: 1920, position: "0% 50%" },
    clip: "/media/clips/voice-intelligence.mp4",
    clipSm: "/media/clips/voice-intelligence-sm.mp4",
    gallery: [{ src: "/media/posters/voice-dashboard.webp", alt: "Admin dashboard with sessions, customers, CPU and GPU usage", ratio: 1920 / 884 }],
    videos: [{ label: "Product walkthrough", driveId: "1EyfF34y0Rwuyg-9Qhp1vjxoOqFyG6iuk", duration: "4:35" }],
    problem: "Contact centres record thousands of calls, but people only ever review a handful of them.",
    challenges: ["Calls are noisy, two-sided, and switch between Arabic and English.", "A live agent needs streaming, not batch transcription."],
    built: [
      "Whisper ASR with diarization and noise reduction, plus TTS for spoken replies.",
      "Sentiment, language detection, translation and compliance filtering for every call.",
      "Semantic search across all calls, agentic workflows and Kafka streaming.",
    ],
    pipeline: [
      { label: "Audio", detail: "Genesys calls, live mic" },
      { label: "Clean", detail: "Diarize, denoise" },
      { label: "Understand", detail: "Whisper, sentiment" },
      { label: "Index", detail: "Semantic search, filters" },
      { label: "Act", detail: "Dashboard, voice agent" },
    ],
    insight: { title: "Search that understands the question", body: "A supervisor can type “customers whose name is like Hasan” and get the right calls back. No filters needed." },
    outcome: "This was the main product I worked on at Inseyab. The demo walks through it end to end.",
    stack: ["Whisper", "TTS", "Diarization", "Agentic AI", "Vector search", "Kafka"],
  },
  {
    slug: "live-stream-analysis",
    title: "Live Stream Analysis & Tracking",
    context: "Real-time multimodal video",
    year: "2026",
    kind: "System",
    oneLiner: "A detector counts people at about 30 FPS while a vision-language model describes the scene every few seconds.",
    capabilities: ["vision", "llm", "infra"],
    poster: { src: "/media/posters/live-stream-analysis.webp", srcSm: "/media/posters/live-stream-analysis-sm.webp", alt: "Live camera feed with person detections on the left and Gemma's running scene summaries on the right", ratio: 1280 / 528, width: 1280, position: "62% 50%" },
    clip: "/media/clips/live-stream-analysis.mp4",
    clipSm: "/media/clips/live-stream-analysis-sm.mp4",
    videos: [{ label: "Live demo", driveId: "1ZQWRrHdeXsr0_VfQRZ8gumrr7_mMrAS_", duration: "0:44" }],
    problem: "A detector tells you where things are. It can't tell you whether anything is actually happening.",
    challenges: ["Running a VLM on every frame would wreck the frame rate."],
    built: [
      "Real-time detection and tracking, with the latency shown on screen.",
      "Gemma 4 reads a short montage of frames every few seconds and writes a summary.",
      "Both models are served through NVIDIA Triton.",
    ],
    pipeline: [
      { label: "Feed", detail: "Live camera" },
      { label: "Detect", detail: "Boxes and counts" },
      { label: "Sample", detail: "Frame montage" },
      { label: "Understand", detail: "Gemma 4 VLM" },
      { label: "Report", detail: "Plain-English summary" },
    ],
    insight: { title: "Two clocks on one GPU", body: "The detector runs on every frame and the VLM runs on a window of frames, so you get speed and understanding together." },
    metrics: [
      { value: "~30", label: "frames a second analysed live" },
      { value: "13 ms", label: "to analyse each frame, from the demo overlay" },
    ],
    outcome: "You see the raw detections and a running description of the scene side by side.",
    stack: ["Object detection", "Tracking", "Gemma 4 VLM", "NVIDIA Triton"],
  },
  {
    slug: "measuremates",
    title: "MeasureMates",
    context: "SSUET · BS Software Engineering",
    year: "2024",
    kind: "Final-year project",
    oneLiner: "Estimates a cow's weight, height, breed and a fair price from a few photos. No scale, no measuring tape.",
    capabilities: ["vision", "data", "backend"],
    poster: { src: "/media/posters/measuremates.webp", srcSm: "/media/posters/measuremates-sm.webp", alt: "Side-by-side cow pose estimation keypoints and segmentation mask", ratio: 16 / 9, width: 1920 },
    clip: "/media/clips/measuremates.mp4",
    clipSm: "/media/clips/measuremates-sm.mp4",
    gallery: [{ src: "/media/posters/measuremates-height.webp", alt: "Pose classified as right side, height flagged as normal on a street scene", ratio: 16 / 9 }],
    videos: [{ label: "Pose & segmentation demo", driveId: "1TF89cNhU61Voa3PWN2dgHBqPesdfrgni", duration: "0:37" }],
    github: [{ label: "measuremates", href: "https://github.com/zaidworks515/measuremates" }],
    links: [
      { label: "Pose dataset", href: "https://www.kaggle.com/datasets/zaidworks0508/cow-pose-estimation-dataset" },
      { label: "Segmentation dataset", href: "https://www.kaggle.com/datasets/zaidworks0508/cow-segmentation-dataset" },
      { label: "Breed dataset", href: "https://www.kaggle.com/datasets/zaidworks0508/cow-breed-classification-dataset" },
    ],
    problem: "Cattle are bought and sold on guessed weight, because a scale is rarely around.",
    challenges: ["There was no labelled data for local cattle, so I had to build it.", "The footage is messy: streets, yards and other animals in frame."],
    built: [
      "Collected and annotated pose, segmentation and breed datasets.",
      "Trained YOLOv8 pose, segmentation and breed models, plus a weight regressor.",
      "Wrapped it all in a Flask API with web and mobile endpoints and PDF reports.",
    ],
    pipeline: [
      { label: "Photos", detail: "Front, side, back" },
      { label: "Pose", detail: "12 keypoints" },
      { label: "Isolate", detail: "Segmentation mask" },
      { label: "Estimate", detail: "Weight and breed" },
      { label: "Price", detail: "PKR range" },
    ],
    insight: { title: "Prices follow the calendar", body: "The price estimate rises ahead of Eid al-Adha, based on the Hijri date." },
    metrics: [
      { value: "3", label: "open datasets on Kaggle" },
      { value: "1,300+", label: "dataset downloads" },
    ],
    outcome: "It runs from data collection to a working API, and other people now use the datasets on Kaggle.",
    stack: ["YOLOv8", "TensorFlow", "scikit-learn", "OpenCV", "Flask"],
  },
  {
    slug: "teeth-segmentation",
    title: "3D Teeth Segmentation",
    context: "Dental imaging",
    year: "2024",
    kind: "Healthcare AI",
    oneLiner: "Separates every tooth on a 3D dental scan and exports a colour-coded model.",
    capabilities: ["vision", "data"],
    poster: { src: "/media/posters/teeth-segmentation.webp", srcSm: "/media/posters/teeth-segmentation-sm.webp", alt: "Segmented lower dental arch with each tooth in its own colour", ratio: 1160 / 690, width: 1160 },
    clip: "/media/clips/teeth-segmentation.mp4",
    clipSm: "/media/clips/teeth-segmentation-sm.mp4",
    videos: [{ label: "Segmented scans in a glTF viewer", driveId: "1oJpZKSLmHdU7korE8C_a7OofeY19fyqR", duration: "0:42" }],
    github: [
      { label: "Teeth_3d_MeshSegNet", href: "https://github.com/zaidworks515/Teeth_3d_MeshSegNet" },
      { label: "3d-Dental-Segmentation", href: "https://github.com/zaidworks515/3d-Dental-Segmentation" },
    ],
    problem: "Aligner and crown planning start by isolating each tooth, which is slow to do by hand.",
    challenges: ["Labels get noisy right at the tooth boundaries.", "Scans are high-resolution and arrive in different orientations."],
    built: [
      "A MeshSegNet pipeline for both upper and lower jaws.",
      "Graph-cut refinement, then labels mapped back onto the full-resolution mesh.",
      "Colour-coded .glb export and FDI-numbered JSON.",
    ],
    pipeline: [
      { label: "Scan", detail: "STL or OBJ mesh" },
      { label: "Prepare", detail: "Decimate, features" },
      { label: "Segment", detail: "MeshSegNet" },
      { label: "Refine", detail: "Graph cut" },
      { label: "Export", detail: ".glb and JSON" },
    ],
    insight: { title: "Opens in any browser", body: "Exporting to glTF means a clinician can look at the result without any special software." },
    outcome: "Clean per-tooth segmentation on both arches.",
    stack: ["PyTorch", "MeshSegNet", "Open3D", "PyVista"],
    provenance: "Built on the open-source MeshSegNet architecture (MIT licence).",
  },
  {
    slug: "web3-trading-agent",
    title: "Web3 Trading Agent",
    context: "Crypto assistant · NomicsAI",
    year: "2025",
    kind: "Product",
    oneLiner: "A crypto assistant you can type or talk to. One sentence becomes real trades on Ethereum, Polygon or Solana.",
    capabilities: ["llm", "speech", "backend"],
    poster: { src: "/media/posters/web3-trading-agent.webp", srcSm: "/media/posters/web3-trading-agent-sm.webp", alt: "Chat parsing one request into two structured intents: buy and transfer", ratio: 1376 / 648, width: 1376 },
    clip: "/media/clips/web3-trading-agent.mp4",
    clipSm: "/media/clips/web3-trading-agent-sm.mp4",
    gallery: [{ src: "/media/posters/web3-chat.webp", alt: "Conversational version with market watchlist and wallet balances", ratio: 1376 / 648 }],
    videos: [
      { label: "Agentic version", driveId: "1wSf2CIKbnh9N5Wb_FTxlyu5u0kRTxKzI", duration: "2:30" },
      { label: "Conversational version", driveId: "1PettooTFmFQ8USlINDRK1kWxz2R6mETg", duration: "2:06" },
    ],
    problem: "On-chain trading is unforgiving, especially for beginners.",
    challenges: ["One sentence often hides several actions.", "When a detail is missing the agent has to ask, because a guess could move real money."],
    built: [
      "A live watchlist and wallet balances across three chains.",
      "Agents for buying, selling, transfers and copy-trading.",
      "Voice commands as well as chat.",
    ],
    pipeline: [
      { label: "Ask", detail: "Text or voice" },
      { label: "Parse", detail: "Structured intents" },
      { label: "Check", detail: "Ask for missing details" },
      { label: "Act", detail: "On-chain actions" },
      { label: "Confirm", detail: "Results in chat" },
    ],
    insight: { title: "One sentence, two intents", body: "“Buy 5 USDC, then transfer 0.1” turns into two separate actions. If the chain is missing, the agent asks for it." },
    outcome: "It started as a crypto guide and grew into an agent that executes transactions.",
    stack: ["LLM agents", "Speech-to-text", "Ethereum", "Polygon", "Solana"],
  },
  {
    slug: "career-metro-map",
    title: "Career Metro Mapping AI",
    context: "AI backend for a career SaaS",
    year: "2024",
    kind: "Product backend",
    oneLiner: "Upload a CV and see your possible career paths drawn like a subway map, with a training plan to match.",
    capabilities: ["llm", "backend"],
    poster: { src: "/media/posters/career-metro-map.webp", srcSm: "/media/posters/career-metro-map-sm.webp", alt: "Metro-map style career paths branching from Associate AI/ML Engineer", ratio: 1430 / 600, width: 1430, fit: "contain" },
    clip: "/media/clips/career-metro-map.mp4",
    clipSm: "/media/clips/career-metro-map-sm.mp4",
    videos: [{ label: "CV to career map", driveId: "1QthU4Fm3jYWYVSyg1tf2kebN9Ux0FT9_", duration: "1:24" }],
    problem: "A list of job titles hides how careers actually branch.",
    challenges: ["The LLM's output has to be a strict structure the front end can draw, every single time."],
    built: [
      "GPT-4o generates the roadmap against a strict JSON schema.",
      "Validation, retries and MySQL storage run in a background worker pool.",
      "Training plans are exported as PDFs.",
    ],
    pipeline: [
      { label: "CV", detail: "PDF upload" },
      { label: "Generate", detail: "GPT-4o" },
      { label: "Validate", detail: "Schema, retries" },
      { label: "Draw", detail: "Metro lines" },
      { label: "Plan", detail: "PDF" },
    ],
    insight: { title: "The map lives in the prompt", body: "Line colours, stations and branching rules are all set in the prompt, so any CV draws cleanly." },
    outcome: "From a single role, lines run out to VP of Technology and Chief AI Officer.",
    stack: ["GPT-4o", "Flask", "MySQL", "JWT"],
  },
  {
    slug: "x-engagement-agent",
    title: "Twitter/X Engagement Agent",
    context: "Game5Ball ($BALL) official account",
    year: "2025-26",
    kind: "Client work",
    oneLiner: "An autonomous agent that replies in context and posts narrated news videos, without repeating itself.",
    capabilities: ["llm", "speech", "search", "backend"],
    poster: { src: "/media/posters/x-engagement-agent.webp", srcSm: "/media/posters/x-engagement-agent-sm.webp", alt: "The $BALL account replying in context to a post on X", ratio: 384 / 796, width: 384, fit: "contain" },
    clip: "/media/clips/x-engagement-agent.mp4",
    clipSm: "/media/clips/x-engagement-agent-sm.mp4",
    videos: [{ label: "The agent in action", driveId: "19nq1VQlAQB7dUfycvPyKUbBbdoBXqueK", duration: "1:31" }],
    problem: "A brand account has to keep up with fast-moving conversations around the clock.",
    challenges: ["Replies have to fit the thread they land in.", "A bot that posts all day starts repeating itself."],
    built: [
      "Context-aware replies that remember each user.",
      "A news-to-video pipeline: narration, subtitles, then the post.",
      "Embedding checks so the same story never goes out twice.",
    ],
    pipeline: [
      { label: "Listen", detail: "Mentions, news" },
      { label: "Choose", detail: "Grok, de-duplication" },
      { label: "Create", detail: "Reply or video" },
      { label: "Post", detail: "X API" },
      { label: "Remember", detail: "History in MySQL" },
    ],
    insight: { title: "Memory makes it feel human", body: "Stories too similar to anything from the last two days get skipped, and replies remember who they're talking to." },
    outcome: "It kept up with the banter under the account's posts.",
    stack: ["Grok", "ElevenLabs", "Whisper", "MiniLM", "X API"],
  },
];

export type ArchiveItem = {
  title: string;
  year?: string;
  kind: string;
  oneLiner: string;
  capabilities: CapabilityId[];
  tags: string[];
  metric?: string;
  status?: string;
  links?: { label: string; href: string }[];
};

export const archive: ArchiveItem[] = [
  {
    title: "HPV detection on whole-slide images",
    year: "2025",
    kind: "Healthcare · CV",
    oneLiner: "A two-stage ResNet-50 cascade that scores HPV on gigapixel pathology slides.",
    capabilities: ["vision", "backend", "data"],
    tags: ["ResNet-50", "OpenSlide", "Flask"],
    metric: "98.6% patch-level test accuracy",
    links: [{ label: "GitHub", href: "https://github.com/zaidworks515/medical_image_classification" }],
  },
  {
    title: "Grid-CAPTCHA OCR solver",
    year: "2024",
    kind: "CV · Automation",
    oneLiner: "Reads and solves number-grid CAPTCHAs inside an automated visa workflow.",
    capabilities: ["docs", "vision"],
    tags: ["OCR", "Automation"],
    links: [{ label: "Demo", href: "https://drive.google.com/file/d/1ErD6-8WMbDqLqK6Tbzw5HWkeb7_yFPOu/view" }],
  },
  {
    title: "Oral cancer histopathology assistant",
    year: "2024",
    kind: "Healthcare · CV",
    oneLiner: "Takes a biopsy image, predicts normal or OSCC, and keeps a PDF report per patient.",
    capabilities: ["vision", "backend"],
    tags: ["TensorFlow Lite", "Flask"],
  },
  {
    title: "Amora, an opportunity classifier",
    kind: "NLP · Client work",
    oneLiner: "Classifies Portuguese embassy queries, with ML, ANN and BERT models served side by side.",
    capabilities: ["llm", "backend"],
    tags: ["BERT", "Keras", "scikit-learn"],
  },
  {
    title: "Clinical terminology coder",
    year: "2024",
    kind: "Healthcare · NLP",
    oneLiner: "Maps free-text events and drug names to standard terms using fuzzy matching.",
    capabilities: ["llm", "backend"],
    tags: ["RapidFuzz", "NLTK"],
  },
  {
    title: "Beans & More assistant",
    year: "2024",
    kind: "Conversational AI",
    oneLiner: "A coffee-shop support bot for orders, order status and recommendations.",
    capabilities: ["llm"],
    tags: ["Rasa", "DIET"],
  },
  {
    title: "Natural-language data fetcher",
    year: "2024",
    kind: "LLM · Text-to-SQL",
    oneLiner: "Ask a database a question in plain English and get the result back.",
    capabilities: ["llm", "backend"],
    tags: ["LangChain", "OpenAI"],
  },
  {
    title: "Used-car price predictor",
    year: "2024",
    kind: "ML · Regression",
    oneLiner: "Prices used cars, trained on about 13k PakWheels ads.",
    capabilities: ["data"],
    tags: ["CatBoost", "Flask"],
    metric: "Validation R² 0.9855",
    links: [{ label: "GitHub", href: "https://github.com/zaidworks515/Car-Price-Predictor" }],
  },
  {
    title: "Project delay alert generator",
    year: "2024",
    kind: "Automation",
    oneLiner: "Spots delayed tasks in MS Project files and emails the people responsible.",
    capabilities: ["backend"],
    tags: ["pandas", "Tkinter"],
  },
  {
    title: "Vtryon",
    kind: "CV · E-commerce",
    oneLiner: "Virtual try-on for online fashion stores.",
    capabilities: ["vision"],
    tags: ["Computer vision"],
  },
  {
    title: "Medical prescription suggestor",
    kind: "Healthcare · NLP",
    oneLiner: "Suggests medical formulas from diseases and symptoms.",
    capabilities: ["llm", "data"],
    tags: ["NLP"],
  },
  {
    title: "eBay sports-card filter",
    kind: "Automation",
    oneLiner: "Scrapes, filters and sorts sports-card listings.",
    capabilities: ["data", "backend"],
    tags: ["Scraping", "Classification"],
  },
  {
    title: "Search info compiler",
    kind: "NLP",
    status: "In development",
    oneLiner: "Matches one person's profiles across different platforms.",
    capabilities: ["llm", "search"],
    tags: ["Profile matching"],
  },
  {
    title: "Project & resource management",
    kind: "Analytics",
    oneLiner: "Resource planning and tracking in Power BI.",
    capabilities: ["data"],
    tags: ["Power BI"],
  },
  {
    title: "Stock price predictor",
    year: "2024",
    kind: "ML · Forecasting",
    oneLiner: "An LSTM trained on an uploaded price history, with a 10-day projection.",
    capabilities: ["data"],
    tags: ["LSTM", "Keras"],
    links: [{ label: "GitHub", href: "https://github.com/zaidworks515/Stock-Price-Predictor" }],
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
