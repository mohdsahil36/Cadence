"use client";

import type { ReactNode } from "react";

/**
 * Abstract geometric night-mark for the Nocta hero.
 * Recolors via theme utilities — not a flat invert.
 */
export function NoctaHeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle
        cx="210"
        cy="210"
        r="168"
        className="fill-muted/60 dark:fill-muted/40"
      />
      <circle
        cx="210"
        cy="210"
        r="128"
        className="stroke-foreground/15 dark:stroke-foreground/25"
        strokeWidth="1.25"
      />
      <ellipse
        cx="210"
        cy="210"
        rx="96"
        ry="96"
        className="stroke-foreground/25 dark:stroke-foreground/35"
        strokeWidth="1.5"
        strokeDasharray="4 10"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 210 210"
          to="360 210 210"
          dur="48s"
          repeatCount="indefinite"
        />
      </ellipse>
      <path
        d="M248 140c-48 8-84 52-84 102s36 94 84 102c-56-6-100-54-100-112s44-106 100-112Z"
        className="fill-foreground/90 dark:fill-foreground"
      />
      <circle
        cx="292"
        cy="168"
        r="10"
        className="fill-primary/80 dark:fill-primary"
      />
    </svg>
  );
}

const ICONS: Record<string, ReactNode> = {
  scoring: (
    <svg viewBox="0 0 32 32" className="size-8" fill="none" aria-hidden>
      <rect
        x="4"
        y="18"
        width="6"
        height="10"
        rx="1"
        className="fill-foreground/25"
      />
      <rect
        x="13"
        y="10"
        width="6"
        height="18"
        rx="1"
        className="fill-foreground/50"
      />
      <rect
        x="22"
        y="4"
        width="6"
        height="24"
        rx="1"
        className="fill-foreground/80"
      />
    </svg>
  ),
  "one-action": (
    <svg viewBox="0 0 32 32" className="size-8" fill="none" aria-hidden>
      <circle
        cx="16"
        cy="16"
        r="11"
        className="stroke-foreground/40"
        strokeWidth="1.5"
      />
      <circle cx="16" cy="16" r="4" className="fill-foreground/80" />
    </svg>
  ),
  reflection: (
    <svg viewBox="0 0 32 32" className="size-8" fill="none" aria-hidden>
      <path
        d="M8 22V10h16v12"
        className="stroke-foreground/50"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 22c4 4 12 4 16 0"
        className="stroke-foreground/80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  recovery: (
    <svg viewBox="0 0 32 32" className="size-8" fill="none" aria-hidden>
      <path
        d="M6 18c0-5.5 4.5-10 10-10s10 4.5 10 10"
        className="stroke-foreground/45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M10 18h12"
        className="stroke-foreground/80"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  neglected: (
    <svg viewBox="0 0 32 32" className="size-8" fill="none" aria-hidden>
      <rect
        x="5"
        y="5"
        width="9"
        height="9"
        rx="2"
        className="fill-foreground/25"
      />
      <rect
        x="18"
        y="5"
        width="9"
        height="9"
        rx="2"
        className="fill-foreground/15"
      />
      <rect
        x="5"
        y="18"
        width="9"
        height="9"
        rx="2"
        className="fill-foreground/15"
      />
      <rect
        x="18"
        y="18"
        width="9"
        height="9"
        rx="2"
        className="fill-foreground/70"
      />
    </svg>
  ),
};

export function FeatureIcon({ id }: { id: string }) {
  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-muted text-foreground">
      {ICONS[id] ?? ICONS.scoring}
    </div>
  );
}

function IsoBlock({
  x,
  y,
  w,
  h,
  d,
  tone = "mid",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  d: number;
  tone?: "light" | "mid" | "dark" | "accent";
}) {
  const top =
    tone === "light"
      ? "fill-foreground/45 dark:fill-foreground/50"
      : tone === "dark"
        ? "fill-foreground/18 dark:fill-foreground/22"
        : tone === "accent"
          ? "fill-foreground/65 dark:fill-foreground/70"
          : "fill-foreground/32 dark:fill-foreground/38";
  const left =
    tone === "accent"
      ? "fill-foreground/45 dark:fill-foreground/50"
      : "fill-foreground/20 dark:fill-foreground/25";
  const right =
    tone === "accent"
      ? "fill-foreground/30 dark:fill-foreground/35"
      : "fill-foreground/14 dark:fill-foreground/18";

  const topPts = `${x},${y} ${x + w},${y - w * 0.5} ${x + w - d},${y - w * 0.5 + d * 0.5} ${x - d},${y + d * 0.5}`;
  const leftPts = `${x},${y} ${x - d},${y + d * 0.5} ${x - d},${y + d * 0.5 + h} ${x},${y + h}`;
  const rightPts = `${x},${y} ${x + w},${y - w * 0.5} ${x + w},${y - w * 0.5 + h} ${x},${y + h}`;

  return (
    <g>
      <polygon points={rightPts} className={right} />
      <polygon points={leftPts} className={left} />
      <polygon points={topPts} className={top} />
    </g>
  );
}

const ISO_SCENES: Record<string, ReactNode> = {
  scoring: (
    <g transform="translate(8, 8)">
      <IsoBlock x={48} y={118} w={40} h={16} d={16} tone="dark" />
      <IsoBlock x={48} y={96} w={40} h={32} d={16} tone="mid" />
      <IsoBlock x={100} y={88} w={40} h={48} d={16} tone="accent" />
      <IsoBlock x={152} y={72} w={40} h={64} d={16} tone="light" />
      <circle cx="172" cy="58" r="5" className="fill-foreground/70" />
    </g>
  ),
  "one-action": (
    <g transform="translate(0, 4)">
      <IsoBlock x={70} y={124} w={100} h={12} d={22} tone="dark" />
      <IsoBlock x={102} y={78} w={36} h={40} d={18} tone="accent" />
      <circle cx="120" cy="58" r="14" className="fill-foreground/20" />
      <circle cx="120" cy="58" r="7" className="fill-foreground/70" />
    </g>
  ),
  reflection: (
    <g>
      <IsoBlock x={56} y={112} w={120} h={10} d={20} tone="dark" />
      <IsoBlock x={78} y={78} w={32} h={26} d={14} tone="mid" />
      <IsoBlock x={122} y={68} w={32} h={36} d={14} tone="light" />
      <path
        d="M74 56c24 16 56 16 80 0"
        className="stroke-foreground/45"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M86 128c16 10 40 10 56 0"
        className="stroke-foreground/25"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  ),
  recovery: (
    <g>
      <IsoBlock x={64} y={122} w={110} h={10} d={18} tone="dark" />
      <path
        d="M88 98c0-30 24-52 52-52s52 22 52 52"
        className="stroke-foreground/40"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />
      <IsoBlock x={112} y={92} w={40} h={18} d={16} tone="mid" />
      <circle cx="140" cy="54" r="6" className="fill-foreground/55" />
    </g>
  ),
  neglected: (
    <g transform="translate(12, 6)">
      <IsoBlock x={56} y={72} w={36} h={24} d={14} tone="dark" />
      <IsoBlock x={108} y={64} w={36} h={24} d={14} tone="dark" />
      <IsoBlock x={56} y={112} w={36} h={24} d={14} tone="mid" />
      <IsoBlock x={108} y={104} w={36} h={24} d={14} tone="accent" />
      <circle cx="126" cy="96" r="4" className="fill-background" />
    </g>
  ),
};

/**
 * Isometric illustration for each bento cell.
 */
export function FeatureIsoScene({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <rect
        width="240"
        height="160"
        className="fill-muted/50 dark:fill-muted/30"
      />
      <path d="M0 120h240v40H0Z" className="fill-foreground/5" />
      {ISO_SCENES[id] ?? ISO_SCENES.scoring}
    </svg>
  );
}
