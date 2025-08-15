
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <div className="mb-8 animate-fade-in">
        <Avatar className="w-48 h-48 mb-6 hover:scale-105 transition-transform duration-300 border-4 border-transparent hover:border-primary/20">
          <AvatarImage src="/lovable-uploads/2f92cc68-6f1c-48c0-afdd-10ceb7cbfe1b.png" alt="Zaid Ahmed" />
          <AvatarFallback>ZA</AvatarFallback>
        </Avatar>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in animate-delay-200">
        Zaid Ahmed
      </h1>
      <h2 className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in animate-delay-300">
        Associate AI-ML Engineer at Tesseract Innovations
      </h2>
      <p className="max-w-2xl text-muted-foreground mb-8 animate-fade-in animate-delay-500">
        Specializing in Computer Vision and Deep Learning solutions, with a track record of delivering innovative AI projects 
        and a passion for solving complex problems.
      </p>
      <div className="flex gap-4 animate-fade-in animate-delay-700">
        <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200">
          <a href="https://github.com/zaidworks515" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200">
          <a href="https://linkedin.com/in/zaidworks515" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" size="icon" asChild className="hover:scale-110 transition-transform duration-200">
          <a href="https://www.kaggle.com/zaidworks0508" target="_blank" rel="noopener noreferrer">
            <span className="text-lg font-bold">K</span>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Hero;
