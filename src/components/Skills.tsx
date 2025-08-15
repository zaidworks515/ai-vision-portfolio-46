
import { Card, CardContent } from "./ui/card";

const skillCategories = [
  {
    title: "Core AI/ML",
    skills: ["Computer Vision", "Deep Learning", "Machine Learning", "Natural Language Processing", "Large Language Models", "Neural Networks", "GenAI", "Agentic AI"]
  },
  {
    title: "Programming & Frameworks",
    skills: ["Python", "TensorFlow", "PyTorch", "Flask", "SQL", "OpenAI", "FastAPI", "Django", "LangChain", "Gork"]
  },
  {
    title: "Data Science",
    skills: ["Data Analysis", "Time Series Analysis", "Pattern Recognition", "Database Management"]
  },
  {
    title: "Professional Skills",
    skills: ["Project Management", "Software Development", "Problem Solving", "Communication", "Attention to Detail"]
  }
];

const Skills = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-white/80 to-slate-100/80 backdrop-blur-sm" id="skills">
      <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {skillCategories.map((category, index) => (
          <Card 
            key={category.title} 
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in bg-white/90 backdrop-blur-sm border-white/50"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-primary">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-slate-200/80 rounded-full text-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200 cursor-default hover:scale-110"
                    style={{ animationDelay: `${(index * 200) + (skillIndex * 50)}ms` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
