import { SectionHeader } from "./About";
import { useState } from "react";
import { Award, Languages } from "lucide-react";

const skillCategories = [
  {
    title: "AI Expertise",
    icon: "🧠",
    skills: [
      "Python",
      "Generative AI (GenAI)",
      "Agentic AI",
      "RAG",
      "Computer Vision",
      "OCR",
      "Text To Speech",
      "TensorFlow",
      "PyTorch",
      "Feature Engineering",
      "Data Pre-processing",
      "Data Annotation",
      "Image Analysis",
      "Video Analysis",
      "Voice Analysis",
      "Vector Databases",
      "Scikit-learn",
      "Fine-tuning Models",
      "Model Deployment",
      "LangChain",
      "LangGraph",
    ],
  },
  {
    title: "Engineering & Infrastructure",
    icon: "⚙️",
    skills: [
      "FastAPI",
      "Django",
      "Flask",
      "NVIDIA Triton",
      "Roboflow",
      "CI/CD",
      "Claude Code / API",
      "OpenAI API",
      "Docker",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "Cloud Platforms & Tools",
    icon: "☁️",
    skills: ["AWS", "Azure", "GCP", "Vast.ai", "RunPod"],
  },
];

const certifications = [
  { title: "AI and Data Science", issuer: "SMIT" },
  { title: "Building With Claude API", issuer: "Anthropic" },
  { title: "Introduction To Model Context Protocol", issuer: "Anthropic" },
];

const languages = [
  { name: "English", level: "Proficient" },
  { name: "Urdu", level: "Native" },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-4 md:px-8 section-blue">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Skills & Technologies"
          subtitle="Comprehensive expertise across AI/ML, engineering infrastructure, and cloud platforms."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.title}
              className="bg-background rounded-2xl p-6 border border-border card-hover shadow-sm animate-fade-in-up"
              style={{ animationDelay: `${catIdx * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                  {category.icon}
                </div>
                <h3 className="font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 cursor-default ${
                      hoveredSkill === skill
                        ? "border-primary bg-primary text-primary-foreground shadow-md"
                        : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-primary"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Languages */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="bg-background rounded-2xl p-6 border border-border shadow-sm animate-fade-in-up">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
                <Award className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-bold text-foreground">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex gap-3">
                  <span className="text-accent mt-0.5 font-bold shrink-0">▸</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{cert.title}</div>
                    <div className="text-xs text-muted-foreground">{cert.issuer}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-border shadow-sm animate-fade-in-up animate-delay-100">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Languages className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-bold text-foreground">Languages</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {languages.map((lang) => (
                <div
                  key={lang.name}
                  className="p-4 rounded-xl border border-border bg-secondary/40 text-center"
                >
                  <div className="text-sm font-semibold text-foreground">{lang.name}</div>
                  <div className="text-xs text-primary font-medium mt-1">{lang.level}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Open Source */}
        <div className="mt-6 bg-background rounded-2xl p-6 border border-primary/20 shadow-sm animate-fade-in-up text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">📦</span>
            <h3 className="font-bold text-foreground">Open Source Contributions</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-4 font-body">
            Published open-source datasets on Kaggle – leading the gathering, labeling, analysis & model training process.
          </p>
          <a
            href="https://www.kaggle.com/datasets/zaidworks0508"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            kaggle.com/datasets/zaidworks0508 ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
