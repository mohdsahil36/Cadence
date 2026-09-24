"use client";

import { useEffect, useId, useRef } from "react";
import { cn } from "cn";

/**
 * Full-bleed pixelated atmosphere. Painted on resize/theme only —
 * no continuous RAF (avoids fighting Lenis).
 */
export function PixelField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gid = useId().replace(/:/g, "");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const CELL = 8;

    const paint = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const cw = Math.max(1, Math.floor(width));
      const ch = Math.max(1, Math.floor(height));
      if (canvas.width !== Math.floor(cw * dpr) || canvas.height !== Math.floor(ch * dpr)) {
        canvas.width = Math.floor(cw * dpr);
        canvas.height = Math.floor(ch * dpr);
        canvas.style.width = `${cw}px`;
        canvas.style.height = `${ch}px`;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;

      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue("--foreground").trim();
      const muted = styles.getPropertyValue("--muted").trim();
      const bg = styles.getPropertyValue("--background").trim();

      ctx.fillStyle = bg || "transparent";
      ctx.fillRect(0, 0, cw, ch);

      const cols = Math.ceil(cw / CELL);
      const rows = Math.ceil(ch / CELL);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          // Soft horizon band + side wash — not a centered circle
          const horizon = 1 - Math.abs(ny - 0.42) * 2.2;
          const side =
            Math.sin(nx * Math.PI) * 0.55 +
            Math.cos((nx - 0.15) * 4.2) * 0.08;
          const wave =
            Math.sin(x * 0.38 + y * 0.12) * Math.cos(y * 0.29) * 0.1 +
            Math.max(0, horizon) * side * 0.7;
          const dither = ((x * 17 + y * 31) % 7) / 7;
          const v = wave * 0.9 + dither * 0.14;
          if (v < 0.2) continue;
          const a = Math.min(0.34, (v - 0.2) * 0.55);
          ctx.fillStyle =
            v > 0.48
              ? `color-mix(in oklch, ${fg} ${Math.round(a * 48)}%, transparent)`
              : `color-mix(in oklch, ${muted} ${Math.round(a * 80)}%, transparent)`;
          ctx.fillRect(x * CELL, y * CELL, CELL - 1, CELL - 1);
        }
      }
    };

    paint();
    const ro = new ResizeObserver(() => paint());
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    const mo = new MutationObserver(() => paint());
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      ro.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 size-full [image-rendering:pixelated]"
      />
      <div
        className="absolute inset-0 opacity-30 mix-blend-overlay dark:opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Crect width='4' height='4' fill='black' fill-opacity='0.05'/%3E%3Crect x='4' y='4' width='4' height='4' fill='black' fill-opacity='0.05'/%3E%3C/svg%3E")`,
          backgroundSize: "8px 8px",
          imageRendering: "pixelated",
        }}
      />
      <svg className="absolute inset-0 size-full" aria-hidden>
        <defs>
          <linearGradient id={`nocta-vignette-${gid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--background)" stopOpacity="0.35" />
            <stop offset="45%" stopColor="var(--background)" stopOpacity="0" />
            <stop offset="100%" stopColor="var(--background)" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#nocta-vignette-${gid})`} />
      </svg>
    </div>
  );
}
