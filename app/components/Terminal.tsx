"use client";
import React, { useState, useEffect, useRef } from "react";
import { CommandInput } from "./CommandInput";
import { Output } from "./Output";
import { projectsData } from "@/app/data/projects";
import { aboutData } from "@/app/data/about";
import { skillsData } from "@/app/data/skills";
import { experienceData } from "@/app/data/experience";
import { contactData, helpCommands } from "@/app/data/contact";

interface TerminalEntry {
  command: string;
  output: (string | React.ReactNode)[];
  isError?: boolean;
}

interface TerminalProps {
  onProjectSelect?: (project: typeof projectsData[0]) => void;
  onOpenApp?: (appId: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onProjectSelect, onOpenApp }) => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      command: "",
      output: [
        "Welcome to Aazib's Terminal Portfolio!",
        "Type 'help' to see available commands.",
        "",
      ],
      isError: false,
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: (string | React.ReactNode)[] = [];
    let isError = false;

    if (cmd === "help" || cmd === "ls") {
      output.push("Available Commands:\n");
      helpCommands.forEach((h) => {
        output.push(`  ${h.command.padEnd(15)} - ${h.description}`);
      });
    } else if (cmd === "about") {
      output.push(`Name: ${aboutData.name}`);
      output.push(`Role: ${aboutData.role}`);
      output.push("");
      output.push("Bio:");
      output.push(aboutData.bio);
      output.push("");
      output.push("Opening About app...");
      // auto-open About window if host provides handler
      setTimeout(() => {
        if (onOpenApp) onOpenApp("about");
      }, 300);
    } else if (cmd === "skills") {
      output.push("Skills Available:");
      output.push("");
      Object.entries(skillsData).forEach(([cat, items]) => {
        output.push(`${cat.toUpperCase()}:`);
        (items as string[]).forEach((s) => output.push(`  • ${s}`));
        output.push("");
      });
    } else if (cmd === "projects") {
      output.push("Available Projects:\n");
      projectsData.forEach((proj, idx) => {
        output.push(`[${idx + 1}] ${proj.name}`);
        output.push(`    ${proj.description}`);
        output.push(`    Tech: ${proj.tech.join(", ")}`);
        output.push("");
      });
      output.push("Interactive: Type 'open <number>' to open a project");
    } else if (cmd.startsWith("open ")) {
      const projNum = parseInt(cmd.split(" ")[1]) - 1;
      if (projNum >= 0 && projNum < projectsData.length) {
        output.push(`Opening ${projectsData[projNum].name}...`);
        setTimeout(() => {
          if (onProjectSelect) {
            onProjectSelect(projectsData[projNum]);
          }
        }, 300);
      } else {
        output.push(`Invalid project number. Use 'projects' to see options.`);
        isError = true;
      }
    } else if (cmd === "experience") {
      output.push("Professional Experience:\n");
      experienceData.forEach((exp) => {
        output.push(`${exp.title} @ ${exp.company}`);
        output.push(`${exp.period}`);
        output.push(exp.description);
        output.push("Highlights:");
        exp.highlights.forEach((h) => output.push(`  • ${h}`));
        output.push("");
      });
    } else if (cmd === "contact") {
      output.push("Contact Information:\n");
      if (contactData.email) output.push(`Email: ${contactData.email}`);
      if ((contactData as any).phoneNo)
        output.push(`Phone: ${(contactData as any).phoneNo}`);
      if (contactData.github) output.push(`GitHub: ${contactData.github}`);
      if (contactData.linkedin) output.push(`LinkedIn: ${contactData.linkedin}`);
      if ((contactData as any).fiverr)
        output.push(`Fiverr: ${(contactData as any).fiverr}`);
      if ((contactData as any).twitter)
        output.push(`Twitter: ${(contactData as any).twitter}`);
    } else if (cmd === "whoami") {
      output.push("aazib");
    } else if (cmd === "clear") {
      setEntries([{ command: "", output: [], isError: false }]);
      return;
    } else if (cmd === "") {
      return;
    } else {
      output = [`command not found: ${command}`];
      isError = true;
    }

    setHistory([...history, command]);
    setEntries([...entries, { command, output, isError }]);
  };

  return (
    <div className="w-full h-full bg-black text-green-400 font-mono flex flex-col">
      <div className="flex-1 overflow-auto space-y-3 p-4">
        {entries.map((entry, idx) => (
          <div key={idx} className="whitespace-pre-wrap">
            {entry.command && (
              <div className="flex gap-2 items-center mb-2">
                <span className="text-gray-500">$</span>
                <span className="text-yellow-400">{entry.command}</span>
              </div>
            )}
            {entry.output.length > 0 && (
              <div className={`${entry.isError ? "text-red-400" : "text-green-300"} space-y-1`}>
                <Output lines={entry.output} isError={entry.isError} />
              </div>
            )}
          </div>
        ))}
        <div ref={scrollEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700">
        <CommandInput onSubmit={executeCommand} history={history} />
      </div>
    </div>
  );
};

