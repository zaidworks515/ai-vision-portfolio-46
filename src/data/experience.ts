/**
 * Roles from the resume. A highlight only names (and links) a system where the
 * source material ties it to that employer explicitly.
 */

/** Plain text, or a named system with an optional case study link. */
export type Highlight = string | { name: string; text: string; slug?: string; confidential?: boolean };

export type Role = {
  id: string;
  company: string;
  companyNote?: string;
  title: string;
  period: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, omitted while current
  current?: boolean;
  location: string;
  context: string;
  highlights: Highlight[];
  stack: string[];
};

export const roles: Role[] = [
  {
    id: "inseyab",
    company: "Inseyab Consulting",
    companyNote: "with Tradeforesight",
    title: "AI/ML Engineer · Python Developer",
    period: "Jul 2025 - Present",
    start: "2025-07",
    current: true,
    location: "NASTP, Karachi",
    context: "AI-focused firm building intelligent business solutions.",
    highlights: [
      {
        name: "Triton Inference Platform",
        slug: "triton-inference-platform",
        text: "built the single-GPU platform behind an OpenAI-compatible gateway.",
      },
      { name: "Voice Intelligence Platform", slug: "voice-intelligence", text: "worked on speech analytics for contact centres." },
      {
        name: "Smart Warehouse",
        text: "YOLO models on Triton count sacks live from the dispatch cameras and send counts by category to the client's Odoo. Four streams in under 2 GB of GPU memory.",
      },
      { name: "Muhafiz", text: "client project.", confidential: true },
      "FastAPI services, data pipelines and Docker deployments on AWS and Azure.",
    ],
    stack: ["NVIDIA Triton", "vLLM", "TensorRT", "FastAPI", "Kafka", "Docker", "PostgreSQL", "AWS", "Azure"],
  },
  {
    id: "tesseract",
    company: "Tesseract Innovations",
    title: "AI/ML Engineer",
    period: "Jun 2024 - Jun 2025",
    start: "2024-06",
    end: "2025-06",
    location: "Gulshan-e-Iqbal, Karachi",
    context: "Technology firm focused on AI solutions.",
    highlights: [
      "Shipped ML models from data preparation to production.",
      "Computer vision: detection, segmentation and pose estimation.",
      "API integration and agentic AI for real-time products.",
    ],
    stack: ["Computer Vision", "Object detection", "Segmentation", "Pose estimation", "Agentic AI", "REST APIs"],
  },
  {
    id: "freelance",
    company: "Independent / Contract",
    title: "AI/ML Engineer",
    period: "Jan 2023 - Present",
    start: "2023-01",
    current: true,
    location: "Remote",
    context: "Contract AI work alongside full-time roles.",
    highlights: [
      "10+ AI projects across NLP, computer vision and automation.",
      "Clients in healthcare, e-commerce, finance and immigration.",
    ],
    stack: ["NLP", "Computer Vision", "Automation", "Python"],
  },
  {
    id: "codessoft",
    company: "Codes Soft",
    title: "Python Developer (Intern)",
    period: "Oct 2023 - Dec 2023",
    start: "2023-10",
    end: "2023-12",
    location: "Gulshan-e-Iqbal, Karachi",
    context: "ERP software company.",
    highlights: [
      "Feature development on custom ERP apps (Frappe).",
    ],
    stack: ["Python", "Frappe", "ERP"],
  },
];
