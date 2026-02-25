export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Freelance Software Developer",
    company: "Fiverr",
    period: "2023 - Present",
    description: "Delivered custom software solutions and web applications for clients worldwide.",
    highlights: [
    "Built full-stack web applications using React, Node.js, and MongoDB",
    "Integrated payment systems and REST APIs for multiple projects",
    "Provided ongoing support and feature enhancements for clients",
    ],
  },
  {
    title: "Freelance Software Developer",
    company: "Upwork",
    period: "2023 - Present",
    description: "Completed diverse client projects ranging from desktop apps to web solutions.",
    highlights: [
    "Developed responsive web apps and dashboards using Next.js and Tailwind CSS",
    "Optimized performance and database queries for client systems",
    "Delivered projects on time while maintaining high client satisfaction",
    ],
  },
];
