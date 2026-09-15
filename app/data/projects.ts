export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  highlights: string[];
  tech: string[];
  github?: string;
  live?: string;
  year: number;
  category: string;
  featured?: boolean;
  icon: string;
}

export const projectsData: Project[] = [
  {
    id: "adversarial-robustness",
    name: "AI Model Robustness & Defense Toolkit",
    shortDescription:
      "A traffic-sign CNN security lab with from-scratch attacks, defenses, and an interactive dashboard.",
    description:
      "Trained a CNN from scratch on 43 German traffic-sign classes, stress-tested it with FGSM and PGD adversarial attacks, and evaluated adversarial-training, Gaussian-blur, and JPEG-compression defenses. The work is packaged as a full-stack dashboard for live attack and defense experiments.",
    highlights: [
      "Reached 98.49% clean test accuracy on a 12,630-image test set.",
      "Measured accuracy falling to 1.60% under PGD at epsilon 0.05.",
      "Implemented attacks directly from their gradients instead of using a pre-built adversarial-ML library.",
      "Documented defense trade-offs, including genuine robustness versus gradient masking.",
    ],
    tech: [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "FastAPI",
      "Next.js",
      "TypeScript",
    ],
    github: "https://github.com/aazibarain/adversarial-robustness-dashboard",
    year: 2026,
    category: "Adversarial ML",
    featured: true,
    icon: "shield",
  },
  {
    id: "spinescan",
    name: "SpineScan",
    shortDescription:
      "Deep-learning pipeline for lumbar MRI degeneration classification and severity grading.",
    description:
      "A final-year project that processes lumbar spine MRI scans to detect and classify degeneration, automatically grades severity, and presents results through a companion dashboard to support clinicians with disease monitoring.",
    highlights: [
      "Processes lumbar MRI scans with an end-to-end deep-learning pipeline.",
      "Combines degeneration classification with automated severity grading.",
      "Presents model-backed results in a clinician-oriented monitoring dashboard.",
    ],
    tech: ["Python", "TensorFlow", "Scikit-learn", "OpenCV", "Flask"],
    year: 2026,
    category: "Medical AI",
    featured: true,
    icon: "activity",
  },
  {
    id: "terminal-portfolio",
    name: "Terminal Portfolio",
    shortDescription:
      "An interactive Linux-inspired desktop and terminal experience built for the web.",
    description:
      "A personal portfolio designed as a working Linux-inspired desktop. Visitors can launch apps, move and manage windows, or use terminal commands to explore projects, skills, experience, and contact information.",
    highlights: [
      "Command-based navigation with history and interactive project launching.",
      "Responsive desktop windows, taskbar, and mobile-friendly controls.",
      "Continuously deployed from GitHub to Vercel.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    github: "https://github.com/aazibarain/aazib-portfolio",
    live: "https://aazibabdullah.vercel.app",
    year: 2026,
    category: "Full Stack",
    featured: true,
    icon: "terminal",
  },
  {
    id: "omega-chat",
    name: "Omega Chat",
    shortDescription:
      "Anonymous one-to-one chat with real-time private-room matchmaking.",
    description:
      "An Omegle-inspired chat application that pairs waiting users into private rooms and sends messages in real time. Sessions are anonymous and ephemeral, with no account or message persistence.",
    highlights: [
      "Queue-based anonymous user matchmaking.",
      "Private real-time rooms powered by Socket.IO.",
      "Separate Next.js client and Node.js server architecture.",
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "Socket.IO"],
    github: "https://github.com/aazibarain/omega-chat",
    live: "https://omega-chat-tawny.vercel.app",
    year: 2026,
    category: "Real-time Web",
    icon: "message",
  },
  {
    id: "expense-tracker",
    name: "Expense Tracker",
    shortDescription:
      "Authenticated personal-finance dashboard with analytics and monthly PDF reports.",
    description:
      "A responsive expense tracker with email OTP authentication, income and expense categories, filterable transactions, dashboard analytics, and exportable monthly reports.",
    highlights: [
      "Supabase OTP authentication and row-level security.",
      "Transaction and category management with filters and analytics.",
      "Monthly reporting with charts and PDF export.",
    ],
    tech: ["React", "Vite", "Supabase", "Recharts", "jsPDF"],
    github: "https://github.com/aazibarain/expense-tracker",
    live: "https://expense-tracker-gules-three-53.vercel.app",
    year: 2026,
    category: "Full Stack",
    icon: "chart",
  },
  {
    id: "secure-chat",
    name: "SecureChat",
    shortDescription:
      "A TLS-like encrypted messaging protocol implemented from scratch in Python.",
    description:
      "A secure client-server messaging system with a custom certificate authority, mutual certificate verification, authenticated key exchange, encrypted chat, replay protection, and signed session receipts.",
    highlights: [
      "Built a root CA and X.509 client/server certificate workflow.",
      "Uses ephemeral Diffie-Hellman exchange, AES-128 encryption, and RSA signatures.",
      "Adds sequence-based replay protection, append-only transcripts, and tamper tests.",
    ],
    tech: ["Python", "Cryptography", "OpenSSL", "MySQL", "Wireshark"],
    github: "https://github.com/aazibarain/securechat",
    year: 2025,
    category: "Cybersecurity",
    icon: "lock",
  },
  {
    id: "parallel-dijkstra",
    name: "Parallel Dijkstra",
    shortDescription:
      "MPI and OpenMP implementations benchmarked on large real-world graph datasets.",
    description:
      "A parallel-computing study that implements and compares sequential, MPI, and OpenMP variants of Dijkstra's algorithm on DBLP and Amazon graph datasets, including graph partitioning and scalability analysis.",
    highlights: [
      "Benchmarks sequential, distributed-memory, and shared-memory implementations.",
      "Uses METIS graph partitioning for the OpenMP workflow.",
      "Visualizes performance, speedup, and scalability across large datasets.",
    ],
    tech: ["C++", "MPI", "OpenMP", "METIS", "Python"],
    github: "https://github.com/aazibarain/parallel-dijkstra",
    year: 2025,
    category: "Parallel Computing",
    icon: "cpu",
  },
  {
    id: "urdu-poetry",
    name: "Urdu Poetry Generation",
    shortDescription:
      "Deep-learning language models trained to generate stylistically coherent Urdu poetry.",
    description:
      "An NLP experiment trained on a curated Urdu poetry corpus. Multiple recurrent architectures and optimizer combinations were compared to improve fluency and stylistic consistency in generated poetic lines.",
    highlights: [
      "Prepared and modeled a corpus of classical and modern Urdu poetry.",
      "Compared LSTM and GRU architectures with Adam and RMSprop.",
      "Evaluated generated text for fluency and style consistency.",
    ],
    tech: ["Python", "TensorFlow", "Keras", "NLP", "LSTM", "GRU"],
    year: 2025,
    category: "Generative AI",
    icon: "sparkles",
  },
  {
    id: "pacman-assembly",
    name: "Pac-Man in Assembly",
    shortDescription:
      "A low-level recreation of Pac-Man with custom game logic, rendering, and input handling.",
    description:
      "A complete Pac-Man recreation implemented in x86 Assembly to explore computer architecture, manual memory and register management, low-level graphics, interrupts, and keyboard input.",
    highlights: [
      "Implements the maze, player controls, ghosts, scoring, and power-ups.",
      "Renders graphics and handles keyboard input at a low level.",
      "Demonstrates careful memory and register management under tight constraints.",
    ],
    tech: ["x86 Assembly", "Computer Architecture", "Low-level Graphics"],
    year: 2024,
    category: "Systems",
    icon: "game",
  },
];
