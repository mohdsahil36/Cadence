"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ArrowRight, X } from "lucide-react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { CloudShader } from "@/components/ui/cloud-shader";
import { RhythmProductPanel } from "@/components/illustrations/hero-illustrations";
import { loginContent } from "./content";

/** Atmospheric chrome — no backdrop-blur (it janks Lenis scroll over WebGL). */
const chrome = {
  shell:
    "rounded-2xl border border-white/12 bg-[#121212]/88 p-2 shadow-[0_30px_90px_rgba(0,0,0,0.5)] ring-1 ring-white/5 sm:p-2.5",
  cell: "border border-white/12 bg-white/[0.04]",
  head: "border-b border-white/10 bg-white/[0.03] px-4 py-2.5 sm:px-5",
  btnPrimary:
    "border border-white/80 bg-white/95 text-black shadow-[3px_3px_0_rgba(255,255,255,0.14)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-white hover:shadow-[4px_4px_0_rgba(255,255,255,0.18)] active:translate-x-px active:translate-y-px",
  btnGhost:
    "border border-white/20 bg-white/[0.04] text-white/65 transition-colors duration-200 hover:border-white/35 hover:text-white",
};

export default function LoginPage() {
  const stepsRef = useRef<HTMLElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const reduceMotion = useReducedMotion();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      // lower lerp = slower, more glide
      lerp: 0.045,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.5,
      wheelMultiplier: 0.75,
      autoRaf: true,
    });
    lenisRef.current = lenis;

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (authOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [authOpen]);

  useEffect(() => {
    if (!authOpen) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAuthOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [authOpen]);

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const scrollToSteps = () => {
    const target = stepsRef.current;
    if (!target) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -24 });
      return;
    }

    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="relative isolate min-h-svh overflow-x-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-x-0 top-[-28%] h-[160%] w-full origin-center">
          <CloudShader
            className="absolute inset-0 h-full min-h-full w-full"
            speed={0.32}
            count={4}
            cloudColor="#e8e8e6"
            skyTopColor="#0a0a0a"
            skyBottomColor="#1c1c1c"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-[#0a0a0a]/55 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0a0a0a]/25 via-transparent to-[#0a0a0a]/55" />
      </div>

      <header className="relative z-20 mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-4">
        <Brand />
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={scrollToSteps}
            className="hidden px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-white/50 uppercase transition-colors duration-200 hover:text-white sm:inline-flex"
          >
            {loginContent.nav.howItWorks}
          </button>
          <button
            type="button"
            onClick={openAuth}
            className="border border-white/70 bg-white/90 px-4 py-2 font-mono text-[11px] font-medium tracking-[0.08em] text-black uppercase shadow-[3px_3px_0_rgba(255,255,255,0.12)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-white hover:shadow-[4px_4px_0_rgba(255,255,255,0.16)] active:translate-x-px active:translate-y-px"
          >
            {loginContent.nav.signIn}
          </button>
        </div>
      </header>

      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 pt-2 sm:px-8 lg:px-4">
        <div className={chrome.shell}>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.05fr_0.95fr]">
            <div className={`flex min-h-[420px] flex-col ${chrome.cell}`}>
              <div className={chrome.head}>
                <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium tracking-[0.08em] text-white/70 uppercase">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                  {loginContent.hero.badge}
                </p>
              </div>

              <div className="flex flex-1 flex-col p-5 sm:p-7">
                <p className="font-serif text-3xl tracking-[-0.04em] text-white sm:text-4xl">
                  {loginContent.brand}
                </p>

                <h1 className="mt-4 font-serif text-[2.35rem] leading-[0.98] tracking-[-0.045em] text-white sm:text-[2.85rem] xl:text-[3.15rem]">
                  <span className="block text-white/55">
                    {loginContent.hero.titleLead}
                  </span>
                  <span className="relative mt-1 inline-block">
                    <span className="relative z-10 italic text-white">
                      {loginContent.hero.titleAccent}
                    </span>
                    <span
                      aria-hidden
                      className="absolute inset-x-[-0.06em] bottom-[0.06em] z-0 h-[0.38em] bg-white/15"
                    />
                  </span>
                </h1>

                <p className="mt-5 max-w-md text-[15px] leading-6 text-white/65">
                  {loginContent.hero.body}
                </p>
                <p className="mt-3 max-w-md font-mono text-[12px] leading-5 tracking-[0.02em] text-white/40">
                  {loginContent.hero.cursive}
                </p>

                <div className="mt-8 flex w-full max-w-sm flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={openAuth}
                    className={`relative flex h-11 w-full items-center justify-center ${chrome.btnPrimary}`}
                  >
                    <GitHubIcon className="absolute left-3.5 text-black" />
                    <span className="font-mono text-[12px] tracking-[0.04em]">
                      {loginContent.hero.primaryCta}
                    </span>
                    <span className="absolute right-2.5 flex h-6 w-6 items-center justify-center border border-black/15 bg-black/5">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={scrollToSteps}
                    className={`inline-flex h-10 w-full items-center justify-center gap-2 px-4 font-mono text-[11px] tracking-[0.08em] uppercase ${chrome.btnGhost}`}
                  >
                    {loginContent.hero.secondaryCta}
                    <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                  </button>
                </div>

                <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-5 font-mono text-[10px] tracking-[0.08em] text-white/40 uppercase">
                  {loginContent.hero.trust.map((item, index) => (
                    <span key={item} className="inline-flex items-center gap-3">
                      {index > 0 ? (
                        <span aria-hidden className="text-white/20">
                          ·
                        </span>
                      ) : null}
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-h-[420px]">
              <RhythmProductPanel />
            </div>
          </div>
        </div>
      </section>

      <section
        ref={stepsRef}
        id="how-it-works"
        className="relative z-10 overflow-hidden px-5 py-16 sm:px-8 lg:px-4"
      >
        <StepsBento />
      </section>

      <section className="relative z-10 px-5 pb-24 sm:px-8 lg:px-4">
        <div className="relative mx-auto max-w-5xl">
          <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden">
            <BentoAtmosphere reduceMotion={!!reduceMotion} />
          </div>
          <div className={`relative z-10 ${chrome.shell}`}>
            <div
              className={`flex flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-14 ${chrome.cell}`}
            >
              <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase">
                {loginContent.close.eyebrow}
              </p>
              <h2 className="font-serif text-3xl tracking-[-0.04em] text-white sm:text-4xl">
                {loginContent.close.title}
              </h2>
              <p className="mt-3 font-mono text-[12px] tracking-[0.04em] text-white/45">
                {loginContent.close.cursive}
              </p>
              <button
                type="button"
                onClick={openAuth}
                className={`group mt-8 inline-flex h-11 items-center gap-3 px-5 text-sm font-medium ${chrome.btnPrimary}`}
              >
                <span className="font-mono text-[12px] tracking-[0.04em]">
                  {loginContent.close.cta}
                </span>
                <span className="flex h-6 w-6 items-center justify-center border border-black/15 bg-black/5 transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <AuthOverlay open={authOpen} onClose={closeAuth} />
    </main>
  );
}

function AuthOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Dismiss sign in"
            className="absolute inset-0 bg-black/55"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className={`relative z-10 w-full max-w-md overflow-hidden rounded-t-2xl sm:rounded-2xl ${chrome.shell}`}
          >
            <div className={`p-6 sm:p-7 ${chrome.cell}`}>
              <div className="mb-6 flex items-start justify-between gap-4">
                <Brand />
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center border border-white/20 text-white/60 transition-colors duration-200 hover:border-white/40 hover:text-white"
                  aria-label={loginContent.auth.close}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <p className="mb-2 font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase">
                {loginContent.auth.eyebrow}
              </p>
              <h2
                id={titleId}
                className="font-serif text-[2rem] leading-[1.05] tracking-[-0.04em] text-white sm:text-[2.25rem]"
              >
                {loginContent.auth.title}
                <br />
                <span className="italic text-white/45">
                  {loginContent.auth.titleAccent}
                </span>
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/55">
                {loginContent.auth.body}
              </p>

              <button
                type="button"
                className={`relative mt-7 flex h-11 w-full items-center justify-center text-sm font-medium ${chrome.btnPrimary}`}
              >
                <GitHubIcon className="absolute left-3.5 text-black" />
                <span className="font-mono text-[12px] tracking-[0.04em]">
                  {loginContent.auth.cta}
                </span>
                <span className="absolute right-2.5 flex h-6 w-6 items-center justify-center border border-black/15 bg-black/5">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-white/10" />
                <span className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
                  {loginContent.auth.divider}
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {loginContent.auth.chips.map((chip) => (
                  <InfoChip
                    key={chip.label}
                    label={chip.label}
                    value={chip.value}
                  />
                ))}
              </div>

              <p className="mt-5 font-mono text-[10px] leading-5 tracking-[0.02em] text-white/35">
                {loginContent.auth.privacy}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

const bento = loginContent.steps.bento;

function StepsBento() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto max-w-5xl">
      <div className="mb-10 text-center">
        <p className="mb-3 font-mono text-[11px] tracking-[0.14em] text-white/40 uppercase">
          {loginContent.steps.eyebrow}
        </p>
        <h2 className="font-serif text-3xl tracking-[-0.04em] text-white sm:text-4xl">
          {loginContent.steps.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md font-mono text-[12px] tracking-[0.04em] text-white/45">
          {loginContent.steps.cursive}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-24 bottom-0 -z-0 overflow-hidden">
        <BentoAtmosphere reduceMotion={!!reduceMotion} />
      </div>

      <div className={`relative z-10 ${chrome.shell}`}>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:grid-rows-[minmax(280px,1.15fr)_minmax(200px,0.85fr)]">
          <BentoCell className="md:row-span-2" delay={0}>
            <BentoHead>{bento.connect.title}</BentoHead>
            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
              <p className="text-[13px] leading-5 text-white/60">
                {bento.connect.body}
              </p>
              <ConnectPanels />
            </div>
          </BentoCell>

          <BentoCell delay={0.05}>
            <BentoHead>{bento.select.title}</BentoHead>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <p className="text-[13px] leading-5 text-white/60">
                {bento.select.body}
              </p>
              <ul className="space-y-1 text-[12px] text-white/75">
                {bento.select.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-white/70" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex justify-center pt-2">
                <SelectPlanes />
              </div>
            </div>
          </BentoCell>

          <BentoCell delay={0.1}>
            <BentoHead>{bento.discover.title}</BentoHead>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <p className="text-[13px] leading-5 text-white/60">
                {bento.discover.body}
              </p>
              <div className="mt-auto">
                <DiscoverChips chips={[...bento.discover.chips]} />
              </div>
            </div>
          </BentoCell>

          <BentoCell delay={0.15}>
            <BentoHead>{bento.private.title}</BentoHead>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <p className="text-[13px] leading-5 text-white/60">
                {bento.private.body}
              </p>
              <div className="mt-auto flex justify-center pb-1">
                <PrivateBadge label={bento.private.badge} />
              </div>
            </div>
          </BentoCell>

          <BentoCell delay={0.2}>
            <BentoHead>{bento.scoped.title}</BentoHead>
            <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
              <p className="text-[13px] leading-5 text-white/60">
                {bento.scoped.body}
              </p>
              <div className="mt-auto flex justify-center pb-1">
                <ScopedPuzzle pieces={[...bento.scoped.pieces]} />
              </div>
            </div>
          </BentoCell>
        </div>
      </div>
    </div>
  );
}

function BentoHead({ children }: { children: ReactNode }) {
  return (
    <div className={chrome.head}>
      <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-white/70 uppercase">
        {children}
      </p>
    </div>
  );
}

function BentoCell({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`group flex min-h-[240px] flex-col overflow-hidden transition-[border-color,background-color] duration-200 ease-out hover:border-white/25 hover:bg-white/[0.07] ${chrome.cell} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.article>
  );
}

function BentoAtmosphere({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div className="absolute inset-0">
      <div
        className={`absolute inset-0 opacity-[0.12] ${reduceMotion ? "" : "cadence-grid-drift"}`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          animation: reduceMotion
            ? undefined
            : "cadence-grid-drift 22s linear infinite",
        }}
      />
      <div
        className="absolute -left-10 top-10 h-56 w-56 rounded-full bg-white/15 blur-3xl"
        style={{
          animation: reduceMotion
            ? undefined
            : "cadence-orb 14s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-8 bottom-8 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        style={{
          animation: reduceMotion
            ? undefined
            : "cadence-orb 18s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute bottom-6 left-0 flex gap-8 font-mono text-[10px] tracking-[0.2em] text-white/20 uppercase whitespace-nowrap"
        style={{
          animation: reduceMotion
            ? undefined
            : "cadence-ticker 16s linear infinite",
        }}
      >
        {[
          "a3f91c2",
          "quiet·1–5am",
          "12·day·streak",
          "47·commits",
          "scoped·oauth",
          "a3f91c2",
          "quiet·1–5am",
          "12·day·streak",
        ].map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function Stipple({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.25] ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.7) 0.55px, transparent 0.6px)",
        backgroundSize: "3.5px 3.5px",
      }}
    />
  );
}

function ConnectPanels() {
  const reduceMotion = useReducedMotion();
  const { terminal, snippet } = bento.connect;

  return (
    <div className="mt-auto space-y-3">
      <div className="relative overflow-hidden border border-white/20 bg-black/30 p-3 shadow-[3px_3px_0_rgba(255,255,255,0.08)]">
        <p className="font-mono text-[11px] text-white/80">{terminal}</p>
        <div className="mt-2 h-1.5 overflow-hidden border border-white/15 bg-white/5">
          <motion.div
            className="h-full bg-white/70 will-change-[width]"
            initial={{ width: "22%" }}
            animate={
              reduceMotion ? { width: "72%" } : { width: ["22%", "78%", "55%"] }
            }
            transition={
              reduceMotion
                ? undefined
                : { duration: 5.5, repeat: Infinity, ease: "easeInOut" }
            }
          />
        </div>
      </div>
      <div className="relative border border-white/20 bg-black/35 p-3 shadow-[4px_4px_0_rgba(255,255,255,0.08)]">
        <Stipple />
        <div className="relative space-y-1 font-mono text-[11px] leading-5 text-white/75">
          {snippet.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

function SelectPlanes() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 180 110"
      className="h-[88px] w-full max-w-[200px]"
      aria-hidden
    >
      <defs>
        <pattern
          id="stipple-planes"
          width="3"
          height="3"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="0.6" cy="0.6" r="0.55" fill="#fff" />
        </pattern>
      </defs>
      {[0, 1, 2].map((i) => {
        const y = 18 + i * 22;
        return (
          <motion.g
            key={i}
            animate={reduceMotion ? undefined : { y: [0, -1.5, 0] }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.35,
            }}
          >
            <path
              d={`M20 ${y + 28} L90 ${y} L160 ${y + 28} L90 ${y + 56} Z`}
              fill="url(#stipple-planes)"
              fillOpacity={0.12 + i * 0.08}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.2"
            />
          </motion.g>
        );
      })}
      <circle
        cx="78"
        cy="42"
        r="3.5"
        fill="#fff"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="1"
      />
      <circle
        cx="112"
        cy="58"
        r="3.5"
        fill="rgba(255,255,255,0.45)"
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="1"
      />
      <path
        d="M78 42 L112 58"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
        fill="none"
      />
    </svg>
  );
}

function DiscoverChips({ chips }: { chips: string[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative h-[110px] overflow-hidden border border-white/15 bg-black/25"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
        backgroundSize: "16px 16px",
      }}
    >
      {chips.map((chip, i) => {
        const positions = [
          { top: 14, left: 10, rot: -6 },
          { top: 18, left: 78, rot: 4 },
          { top: 58, left: 28, rot: -2 },
          { top: 52, left: 108, rot: 7 },
          { top: 72, left: 168, rot: 0 },
        ][i] ?? { top: 40, left: 40 + i * 20, rot: 0 };

        return (
          <motion.span
            key={chip}
            className="absolute border border-white/25 bg-black/50 px-2 py-1 font-mono text-[10px] tracking-wide text-white/85 uppercase shadow-[2px_2px_0_rgba(255,255,255,0.08)]"
            style={{
              top: positions.top,
              left: positions.left,
              rotate: `${positions.rot}deg`,
            }}
            animate={
              reduceMotion ? undefined : { y: [0, i % 2 === 0 ? -2 : 1.5, 0] }
            }
            transition={{
              duration: 5.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
          >
            {chip}
          </motion.span>
        );
      })}
    </div>
  );
}

function PrivateBadge({ label }: { label: string }) {
  return (
    <div
      className="relative w-[128px] border border-white/25 bg-black/40 px-3 py-4 text-center shadow-[3px_3px_0_rgba(255,255,255,0.08)] transition-transform duration-300 ease-out group-hover:-rotate-1"
      style={{
        clipPath:
          "polygon(8% 0, 92% 0, 100% 18%, 100% 82%, 92% 100%, 8% 100%, 0 82%, 0 18%)",
      }}
    >
      <Stipple />
      <p className="relative font-mono text-[11px] tracking-[0.12em] text-white/55 uppercase">
        by default
      </p>
      <p className="relative mt-1 font-mono text-base tracking-tight text-white">
        {label}
      </p>
    </div>
  );
}

function ScopedPuzzle({ pieces }: { pieces: string[] }) {
  const slots = [
    { x: 8, y: 8 },
    { x: 58, y: 8 },
    { x: 8, y: 52 },
    { x: 58, y: 52 },
  ];

  return (
    <div className="relative h-[100px] w-[120px]">
      {pieces.map((piece, i) => (
        <div
          key={piece}
          className="absolute flex h-10 w-10 items-center justify-center border border-white/25 bg-black/40 font-mono text-[8px] tracking-wide text-white/80 uppercase shadow-[2px_2px_0_rgba(255,255,255,0.08)] transition-transform duration-300 ease-out group-hover:translate-y-[-1px]"
          style={{
            left: slots[i]?.x,
            top: slots[i]?.y,
            transitionDelay: `${i * 40}ms`,
          }}
        >
          {i === 3 ? <Stipple /> : null}
          <span className="relative">{piece}</span>
        </div>
      ))}
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center border border-white/70 bg-white/90 text-black shadow-[2px_2px_0_rgba(255,255,255,0.12)] ${
          compact ? "h-8 w-8" : "h-9 w-9"
        }`}
      >
        <span
          className={`font-mono font-semibold ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          C
        </span>
      </div>
      <span
        className={`font-mono tracking-[0.04em] text-white uppercase ${
          compact ? "text-xs" : "text-[13px]"
        }`}
      >
        {loginContent.brand}
      </span>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-16 flex-col border border-white/15 bg-white/[0.04] px-3 py-2.5">
      <p className="font-mono text-[9px] tracking-[0.12em] text-white/40 uppercase">
        {label}
      </p>
      <p className="mt-auto pt-1 text-[13px] font-medium tracking-[-0.02em] text-white/85">
        {value}
      </p>
    </div>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 fill-current ${className ?? ""}`}
    >
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.167 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.455-1.157-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.35-1.087.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .267.18.578.688.48C19.138 20.164 22 16.417 22 12 22 6.477 17.523 2 12 2Z" />
    </svg>
  );
}
