"use client";

import { useEffect, useState } from "react";
import {
  FiActivity,
  FiBarChart2,
  FiBriefcase,
  FiCpu,
  FiFileText,
  FiLock,
  FiMail,
  FiMessageSquare,
  FiPackage,
  FiShield,
  FiTerminal,
  FiTool,
  FiUser,
  FiZap,
} from "react-icons/fi";
import { Window } from "./Window";
import { AppIcon } from "./AppIcon";
import { Taskbar } from "./Taskbar";
import { DocumentViewer } from "./DocumentViewer";
import { Terminal } from "./Terminal";
import { CMatrix } from "./CMatrix";
import { aboutData } from "@/app/data/about";
import { projectsData, type Project } from "@/app/data/projects";
import { skillsData } from "@/app/data/skills";
import { experienceData } from "@/app/data/experience";
import { contactData } from "@/app/data/contact";

type WindowType =
  | "terminal"
  | "about"
  | "project"
  | "skills"
  | "experience"
  | "contact";

interface OpenWindow {
  id: string;
  title: string;
  type: WindowType;
  data?: Project;
}

interface DesktopIcon {
  id: string;
  name: string;
  icon: React.ReactNode;
  onOpen: () => void;
}

const projectIcon = (icon: Project["icon"]) => {
  switch (icon) {
    case "shield":
      return <FiShield />;
    case "activity":
      return <FiActivity />;
    case "terminal":
      return <FiTerminal />;
    case "message":
      return <FiMessageSquare />;
    case "chart":
      return <FiBarChart2 />;
    case "lock":
      return <FiLock />;
    case "cpu":
      return <FiCpu />;
    case "sparkles":
      return <FiZap />;
    default:
      return <FiPackage />;
  }
};

export const Desktop = () => {
  const [windows, setWindows] = useState<OpenWindow[]>([
    { id: "terminal", title: "Terminal", type: "terminal" },
  ]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [focusedWindow, setFocusedWindow] = useState<string | null>("terminal");
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-PK", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Asia/Karachi",
        }),
      );
    };

    updateTime();
    const timer = window.setInterval(updateTime, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const bringToFront = (id: string) => {
    setWindows((currentWindows) => {
      const selectedWindow = currentWindows.find((item) => item.id === id);
      if (!selectedWindow || currentWindows.at(-1)?.id === id) return currentWindows;
      return [
        ...currentWindows.filter((item) => item.id !== id),
        selectedWindow,
      ];
    });
    setFocusedWindow(id);
  };

  const openWindow = (
    id: string,
    title: string,
    type: WindowType,
    data?: Project,
  ) => {
    setWindows((currentWindows) => {
      const existingWindow = currentWindows.find((item) => item.id === id);
      if (existingWindow) {
        return [
          ...currentWindows.filter((item) => item.id !== id),
          existingWindow,
        ];
      }
      return [...currentWindows, { id, title, type, data }];
    });
    setMinimizedWindows((current) => current.filter((item) => item !== id));
    setFocusedWindow(id);
  };

  const closeWindow = (id: string) => {
    setWindows((current) => current.filter((item) => item.id !== id));
    setMinimizedWindows((current) => current.filter((item) => item !== id));
    setFocusedWindow((current) => (current === id ? null : current));
  };

  const minimizeWindow = (id: string) => {
    setMinimizedWindows((current) =>
      current.includes(id) ? current : [...current, id],
    );
    setFocusedWindow((current) => (current === id ? null : current));
  };

  const restoreWindow = (id: string) => {
    setMinimizedWindows((current) => current.filter((item) => item !== id));
    bringToFront(id);
  };

  const getWindowContent = (openWindowItem: OpenWindow) => {
    switch (openWindowItem.type) {
      case "terminal":
        return (
          <Terminal
            onProjectSelect={(project) =>
              openWindow(`project-${project.id}`, project.name, "project", project)
            }
            onOpenApp={(appId) => {
              if (appId === "about") openWindow("about", "About", "about");
              if (appId === "skills") openWindow("skills", "Skills", "skills");
              if (appId === "experience")
                openWindow("experience", "Experience", "experience");
              if (appId === "contact") openWindow("contact", "Contact", "contact");
            }}
          />
        );
      case "about":
        return <DocumentViewer title="About" data={aboutData} />;
      case "project":
        return openWindowItem.data ? (
          <DocumentViewer title={openWindowItem.title} data={openWindowItem.data} />
        ) : null;
      case "skills":
        return (
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">toolbox --list</p>
              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Technical Skills</h1>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Focused on training dependable AI systems and shipping them inside useful software.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {Object.entries(skillsData).map(([category, items]) => (
                <section key={category} className="rounded-xl border border-white/8 bg-white/[0.025] p-4">
                  <h2 className="mb-3 text-sm font-bold capitalize text-emerald-300">
                    {category.replace(/([A-Z])/g, " $1")}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="rounded-md border border-emerald-400/15 bg-emerald-400/[0.06] px-2.5 py-1.5 text-xs text-slate-300">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        );
      case "experience":
        return (
          <div className="mx-auto max-w-3xl space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">work-history.log</p>
              <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Experience</h1>
            </div>
            {experienceData.map((experience) => (
              <section key={`${experience.company}-${experience.period}`} className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5">
                <div className="flex flex-col justify-between gap-1 sm:flex-row sm:gap-4">
                  <div>
                    <h2 className="font-bold text-slate-100">{experience.title}</h2>
                    <p className="text-emerald-300">{experience.company}</p>
                  </div>
                  <span className="text-xs text-amber-300">{experience.period}</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-300">{experience.description}</p>
                <ul className="mt-4 space-y-2">
                  {experience.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-400">
                      <span className="text-emerald-400">▸</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        );
      case "contact":
        return <DocumentViewer title="Contact" data={contactData} />;
    }
  };

  const baseIcons: DesktopIcon[] = [
    { id: "terminal", name: "Terminal", icon: <FiTerminal />, onOpen: () => openWindow("terminal", "Terminal", "terminal") },
    { id: "about", name: "About", icon: <FiUser />, onOpen: () => openWindow("about", "About", "about") },
    { id: "skills", name: "Skills", icon: <FiTool />, onOpen: () => openWindow("skills", "Skills", "skills") },
    { id: "experience", name: "Experience", icon: <FiBriefcase />, onOpen: () => openWindow("experience", "Experience", "experience") },
    { id: "contact", name: "Contact", icon: <FiMail />, onOpen: () => openWindow("contact", "Contact", "contact") },
    { id: "resume", name: "Latest CV", icon: <FiFileText />, onOpen: () => window.open(contactData.resume, "_blank", "noopener,noreferrer") },
  ];

  const projectIcons: DesktopIcon[] = projectsData.map((project) => ({
    id: `project-${project.id}`,
    name: project.name,
    icon: projectIcon(project.icon),
    onOpen: () => openWindow(`project-${project.id}`, project.name, "project", project),
  }));

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-[#020806]">
      <CMatrix />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.12),transparent_34%),linear-gradient(120deg,rgba(2,8,6,0.2),rgba(2,8,6,0.8))]" />

      <div className="relative z-10 h-full overflow-auto px-2 pb-20 pt-3 sm:px-4 sm:pt-5">
        <div className="mb-3 flex items-center justify-between px-2 text-[10px] uppercase tracking-[0.22em] text-emerald-200/65 sm:text-xs">
          <span>AazibOS / AI workspace</span>
          <span className="hidden sm:inline">Double-click an icon · terminal accepts commands</span>
          <span className="sm:hidden">Tap an icon to open</span>
        </div>
        <div className="grid w-fit grid-cols-3 gap-x-1 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
          {baseIcons.map((icon) => (
            <AppIcon
              key={icon.id}
              name={icon.name}
              icon={icon.icon}
              onOpen={icon.onOpen}
              variant="core"
            />
          ))}
          {projectIcons.map((icon) => (
            <AppIcon
              key={icon.id}
              name={icon.name}
              icon={icon.icon}
              onOpen={icon.onOpen}
              variant="project"
            />
          ))}
        </div>
      </div>

      {windows.map((openWindowItem, index) => (
        <Window
          key={openWindowItem.id}
          id={openWindowItem.id}
          title={openWindowItem.title}
          content={getWindowContent(openWindowItem)}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={bringToFront}
          isMinimized={minimizedWindows.includes(openWindowItem.id)}
          zIndex={100 + index}
        />
      ))}

      <Taskbar
        windows={windows}
        minimizedWindows={minimizedWindows}
        focusedWindow={focusedWindow}
        onWindowRestore={restoreWindow}
        time={time}
      />
    </div>
  );
};
