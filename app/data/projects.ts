export interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  year: number;
}

export const projectsData: Project[] = [
  {
    name: "Terminal Portfolio",
    description: `A personal portfolio website designed as an interactive Linux terminal, showcasing projects, skills, and experience in a unique developer-centric interface. The website simulates a command-line environment with retro terminal fonts, command-based navigation, and dynamic outputs for each section, providing an immersive experience for visitors.

  Key Features:
  - Linux terminal-style UI with blinking cursor and typing animations
  - Command-based navigation: about, skills, projects, experience, contact
  - Responsive design for both desktop and mobile
  - Interactive outputs with links, project listings, and contact information
  - Fully deployable via Vercel with modern frontend technologies

  Impact:
  - Demonstrates creativity and frontend development skills
  - Highlights ability to implement interactive, custom UI components
  - Provides a memorable and unique portfolio experience for recruiters and clients`,
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/aazibarain/portfolio",
    year: 2026,
  },
  {
    name: "Lumbar Spine Degeneration Classification",
    description: `This project is an AI-powered MRI analysis system designed to assist radiologists in accurately detecting and grading lumbar spine degeneration. The system processes MRI scans, identifies degenerative patterns, and classifies them based on severity using deep learning, image preprocessing, and computer vision to improve diagnostic speed and accuracy.

  Key Features:
  - Automated detection and grading of lumbar spine degeneration
  - Support for multiple MRI sequences (sagittal and axial views)
  - Visual highlights/overlays for affected regions to aid radiologists
  - Scalable pipeline for integration with clinical workflows

  Impact:
  - Reduces manual workload for radiologists
  - Improves diagnostic consistency and efficiency
  - Demonstrates practical application of AI in medical imaging`,
    tech: ["Python", "PyTorch", "YOLO", "OpenCV", "FastAPI"],
    github: "https://github.com/aazibarain/SpineScan",
    year: 2025,
  },
  {
    name: "Urdu Poetry Generation using Deep Learning",
    description: `A deep learning project that trains models on a large corpus of Urdu poetry to generate new poetic lines. Multiple model architectures and optimizers were tested, including Adam and RMSprop, to evaluate which combination produces the most fluent and stylistically accurate poetry. The project emphasizes natural language processing and creative AI.

  Key Features:
  - Trained on a curated dataset of classical and modern Urdu poetry
  - Experimented with different model architectures (LSTM, GRU, etc.)
  - Evaluated multiple optimizers and loss functions for best output quality
  - Generates coherent, stylistically consistent Urdu poetic text


  Impact:
  - Demonstrates AI application in creative fields
  - Provides a foundation for AI-assisted content creation
  - Shows proficiency in model experimentation and hyperparameter tuning`,
    tech: ["Python", "TensorFlow", "Keras", "NLP", "Deep Learning"],
    github: "https://github.com/aazibarain/Urdu-Poetry-Generation",
    year: 2025,
  },
  {
    name: "Pac-Man in Assembly",
    description: `A complete recreation of the classic Pac-Man game implemented entirely in Assembly language, demonstrating low-level programming skills and understanding of computer architecture. The project involves handling memory management, interrupts, input/output, and graphics at the hardware level.

  Key Features:
  - Full game logic including maze, ghosts, and power-ups
  - Low-level graphics rendering using x86 instructions
  - Efficient memory usage and manual register management
  - Interactive user input handling using keyboard interrupts


  Impact:
  - Showcases mastery of hardware-level programming
  - Demonstrates problem-solving skills in constrained environments
  - Excellent example of understanding CPU, memory, and input/output operations`,
    tech: ["Assembly", "x86 Architecture", "Low-Level Programming"],
    github: "https://github.com/aazibarain/PacMan-Assembly",
    year: 2024,
  },
];
