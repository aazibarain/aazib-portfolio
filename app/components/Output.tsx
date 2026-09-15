"use client";
import React from "react";

interface OutputProps {
  lines: (string | React.ReactNode)[];
}

export const Output: React.FC<OutputProps> = ({ lines }) => {
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
