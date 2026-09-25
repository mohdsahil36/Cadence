"use client";

/**
 * Bento visuals — Nocta ink + glow (tonight's priority), cool moonlight palette.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "cn";

/** Quiet → tonight intensity. Ember only on the highest rung. */
const SIGNAL_TONE = [
  "bg-nocta-ink/12 dark:bg-nocta-ink/15",
  "bg-nocta-ink/28 dark:bg-nocta-ink/30",
  "bg-nocta-ink/50 dark:bg-nocta-ink/55",
  "bg-nocta-glow",
] as const;

const labelClass =
  "text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase";

/**
 * Outer bento shell class lives in globals.css (`.nocta-bento-card`) so the
 * fill isn't fought by Card's `bg-card` / Tailwind cascade.
 */
const bentoCard = "nocta-bento-card";

export const BENTO_THEME = {
  scoring: {
    card: bentoCard,
    title: "font-serif font-normal tracking-[-0.03em] text-foreground",
    muted: "text-muted-foreground",
  },
  "one-action": {
    card: bentoCard,
    title: "font-serif font-normal tracking-[-0.03em] text-foreground",
    muted: "text-muted-foreground",
  },
  reflection: {
    card: bentoCard,
    title: "font-serif font-normal tracking-[-0.03em] text-foreground",
    muted: "text-muted-foreground",
  },
  recovery: {
    card: bentoCard,
    title: "font-serif font-normal tracking-[-0.03em] text-foreground",
    muted: "text-muted-foreground",
  },
  neglected: {
    card: bentoCard,
    title: "font-serif font-normal tracking-[-0.03em] text-foreground",
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
  const tone = SIGNAL_TONE;
  const labels = ["Quiet", "Watch", "Due", "Now"];

  return (
    <div
      className={cn("flex h-full flex-col justify-end gap-2", className)}
      onMouseLeave={() => setHover(null)}
    >
      <div className={cn("relative min-h-5 text-center", labelClass)}>
        <AnimatePresence mode="wait">
          {hover !== null ? (
            <motion.span
              key={hover}
              initial={reduce ? false : { opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="inline-block normal-case tracking-normal text-nocta-glow"
            >
              Night {hover + 1} · {labels[bars[hover]?.level ?? 0]} ·{" "}
              {72 + (bars[hover]?.level ?? 0) * 8}%
            </motion.span>
          ) : (
            <span>Priority signal · last {count} nights</span>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-1 items-end gap-px sm:gap-0.5">
        {bars.map((bar, i) => (
          <motion.button
            key={i}
            type="button"
            aria-label={`Night ${i + 1}`}
            className={cn(
              "min-w-0 flex-1 origin-bottom cursor-pointer rounded-t-sm rounded-b-[1px]",
              tone[bar.level],
            )}
            style={{ height: `${bar.h}%` }}
            initial={reduce ? false : { scaleY: 0.25 }}
            animate={{ scaleY: hover === i ? 1.08 : 1 }}
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
    }, 3200);
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
          const isVisible = offset <= 2;
          return (
            <motion.div
              key={card.title}
              aria-hidden={!isFront}
              className={cn(
                "absolute inset-x-0 top-0 overflow-hidden rounded-3xl border p-4 sm:p-5",
                isFront
                  ? "border-nocta-glow/25 bg-nocta-paper text-nocta-ink shadow-[0_16px_40px_color-mix(in_oklab,var(--nocta-ink)_18%,transparent)] dark:border-nocta-glow/30 dark:bg-white/[0.07] dark:text-nocta-ink dark:shadow-[0_16px_40px_rgb(0_0_0_/_0.45)]"
                  : "border-nocta-ink/10 bg-nocta-ink/[0.04] dark:border-white/8 dark:bg-white/[0.04]",
              )}
              initial={false}
              animate={{
                y: offset * (wide ? 16 : 12),
                x: offset * (wide ? 10 : 6),
                scale: 1 - offset * 0.06,
                rotate: offset * 1.4,
                zIndex: cards.length - offset,
                opacity: isVisible ? (isFront ? 1 : 0.72 - offset * 0.14) : 0,
              }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 220, damping: 24, mass: 0.9 }
              }
            >
              {/* Keep copy on every plate so a cycle reads as a deck shuffle, not a text flash */}
              <p
                className={cn(
                  "font-serif tracking-[-0.02em] text-nocta-ink",
                  wide ? "text-sm sm:text-base" : "text-xs",
                  !isFront && "opacity-80",
                )}
              >
                {card.title}
              </p>
              <p className="mt-1 text-[10px] text-muted-foreground sm:text-[11px]">
                {card.meta}
              </p>
              {wide ? (
                <p className="mt-2 text-xs text-muted-foreground/80">
                  {card.detail}
                </p>
              ) : null}
              <motion.span
                className="mt-3 inline-flex rounded-full bg-nocta-glow px-3 py-1.5 text-[10px] font-medium text-nocta-ink sm:text-[11px]"
                initial={false}
                animate={{
                  opacity: isFront ? 1 : 0,
                  y: isFront ? 0 : 6,
                }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                Choose tonight
              </motion.span>
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
  const tone = SIGNAL_TONE;

  return (
    <div className={cn("flex h-full flex-col justify-end gap-2", className)}>
      <div className="flex items-end justify-between gap-2">
        <p className={labelClass}>Weekly pulse</p>
        <motion.p
          className="font-serif text-lg tracking-[-0.03em] text-nocta-glow"
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
            className={cn("size-2.5 rounded-[2px] sm:size-3", tone[level])}
            animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
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
        className="flex items-center justify-center overflow-hidden rounded-full bg-nocta-ink text-nocta-paper shadow-[0_10px_28px_color-mix(in_oklab,var(--nocta-ink)_25%,transparent)] dark:bg-nocta-paper dark:text-nocta-ink"
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
            <p className="font-serif text-xs leading-tight tracking-[-0.02em]">
              {state.label}
            </p>
            {state.wide ? (
              <p className="mt-0.5 text-[10px] opacity-70">{state.sub}</p>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="flex gap-2">
        {["Recovery", "Soft land", "Resume"].map((t, idx) => (
          <span
            key={t}
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] tracking-wide ring-1",
              idx === i
                ? "bg-nocta-glow/15 font-medium text-nocta-glow ring-nocta-glow/30"
                : "text-muted-foreground ring-nocta-ink/10 dark:ring-white/10",
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
      <p className={labelClass}>Days since last attention</p>
      <div className="flex flex-col gap-1.5">
        {areas.map((area, i) => {
          const active = area.hot && pulse % areas.length === i;
          return (
            <motion.div
              key={area.name}
              className={cn(
                "flex items-center gap-2 rounded-2xl px-2.5 py-1.5 ring-1",
                area.hot
                  ? "bg-nocta-glow/10 ring-nocta-glow/25"
                  : "bg-nocta-ink/[0.04] ring-nocta-ink/8 dark:bg-white/[0.03] dark:ring-white/8",
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
                  area.hot ? "bg-nocta-glow" : "bg-muted-foreground/40",
                )}
              />
              <span className="min-w-0 flex-1 truncate font-serif text-[12px] tracking-[-0.02em] text-foreground">
                {area.name}
              </span>
              <span className="tabular-nums text-[10px] text-muted-foreground">
                {area.days}d
              </span>
              <div className="h-1 w-12 overflow-hidden rounded-full bg-nocta-ink/10 sm:w-16 dark:bg-white/10">
                <motion.div
                  className={cn(
                    "h-full rounded-full",
                    area.hot ? "bg-nocta-glow" : "bg-nocta-ink/35 dark:bg-nocta-ink/40",
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
