import { Github, Linkedin, Mail, FolderOpen, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { useState, useEffect } from "react";

const roles = [
"AI-ML Engineer",
"Python Developer",
"Computer Vision Specialist",
"Agentic AI Builder"];


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

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden hero-gradient">
      {/* Decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full border border-primary-foreground/5" />
        <div className="absolute bottom-1/3 right-20 w-40 h-40 rounded-full border border-primary-foreground/5" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text side */}
          <div className="text-primary-foreground relative z-10 order-2 md:order-1">
            <div className="animate-fade-in-up">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-sm font-medium mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Available for opportunities
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 animate-fade-in-up animate-delay-100 leading-tight">
              Zaid Ahmed
            </h1>

            {/* Typing role */}
            <div className="h-10 mb-6 animate-fade-in-up animate-delay-200">
              <h2 className="text-xl md:text-2xl font-medium text-accent">
                {displayed}
                <span className="animate-pulse text-accent">|</span>
              </h2>
            </div>

            <p className="text-primary-foreground/80 mb-8 max-w-lg leading-relaxed animate-fade-in-up animate-delay-300 text-base md:text-lg font-body">
              AI/ML Engineer specializing in <span className="text-accent font-semibold">Computer Vision</span>, <span className="text-accent font-semibold">Deep Learning</span>, and <span className="text-accent font-semibold">Agentic AI</span>. Building scalable, production-ready AI solutions.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 mb-8 animate-fade-in-up animate-delay-400">
              {[
              { value: "3+", label: "Years XP" },
              { value: "12+", label: "Projects" },
              { value: "3", label: "Awards" }].
              map((stat) =>
              <div key={stat.label} className="text-center">
                  <div className="text-3xl font-extrabold text-accent">{stat.value}</div>
                  <div className="text-xs text-primary-foreground/60 uppercase tracking-wider font-medium">{stat.label}</div>
                </div>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up animate-delay-500">
              <Button
                onClick={scrollToProjects}
                className="bg-accent text-accent-foreground hover:brightness-110 font-semibold px-6 py-3 shadow-lg transition-all duration-200">

                <FolderOpen className="mr-2 h-4 w-4" />
                View Projects
              </Button>
              <Button
                onClick={scrollToContact}
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground font-semibold px-6 py-3 transition-all duration-200 bg-lime-700 hover:bg-lime-600">

                <Mail className="mr-2 h-4 w-4 text-primary" />
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 animate-fade-in-up animate-delay-600">
              {[
              { href: "https://github.com/zaidworks515", icon: Github, label: "GitHub" },
              { href: "https://linkedin.com/in/zaidworks515", icon: Linkedin, label: "LinkedIn" },
              { href: "https://www.kaggle.com/zaidworks0508", label: "Kaggle", kaggle: true }].
              map((social) =>
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 hover:bg-primary-foreground/20 transition-all duration-200 text-primary-foreground"
                aria-label={social.label}>

                  {social.kaggle ?
                <span className="font-bold text-sm">K</span> :

                <social.icon className="h-4 w-4" />
                }
                </a>
              )}
            </div>
          </div>

          {/* Avatar side */}
          <div className="flex justify-center relative z-10 order-1 md:order-2 animate-fade-in-up animate-delay-300">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -inset-4 rounded-full border-2 border-dashed border-primary-foreground/10 animate-[spin_30s_linear_infinite]" />
              <Avatar className="w-48 h-48 md:w-64 md:h-64 border-4 border-primary-foreground/20 relative shadow-2xl">
                <AvatarImage src="/lovable-uploads/2f92cc68-6f1c-48c0-afdd-10ceb7cbfe1b.png" alt="Zaid Ahmed" />
                <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">ZA</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float text-primary-foreground/50">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>);

};

export default Hero;