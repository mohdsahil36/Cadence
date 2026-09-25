"use client";

import { cn } from "cn";

/**
 * Full-bleed hero scenery — bottom edge blends into the page surface
 * (cream in light, charcoal in dark) so the next section doesn't hard-cut.
 */
export function PixelScenery({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden bg-[#14131a]",
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
      {/* Tall soft wash into the page bg — light cream / dark charcoal */}
      <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-[#f3eee6] from-20% via-[#f3eee6]/75 to-transparent sm:h-64 dark:from-[#14131a] dark:via-[#14131a]/80" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#f3eee6] to-transparent dark:from-[#14131a]" />
    </div>
  );
}
