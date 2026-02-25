"use client";
import React from "react";

interface OutputProps {
  lines: (string | React.ReactNode)[];
  isError?: boolean;
}

export const Output: React.FC<OutputProps> = ({ lines, isError = false }) => {
  return (
    <div>
      {lines.map((line, index) => (
        <div key={index} className="py-0.5">
          {line}
        </div>
      ))}
    </div>
  );
};
