import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const projects = [
  {
    title: "Amora",
    description: "Brazil embassy query classifier for candidate eligibility detection",
    status: "Completed",
    tags: ["NLP", "Classification"]
  },
  {
    title: "Medical Prescription Suggestor",
    description: "Suggestive medical formula generator based on diseases and symptoms",
    status: "Completed",
    tags: ["AI", "Healthcare"]
  },
  {
    title: "Career Metro Mapping AI",
    description: "A career guide powered by OpenAI",
    status: "Completed",
    tags: ["OpenAI", "Career Guidance"]
  },
  {
    title: "Vtryon",
    description: "Virtual try-on solution",
    status: "In Development",
    tags: ["Computer Vision", "AI"]
  },
  {
    title: "Project & Resource Management System",
    description: "PowerBI-based project management solution",
    status: "Completed",
    tags: ["PowerBI", "Management"]
  },
  {
    title: "3D Teeth Segmentation",
    description: "Segmentation of inter oral scans for dental imaging",
    status: "Completed",
    tags: ["Computer Vision", "3D Mesh Segmentation"]
  },
  {
    title: "Ebay Sports Card Filter",
    description: "Automated filtering system for sports cards on eBay",
    status: "Completed",
    tags: ["Automation", "Web Scraping", "Data Sorting"]
  },
  {
    title: "Automated Captcha Solver for a visa application platform ",
    description: "Custom OCR-based Captcha Solver using Computer Vision",
    status: "Completed",
    tags: ["Computer Vision", "OCR"]
  },
  {
    title: "Beans and More assistant",
    description: "A conversational chatbot",
    status: "Completed",
    tags: ["NLP", "Chatbot"]
  },
  {
    title: "Twitter Bot",
    description: "Swaggy X (twitter) bot for Game5Ball official Page. This bot is capable of interacting with users and generate new content posts to increase the engagement and many more to come soon.",
    status: "In Development",
    tags: ["Bot", "Crypto"]
  },
  {
    title: "Search Info Compiler",
    description: "Multi-platform profile matching using summary analysis and profile features",
    status: "In Development",
    tags: ["AI", "Data Analysis"]
  },
  {
    title: "Web3 Trading Chatbot",
    description: "AI-powered crypto guide with action-ready agents inspired by Chatoshi",
    status: "In Development",
    tags: ["NLP", "Trading", "Web Surfing"]
  }
];

const Projects = () => {
  return (
    <section className="py-16 px-4" id="projects">
      <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((project, index) => (
          <Card 
            key={project.title} 
            className="hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="group-hover:text-primary transition-colors duration-200">{project.title}</span>
                <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                  {project.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
