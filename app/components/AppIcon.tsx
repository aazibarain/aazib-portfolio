"use client";

import type { ReactNode } from "react";
import { useState } from "react";

interface AppIconProps {
  name: string;
  icon: ReactNode;
  onOpen: () => void;
}

export const AppIcon = ({ name, icon, onOpen }: AppIconProps) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <button
      type="button"
      className={`group flex w-[92px] flex-col items-center gap-2 rounded-xl border p-2 text-center transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 sm:w-[104px] sm:p-3 ${
        isSelected
          ? "border-emerald-400/70 bg-emerald-400/15"
          : "border-transparent hover:border-emerald-400/30 hover:bg-emerald-400/10"
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
      <span className="grid size-13 place-items-center rounded-xl border border-emerald-400/25 bg-black/55 text-2xl text-emerald-300 shadow-[0_0_24px_rgba(16,185,129,0.12)] transition group-hover:border-emerald-300/55 group-hover:text-emerald-200 sm:size-15 sm:text-3xl">
        {icon}
      </span>
      <span className="line-clamp-2 min-h-8 w-full text-[11px] leading-4 text-slate-100 drop-shadow sm:text-xs">
        {name}
      </span>
    </button>
  );
};
