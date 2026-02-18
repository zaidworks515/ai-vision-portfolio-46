import { Trophy, Laptop, Award } from "lucide-react";
import { SectionHeader } from "./About";

const achievements = [
  {
    title: "Sir Syed Technovative Ideathon 2024",
    description: "Winner of the Sir Syed Technovative Ideathon 2024 – a prestigious innovation and technology competition.",
    icon: Trophy,
    year: "2024",
    color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/5",
    glowColor: "hover:shadow-[0_0_25px_rgba(250,204,21,0.2)]",
  },
  {
    title: "Devathon SUMIT 1.0 – Laptop Winner",
    description: "Won the Laptop prize in the 'AI & Data Science' category at Devathon SUNIT 1.0 hackathon.",
    icon: Laptop,
    year: "2023",
    color: "text-primary border-primary/30 bg-primary/5",
    glowColor: "hover:shadow-[0_0_25px_hsl(174_100%_50%/0.2)]",
  },
  {
    title: "2nd Position – AI Project Exhibition",
    description: "Achieved 2nd Position in University AI Project Exhibition 2022, recognized for innovative AI application development.",
    icon: Award,
    year: "2022",
    color: "text-orange-400 border-orange-400/30 bg-orange-400/5",
    glowColor: "hover:shadow-[0_0_25px_rgba(251,146,60,0.2)]",
  },
];

const Achievements = () => {
  return (
    <section id="achievements" className="py-24 px-4 md:px-8 relative circuit-pattern">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="// achievements.awards" title="Recognition & Awards" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.title}
                className={`terminal-bg rounded-xl p-6 border text-center transition-all duration-300 cursor-default animate-fade-in-up ${achievement.color} ${achievement.glowColor} glow-border-hover`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border mb-5 mx-auto"
                  style={{ borderColor: "inherit" }}>
                  <Icon className="h-7 w-7" />
                  <div className="absolute inset-0 rounded-full blur-md opacity-20" />
                </div>
                <div className="font-mono text-xs text-muted-foreground mb-3 tracking-widest">{achievement.year}</div>
                <h3 className="font-bold text-foreground mb-3 leading-snug">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{achievement.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
