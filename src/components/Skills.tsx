import { SectionHeader } from "./About";
import { useState } from "react";

const skillCategories = [
  {
    title: "Core AI/ML",
    icon: "🧠",
    color: "from-primary/20 to-primary/5",
    skills: ["Computer Vision", "Deep Learning", "Machine Learning", "NLP", "LLMs", "Neural Networks", "GenAI", "Agentic AI"],
  },
  {
    title: "Languages & Frameworks",
    icon: "⚙️",
    color: "from-blue-500/20 to-blue-500/5",
    skills: ["Python", "TensorFlow", "PyTorch", "FastAPI", "Flask", "Django", "LangChain", "OpenAI SDK"],
  },
  {
    title: "Data & Engineering",
    icon: "📊",
    color: "from-purple-500/20 to-purple-500/5",
    skills: ["Data Preprocessing", "Feature Engineering", "Data Annotation", "PostgreSQL", "MySQL", "Redis", "Apache Kafka"],
  },
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    color: "from-orange-500/20 to-orange-500/5",
    skills: ["Docker", "AWS", "Azure", "CI/CD", "REST APIs", "Backend Development", "Cloud Deployment"],
  },
  {
    title: "Specialized Domains",
    icon: "🔬",
    color: "from-primary/20 to-primary/5",
    skills: ["OCR", "Text-to-Speech", "Pose Estimation", "3D Mesh Segmentation", "Web Scraping", "Automation"],
  },
  {
    title: "Professional",
    icon: "🤝",
    color: "from-pink-500/20 to-pink-500/5",
    skills: ["Project Management", "Problem Solving", "Open-Source Contributor", "Attention to Detail", "Communication"],
  },
];

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-24 px-4 md:px-8 relative circuit-pattern">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="// skills.tech_stack" title="Skills & Technologies" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, catIdx) => (
            <div
              key={category.title}
              className={`terminal-bg rounded-xl p-6 border border-border/50 hover:border-primary/30 glow-border-hover transition-all duration-300 animate-fade-in-up`}
              style={{ animationDelay: `${catIdx * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="font-bold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    onMouseEnter={() => setHoveredSkill(skill)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`px-3 py-1 rounded-full text-xs font-mono border transition-all duration-200 cursor-default ${
                      hoveredSkill === skill
                        ? "border-primary bg-primary/15 text-primary shadow-[0_0_10px_hsl(174_100%_50%/0.3)]"
                        : "border-border/50 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-primary/80"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Publications */}
        <div className="mt-12 terminal-bg rounded-xl p-6 border border-primary/20 glow-border animate-fade-in-up">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-primary font-mono text-sm">📦</span>
            <h3 className="font-bold text-foreground">Open Source Contributions</h3>
          </div>
          <p className="text-muted-foreground text-sm mb-3">
            Published open-source datasets on Kaggle – leading the gathering, labeling, analysis & model training process.
          </p>
          <a
            href="https://www.kaggle.com/datasets/zaidworks0508"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-mono text-primary hover:underline"
          >
            <span>kaggle.com/datasets/zaidworks0508</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Skills;
