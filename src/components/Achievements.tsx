import { Trophy, Laptop, Award } from "lucide-react";
import { SectionHeader } from "./About";

const achievements = [
  {
    title: "Sir Syed Technovative Ideathon 2024",
    description: "Winner of the Sir Syed Technovative Ideathon 2024 – a prestigious innovation and technology competition.",
    icon: Trophy,
    year: "2024",
    accent: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
  },
  {
    title: "Devathon SUMIT 1.0 – Laptop Winner",
    description: "Won the Laptop prize in the 'AI & Data Science' category at Devathon SUMIT 1.0 hackathon.",
    icon: Laptop,
    year: "2023",
    accent: "bg-primary/10 border-primary/30",
    iconColor: "text-primary",
  },
  {
    title: "2nd Position – AI Project Exhibition",
    description: "Achieved 2nd Position in University AI Project Exhibition 2022, recognized for innovative AI application development.",
    icon: Award,
    year: "2022",
    accent: "bg-accent/10 border-accent/30",
    iconColor: "text-accent",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 px-4 md:px-8 section-blue">
      <div className="max-w-5xl mx-auto">
        <SectionHeader title="Recognition & Awards" subtitle="Milestones and achievements in AI/ML competitions and hackathons." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className={`bg-background rounded-2xl p-8 border text-center card-hover shadow-sm animate-fade-in-up ${achievement.accent}`}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${achievement.accent} mb-5`}>
                  <Icon className={`h-7 w-7 ${achievement.iconColor}`} />
                </div>
                <div className="text-xs text-muted-foreground font-semibold mb-3 tracking-widest uppercase">{achievement.year}</div>
                <h3 className="font-bold text-foreground mb-3 leading-snug">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-body">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
