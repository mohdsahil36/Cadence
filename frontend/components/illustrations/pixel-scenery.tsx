"use client";

import { cn } from "cn";

/**
 * Full-bleed hero scenery — bottom edge blends into nocta-paper
 * so the next section doesn't hard-cut.
 */
export function PixelScenery({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-nocta-night",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/nocta-scenery.jpg"
        alt=""
        sizes="100vw"
        style={{ transform: "scale(1.12)", transformOrigin: "center 40%" }}
        className="absolute inset-0 h-full w-full object-cover object-center brightness-[1.02] saturate-[0.95] dark:brightness-[0.78] dark:contrast-[1.04] dark:saturate-[0.75]"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent" />
      {/* Tall soft wash into page paper */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-nocta-paper from-20% via-nocta-paper/75 to-transparent sm:h-64" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-nocta-paper to-transparent" />
    </div>
  );
}
