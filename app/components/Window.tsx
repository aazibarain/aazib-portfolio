"use client";

import { useRef, useState } from "react";
import { FiMaximize2, FiMinimize2, FiMinus, FiX } from "react-icons/fi";

interface WindowProps {
  id: string;
  title: string;
  content: React.ReactNode;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  isMinimized: boolean;
  zIndex: number;
}

interface Position {
  x: number;
  y: number;
}

export const Window = ({
  id,
  title,
  content,
  onClose,
  onMinimize,
  onFocus,
  isMinimized,
  zIndex,
}: WindowProps) => {
  const [position, setPosition] = useState<Position | null>(null);
  const [isMaximized, setIsMaximized] = useState(false);
  const dragRef = useRef<{
    pointerId: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    if (isMaximized || window.innerWidth < 768) return;

    const bounds = event.currentTarget.parentElement?.getBoundingClientRect();
    if (!bounds) return;

    dragRef.current = {
      pointerId: event.pointerId,
      offsetX: event.clientX - bounds.left,
      offsetY: event.clientY - bounds.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    onFocus(id);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const maxX = Math.max(8, window.innerWidth - 220);
    const maxY = Math.max(8, window.innerHeight - 110);
    setPosition({
      x: Math.min(maxX, Math.max(8, event.clientX - drag.offsetX)),
      y: Math.min(maxY, Math.max(8, event.clientY - drag.offsetY)),
    });
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null;
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  if (isMinimized) return null;

  const windowStyle: React.CSSProperties = isMaximized
    ? {
        inset: "12px 12px 68px",
        width: "auto",
        height: "auto",
        transform: "none",
        zIndex,
      }
    : position
      ? {
          left: position.x,
          top: position.y,
          width: "min(760px, calc(100vw - 40px))",
          height: "min(610px, calc(100vh - 112px))",
          transform: "none",
          zIndex,
        }
      : {
          left: "50%",
          top: "6vh",
          width: "min(760px, calc(100vw - 40px))",
          height: "min(610px, calc(100vh - 112px))",
          transform: "translateX(-50%)",
          zIndex,
        };

  return (
    <section
      className="portfolio-window fixed flex flex-col overflow-hidden rounded-xl border border-emerald-400/25 bg-[#07110e]/97 shadow-[0_24px_90px_rgba(0,0,0,0.75),0_0_40px_rgba(16,185,129,0.08)] backdrop-blur-xl"
      style={windowStyle}
      onPointerDown={() => onFocus(id)}
      aria-label={`${title} window`}
    >
      <div
        className="title-bar flex touch-none select-none items-center justify-between border-b border-emerald-400/20 bg-[#0c1d17] px-3 py-2.5 md:cursor-move"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
          <span className="truncate text-xs font-semibold tracking-wide text-emerald-100 sm:text-sm">
            aazib@portfolio: ~/{title.toLowerCase().replaceAll(" ", "-")}
          </span>
        </div>
        <div className="ml-3 flex items-center gap-1">
          <button
            type="button"
            onClick={() => onMinimize(id)}
            className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            aria-label={`Minimize ${title}`}
          >
            <FiMinus size={15} />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized((maximized) => !maximized)}
            className="hidden rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 md:block"
            aria-label={`${isMaximized ? "Restore" : "Maximize"} ${title}`}
          >
            {isMaximized ? <FiMinimize2 size={14} /> : <FiMaximize2 size={14} />}
          </button>
          <button
            type="button"
            onClick={() => onClose(id)}
            className="rounded-md p-2 text-slate-300 transition hover:bg-rose-500/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            aria-label={`Close ${title}`}
          >
            <FiX size={15} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.07),transparent_35%)] p-4 text-slate-100 sm:p-6">
        {content}
      </div>
    </section>
  );
};
