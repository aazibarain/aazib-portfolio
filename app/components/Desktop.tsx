"use client";
import React, { useState, useEffect } from "react";
import { Window } from "./Window";
import { AppIcon } from "./AppIcon";
import { Taskbar } from "./Taskbar";
import { DocumentViewer } from "./DocumentViewer";
import { Terminal } from "./Terminal";
import { CMatrix } from "./CMatrix";
import { aboutData } from "@/app/data/about";
import { projectsData } from "@/app/data/projects";
import { skillsData } from "@/app/data/skills";
import { experienceData } from "@/app/data/experience";

interface OpenWindow {
  id: string;
  title: string;
  type: "terminal" | "about" | "project" | "skills" | "experience";
  data?: any;
}

export const Desktop: React.FC = () => {
  const [windows, setWindows] = useState<OpenWindow[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<Set<string>>(
    new Set()
  );
  const [focusedWindow, setFocusedWindow] = useState<string | null>(null);
  const [time, setTime] = useState("00:00");
  const [iconsPerColumn, setIconsPerColumn] = useState(4);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const calculateIconsPerColumn = () => {
      // AppIcon is ~120px tall (icon + text + padding + gap). Taskbar is 80px.
      const availableHeight = window.innerHeight - 80 - 40; // minus taskbar and padding
      const iconHeight = 120;
      const num = Math.max(1, Math.floor(availableHeight / iconHeight));
      setIconsPerColumn(num);
    };

    calculateIconsPerColumn();
    window.addEventListener("resize", calculateIconsPerColumn);
    return () => window.removeEventListener("resize", calculateIconsPerColumn);
  }, []);

  const openWindow = (
    id: string,
    title: string,
    type: OpenWindow["type"],
    data?: any
  ) => {
    if (windows.some((w) => w.id === id)) {
      setMinimizedWindows((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      setFocusedWindow(id);
      return;
    }

    setWindows([...windows, { id, title, type, data }]);
    setFocusedWindow(id);
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter((w) => w.id !== id));
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows((prev) => new Set(prev).add(id));
  };

  const restoreWindow = (id: string) => {
    setMinimizedWindows((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setFocusedWindow(id);
  };

  const handleFocus = (id: string) => {
    setFocusedWindow(id);
  };

  const getWindowContent = (window: OpenWindow) => {
    switch (window.type) {
      case "terminal":
        return (
          <Terminal
            onProjectSelect={(proj) => openWindow(`project-${proj.name}`, proj.name, "project", proj)}
            onOpenApp={(appId) => {
              if (appId === "about") openWindow("about", "About Me", "about");
              if (appId === "skills") openWindow("skills", "Skills", "skills");
              if (appId === "experience") openWindow("experience", "Experience", "experience");
            }}
          />
        );
      case "about":
        return <DocumentViewer title="About" data={aboutData} />;
      case "project":
        return <DocumentViewer title={window.data.name} data={window.data} />;
      case "skills":
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-blue-400">Skills</h1>
            {Object.entries(skillsData).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-lg font-bold text-green-400 capitalize mb-2">
                  {category.replace(/([A-Z])/g, " $1")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {(items as string[]).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-900 text-green-300 rounded text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case "experience":
        return (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-blue-400">Experience</h1>
            {experienceData.map((exp, idx) => (
              <div key={idx} className="border-l-4 border-green-400 pl-4">
                <p className="font-bold text-blue-300">{exp.title}</p>
                <p className="text-green-400">{exp.company}</p>
                <p className="text-gray-400 text-sm">{exp.period}</p>
                <p className="text-gray-200 mt-2">{exp.description}</p>
                <ul className="mt-2 space-y-1">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-gray-300 text-sm flex gap-2">
                      <span className="text-green-400">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // prepare icons: base apps then projects
  const baseIcons = [
    { id: "terminal", name: "Terminal", icon: "💻", onDouble: () => openWindow("terminal", "Terminal", "terminal") },
    { id: "about", name: "About", icon: "👤", onDouble: () => openWindow("about", "About Me", "about") },
    { id: "skills", name: "Skills", icon: "🔧", onDouble: () => openWindow("skills", "Skills", "skills") },
    { id: "experience", name: "Experience", icon: "💼", onDouble: () => openWindow("experience", "Experience", "experience") },
  ];

  const projectIcons = projectsData.map((p) => ({ id: `project-${p.name}`, name: p.name, icon: "📦", onDouble: () => openWindow(`project-${p.name}`, p.name, "project", p) }));

  const icons = [...baseIcons, ...projectIcons];

  // Split icons into columns based on screen height
  const columns: typeof icons[] = [];
  for (let i = 0; i < icons.length; i += iconsPerColumn) {
    columns.push(icons.slice(i, i + iconsPerColumn));
  }

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black overflow-hidden relative">
      <CMatrix />

      {/* Desktop Background */}
      <div className="w-full h-full pb-20 pt-4 px-4 overflow-auto relative z-10">
        <div className="absolute left-6 top-8 flex gap-6">
          {columns.map((col, colIdx) => (
            <div key={`col-${colIdx}`} className="flex flex-col gap-6">
              {col.map((it, idx) => (
                <AppIcon key={it.id || idx} name={it.name} icon={it.icon} onDoubleClick={it.onDouble} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Windows */}
      {windows.map((window, idx) => (
        <Window
          key={window.id}
          id={window.id}
          title={window.title}
          content={getWindowContent(window)}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={handleFocus}
          isMinimized={minimizedWindows.has(window.id)}
          zIndex={focusedWindow === window.id ? 1000 + idx : 100 + idx}
        />
      ))}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        minimizedWindows={minimizedWindows}
        onWindowRestore={restoreWindow}
        time={time}
      />
    </div>
  );
};
