
import { Card, CardContent } from "./ui/card";
import { Briefcase } from "lucide-react";

const About = () => {
  return (
    <section className="py-16 px-4" id="about">
      <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">About Me</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed">
              Hello! I'm Zaid Ahmed, an AI/ML Engineer and Python Developer with 2.5+ years of hands-on experience 
              building and deploying end-to-end AI applications. I specialize in Machine Learning, Deep Learning, 
              Computer Vision, and Conversational AI, with a strong focus on practical problem-solving.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              My expertise spans developing intelligent systems, training and fine-tuning custom models, 
              building smart chatbots and agents, and integrating AI into real-world products. I'm also 
              proficient in data preprocessing, model optimization, and scalable deployment on cloud platforms 
              like AWS and Azure.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Currently, I'm actively exploring and working on Generative AI and Agentic AI technologies, 
              pushing the boundaries of intelligent and adaptive AI systems.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="h-5 w-5" />
              <h3 className="text-xl font-semibold">Work Experience</h3>
            </div>
            <div className="space-y-6">
              <div className="group hover:bg-slate-50 p-4 rounded-lg transition-all duration-200">
                <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">AI-ML Engineer</h4>
                <p className="text-muted-foreground font-medium">Tesseract Innovations (Pvt) Ltd</p>
                <p className="text-sm text-muted-foreground font-medium">(Jun 2024 - Present)</p>
              </div>
              <div className="group hover:bg-slate-50 p-4 rounded-lg transition-all duration-200">
                <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">Python Developer Internship (Frappe)</h4>
                <p className="text-muted-foreground font-medium">Codes Soft</p>
                <p className="text-sm text-muted-foreground font-medium">(Oct 2023 - Dec 2023)</p>
              </div>
              <div className="group hover:bg-slate-50 p-4 rounded-lg transition-all duration-200">
                <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">AI-ML Engineer</h4>
                <p className="text-muted-foreground font-medium">Freelancing Projects</p>
                <p className="text-sm text-muted-foreground font-medium">(Jan 2023 - Present)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
