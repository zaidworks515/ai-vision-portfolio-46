/**
 * Roles from the resume. `projects` only links work where the source material
 * ties the project to that employer explicitly.
 */

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
  highlights: string[];
  stack: string[];
  projects?: string[]; // project slugs
  /** Systems without a case study page, e.g. confidential client work */
  otherSystems?: { title: string; kind: string; detail?: string; confidential?: boolean }[];
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
      "Built the single-GPU Triton inference platform behind an OpenAI-compatible gateway.",
      "Worked on the Voice Intelligence Platform for contact centres.",
      "FastAPI services, data pipelines and Docker deployments on AWS and Azure.",
    ],
    stack: ["NVIDIA Triton", "vLLM", "TensorRT", "FastAPI", "Kafka", "Docker", "PostgreSQL", "AWS", "Azure"],
    projects: ["triton-inference-platform", "voice-intelligence"],
    otherSystems: [
      {
        title: "Smart Warehouse",
        kind: "Computer vision · Client project",
        detail:
          "Replaces counting sacks by hand at dispatch. YOLO models on the Triton platform count every sack live from the warehouse cameras and send counts by category into the client's Odoo system. Four live camera streams run in under 2 GB of GPU memory.",
      },
      { title: "Muhafiz", kind: "Client project", confidential: true },
    ],
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
