import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useState, useEffect } from "react";

const roles = [
  "AI-ML Engineer",
  "Python Developer",
  "Computer Vision Specialist",
  "Agentic AI Builder",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentRole = roles[roleIndex];

    if (typing) {
      if (displayed.length < currentRole.length) {
        timeout = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center px-4 relative overflow-hidden circuit-pattern">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-[80px] animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-primary/3 blur-[100px]" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-primary/4 blur-[60px] animate-float" style={{ animationDelay: "0.75s" }} />
      </div>

      {/* Terminal-style header badge */}
      <div className="animate-fade-in-up mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-sm font-mono text-primary">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for opportunities
        </div>
      </div>

      {/* Avatar */}
      <div className="animate-fade-in-up animate-delay-200 mb-8 relative z-10">
        <div className="relative inline-block">
          <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse-glow" />
          <Avatar className="w-40 h-40 border-2 border-primary/50 relative hover:scale-105 transition-transform duration-300">
            <AvatarImage src="/lovable-uploads/2f92cc68-6f1c-48c0-afdd-10ceb7cbfe1b.png" alt="Zaid Ahmed" />
            <AvatarFallback className="bg-card text-primary text-3xl font-bold">ZA</AvatarFallback>
          </Avatar>
          {/* Rotating ring */}
          <div className="absolute -inset-3 rounded-full border border-dashed border-primary/20 animate-rotate-slow" />
        </div>
      </div>

      {/* Name */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in-up animate-delay-300 relative z-10">
        <span className="text-foreground">Zaid </span>
        <span className="gradient-text glow-text">Ahmed</span>
      </h1>

      {/* Typing role */}
      <div className="h-10 mb-6 animate-fade-in-up animate-delay-400 relative z-10">
        <h2 className="text-xl md:text-2xl font-mono text-primary">
          &gt; {displayed}
          <span className="typing-cursor" />
        </h2>
      </div>

      {/* Stats */}
      <div className="flex gap-8 mb-8 animate-fade-in-up animate-delay-500 relative z-10">
        {[
          { value: "3+", label: "Years XP" },
          { value: "12+", label: "Projects" },
          { value: "3", label: "Awards" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-primary glow-text">{stat.value}</div>
            <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Description */}
      <p className="max-w-2xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up animate-delay-600 relative z-10">
        AI/ML Engineer specializing in <span className="text-primary">Computer Vision</span>, <span className="text-primary">Deep Learning</span>, and <span className="text-primary">Agentic AI</span>. Building scalable, production-ready AI solutions that solve real-world problems.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up animate-delay-700 relative z-10 justify-center">
        <Button
          onClick={scrollToProjects}
          className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono font-semibold px-6 shadow-[0_0_20px_hsl(174_100%_50%/0.3)] hover:shadow-[0_0_30px_hsl(174_100%_50%/0.5)] transition-all duration-300"
        >
          <FolderOpen className="mr-2 h-4 w-4" />
          View Projects
        </Button>
        <Button
          onClick={scrollToContact}
          variant="outline"
          className="border-primary/50 text-primary hover:bg-primary/10 font-mono font-semibold px-6 transition-all duration-300"
        >
          <Mail className="mr-2 h-4 w-4" />
          Get In Touch
        </Button>
      </div>

      {/* Social Links */}
      <div className="flex gap-3 animate-fade-in-up animate-delay-800 relative z-10">
        {[
          { href: "https://github.com/zaidworks515", icon: Github, label: "GitHub" },
          { href: "https://linkedin.com/in/zaidworks515", icon: Linkedin, label: "LinkedIn" },
          { href: "https://www.kaggle.com/zaidworks0508", label: "Kaggle", kaggle: true },
        ].map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:shadow-[0_0_15px_hsl(174_100%_50%/0.3)] text-muted-foreground hover:text-primary"
            aria-label={social.label}
          >
            {social.kaggle ? (
              <span className="font-bold font-mono text-sm">K</span>
            ) : (
              <social.icon className="h-4 w-4" />
            )}
          </a>
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float opacity-50">
        <div className="flex flex-col items-center gap-1 text-xs font-mono text-muted-foreground">
          <span>scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
