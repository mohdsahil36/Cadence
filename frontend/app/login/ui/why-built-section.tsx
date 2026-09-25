"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { loginContent } from "../content";

export function WhyBuiltSection() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.25"],
  });

  const before = loginContent.why.before.split(" ");
  const emphasis = loginContent.why.emphasis.split(" ");
  const after = loginContent.why.after.split(" ");
  const all = [
    ...before.map((w) => ({ w, kind: "plain" as const })),
    ...emphasis.map((w) => ({ w, kind: "emphasis" as const })),
    ...after.map((w) => ({ w, kind: "plain" as const })),
  ];

  return (
    <section
      id="why"
      ref={ref}
      className="relative z-10 bg-nocta-paper px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto w-full max-w-2xl text-center">
        <p className="mb-5 text-xs font-medium tracking-[0.16em] text-muted-foreground uppercase">
          {loginContent.why.eyebrow}
        </p>
        <p className="text-xl leading-relaxed text-balance sm:text-2xl sm:leading-relaxed lg:text-3xl lg:leading-snug">
          {all.map((item, i) => {
            const start = i / all.length;
            const end = Math.min(1, start + 1.35 / all.length);
            return (
              <ScrollWord
                key={`${item.kind}-${item.w}-${i}`}
                progress={scrollYProgress}
                range={[start, end]}
                reduceMotion={!!reduceMotion}
                emphasis={item.kind === "emphasis"}
              >
                {item.w}
              </ScrollWord>
            );
          })}
        </p>
      </div>
    </section>
  );
}

function ScrollWord({
  children,
  progress,
  range,
  reduceMotion,
  emphasis,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduceMotion: boolean;
  emphasis?: boolean;
}) {
  const opacity = useTransform(
    progress,
    range,
    reduceMotion ? [1, 1] : [0.2, 1],
  );

  return (
    <motion.span
      style={{ opacity }}
      className={
        emphasis
          ? "mr-[0.28em] inline-block font-serif text-foreground italic"
          : "mr-[0.28em] inline-block font-sans text-foreground"
      }
    >
      {children}
    </motion.span>
  );
}
