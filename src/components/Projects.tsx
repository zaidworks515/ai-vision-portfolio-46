import { ExternalLink, Play, Clock, CheckCircle } from "lucide-react";
import { SectionHeader } from "./About";

const projects = [
  {
    title: "Voice Intelligence Platform",
    description: "Next-generation AI voice intelligence platform redefining automated customer engagement.",
    status: "Completed",
    tags: ["Conversational AI", "ASR", "TTS", "Agentic AI", "Kafka", "Semantic Search"],
    demoLink: "https://drive.google.com/file/d/1EyfF34y0Rwuyg-9Qhp1vjxoOqFyG6iuk/view?usp=drive_link",
    featured: true,
  },
  {
    title: "Web3 Trading Chatbot",
    description: "AI-powered crypto guide with action-ready agents. Supports buy/sell/transfer, real-time market updates, and voice commands.",
    status: "Completed",
    tags: ["NLP", "Trading", "Agentic AI", "Web3"],
    demoLink: "https://drive.google.com/file/d/1wSf2CIKbnh9N5Wb_FTxlyu5u0kRTxKzI/view?usp=drive_link",
    featured: true,
  },
  {
    title: "MeasureMates",
    description: "AI project for measuring and analyzing cow postures using 2D pose estimation & segmentation of livestock animals.",
    status: "Completed",
    tags: ["Computer Vision", "Pose Estimation", "Segmentation"],
    demoLink: "https://drive.google.com/file/d/1TF89cNhU61Voa3PWN2dgHBqPesdfrgni/view?usp=drive_link",
    featured: true,
  },
  {
    title: "3D Teeth Segmentation",
    description: "Segmentation of intraoral scans for dental imaging using advanced 3D mesh processing techniques.",
    status: "Completed",
    tags: ["Computer Vision", "3D Mesh Segmentation", "Healthcare"],
    demoLink: "https://drive.google.com/file/d/1oJpZKSLmHdU7korE8C_a7OofeY19fyqR/view?usp=drive_link",
    featured: true,
  },
  {
    title: "Career Metro Mapping AI",
    description: "A career guide powered by OpenAI that maps career paths and provides personalized guidance.",
    status: "Completed",
    tags: ["OpenAI", "Career Guidance", "Agentic AI"],
    demoLink: "https://drive.google.com/file/d/1QthU4Fm3jYWYVSyg1tf2kebN9Ux0FT9_/view?usp=drive_link",
    featured: true,
  },
  {
    title: "Captcha Solver",
    description: "Custom OCR-based Captcha Solver using Computer Vision for a visa application platform.",
    status: "Completed",
    tags: ["Computer Vision", "OCR", "Automation"],
    demoLink: "https://drive.google.com/file/d/1ErD6-8WMbDqLqK6Tbzw5HWkeb7_yFPOu/view?usp=drive_link",
  },
  {
    title: "Twitter/X Engagement Agent",
    description: "Swaggy X bot for Game5Ball's official page – automated engagement, AI-generated content, and growth analytics.",
    status: "Completed",
    tags: ["Agentic AI", "Bot", "Social Media"],
    demoLink: "https://drive.google.com/file/d/19nq1VQlAQB7dUfycvPyKUbBbdoBXqueK/view?usp=drive_link",
    featured: true,
  },
  {
    title: "Beans & More Assistant",
    description: "A conversational chatbot for customer service with intelligent intent recognition.",
    status: "Completed",
    tags: ["NLP", "Chatbot", "Conversational AI"],
  },
  {
    title: "Vtryon",
    description: "Virtual try-on solution using computer vision and AI for fashion e-commerce.",
    status: "Completed",
    tags: ["Computer Vision", "AI", "E-commerce"],
  },
  {
    title: "Project & Resource Management System",
    description: "PowerBI-based project management solution with AI-driven resource optimization.",
    status: "Completed",
    tags: ["PowerBI", "Management", "Data Analytics"],
  },
  {
    title: "eBay Sports Card Filter",
    description: "Automated filtering and sorting system for sports cards on eBay using web scraping and AI classification.",
    status: "Completed",
    tags: ["Automation", "Web Scraping", "Data Sorting"],
  },
  {
    title: "Search Info Compiler",
    description: "Multi-platform profile matching using AI-driven summary analysis and cross-platform profile features.",
    status: "In Development",
    tags: ["AI", "Data Analysis", "NLP"],
  },
  {
    title: "Amora",
    description: "Brazil embassy query classifier for candidate eligibility detection using NLP and classification models.",
    status: "Completed",
    tags: ["NLP", "Classification", "Immigration"],
  },
  {
    title: "Medical Prescription Suggestor",
    description: "Suggestive medical formula generator based on diseases and symptoms using AI-powered recommendation.",
    status: "Completed",
    tags: ["AI", "Healthcare", "NLP"],
  },
];

const statusConfig = {
  Completed: { icon: CheckCircle, color: "text-primary border-primary/30 bg-primary/10" },
  "In Development": { icon: Clock, color: "text-accent border-accent/30 bg-accent/10" },
};

const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4 md:px-8 section-light">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Featured Projects" subtitle="A showcase of AI/ML projects spanning computer vision, NLP, and agentic systems." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const status = statusConfig[project.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <div
                key={project.title}
                className={`group bg-background rounded-2xl border overflow-hidden flex flex-col card-hover shadow-sm animate-fade-in-up ${
                  project.featured ? "border-primary/30" : "border-border"
                }`}
                style={{ animationDelay: `${(index % 6) * 80}ms` }}
              >
                {project.featured && (
                  <div className="px-4 py-2 bg-primary/5 border-b border-primary/10">
                    <span className="text-xs font-semibold text-primary">
                      ⭐ Featured Project
                    </span>
                  </div>
                )}

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-200 text-base leading-tight">
                      {project.title}
                    </h3>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${status.color}`}>
                      <StatusIcon className="h-3 w-3" />
                      {project.status}
                    </span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1 font-body">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md text-xs font-medium border border-border bg-secondary/50 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all duration-200 group/btn shadow-sm"
                    >
                      <Play className="h-3.5 w-3.5" />
                      <span>Watch Demo</span>
                      <ExternalLink className="h-3 w-3 ml-auto group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
