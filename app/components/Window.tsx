"use client";
import React, { useState } from "react";
import { FiX, FiMinus, FiMaximize2 } from "react-icons/fi";

interface WindowProps {
  id: string;
  title: string;
  content: React.ReactNode;
  icon?: string;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  isMinimized: boolean;
  zIndex: number;
}

export const Window: React.FC<WindowProps> = ({
  id,
  title,
  content,
  onClose,
  onMinimize,
  onFocus,
  isMinimized,
  zIndex,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
    onFocus(id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    // Only drag on title bar, not on content
    if (!(e.target as HTMLElement).closest(".title-bar")) return;
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragOffset({
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    });
    onFocus(id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    setPosition({
      x: touch.clientX - dragOffset.x,
      y: touch.clientY - dragOffset.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (isMinimized) return null;

  return (
    <div
      className="fixed bg-gray-800 border-2 border-gray-700 rounded-lg shadow-2xl flex flex-col overflow-hidden"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: "600px",
        height: "500px",
        zIndex,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Title Bar */}
      <div
        className="title-bar bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 flex items-center justify-between cursor-move select-none touch-none"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <span className="text-white font-bold text-sm flex items-center gap-2">
          {title}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onMinimize(id)}
            className="text-white hover:bg-blue-400 p-1 rounded transition"
          >
            <FiMinus size={16} />
          </button>
          <button
            onClick={() => onClose(id)}
            className="text-white hover:bg-red-500 p-1 rounded transition"
          >
            <FiX size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-auto bg-gray-900 text-gray-100 p-4"
        style={{
          WebkitOverflowScrolling: 'touch',
          touchAction: 'auto',
        }}
      >
        {content}
      </div>
    </div>
  );
};
