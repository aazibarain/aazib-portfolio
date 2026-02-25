"use client";
import React from "react";
import { FiGrid } from "react-icons/fi";

interface TaskbarProps {
  windows: Array<{
    id: string;
    title: string;
  }>;
  minimizedWindows: Set<string>;
  onWindowRestore: (id: string) => void;
  time: string;
}

export const Taskbar: React.FC<TaskbarProps> = ({
  windows,
  minimizedWindows,
  onWindowRestore,
  time,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t-2 border-gray-700 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <FiGrid size={20} className="text-green-400" />
        <div className="flex gap-2">
          {windows.map((win) => (
            <button
              key={win.id}
              onClick={() => onWindowRestore(win.id)}
              className={`px-3 py-1 text-xs rounded transition ${
                minimizedWindows.has(win.id)
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-blue-600 text-white hover:bg-blue-500"
              }`}
            >
              {win.title}
            </button>
          ))}
        </div>
      </div>
      <div className="text-xs text-gray-400">{time}</div>
    </div>
  );
};
