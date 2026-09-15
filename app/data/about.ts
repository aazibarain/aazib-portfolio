export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  details?: string;
}

export const aboutData = {
  name: "Aazib Abdullah",
  role: "AI Engineer",
  image: "/profile.png",
  location: "Islamabad, Pakistan",
  bio: "AI Engineer with a strong foundation in deep learning, machine learning, and backend-focused full-stack development. I build and deploy data-driven, model-backed applications, with hands-on work across medical imaging, NLP, computer vision, and adversarial machine learning.",
  focus:
    "Currently exploring generative AI and computer vision techniques with a research mindset, while turning experiments into production-ready web applications.",
  education: [
    {
      institution:
        "NUST - College of Electrical and Mechanical Engineering, Rawalpindi",
      degree: "MS Artificial Intelligence",
      year: "2026 - Present",
    },
    {
      institution:
        "FAST - National University of Computer and Emerging Sciences, Islamabad",
      degree: "BS Computer Science",
      year: "2022 - 2026",
    },
    {
      institution: "New Life Public Higher Secondary College, Kunri, Sindh",
      degree: "F.Sc - Physics, Chemistry, Mathematics",
      year: "2020 - 2022",
    },
    {
      institution: "Sarghodian Spirit Trust Public School, Tando Allah Yar",
      degree: "O Levels - Physics, Chemistry, Computer Science",
      year: "2017 - 2020",
    },
  ] satisfies EducationItem[],
  certifications: [
    "IBM AI Engineering Professional Certificate",
    "Securing Generative AI",
    ".NET Full Stack Developer Specialization",
  ],
  achievements: [
    "Secured 3rd position in a national-level mathematics competition.",
    "Achieved Level 1 Seller status on Fiverr through consistent, high-quality delivery.",
  ],
};
