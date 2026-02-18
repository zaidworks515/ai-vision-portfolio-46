import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "AI-ML Engineer / Python Developer",
    company: "Inseyab Consulting & Tradeforesight",
    period: "Jul 2025 – Present",
    location: "NASTP, Sharah-e-Faisal, Karachi",
    description: "An AI-focused firm building intelligent solutions that enhance business efficiency and strategic decision-making.",
    highlights: [
      "Led end-to-end AI solution development covering backend architecture, model integration & API design",
      "Built scalable RESTful APIs with FastAPI/Flask for seamless AI-to-frontend integration",
      "Containerized services using Docker; deployed on AWS & Azure",
      "Utilized Apache Kafka for scalable, low-latency streaming and queue management",
    ],
    current: true,
  },
  {
    role: "AI-ML Engineer",
    company: "Tesseract Innovations Pvt Ltd",
    period: "Jun 2024 – Jun 2025",
    location: "Gulshan-e-Iqbal, Karachi",
    description: "A tech firm focused on innovative AI solutions.",
    highlights: [
      "Deployed end-to-end ML models from data preprocessing to production",
      "Applied computer vision for object detection, segmentation, and pose estimation",
      "Implemented Agentic AI concepts for autonomous decision-capable systems",
      "Led API integration for real-time model-to-product transitions",
    ],
    current: false,
  },
  {
    role: "AI-ML Engineer (Contract/Freelance)",
    company: "Independent Projects",
    period: "Jan 2023 – Present",
    location: "Remote",
    description: "End-to-end AI/ML consulting and project delivery for international clients.",
    highlights: [
      "Delivered 10+ AI projects across NLP, computer vision, and automation",
      "Clients from healthcare, e-commerce, finance, and immigration sectors",
    ],
    current: true,
  },
  {
    role: "Python Developer (Internship – Frappe)",
    company: "Codes Soft",
    period: "Oct 2023 – Dec 2023",
    location: "Gulshan-e-Iqbal, Karachi",
    description: "A technology company specializing in ERP software development.",
    highlights: [
      "Contributed to feature development and ERP application customization",
      "Enhanced Python development skills in real-world collaborative environment",
    ],
    current: false,
  },
];

const education = [
  {
    degree: "B.S. in Software Engineering",
    institution: "Sir Syed University of Engineering & Technology",
    period: "Aug 2020 – Jun 2024",
    location: "Karachi",
  },
  {
    degree: "Artificial Intelligence & Data Sciences",
    institution: "Saylani Mass IT (SMIT)",
    period: "Jan 2022 – Dec 2023",
    location: "Karachi",
  },
];

const SectionHeader = ({ label, title }: { label: string; title: string }) => (
  <div className="mb-16 text-center">
    <span className="inline-block px-3 py-1 rounded font-mono text-xs text-primary border border-primary/30 bg-primary/5 mb-4">
      {label}
    </span>
    <h2 className="text-4xl md:text-5xl font-bold">
      {title.split(" ").map((word, i) =>
        i === title.split(" ").length - 1 ? (
          <span key={i} className="gradient-text"> {word}</span>
        ) : (
          <span key={i}>{word} </span>
        )
      )}
    </h2>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 px-4 md:px-8 relative">
      <div className="max-w-5xl mx-auto">
        <SectionHeader label="// about.me" title="My Background" />

        {/* Summary card */}
        <div className="terminal-bg rounded-xl p-6 mb-16 glow-border-hover animate-fade-in-up scan-line">
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-primary/70" />
            </div>
            <span className="font-mono text-xs text-muted-foreground ml-2">summary.py</span>
          </div>
          <p className="text-foreground/80 leading-relaxed font-mono text-sm">
            <span className="text-primary">class</span> <span className="text-yellow-400">ZaidAhmed</span>:
            <br />
            <span className="ml-4 text-muted-foreground"># AI/ML Engineer with 3+ years of Python & ML experience</span>
            <br />
            <span className="ml-4"><span className="text-primary">specializations</span> = [<span className="text-green-400">"Computer Vision"</span>, <span className="text-green-400">"NLP"</span>, <span className="text-green-400">"Agentic AI"</span>, <span className="text-green-400">"Deep Learning"</span>]</span>
            <br />
            <span className="ml-4"><span className="text-primary">cloud</span> = [<span className="text-green-400">"AWS"</span>, <span className="text-green-400">"Azure"</span>]</span>
            <br />
            <span className="ml-4"><span className="text-primary">passion</span> = <span className="text-green-400">"Open-source contributor advancing AI technology"</span></span>
          </p>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="text-2xl font-bold">Work Experience</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-2" />
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="md:pl-12 relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-4 w-8 h-8 rounded-full border border-primary/50 bg-card flex items-center justify-center hidden md:flex">
                    <div className={`w-2 h-2 rounded-full ${exp.current ? "bg-primary animate-pulse" : "bg-muted-foreground"}`} />
                  </div>

                  <div className="terminal-bg rounded-xl p-5 glow-border-hover border border-border/50 hover:border-primary/30 transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{exp.role}</h4>
                        <p className="text-primary font-semibold">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        {exp.current && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            Current
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground font-mono">
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted-foreground">
                          <span className="text-primary mt-1 shrink-0">▹</span>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="text-2xl font-bold">Education</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent ml-2" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="terminal-bg rounded-xl p-5 glow-border-hover border border-border/50 hover:border-primary/30 transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h4 className="font-bold text-foreground mb-1">{edu.degree}</h4>
                <p className="text-primary text-sm font-medium mb-2">{edu.institution}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{edu.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{edu.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { SectionHeader };
export default About;
