export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experienceData: Experience[] = [
  {
    title: "Freelance Developer",
    company: "Fiverr",
    period: "Aug 2023 - Present",
    description:
      "Delivering custom software and Python/ML-based solutions for international clients, from requirements gathering through final delivery.",
    highlights: [
      "Build and debug data-processing scripts and applications in Python, C/C++, and Java.",
      "Translate client requirements into reliable, maintainable software solutions.",
      "Earned Level 1 Seller status through clear communication and consistent delivery quality.",
    ],
  },
];
