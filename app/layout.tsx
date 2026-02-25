import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-code",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Aazib's Terminal Portfolio",
  description: "A Linux terminal-style interactive portfolio website",
  openGraph: {
    title: "Aazib's Terminal Portfolio",
    description: "A Linux terminal-style interactive portfolio website",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0d0d0d" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${firaCode.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
