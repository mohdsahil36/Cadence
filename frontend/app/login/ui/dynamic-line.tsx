"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { easeOut } from "./motion";

export function DynamicLine({ lines }: { lines: readonly string[] }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion || lines.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % lines.length);
    }, 3400);
    return () => window.clearInterval(id);
  }, [lines, reduceMotion]);

  const text = lines[index] ?? lines[0];

  return (
    <div className="relative mx-auto flex min-h-10 items-center justify-center overflow-hidden sm:min-h-11">
      <AnimatePresence mode="wait">
        <motion.p
          key={text}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="absolute inset-x-0 px-2 text-center font-serif text-base leading-snug tracking-[-0.02em] text-white/90 italic drop-shadow-[0_2px_14px_rgba(0,0,0,0.65)] sm:text-lg"
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
