"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CommandInput } from "./CommandInput";
import { Output } from "./Output";
import { projectsData, type Project } from "@/app/data/projects";
import { aboutData } from "@/app/data/about";
import { skillsData } from "@/app/data/skills";
import { experienceData } from "@/app/data/experience";
import { contactData, helpCommands } from "@/app/data/contact";

interface TerminalEntry {
  command: string;
  output: ReactNode[];
  isError?: boolean;
}

interface TerminalProps {
  onProjectSelect?: (project: Project) => void;
  onOpenApp?: (appId: "about" | "skills" | "experience" | "contact") => void;
}

const promptLine = (
  <span className="text-slate-300">
    Run <span className="text-amber-300">help</span> to list commands, or{" "}
    <span className="text-amber-300">projects</span> to browse my work.
  </span>
);

export const Terminal = ({ onProjectSelect, onOpenApp }: TerminalProps) => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      command: "",
      output: [
        <span key="banner" className="font-semibold text-emerald-200">
          AazibOS v2.0 · AI Engineer portfolio
        </span>,
        <span key="status" className="text-slate-400">
          System ready. Portfolio synced with the latest CV.
        </span>,
        promptLine,
      ],
    },
  ]);
  const [history, setHistory] = useState<string[]>([]);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [entries]);

  const executeCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    let output: ReactNode[] = [];
    let isError = false;

    if (cmd === "help" || cmd === "ls") {
      output = [
        <span key="heading" className="text-emerald-200">
          Available commands
        </span>,
        ...helpCommands.map((item) => (
          <span key={item.command}>
            <span className="inline-block w-36 text-amber-300">{item.command}</span>
            <span className="text-slate-400">{item.description}</span>
          </span>
        )),
      ];
    } else if (cmd === "about") {
      output = [
        `${aboutData.name} · ${aboutData.role}`,
        aboutData.bio,
        <span key="opening" className="text-slate-400">Opening About...</span>,
      ];
      window.setTimeout(() => onOpenApp?.("about"), 200);
    } else if (cmd === "skills") {
      output = [
        <span key="heading" className="text-emerald-200">Technical profile</span>,
        ...Object.entries(skillsData).flatMap(([category, items]) => [
          <span key={`${category}-heading`} className="mt-2 text-amber-300">
            {category.replace(/([A-Z])/g, " $1").toUpperCase()}
          </span>,
          <span key={`${category}-items`} className="text-slate-300">
            {items.join(" · ")}
          </span>,
        ]),
        <span key="opening" className="mt-2 text-slate-400">Opening Skills...</span>,
      ];
      window.setTimeout(() => onOpenApp?.("skills"), 200);
    } else if (cmd === "projects") {
      output = [
        <span key="heading" className="text-emerald-200">
          Projects ({projectsData.length})
        </span>,
        ...projectsData.flatMap((project, index) => [
          <span key={`${project.id}-title`} className="mt-2 text-amber-300">
            [{index + 1}] {project.name} · {project.year}
          </span>,
          <span key={`${project.id}-summary`} className="text-slate-400">
            {project.shortDescription}
          </span>,
        ]),
        <span key="hint" className="mt-2 text-slate-300">
          Type <span className="text-amber-300">open &lt;number&gt;</span> to inspect a project.
        </span>,
      ];
    } else if (/^open\s+\d+$/.test(cmd)) {
      const projectIndex = Number.parseInt(cmd.split(/\s+/)[1], 10) - 1;
      const project = projectsData[projectIndex];

      if (project) {
        output = [`Opening ${project.name}...`];
        window.setTimeout(() => onProjectSelect?.(project), 200);
      } else {
        output = ["Project not found. Run 'projects' to see valid numbers."];
        isError = true;
      }
    } else if (cmd === "experience") {
      output = experienceData.flatMap((experience) => [
        <span key={`${experience.company}-title`} className="text-emerald-200">
          {experience.title} @ {experience.company}
        </span>,
        <span key={`${experience.company}-period`} className="text-amber-300">
          {experience.period}
        </span>,
        <span key={`${experience.company}-description`} className="text-slate-300">
          {experience.description}
        </span>,
        ...experience.highlights.map((highlight) => (
          <span key={highlight} className="text-slate-400">▸ {highlight}</span>
        )),
      ]);
      output.push(
        <span key="opening" className="mt-2 text-slate-400">Opening Experience...</span>,
      );
      window.setTimeout(() => onOpenApp?.("experience"), 200);
    } else if (cmd === "contact") {
      output = [
        `Email: ${contactData.email}`,
        `Phone: ${contactData.phoneNo}`,
        `Location: ${contactData.location}`,
        `GitHub: ${contactData.github}`,
        `LinkedIn: ${contactData.linkedin}`,
        <span key="opening" className="text-slate-400">Opening Contact...</span>,
      ];
      window.setTimeout(() => onOpenApp?.("contact"), 200);
    } else if (cmd === "resume") {
      output = [
        <a
          key="resume"
          href={contactData.resume}
          target="_blank"
          rel="noreferrer"
          className="text-amber-300 underline decoration-amber-300/40 underline-offset-4"
        >
          Open Aazib Abdullah&apos;s latest CV
        </a>,
      ];
      window.open(contactData.resume, "_blank", "noopener,noreferrer");
    } else if (cmd === "whoami") {
      output = ["aazib · AI engineer · builder · researcher"];
    } else if (cmd === "clear") {
      setEntries([]);
      return;
    } else if (cmd === "") {
      return;
    } else {
      output = [
        `command not found: ${command}`,
        <span key="hint" className="text-slate-400">
          Try <span className="text-amber-300">help</span> for available commands.
        </span>,
      ];
      isError = true;
    }

    setHistory((currentHistory) => [...currentHistory, command]);
    setEntries((currentEntries) => [
      ...currentEntries,
      { command, output, isError },
    ]);
  };

  return (
    <div className="flex h-full min-h-0 flex-col font-mono text-sm">
      <div className="flex-1 space-y-4 overflow-auto pr-1">
        {entries.map((entry, index) => (
          <div key={`${entry.command}-${index}`} className="whitespace-pre-wrap">
            {entry.command && (
              <div className="mb-2 flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-emerald-400">aazib@portfolio</span>
                <span className="text-slate-500">:</span>
                <span className="text-sky-300">~</span>
                <span className="text-slate-500">$</span>
                <span className="text-amber-300">{entry.command}</span>
              </div>
            )}
            {entry.output.length > 0 && (
              <div className={entry.isError ? "text-rose-300" : "text-emerald-300"}>
                <Output lines={entry.output} />
              </div>
            )}
          </div>
        ))}
        <div ref={scrollEndRef} />
      </div>
      <div className="mt-4 border-t border-emerald-400/15 pt-4">
        <CommandInput onSubmit={executeCommand} history={history} />
      </div>
    </div>
  );
};
