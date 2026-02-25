"use client";
import React from "react";

interface DocumentViewerProps {
  title: string;
  data: any;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({
  title,
  data,
}) => {
  const renderDescription = (desc: string) => {
    const lines = desc.split(/\r?\n/).map((l) => l.trim());
    const nodes: React.ReactNode[] = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (!line) {
        nodes.push(<div key={`sp-${i}`} className="h-2" />);
        i++;
        continue;
      }

      if (/:$/.test(line)) {
        const heading = line.replace(/:$/, "");
        nodes.push(
          <h3 key={`h-${i}`} className="text-md font-semibold text-blue-300 mt-2">
            {heading}
          </h3>
        );

        // collect list items
        const items: string[] = [];
        i++;
        while (i < lines.length && lines[i]) {
          const li = lines[i];
          // allow '- ', '+- ', '•', or plain lines
          const cleaned = li.replace(/^\+?-?\s*/, "");
          items.push(cleaned);
          i++;
        }

        if (items.length > 0) {
          nodes.push(
            <ul key={`ul-${i}`} className="mt-2 ml-4 list-disc list-inside space-y-1 text-gray-200">
              {items.map((it, idx) => (
                <li key={idx} className="text-gray-200 text-sm">
                  {it}
                </li>
              ))}
            </ul>
          );
        }
        continue;
      }

      // normal paragraph
      nodes.push(
        <p key={`p-${i}`} className="text-gray-200 leading-relaxed">
          {line}
        </p>
      );
      i++;
    }

    return nodes;
  };

  return (
    <div className="space-y-4">
      {data.name && (
        <div>
          <h1 className="text-2xl font-bold text-blue-400">{data.name}</h1>
          {data.role && (
            <p className="text-lg text-green-400">{data.role}</p>
          )}
        </div>
      )}

      {data.bio && (
        <div>
          <h2 className="text-lg font-bold text-blue-300 mb-2">About</h2>
          <p className="text-gray-200 leading-relaxed">{data.bio}</p>
        </div>
      )}

      {data.education && (
        <div>
          <h2 className="text-lg font-bold text-blue-300 mb-2">Education</h2>
          {(data.education as any[]).map((edu: any, idx: number) => (
            <div key={idx} className="mb-3 pl-4 border-l-2 border-green-400">
              <p className="font-semibold text-green-300">{edu.institution}</p>
              <p className="text-gray-300">{edu.degree}</p>
              <p className="text-sm text-gray-400">{edu.year}</p>
              <p className="text-sm text-gray-400">{edu.details}</p>
            </div>
          ))}
        </div>
      )}

      {data.achievements && (
        <div>
          <h2 className="text-lg font-bold text-blue-300 mb-2">
            Achievements
          </h2>
          <ul className="space-y-2">
            {(data.achievements as string[]).map((ach: string, idx: number) => (
              <li
                key={idx}
                className="text-gray-200 flex items-start gap-2"
              >
                <span className="text-green-400 mt-1">▸</span>
                <span>{ach}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.description && (
        <div>
          <h2 className="text-lg font-bold text-blue-300 mb-2">Description</h2>
          <div className="text-gray-200">
            {renderDescription(String(data.description))}
          </div>
        </div>
      )}

      {data.tech && (
        <div>
          <h2 className="text-lg font-bold text-blue-300 mb-2">
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {(data.tech as string[]).map((t: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-green-900 text-green-300 rounded text-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {data.github && (
        <div>
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline text-sm"
          >
            → View on GitHub
          </a>
        </div>
      )}

      {data.company && (
        <div>
          <h2 className="text-lg font-bold text-blue-300 mb-2">{data.company}</h2>
          <p className="text-green-400 font-semibold">{data.title}</p>
          <p className="text-gray-400 text-sm">{data.period}</p>
          {data.description && (
            <p className="text-gray-200 mt-2">{data.description}</p>
          )}
          {data.highlights && (
            <ul className="mt-3 space-y-1">
              {(data.highlights as string[]).map((h: string, idx: number) => (
                <li key={idx} className="text-gray-300 text-sm flex gap-2">
                  <span className="text-green-400">▸</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {data.year && (
        <div className="text-xs text-gray-400 pt-4 border-t border-gray-700">
          Year: {data.year}
        </div>
      )}
    </div>
  );
};
