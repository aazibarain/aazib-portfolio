"use client";

import type { ReactNode } from "react";
import { useState } from "react";

interface AppIconProps {
  name: string;
  icon: ReactNode;
  onOpen: () => void;
  variant?: "core" | "project";
}

export const AppIcon = ({
  name,
  icon,
  onOpen,
  variant = "project",
}: AppIconProps) => {
  const [isSelected, setIsSelected] = useState(false);
  const isCore = variant === "core";

  return (
    <button
      type="button"
      className={`group flex w-[92px] flex-col items-center gap-2 rounded-xl border p-2 text-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 sm:w-[104px] sm:p-3 ${
        isSelected
          ? isCore
            ? "border-sky-300/70 bg-sky-400/15 ring-1 ring-sky-300/20"
            : "border-emerald-400/70 bg-emerald-400/15 ring-1 ring-emerald-300/20"
          : isCore
            ? "border-transparent hover:border-sky-300/40 hover:bg-sky-400/10 focus-visible:ring-sky-300"
            : "border-transparent hover:border-emerald-400/30 hover:bg-emerald-400/10 focus-visible:ring-emerald-300"
      }`}
      aria-label={`Open ${name}`}
      onClick={() => setIsSelected((selected) => !selected)}
      onDoubleClick={onOpen}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") onOpen();
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen();
        }
      }}
    >
      <span
        className={`grid size-13 place-items-center rounded-xl border bg-black/55 text-2xl transition sm:size-15 sm:text-3xl ${
          isCore
            ? "border-sky-300/30 text-sky-300 shadow-[0_0_24px_rgba(56,189,248,0.13)] group-hover:border-sky-200/65 group-hover:text-sky-100"
            : "border-emerald-400/25 text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.12)] group-hover:border-emerald-300/55 group-hover:text-emerald-200"
        }`}
      >
        {icon}
      </span>
      <span
        className={`line-clamp-2 min-h-8 w-full text-[11px] leading-4 drop-shadow sm:text-xs ${
          isCore ? "font-semibold text-sky-50" : "text-slate-100"
        }`}
      >
        {name}
      </span>
    </button>
  );
};
