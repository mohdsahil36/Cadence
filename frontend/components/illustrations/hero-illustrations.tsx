"use client";

import { useId } from "react";
import { motion } from "motion/react";

export type HeroSceneId = "pulse" | "streak" | "quiet";

export function HeroPulseScene() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {[0, 1, 2, 3].map((ring) => (
        <motion.span
          key={ring}
          className="absolute rounded-full border border-white/20"
          style={{
            width: 56 + ring * 42,
            height: 56 + ring * 42,
          }}
          animate={{
            opacity: [0.15, 0.45, 0.15],
            scale: [0.96, 1.04, 0.96],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: ring * 0.35,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-[0_0_40px_rgba(238,243,248,0.35)]"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#0b1020]" />
      </motion.div>

      {[
        { x: -78, y: -36, delay: 0.2 },
        { x: 84, y: -18, delay: 0.8 },
        { x: -56, y: 52, delay: 1.3 },
        { x: 62, y: 44, delay: 1.7 },
      ].map((spark, index) => (
        <motion.span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-white/70"
          style={{
            left: `calc(50% + ${spark.x}px)`,
            top: `calc(50% + ${spark.y}px)`,
          }}
          animate={{ opacity: [0.2, 1, 0.2], y: [0, -6, 0] }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: spark.delay,
          }}
        />
      ))}
    </div>
  );
}

export function HeroStreakScene() {
  const days = [0.35, 0.55, 0.25, 0.8, 0.45, 0.95, 0.6, 0.3, 0.7, 0.5, 0.85, 0.4];

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-5 px-4">
      <div className="grid w-full max-w-[15rem] grid-cols-6 gap-2">
        {days.map((intensity, index) => (
          <motion.span
            key={index}
            className="aspect-square rounded-lg bg-white"
            style={{ opacity: 0.12 + intensity * 0.7 }}
            animate={{
              opacity: [
                0.12 + intensity * 0.45,
                0.18 + intensity * 0.75,
                0.12 + intensity * 0.45,
              ],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.08,
            }}
          />
        ))}
      </div>

      <motion.div
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        <span className="text-[11px] tracking-[0.14em] text-white/75 uppercase">
          12 day streak
        </span>
      </motion.div>
    </div>
  );
}

export function HeroQuietScene() {
  const fillId = useId().replace(/:/g, "");
  const points = [18, 22, 20, 28, 24, 16, 14, 32, 48, 42, 36, 30, 22, 18];

  return (
    <div className="relative flex h-full w-full items-center justify-center px-3">
      <div className="relative h-40 w-full max-w-[17rem]">
        <div className="absolute inset-x-0 top-8 h-px bg-white/10" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-8 h-px bg-white/10" />

        <svg
          viewBox="0 0 280 160"
          className="absolute inset-0 h-full w-full"
          fill="none"
          aria-hidden
        >
          <motion.path
            d={`M 0 ${160 - points[0] * 2} ${points
              .map(
                (p, i) =>
                  `L ${(i / (points.length - 1)) * 280} ${160 - p * 2}`,
              )
              .join(" ")}`}
            stroke="rgba(238,243,248,0.75)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.4 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d={`M 0 ${160 - points[0] * 2} ${points
              .map(
                (p, i) =>
                  `L ${(i / (points.length - 1)) * 280} ${160 - p * 2}`,
              )
              .join(" ")} L 280 160 L 0 160 Z`}
            fill={`url(#${fillId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          <defs>
            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#eef3f8" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#eef3f8" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          className="absolute top-3 right-2 rounded-full border border-white/15 bg-[#0b1020]/70 px-2.5 py-1 text-[10px] tracking-[0.12em] text-white/70 uppercase"
          animate={{ opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Quiet 1–5am
        </motion.div>
      </div>
    </div>
  );
}

export const HERO_SCENES = {
  pulse: HeroPulseScene,
  streak: HeroStreakScene,
  quiet: HeroQuietScene,
} as const;
