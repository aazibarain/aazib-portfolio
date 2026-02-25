"use client";
import React, { useState } from "react";

interface AppIconProps {
  name: string;
  icon: string;
  onDoubleClick: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({
  name,
  icon,
  onDoubleClick,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div
      className={`flex flex-col items-center gap-2 p-4 rounded cursor-pointer transition ${
        isSelected
          ? "bg-blue-600 bg-opacity-30 border-2 border-blue-400"
          : "hover:bg-blue-600 hover:bg-opacity-20"
      }`}
      onDoubleClick={onDoubleClick}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="text-6xl">{icon}</div>
      <span className="text-sm text-gray-100 text-center w-20 truncate">
        {name}
      </span>
    </div>
  );
};
