/**
 * Single source of truth for identity, links and resume facts.
 * Everything here comes from the resume PDF, the previous live portfolio or the
 * public LinkedIn profile. Nothing is inferred.
 */

export const profile = {
  name: "Zaid Ahmed",
  role: "AI/ML Engineer",
  location: "Karachi, Pakistan",
  currentCompany: "Inseyab Consulting",
  photo: "/media/zaid-ahmed.webp",
  email: "zaid_works515@outlook.com",
  phone: "+92 336 1084577",
  phoneHref: "tel:+923361084577",
  resume: {
    href: "/resume/Zaid-Ahmed-AI-ML-Engineer-Resume.pdf",
    fileName: "Zaid-Ahmed-AI-ML-Engineer-Resume.pdf",
  },
  summary:
    "AI/ML engineer with 3+ years in Python and machine learning. I build computer vision, speech and language models and take them from idea to production.",
} as const;

export type SocialLink = {
  id: "github" | "linkedin" | "kaggle" | "email";
  label: string;
  handle: string;
  href: string;
};

export const socials: SocialLink[] = [
  { id: "github", label: "GitHub", handle: "zaidworks515", href: "https://github.com/zaidworks515" },
  { id: "linkedin", label: "LinkedIn", handle: "in/zaidworks515", href: "https://www.linkedin.com/in/zaidworks515" },
  { id: "kaggle", label: "Kaggle", handle: "zaidworks0508", href: "https://www.kaggle.com/zaidworks0508" },
  { id: "email", label: "Email", handle: "zaid_works515@outlook.com", href: "mailto:zaid_works515@outlook.com" },
];

export const education = [
  {
    title: "BS, Software Engineering",
    org: "Sir Syed University of Engineering & Technology",
    period: "2020 - 2024",
    place: "Karachi",
  },
  {
    title: "Artificial Intelligence & Data Sciences",
    org: "Saylani Mass IT Training (SMIT)",
    period: "2022 - 2023",
    place: "Karachi",
  },
];

export const certifications = [
  { title: "Building with the Claude API", issuer: "Anthropic" },
  { title: "Introduction to Model Context Protocol", issuer: "Anthropic" },
  { title: "AI and Data Science", issuer: "Saylani Mass IT Training" },
];

export const awards = [
  { year: "2024", title: "Winner, Sir Syed Technovative Ideathon 2024" },
  { year: "2023", title: "Laptop winner in the AI & DS category, Devathon SUMIT 1.0" },
  { year: "2022", title: "2nd place, University AI Project Exhibition 2022" },
];

export const languages = [
  { name: "English", level: "Proficient" },
  { name: "Urdu", level: "Native" },
];

export const openSource = {
  title: "Open-source datasets on Kaggle",
  detail: "Led the gathering, labelling, analysis and model-training process.",
  date: "04/2024",
  href: "https://www.kaggle.com/datasets/zaidworks0508",
};
