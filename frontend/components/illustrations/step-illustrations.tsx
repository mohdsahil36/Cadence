"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type IllustrationProps = {
  active?: boolean;
  hoverLabel?: string;
  hoverLabelIdle?: string;
  hoverLabelActive?: string;
};

export function IsometricCube({
  className,
  children,
  faceClassName,
  active = false,
}: {
  className?: string;
  children?: React.ReactNode;
  faceClassName?: string;
  active?: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "relative mx-auto h-28 w-28 [transform-style:preserve-3d]",
        className,
      )}
      animate={{
        rotateX: active ? 52 : 60,
        rotateZ: active ? -38 : -45,
        y: active ? -6 : 0,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 22, mass: 0.9 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center rounded-lg border border-white/15 bg-linear-to-br from-white/15 to-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] [transform:translateZ(28px)]",
          faceClassName,
        )}
      >
        <div className="[transform:rotateZ(45deg)_rotateX(-60deg)]">
          {children}
        </div>
      </div>
      <div className="absolute inset-0 rounded-lg border border-white/10 bg-white/[0.04] [transform:rotateY(90deg)_translateZ(28px)]" />
      <div className="absolute inset-0 rounded-lg border border-white/10 bg-black/40 [transform:rotateX(-90deg)_translateZ(28px)]" />
    </motion.div>
  );
}

export function ConnectIllustration({
  active = false,
  hoverLabel = "Linked",
}: IllustrationProps) {
  return (
    <div className="relative flex h-36 items-center justify-center">
      <IsometricCube active={active}>
        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]"
            animate={{ scale: active ? 1.25 : 1 }}
          />
          <motion.span
            className="h-px bg-white/40"
            animate={{ width: active ? 28 : 24, opacity: active ? 1 : 0.5 }}
          />
          <motion.span
            className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.7)]"
            animate={{ scale: active ? 1.25 : 1 }}
          />
        </div>
      </IsometricCube>

      <motion.span
        className="absolute left-8 top-8 h-2 w-2 rounded-full bg-white/50"
        animate={
          active
            ? { x: [0, 10, 0], y: [0, -8, 0], opacity: 1 }
            : { y: [0, -4, 0], opacity: [0.35, 0.8, 0.35] }
        }
        transition={{ duration: active ? 1.2 : 2.4, repeat: Infinity }}
      />
      <motion.span
        className="absolute bottom-10 right-10 h-1.5 w-1.5 rounded-full bg-white/40"
        animate={
          active
            ? { x: [0, -8, 0], y: [0, 6, 0], opacity: 1 }
            : { y: [0, 4, 0], opacity: [0.3, 0.75, 0.3] }
        }
        transition={{ duration: active ? 1.1 : 2.8, repeat: Infinity }}
      />

      <motion.p
        className="absolute bottom-1 text-[10px] uppercase tracking-[0.16em] text-emerald-300/90"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
      >
        {hoverLabel}
      </motion.p>
    </div>
  );
}

export function SelectIllustration({
  active = false,
  hoverLabel = "3 repos",
}: IllustrationProps) {
  return (
    <div className="relative flex h-36 items-center justify-center">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute h-14 w-20 rounded-xl border border-white/15 bg-linear-to-br from-white/12 to-white/[0.03] shadow-[8px_12px_24px_rgba(0,0,0,0.35)]"
          animate={{
            y: active ? index * -16 - 4 : index * -10,
            x: active ? index * 12 : index * 8,
            rotateZ: active ? -4 : -8,
            scale: active && index === 2 ? 1.05 : 1,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        >
          <div className="flex h-full flex-col justify-between p-2.5">
            <div
              className={`h-1.5 w-8 rounded-full ${
                active && index === 2 ? "bg-sky-300/80" : "bg-white/25"
              }`}
            />
            <div className="space-y-1">
              <div className="h-1 w-12 rounded-full bg-white/15" />
              <div className="h-1 w-9 rounded-full bg-white/10" />
            </div>
          </div>
        </motion.div>
      ))}

      <motion.p
        className="absolute bottom-1 text-[10px] uppercase tracking-[0.16em] text-sky-300/90"
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
      >
        {hoverLabel}
      </motion.p>
    </div>
  );
}

export function DiscoverIllustration({
  active = false,
  hoverLabelIdle = "99.9%",
  hoverLabelActive = "+12 today",
}: IllustrationProps) {
  const bars = [18, 28, 22, 36, 30, 44, 26, 40];

  return (
    <div className="relative flex h-36 items-end justify-center pb-4">
      <div className="flex h-24 items-end gap-1.5 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 shadow-[10px_16px_30px_rgba(0,0,0,0.3)]">
        {bars.map((height, index) => (
          <motion.span
            key={index}
            className="w-2 rounded-full bg-linear-to-t from-white/15 to-white/70"
            animate={{
              height: active
                ? [height, height + 10, height]
                : [Math.max(10, height - 10), height, Math.max(12, height - 6)],
            }}
            transition={{
              duration: active ? 0.9 : 2.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.05,
            }}
          />
        ))}
      </div>
      <motion.div
        className="absolute right-8 top-5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300"
        animate={{
          y: active ? -8 : [0, -3, 0],
          scale: active ? 1.08 : 1,
        }}
        transition={
          active
            ? { type: "spring", stiffness: 240, damping: 16 }
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {active ? hoverLabelActive : hoverLabelIdle}
      </motion.div>
    </div>
  );
}
