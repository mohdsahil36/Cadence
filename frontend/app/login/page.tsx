"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, X } from "lucide-react";
import Lenis from "lenis";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { CloudShader } from "@/components/ui/cloud-shader";
import {
  ConnectIllustration,
  DiscoverIllustration,
  SelectIllustration,
} from "@/components/illustrations/step-illustrations";
import { HERO_SCENES } from "@/components/illustrations/hero-illustrations";
import { loginContent } from "./content";

const ILLUSTRATIONS = {
  connect: ConnectIllustration,
  select: SelectIllustration,
  discover: DiscoverIllustration,
} as const;

const parallaxSpring = { stiffness: 140, damping: 28, mass: 0.55 };

export default function LoginPage() {
  const pageRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      autoRaf: true,
    });

    return () => {
      lenis.destroy();
    };
  }, [reduceMotion]);

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

  const { scrollY } = useScroll();
  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsRef,
    offset: ["start end", "end start"],
  });

  const cloudY = useSpring(
    useTransform(scrollY, [0, 700], reduceMotion ? [0, 0] : [0, 280]),
    parallaxSpring,
  );
  const cloudScale = useSpring(
    useTransform(scrollY, [0, 700], reduceMotion ? [1, 1] : [1, 1.1]),
    parallaxSpring,
  );
  const heroCopyY = useSpring(
    useTransform(scrollY, [0, 480], reduceMotion ? [0, 0] : [0, -100]),
    parallaxSpring,
  );
  const bridgeY = useSpring(
    useTransform(scrollY, [0, 480], reduceMotion ? [0, 0] : [0, -40]),
    parallaxSpring,
  );
  const stepsHeaderY = useSpring(
    useTransform(stepsProgress, [0, 1], reduceMotion ? [0, 0] : [90, -70]),
    parallaxSpring,
  );
  const stepsGridY = useSpring(
    useTransform(stepsProgress, [0, 1], reduceMotion ? [0, 0] : [150, -100]),
    parallaxSpring,
  );

  const openAuth = () => setAuthOpen(true);
  const closeAuth = () => setAuthOpen(false);

  const scrollToSteps = () => {
    stepsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main
      ref={pageRef}
      className="relative isolate min-h-svh overflow-x-hidden bg-[#0b1020] text-white"
    >
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0b1020]">
        <motion.div
          className="absolute inset-x-0 top-[-28%] h-[160%] w-full origin-center will-change-transform"
          style={{ y: cloudY, scale: cloudScale }}
        >
          <CloudShader
            className="absolute inset-0 h-full min-h-full w-full"
            speed={0.45}
            count={6}
            cloudColor="#d8e0ea"
            skyTopColor="#0b1020"
            skyBottomColor="#1a3354"
          />
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-[#0b1020]/88 via-[#0b1020]/45 to-[#0b1020]/25" />
        <div className="absolute inset-0 bg-linear-to-b from-[#0b1020]/35 via-transparent to-[#0b1020]/70" />
      </div>

      <header className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <Brand />
        <button
          type="button"
          onClick={openAuth}
          className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] font-medium tracking-[-0.01em] text-white/85 transition duration-300 hover:border-white/30 hover:bg-white/10"
        >
          {loginContent.nav.signIn}
        </button>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-4.5rem)] w-full max-w-6xl flex-col justify-center gap-12 px-6 pb-20 pt-6 sm:px-8 lg:flex-row lg:items-center lg:gap-14 lg:px-10">
        <motion.div
          style={{ y: heroCopyY }}
          className="relative flex max-w-xl flex-1 flex-col justify-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 rounded-[32px] bg-[#0b1020]/55 blur-2xl sm:-inset-x-10"
          />
          <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.22em] text-white/65">
            {loginContent.hero.eyebrow}
          </p>
          <h1 className="font-serif text-[2.75rem] leading-[0.96] tracking-[-0.045em] text-white drop-shadow-[0_2px_24px_rgba(11,16,32,0.65)] sm:text-5xl xl:text-[3.6rem]">
            {loginContent.hero.title}
          </h1>
          <p className="mt-5 max-w-md font-cursive text-[1.35rem] italic leading-snug tracking-[-0.02em] text-white/85 sm:text-[1.5rem]">
            {loginContent.hero.cursive}
          </p>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-white/70">
            {loginContent.hero.body}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={openAuth}
              className="group inline-flex h-12 items-center gap-3 rounded-full bg-white px-5 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5"
            >
              {loginContent.hero.primaryCta}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>
            <button
              type="button"
              onClick={scrollToSteps}
              className="inline-flex h-12 items-center rounded-full px-4 text-sm text-white/75 transition duration-300 hover:text-white"
            >
              {loginContent.hero.secondaryCta}
            </button>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/15 pt-6">
            {loginContent.hero.notes.map((note) => (
              <li key={note.label} className="min-w-28">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45">
                  {note.label}
                </p>
                <p className="mt-1 text-[13px] tracking-[-0.02em] text-white/85">
                  {note.value}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          style={{ y: bridgeY }}
          className="flex w-full flex-1 items-center justify-center lg:max-w-md"
        >
          <HeroShowcase />
        </motion.div>
      </section>

      <section
        ref={stepsRef}
        id="how-it-works"
        className="relative z-10 border-t border-white/8 px-5 py-24 sm:px-8 lg:px-12 xl:px-16"
      >
        <div className="mx-auto max-w-5xl">
          <motion.div style={{ y: stepsHeaderY }} className="mb-12 text-center">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
              {loginContent.steps.eyebrow}
            </p>
            <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
              {loginContent.steps.title}
            </h2>
            <p className="mx-auto mt-3 max-w-md font-cursive text-xl italic text-white/55">
              {loginContent.steps.cursive}
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
              {loginContent.steps.hint}
            </p>
          </motion.div>

          <motion.div
            style={{ y: stepsGridY }}
            className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3"
          >
            {loginContent.steps.items.map((step, index) => (
              <StepCard key={step.id} step={step} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-t border-white/8 px-6 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/35">
            {loginContent.close.eyebrow}
          </p>
          <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
            {loginContent.close.title}
          </h2>
          <p className="mt-4 font-cursive text-xl italic text-white/55">
            {loginContent.close.cursive}
          </p>
          <button
            type="button"
            onClick={openAuth}
            className="group mt-9 inline-flex h-12 items-center gap-3 rounded-full bg-white px-5 text-sm font-medium text-black transition duration-300 hover:-translate-y-0.5"
          >
            {loginContent.close.cta}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 transition-transform duration-300 group-hover:translate-x-0.5">
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>
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
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Dismiss sign in"
            className="absolute inset-0 bg-[#05070f]/70 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={
              reduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 36, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 24, scale: 0.98 }
            }
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-t-[28px] border border-white/12 bg-[#0b0d14]/95 p-7 shadow-[0_40px_100px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:rounded-[28px] sm:p-8"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/30 to-transparent" />

            <div className="mb-7 flex items-start justify-between gap-4">
              <Brand compact />
              <button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/50 transition hover:border-white/20 hover:text-white"
                aria-label={loginContent.auth.close}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              {loginContent.auth.eyebrow}
            </p>
            <h2
              id={titleId}
              className="font-serif text-[2.15rem] leading-[1.05] tracking-[-0.045em] sm:text-[2.4rem]"
            >
              {loginContent.auth.title}
              <br />
              <span className="font-cursive italic text-white/55">
                {loginContent.auth.titleAccent}
              </span>
            </h2>
            <p className="mt-4 text-sm leading-6 text-white/50">
              {loginContent.auth.body}
            </p>

            <button
              type="button"
              className="group mt-8 flex h-12 w-full items-center justify-between rounded-2xl bg-white px-4 text-sm font-medium text-black transition-transform duration-500 ease-out hover:-translate-y-0.5"
            >
              <span className="flex items-center gap-3">
                <GitHubIcon className="text-black" />
                {loginContent.auth.cta}
              </span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/5 transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </button>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] uppercase tracking-[0.16em] text-white/30">
                {loginContent.auth.divider}
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {loginContent.auth.chips.map((chip) => (
                <InfoChip
                  key={chip.label}
                  label={chip.label}
                  value={chip.value}
                />
              ))}
            </div>

            <p className="mt-6 text-[11px] leading-5 text-white/30">
              {loginContent.auth.privacy}
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HeroShowcase() {
  const slides = loginContent.hero.showcase;
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const slide = slides[index];
  const Scene = HERO_SCENES[slide.id];

  useEffect(() => {
    if (reduceMotion) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 3400);

    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length]);

  return (
    <div className="relative w-full max-w-104">
      <div className="relative overflow-hidden rounded-[28px] border border-white/20 bg-[#0b1020]/92 shadow-[0_28px_70px_rgba(0,0,0,0.5)] backdrop-blur-sm">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,224,234,0.12),transparent_55%)]" />

        <div className="relative px-6 pt-6 pb-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-mono text-[11px] text-white/50">{slide.number}</p>
            <div className="flex items-center gap-1.5">
              {slides.map((item, dotIndex) => (
                <button
                  key={item.id}
                  type="button"
                  aria-label={`Show ${item.title}`}
                  onClick={() => setIndex(dotIndex)}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    dotIndex === index
                      ? "w-5 bg-white/85"
                      : "w-1.5 bg-white/25 hover:bg-white/45"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-[#121a2c]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                className="absolute inset-0"
                initial={
                  reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 16, filter: "blur(4px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -12, filter: "blur(4px)" }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <Scene />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-4 border-t border-white/10 pt-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${slide.id}-copy`}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="font-serif text-2xl tracking-[-0.03em] text-white">
                  {slide.title}
                </h3>
                <p className="mt-2 font-cursive text-[1.05rem] italic leading-snug text-white/70">
                  {slide.caption}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {!reduceMotion ? (
          <motion.div
            key={`progress-${slide.id}`}
            className="h-0.5 origin-left bg-white/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 3.4, ease: "linear" }}
          />
        ) : (
          <div className="h-0.5 bg-white/20" />
        )}
      </div>
    </div>
  );
}

function StepCard({
  step,
  index,
}: {
  step: (typeof loginContent.steps.items)[number];
  index: number;
}) {
  const [active, setActive] = useState(false);
  const Illustration = ILLUSTRATIONS[step.id];
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="relative isolate flex h-full min-h-85 flex-col overflow-hidden rounded-[24px] border border-white/12 bg-[#101522]/92 p-5 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-white/25 hover:shadow-[0_28px_64px_rgba(0,0,0,0.42)]"
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -10,
              transition: { type: "spring", stiffness: 140, damping: 18 },
            }
      }
    >
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-white/25 to-transparent" />
      <div className="h-36 shrink-0">
        <Illustration
          active={active}
          hoverLabel={"hoverLabel" in step ? step.hoverLabel : undefined}
          hoverLabelIdle={
            "hoverLabelIdle" in step ? step.hoverLabelIdle : undefined
          }
          hoverLabelActive={
            "hoverLabelActive" in step ? step.hoverLabelActive : undefined
          }
        />
      </div>
      <div className="mt-1 flex flex-1 flex-col">
        <p className="font-mono text-[11px] text-white/35">{step.number}</p>
        <h3 className="mt-2 font-serif text-2xl tracking-[-0.03em]">
          {step.title}
        </h3>
        <p className="mt-2 text-sm leading-6 text-white/50">{step.description}</p>
        <div className="mt-auto min-h-13 pt-4">
          <motion.p
            className="text-[12px] leading-5 text-white/70"
            initial={false}
            animate={{ opacity: active ? 1 : 0, y: active ? 0 : 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {step.detail}
          </motion.p>
        </div>
      </div>
    </motion.article>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex items-center justify-center rounded-xl bg-white text-black ${
          compact ? "h-8 w-8" : "h-9 w-9"
        }`}
      >
        <span
          className={
            compact ? "text-xs font-semibold" : "text-sm font-semibold"
          }
        >
          C
        </span>
      </div>
      <span
        className={`font-semibold tracking-[-0.03em] ${
          compact ? "text-sm" : "text-[15px]"
        }`}
      >
        {loginContent.brand}
      </span>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-h-17 flex-col rounded-2xl border border-white/10 bg-black/25 px-3.5 py-3">
      <p className="text-[10px] uppercase tracking-[0.14em] text-white/35">
        {label}
      </p>
      <p className="mt-auto pt-1.5 text-[13px] font-medium tracking-[-0.02em] text-white/80">
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
