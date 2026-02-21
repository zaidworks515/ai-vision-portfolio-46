import { SectionHeader } from "./About";
import { useState } from "react";

const skillCategories = [
  {
    title: "Core AI/ML",
    icon: "🧠",
    skills: ["Computer Vision", "Deep Learning", "Machine Learning", "NLP", "LLMs", "Neural Networks", "GenAI", "Agentic AI"],
  },
  {
    title: "Languages & Frameworks",
    icon: "⚙️",
    skills: ["Python", "TensorFlow", "PyTorch", "FastAPI", "Flask", "Django", "LangChain", "OpenAI SDK"],
  },
  {
    title: "Data & Engineering",
    icon: "📊",
    skills: ["Data Preprocessing", "Feature Engineering", "Data Annotation", "PostgreSQL", "MySQL", "Redis", "Apache Kafka"],
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    skills: ["Docker", "AWS", "Azure", "CI/CD", "REST APIs", "Backend Development", "Cloud Deployment"],
  },
  {
    title: "Specialized Domains",
    icon: "🔬",
    skills: ["OCR", "Text-to-Speech", "Pose Estimation", "3D Mesh Segmentation", "Web Scraping", "Automation"],
  },
  {
    title: "Professional",
    icon: "🤝",
    skills: ["Project Management", "Problem Solving", "Open-Source Contributor", "Attention to Detail", "Communication"],
  },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20 px-4 md:px-8 section-blue">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Skills & Technologies" subtitle="Comprehensive expertise across AI/ML, data engineering, and cloud infrastructure." />

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

        {/* Open Source */}
        <div className="mt-10 bg-background rounded-2xl p-6 border border-primary/20 shadow-sm animate-fade-in-up text-center">
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
