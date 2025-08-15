
import { Award, Laptop, Trophy } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const achievements = [
  {
    title: "Sir Syed Technovative Ideathon Winner",
    description: "Winner of Sir Syed Technovative Ideathon 2024",
    icon: Trophy
  },
  {
    title: "Devathon SUMIT 1.0 Laptop Winner",
    description: "Won the Laptop in 'AI & DS' Category at Devathon SUNIT 1.0",
    icon: Laptop
  },
  {
    title: "2nd Position in AI Project Exhibition",
    description: "Achieved 2nd Position in University AI Project Exhibition 2022",
    icon: Award
  }
];

const Achievements = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-l from-white/80 to-blue-50/80 backdrop-blur-sm" id="achievements">
      <h2 className="text-3xl font-bold text-center mb-12">Achievements</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <Card key={achievement.title} className="hover:shadow-lg transition-shadow bg-white/90 backdrop-blur-sm border-white/50">
            <CardContent className="p-6 text-center">
              <achievement.icon className="w-12 h-12 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{achievement.title}</h3>
              <p className="text-sm text-muted-foreground">{achievement.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
