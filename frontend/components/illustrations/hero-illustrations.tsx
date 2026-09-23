"use client";

import { useEffect, useId, useState } from "react";
import { useReducedMotion } from "motion/react";
import { loginContent } from "@/app/login/content";

const HEAT = [
  0.15, 0.35, 0.2, 0.55, 0.4, 0.75, 0.3, 0.9, 0.45, 0.25, 0.65, 0.5, 0.8, 0.35,
  0.2, 0.7, 0.55, 0.95, 0.4, 0.6, 0.3, 0.85, 0.5, 0.25, 0.7, 0.45, 0.15, 0.55,
];

const CURVE = [14, 16, 18, 22, 20, 15, 12, 28, 44, 40, 34, 28, 20, 16];

const VIEWS = [
  { label: "Commits", valueKey: "commits" as const },
  { label: "Quiet", valueKey: "quiet" as const },
  { label: "Scope", valueKey: "repos" as const },
];

/** Live product preview — frosted glass, sits in the cloud atmosphere. */
export function RhythmProductPanel() {
  const reduceMotion = useReducedMotion();
  const fillId = useId().replace(/:/g, "");
  const product = loginContent.hero.product;
  const [view, setView] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setView((current) => (current + 1) % VIEWS.length);
    }, 3200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden border border-white/12 bg-white/5">
      <div className="border-b border-white/10 bg-white/4 px-4 py-2.5">
        <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-white/70 uppercase">
          {product.live}
        </p>
      </div>

      <div className="relative flex flex-1 flex-col p-4 sm:p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="font-serif text-xl tracking-[-0.03em] text-white">
            {product.header}
          </p>
          <span className="border border-white/25 bg-black/30 px-2 py-1 font-mono text-[10px] tracking-widest text-white/80 uppercase shadow-[2px_2px_0_rgba(255,255,255,0.08)]">
            {product.streak}
          </span>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {HEAT.map((intensity, index) => (
            <span
              key={index}
              className="relative aspect-square overflow-hidden border border-white/10 bg-white/3"
            >
              <span
                className="absolute inset-0 bg-white"
                style={{ opacity: 0.08 + intensity * 0.55 }}
              />
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-1.5">
          {VIEWS.map((item, index) => (
            <div
              key={item.label}
              className={`border px-2 py-2 transition-colors duration-500 ${
                index === view
                  ? "border-white/30 bg-white/8"
                  : "border-white/12 bg-white/3"
              }`}
            >
              <p className="font-mono text-[9px] tracking-[0.12em] text-white/40 uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-[12px] font-medium tracking-[-0.02em] text-white/85">
                {product[item.valueKey]}
              </p>
            </div>
          ))}
        </div>

        <div className="relative mt-4 h-20 overflow-hidden border border-white/12 bg-black/25 px-2 pt-2">
          <svg
            viewBox="0 0 280 96"
            className="h-full w-full"
            fill="none"
            aria-hidden
          >
            <path
              d={`M 0 ${96 - CURVE[0]} ${CURVE.map(
                (p, i) => `L ${(i / (CURVE.length - 1)) * 280} ${96 - p}`,
              ).join(" ")}`}
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M 0 ${96 - CURVE[0]} ${CURVE.map(
                (p, i) => `L ${(i / (CURVE.length - 1)) * 280} ${96 - p}`,
              ).join(" ")} L 280 96 L 0 96 Z`}
              fill={`url(#${fillId})`}
              opacity={0.4}
            />
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="mt-3 font-mono text-[10px] leading-4 tracking-[0.04em] text-white/40">
          {product.footnote}
        </p>
      </div>
    </div>
  );
}
