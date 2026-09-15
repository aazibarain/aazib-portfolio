"use client";

import { FiGrid } from "react-icons/fi";

interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
  }>;
  minimizedWindows: string[];
  focusedWindow: string | null;
  onWindowRestore: (id: string) => void;
  time: string;
}

export const Taskbar = ({
  windows,
  minimizedWindows,
  focusedWindow,
  onWindowRestore,
  time,
}: TaskbarProps) => {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-[3000] flex h-14 items-center gap-3 border-t border-emerald-400/20 bg-[#06100d]/95 px-3 shadow-[0_-12px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:px-4">
      <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
        <FiGrid size={17} aria-hidden="true" />
      </div>
      <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto py-1">
        {windows.map((win) => {
          const minimized = minimizedWindows.includes(win.id);
          const focused = focusedWindow === win.id && !minimized;

          return (
            <button
              type="button"
              key={win.id}
              onClick={() => onWindowRestore(win.id)}
              className={`max-w-44 shrink-0 truncate rounded-md border px-3 py-1.5 text-[11px] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 sm:text-xs ${
                focused
                  ? "border-emerald-400/50 bg-emerald-400/18 text-emerald-100"
                  : minimized
                    ? "border-slate-700 bg-slate-900 text-slate-400 hover:text-slate-200"
                    : "border-emerald-400/20 bg-[#0d211a] text-slate-300 hover:border-emerald-400/40"
              }`}
            >
              {win.title}
            </button>
          );
        })}
      </div>
      <div className="shrink-0 text-right text-[10px] leading-4 text-slate-400 sm:text-xs">
        <div>PKT</div>
        <div className="text-emerald-300">{time}</div>
      </div>
    </footer>
  );
};
