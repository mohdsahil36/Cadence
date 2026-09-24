"use client";

/**
 * Dusk-glass bento visuals — tones match the hero scenery, not neon cards.
 * Motion language inspired by https://ui.aceternity.com/blocks/illustrations
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "cn";

/** Shared glass surfaces that sit on the dusk page, not loud pastel blocks. */
export const BENTO_THEME = {
  scoring: {
    card: "bg-white/55 ring-1 ring-white/40 dark:bg-white/5 dark:ring-white/10 backdrop-blur-md",
    title: "text-foreground",
    muted: "text-muted-foreground",
  },
  "one-action": {
    card: "bg-white/55 ring-1 ring-white/40 dark:bg-white/5 dark:ring-white/10 backdrop-blur-md",
    title: "text-foreground",
    muted: "text-muted-foreground",
  },
  reflection: {
    card: "bg-white/55 ring-1 ring-white/40 dark:bg-white/5 dark:ring-white/10 backdrop-blur-md",
    title: "text-foreground",
    muted: "text-muted-foreground",
  },
  recovery: {
    card: "bg-white/55 ring-1 ring-white/40 dark:bg-white/5 dark:ring-white/10 backdrop-blur-md",
    title: "text-foreground",
    muted: "text-muted-foreground",
  },
  neglected: {
    card: "bg-white/55 ring-1 ring-white/40 dark:bg-white/5 dark:ring-white/10 backdrop-blur-md",
    title: "text-foreground",
    muted: "text-muted-foreground",
  },
} as const;

export type BentoId = keyof typeof BENTO_THEME;

type VisualProps = { className?: string; wide?: boolean };

/** Uptime-style bars */
export function ScoringVisual({ className, wide }: VisualProps) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);
  const count = wide ? 40 : 28;
  const bars = Array.from({ length: count }, (_, i) => {
    const n = Math.sin(i * 0.55) * 0.5 + Math.cos(i * 0.2) * 0.3 + 0.55;
    const level = n < 0.35 ? 0 : n < 0.55 ? 1 : n < 0.75 ? 2 : 3;
    return { level, h: 28 + level * 18 + (i % 3) * 4 };
  });
  const tone = [
    "bg-stone-300/45 dark:bg-stone-500/30",
    "bg-stone-400/60 dark:bg-stone-400/40",
    "bg-amber-400/70 dark:bg-amber-400/45",
    "bg-amber-500/85 dark:bg-amber-300/55",
  ];
  const labels = ["Quiet", "Watch", "Due", "Now"];

  return (
    <div
      className={cn("flex h-full flex-col justify-end gap-2", className)}
      onMouseLeave={() => setHover(null)}
    >
      <div className="relative min-h-5 text-center text-[10px] text-muted-foreground">
        <AnimatePresence mode="wait">
          {hover !== null ? (
            <motion.span
              key={hover}
              initial={reduce ? false : { opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="inline-block"
            >
              Night {hover + 1} · {labels[bars[hover]?.level ?? 0]} ·{" "}
              {72 + (bars[hover]?.level ?? 0) * 8}%
            </motion.span>
          ) : (
            <span>Priority signal · last {count} nights</span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-1 items-end gap-0.5">
        {bars.map((bar, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={`Night ${i + 1}`}
            className={cn(
              "min-w-0 flex-1 origin-bottom cursor-pointer rounded-sm",
              tone[bar.level],
            )}
            style={{ height: `${bar.h}%` }}
            initial={reduce ? false : { scaleY: 0.25 }}
            animate={{ scaleY: hover === i ? 1.1 : 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 22,
              delay: reduce ? 0 : i * 0.01,
            }}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
          />
        ))}
      </div>
    </div>
  );
}

/** Stacked rotating cards — scales up when wide */
export function OneActionVisual({ className, wide }: VisualProps) {
  const reduce = useReducedMotion();
  const cards = [
    {
      title: "Ship the scoring PR",
      meta: "Score 36 · Due tonight",
      detail: "Highest leverage before sleep.",
    },
    {
      title: "Write weekly note",
      meta: "Score 24 · Soft due",
      detail: "Patterns only — no dashboard.",
    },
    {
      title: "Recovery night",
      meta: "Protected · no penalty",
      detail: "Rest is a valid priority.",
    },
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % cards.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [reduce, cards.length]);

  return (
    <div
      className={cn(
        "relative flex h-full items-center justify-center",
        wide ? "min-h-48" : "min-h-36",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full",
          wide ? "h-44 max-w-none" : "h-32 max-w-56",
        )}
      >
        {cards.map((card, i) => {
          const offset = (i - index + cards.length) % cards.length;
          const isFront = offset === 0;
          return (
            <motion.div
              key={card.title}
              className="absolute inset-x-0 top-0 rounded-2xl border border-white/20 bg-background/70 p-4 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-background/45 sm:p-5"
              animate={{
                y: offset * (wide ? 14 : 10),
                scale: 1 - offset * 0.05,
                zIndex: cards.length - offset,
                opacity: offset > 2 ? 0 : 1,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 26 }}
            >
              <p
                className={cn(
                  "font-semibold text-foreground",
                  wide ? "text-sm sm:text-base" : "text-xs",
                )}
              >
                {card.title}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground sm:text-[11px]">
                {card.meta}
              </p>
              {wide && isFront ? (
                <p className="mt-2 text-xs text-muted-foreground/80">
                  {card.detail}
                </p>
              ) : null}
              {isFront ? (
                <span className="mt-3 inline-flex rounded-full bg-foreground px-3 py-1.5 text-[10px] font-medium text-background sm:text-[11px]">
                  Choose tonight
                </span>
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ReflectionVisual({ className }: VisualProps) {
  const reduce = useReducedMotion();
  const weeks = 10;
  const days = 7;
  const cells: number[] = [];
  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const n = Math.sin(w * 1.1 + d * 0.8) * 0.5 + 0.45;
      cells.push(n < 0.25 ? 0 : n < 0.45 ? 1 : n < 0.7 ? 2 : 3);
    }
  }
  const tone = [
    "bg-stone-200/40 dark:bg-stone-700/40",
    "bg-stone-300/55 dark:bg-stone-500/40",
    "bg-amber-300/65 dark:bg-amber-500/40",
    "bg-amber-400/85 dark:bg-amber-300/55",
  ];

  return (
    <div className={cn("flex h-full flex-col justify-end gap-2", className)}>
      <div className="flex items-end justify-between gap-2">
        <p className="text-[10px] text-muted-foreground">Weekly pulse</p>
        <motion.p
          className="font-serif text-lg text-foreground"
          animate={reduce ? undefined : { opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Calm
        </motion.p>
      </div>
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {cells.map((level, i) => (
          <motion.div
            key={i}
            className={cn("size-2.5 rounded-[3px] sm:size-3", tone[level])}
            animate={reduce ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 2.4 + (i % 5) * 0.1,
              repeat: Infinity,
              delay: (i % 10) * 0.04,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export function RecoveryVisual({ className }: VisualProps) {
  const reduce = useReducedMotion();
  const states = [
    { label: "Idle", sub: "Ready when you are", wide: false },
    { label: "Protecting…", sub: "Recovery night locked", wide: true },
    { label: "Rest held", sub: "Streak safe · resume tomorrow", wide: true },
  ] as const;
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(
      () => setI((v) => (v + 1) % states.length),
      2600,
    );
    return () => window.clearInterval(id);
  }, [reduce, states.length]);

  const state = states[i]!;

  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-4",
        className,
      )}
    >
      <motion.div
        layout
        className="flex items-center justify-center overflow-hidden rounded-full bg-foreground text-background shadow-lg"
        animate={{
          width: state.wide ? 210 : 84,
          height: state.wide ? 52 : 34,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={state.label}
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="px-4 text-center"
          >
            <p className="text-xs font-semibold leading-tight">{state.label}</p>
            {state.wide ? (
              <p className="mt-0.5 text-[10px] text-background/70">{state.sub}</p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="flex gap-2">
        {["Recovery", "Soft land", "Resume"].map((t, idx) => (
          <span
            key={t}
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] ring-1 ring-foreground/10",
              idx === i
                ? "bg-foreground/10 font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Category silence meter — replaces the sparse node graph.
 * Shows 5 goal areas; neglected ones glow and rise.
 */
export function NeglectedVisual({ className }: VisualProps) {
  const reduce = useReducedMotion();
  const areas = [
    { name: "Health", days: 9, hot: true },
    { name: "Craft", days: 2, hot: false },
    { name: "People", days: 11, hot: true },
    { name: "Money", days: 4, hot: false },
    { name: "Learning", days: 7, hot: true },
  ];
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setPulse((v) => v + 1), 2200);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <div className={cn("flex h-full flex-col justify-end gap-2", className)}>
      <p className="text-[10px] text-muted-foreground">
        Days since last attention
      </p>
      <div className="flex flex-col gap-1.5">
        {areas.map((area, i) => {
          const active = area.hot && pulse % areas.length === i;
          return (
            <motion.div
              key={area.name}
              className={cn(
                "flex items-center gap-2 rounded-xl px-2.5 py-1.5 ring-1",
                area.hot
                  ? "bg-amber-400/15 ring-amber-400/25 dark:bg-amber-300/10 dark:ring-amber-200/20"
                  : "bg-foreground/5 ring-foreground/8",
              )}
              animate={
                reduce
                  ? undefined
                  : {
                      x: active ? 4 : 0,
                      opacity: area.hot ? [0.75, 1, 0.75] : 0.65,
                    }
              }
              transition={{
                duration: 2.2,
                delay: i * 0.12,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  area.hot ? "bg-amber-400" : "bg-muted-foreground/40",
                )}
              />
              <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-foreground">
                {area.name}
              </span>
              <span className="tabular-nums text-[10px] text-muted-foreground">
                {area.days}d
              </span>
              <div className="h-1 w-12 overflow-hidden rounded-full bg-foreground/10 sm:w-16">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    area.hot ? "bg-amber-400/80" : "bg-stone-400/50",
                  )}
                  initial={false}
                  animate={{ width: `${Math.min(100, area.days * 9)}%` }}
                  transition={{ duration: 0.8, delay: i * 0.08 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function BentoVisual({
  id,
  wide,
}: {
  id: string;
  wide?: boolean;
}) {
  switch (id) {
    case "scoring":
      return <ScoringVisual wide={wide} />;
    case "one-action":
      return <OneActionVisual wide={wide} />;
    case "reflection":
      return <ReflectionVisual />;
    case "recovery":
      return <RecoveryVisual />;
    case "neglected":
      return <NeglectedVisual />;
    default:
      return <ScoringVisual />;
  }
}
