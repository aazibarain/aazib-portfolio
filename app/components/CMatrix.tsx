"use client";
import React, { useRef, useEffect } from "react";

export const CMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; t: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setSize();

    const chars = "@#¥%&*+=-abcdefghijklmnopqrstuvwxyz0123456789".split("");
    const fontSize = 14;
    const columns = Math.max(1, Math.floor(width / fontSize));
    const drops = new Array(columns).fill(0).map(() => Math.random() * (height / fontSize));

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY, t: Date.now() };
    };
    window.addEventListener("mousemove", handleMove);

    let raf = 0;
    const draw = () => {
      // semi-transparent overlay for trail effect
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "top";

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const text = chars[Math.floor(Math.random() * chars.length)];

        const m = mouseRef.current;
        if (m && Date.now() - m.t < 500) {
          const dx = m.x - x;
          const dy = m.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            drops[i] = Math.max(0, drops[i] - 3);
            continue;
          }
        }

        ctx.fillStyle = `hsl(140, 60%, ${25 + Math.random() * 40}%)`;
        ctx.fillText(text, x, y);

        drops[i] = drops[i] > height / fontSize + Math.random() * 80 ? 0 : drops[i] + 0.8 + Math.random() * 1.2;
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 w-full h-full pointer-events-none"
    />
  );
};
