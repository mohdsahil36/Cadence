"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Lenis from "lenis";
import { Moon, Sun } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "motion/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  BENTO_THEME,
  BentoVisual,
  type BentoId,
} from "@/components/illustrations/bento-visuals";
import { PixelScenery } from "@/components/illustrations/pixel-scenery";
import { loginContent } from "./content";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
  },
};

const SHELL = "mx-auto w-full max-w-xl px-4 sm:max-w-2xl sm:px-6";

const THEME_KEY = "nocta-theme";
const themeListeners = new Set<() => void>();

/** Local evening window: 5pm → 7am. */
function isLocalEvening(date = new Date()) {
  const h = date.getHours();
  return h >= 17 || h < 7;
}

function readDarkPreference(): boolean {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  // auto / unset → follow local clock
  return isLocalEvening();
}

function subscribeTheme(onStoreChange: () => void) {
  themeListeners.add(onStoreChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  // Re-check when the clock crosses the evening boundary (every minute)
  const tick = window.setInterval(onStoreChange, 60_000);
  return () => {
    themeListeners.delete(onStoreChange);
    mq.removeEventListener("change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    window.clearInterval(tick);
  };
}

function writeTheme(next: boolean) {
  window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  document.documentElement.classList.toggle("dark", next);
  themeListeners.forEach((listener) => listener());
}

function useIsDark() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    readDarkPreference,
    () => false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.body.style.backgroundColor = dark ? "#14131a" : "#f3eee6";
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [dark]);

  return dark;
}

export default function LoginPage() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const dark = useIsDark();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (reduceMotion) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1,
      syncTouch: false,
    });
    lenisRef.current = lenis;

    const onScroll = (instance: Lenis) => {
      const next = instance.scroll > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    lenis.on("scroll", onScroll);

    let raf = 0;
    const frame = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!reduceMotion) return;
    const onScroll = () => {
      const next = window.scrollY > 24;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduceMotion]);

  const toggleTheme = () => writeTheme(!dark);

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(el, { offset: -88, duration: 1.2 });
      return;
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openAuth = () => setAuthOpen(true);

  return (
    <div className="relative isolate min-h-svh w-full bg-[#f3eee6] text-foreground dark:bg-[#14131a]">
      <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <motion.div
          layout
          transition={{ duration: 0.35, ease: easeOut }}
          className={[
            "flex w-full items-center justify-between gap-3 rounded-full border shadow-md backdrop-blur-2xl backdrop-saturate-150 transition-[max-width,padding,background-color,border-color,color] duration-300 ease-out",
            // Over hero: light glass + white type. Over content: theme glass + readable type.
            scrolled
              ? "max-w-3xl border-border/50 bg-background/80 py-3 pr-3 pl-5 text-foreground sm:max-w-4xl sm:py-3.5 sm:pr-3.5 sm:pl-6 dark:border-white/12 dark:bg-background/75"
              : "max-w-2xl border-white/30 bg-white/25 py-3 pr-3 pl-5 text-white sm:max-w-3xl sm:py-3.5 dark:border-white/15 dark:bg-white/10",
          ].join(" ")}
        >
          <a
            href="#top"
            className={[
              "cursor-pointer font-serif text-lg tracking-[-0.03em] transition-colors duration-300 sm:text-xl",
              scrolled ? "text-foreground" : "text-white",
            ].join(" ")}
          >
            {loginContent.brand}
          </a>
          <nav className="flex items-center gap-0.5 sm:gap-1.5">
            <Button
              variant="ghost"
              size="default"
              className={[
                "hidden cursor-pointer sm:inline-flex",
                scrolled
                  ? "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                  : "text-white/85 hover:bg-white/15 hover:text-white",
              ].join(" ")}
              onClick={() => scrollToId("how-it-works")}
            >
              {loginContent.nav.howItWorks}
            </Button>
            <Button
              variant="ghost"
              size="default"
              className={[
                "hidden cursor-pointer md:inline-flex",
                scrolled
                  ? "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                  : "text-white/85 hover:bg-white/15 hover:text-white",
              ].join(" ")}
              onClick={() => scrollToId("close")}
            >
              {loginContent.nav.about}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={[
                "cursor-pointer",
                scrolled
                  ? "text-foreground hover:bg-foreground/5 hover:text-foreground"
                  : "text-white hover:bg-white/15 hover:text-white",
              ].join(" ")}
              onClick={toggleTheme}
              aria-label={
                dark ? "Switch to daytime look" : "Switch to evening look"
              }
              title={dark ? "Daytime (override)" : "Evening (override)"}
            >
              {dark ? <Sun /> : <Moon />}
            </Button>
            <Button
              size="default"
              className={[
                "cursor-pointer rounded-full px-4 sm:px-5",
                scrolled
                  ? ""
                  : "bg-white text-zinc-900 hover:bg-white/90",
              ].join(" ")}
              onClick={openAuth}
            >
              {loginContent.nav.cta}
            </Button>
          </nav>
        </motion.div>
      </header>

      <main className="relative z-10 w-full">
        <section
          id="top"
          className="relative flex min-h-svh w-full items-center justify-center overflow-hidden"
        >
          <PixelScenery className="inset-0" />

          <motion.div
            className="relative z-10 flex w-full flex-col items-center px-4 pt-28 pb-16"
            variants={stagger}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
          >
            <div className={`${SHELL} flex flex-col items-center text-center`}>
              {/* 1. Brand + title as one line */}
              <motion.h1
                variants={fadeUp}
                className="font-serif text-4xl leading-tight tracking-[-0.04em] text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl"
              >
                <span className="whitespace-nowrap">{loginContent.hero.wordmark}</span>
                <span className="mx-2 font-normal text-white/45 sm:mx-3">—</span>
                <span className="text-white/90">{loginContent.hero.title}</span>
              </motion.h1>

              {/* 2. Tagline */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-4 max-w-md text-base font-medium leading-snug text-white/95 drop-shadow-[0_1px_10px_rgba(0,0,0,0.4)] sm:mt-5 sm:max-w-lg sm:text-lg"
              >
                {loginContent.hero.tagline}
              </motion.p>

              {/* 3. Dynamic line */}
              <motion.div
                variants={fadeUp}
                className="mx-auto mt-3 w-full max-w-lg"
              >
                <DynamicLine lines={loginContent.hero.rotating} />
              </motion.div>

              {/* 4. Description */}
              <motion.p
                variants={fadeUp}
                className="mx-auto mt-3 max-w-sm text-sm leading-6 text-white/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)] sm:max-w-md sm:text-[0.95rem]"
              >
                {loginContent.hero.body}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-9"
              >
                <Button
                  size="lg"
                  className="h-12 min-w-40 cursor-pointer rounded-full bg-white px-7 text-sm font-semibold text-zinc-900 shadow-[0_8px_28px_rgba(0,0,0,0.28)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-white hover:shadow-[0_10px_32px_rgba(0,0,0,0.35)] hover:brightness-105 active:scale-[0.98]"
                  onClick={openAuth}
                >
                  {loginContent.hero.primaryCta}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 min-w-40 cursor-pointer rounded-full border-white/50 bg-white/10 px-7 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.18)] backdrop-blur-md transition-[transform,background-color,border-color] duration-200 hover:border-white/70 hover:bg-white/20 hover:text-white active:scale-[0.98]"
                  onClick={() => scrollToId("how-it-works")}
                >
                  {loginContent.hero.secondaryCta}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <WhyBuiltSection />

        <motion.section
          id="how-it-works"
          className="relative z-10 bg-[#f3eee6] py-16 sm:py-24 dark:bg-[#14131a]"
          variants={sectionReveal}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:max-w-7xl">
            <motion.h2
              className="text-center font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl"
              variants={fadeUp}
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true }}
            >
              {loginContent.features.title}
            </motion.h2>
            <motion.div
              className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]"
              variants={stagger}
              initial={reduceMotion ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {loginContent.features.items.map((feature, index) => (
                <FeatureCell
                  key={feature.id}
                  feature={feature}
                  index={index}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="close"
          className="relative z-10 bg-[#f3eee6] py-20 sm:py-28 dark:bg-[#14131a]"
          variants={sectionReveal}
          initial={reduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className={`${SHELL} text-center`}>
            <motion.h2
              variants={fadeUp}
              className="font-serif text-3xl tracking-[-0.03em] text-foreground sm:text-4xl"
            >
              {loginContent.close.title}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-5 max-w-md text-base leading-7 text-muted-foreground"
            >
              {loginContent.close.body}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button
                size="lg"
                className="mt-9 h-11 min-w-36 cursor-pointer rounded-full px-6"
                onClick={openAuth}
              >
                {loginContent.close.cta}
              </Button>
            </motion.div>
            <motion.p
              variants={fadeUp}
              className="mt-7 text-xs text-muted-foreground/80"
            >
              {loginContent.close.trust}
            </motion.p>
          </div>
        </motion.section>
      </main>

      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="gap-5 p-6 sm:max-w-md">
          <DialogHeader>
            <p className="font-serif text-lg tracking-[-0.02em] text-foreground">
              {loginContent.brand}
            </p>
            <DialogTitle className="font-serif text-2xl font-normal tracking-[-0.03em]">
              {loginContent.auth.title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6">
              {loginContent.auth.body}
            </DialogDescription>
          </DialogHeader>
          {/* deferred to v2: real auth + session */}
          <DialogClose render={<Button className="w-full cursor-pointer" size="lg" />}>
            {loginContent.auth.cta}
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function WhyBuiltSection() {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Light up while the block is still clearly on screen
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
      className="relative z-10 bg-[#f3eee6] px-4 py-16 sm:px-6 sm:py-20 dark:bg-[#14131a]"
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

function DynamicLine({ lines }: { lines: readonly string[] }) {
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

function FeatureCell({
  feature,
  index,
}: {
  feature: (typeof loginContent.features.items)[number];
  index: number;
}) {
  const theme = BENTO_THEME[feature.id as BentoId] ?? BENTO_THEME.scoring;
  const isWide = feature.span === "two-thirds";
  const span = isWide ? "lg:col-span-2" : "lg:col-span-1";

  return (
    <motion.div className={span} variants={fadeUp} custom={index}>
      <Card
        className={`group flex h-full min-h-64 cursor-default flex-col gap-0 overflow-hidden rounded-3xl border-0 py-0 shadow-none ring-0 transition-shadow duration-150 ease-out hover:shadow-md sm:min-h-72 ${theme.card}`}
      >
        {isWide ? (
          <div className="flex h-full min-h-72 flex-col gap-4 p-6 sm:flex-row sm:items-stretch sm:gap-6 sm:p-8">
            <div className="flex w-full shrink-0 flex-col justify-center gap-2.5 sm:w-[34%] sm:max-w-xs">
              <h3
                className={`text-xl font-semibold tracking-tight sm:text-2xl ${theme.title}`}
              >
                {feature.title}
              </h3>
              <p className={`text-sm leading-6 ${theme.muted}`}>
                {feature.description}
              </p>
            </div>
            <div className="min-h-48 flex-1 sm:min-h-0">
              <BentoVisual id={feature.id} wide />
            </div>
          </div>
        ) : (
          <div className="flex h-full flex-col p-6 sm:p-7">
            <div className="mb-4 min-h-32 flex-1 sm:min-h-36">
              <BentoVisual id={feature.id} />
            </div>
            <h3
              className={`text-lg font-semibold tracking-tight sm:text-xl ${theme.title}`}
            >
              {feature.title}
            </h3>
            <p className={`mt-2 text-sm leading-6 ${theme.muted}`}>
              {feature.description}
            </p>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
