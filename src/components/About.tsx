import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    role: "AI-ML Engineer / Python Developer",
    company: "Inseyab Consulting & Tradeforesight",
    period: "Jul 2025 – Present",
    location: "NASTP, Sharah-e-Faisal, Karachi",
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

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-14 text-center">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
      {title.split(" ").map((word, i) =>
        i === title.split(" ").length - 1 ? (
          <span key={i} className="gradient-text"> {word}</span>
        ) : (
          <span key={i}>{word} </span>
        )
      )}
    </h2>
    {subtitle && <p className="text-muted-foreground max-w-xl mx-auto font-body">{subtitle}</p>}
    <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-20 px-4 md:px-8 section-light">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="My Background" subtitle="Over 3 years of hands-on experience in AI/ML engineering and Python development." />

        {/* Summary card */}
        <div className="bg-background rounded-2xl p-8 mb-16 border border-border shadow-sm animate-fade-in-up max-w-3xl mx-auto">
          <p className="text-foreground/80 leading-relaxed font-body text-center">
            AI/ML Engineer with expertise in <span className="text-primary font-semibold">Computer Vision</span>, <span className="text-primary font-semibold">NLP</span>, <span className="text-primary font-semibold">Agentic AI</span>, and <span className="text-primary font-semibold">Deep Learning</span>. Experienced with cloud platforms like AWS & Azure. Passionate open-source contributor advancing AI technology.
          </p>
        </div>

        {/* Experience */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Work Experience</h3>
          </div>

          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent hidden md:block" />

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="md:pl-16 relative animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 w-10 h-10 rounded-full border-2 border-primary bg-background flex items-center justify-center hidden md:flex shadow-sm">
                    <div className={`w-3 h-3 rounded-full ${exp.current ? "bg-accent" : "bg-primary/40"}`} />
                  </div>

                  <div className="bg-background rounded-2xl p-6 border border-border card-hover shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-foreground">{exp.role}</h4>
                        <p className="text-primary font-semibold text-sm">{exp.company}</p>
                      </div>
                      <div className="text-right">
                        {exp.current && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 text-accent-foreground text-xs font-semibold border border-accent/30 mb-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            Current
                          </span>
                        )}
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3" />
                          {exp.location}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2 mt-4">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="flex gap-3 text-sm text-muted-foreground font-body">
                          <span className="text-accent mt-0.5 shrink-0 font-bold">▸</span>
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
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">Education</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="bg-background rounded-2xl p-6 border border-border card-hover shadow-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h4 className="font-bold text-foreground mb-1">{edu.degree}</h4>
                <p className="text-primary text-sm font-semibold mb-3">{edu.institution}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{edu.period}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{edu.location}</span>
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
