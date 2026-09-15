import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://aazibabdullah.vercel.app"),
  title: "Aazib Abdullah | AI Engineer",
  description:
    "AI Engineer building deep-learning, computer-vision, NLP, and model-backed full-stack applications.",
  keywords: [
    "Aazib Abdullah",
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Learning",
    "Computer Vision",
    "Next.js Developer",
  ],
  authors: [{ name: "Aazib Abdullah" }],
  openGraph: {
    title: "Aazib Abdullah | AI Engineer",
    description:
      "Explore AI, machine-learning, security, and full-stack projects inside an interactive Linux-inspired portfolio.",
    type: "website",
    url: "/",
    siteName: "Aazib Abdullah Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Aazib Abdullah | AI Engineer",
    description:
      "AI and full-stack projects inside an interactive Linux-inspired portfolio.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020806",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
