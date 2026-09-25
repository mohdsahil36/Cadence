"use client";

import { useEffect, useSyncExternalStore } from "react";

const THEME_KEY = "nocta-theme";
const themeListeners = new Set<() => void>();

/** Dark mode between 5pm and 7am. */
export function isLocalEvening(date = new Date()) {
  const h = date.getHours();
  return h >= 17 || h < 7;
}

export function readDarkPreference(): boolean {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return isLocalEvening();
}

export function subscribeTheme(onStoreChange: () => void) {
  themeListeners.add(onStoreChange);
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  const tick = window.setInterval(onStoreChange, 60_000);
  return () => {
    themeListeners.delete(onStoreChange);
    mq.removeEventListener("change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
    window.clearInterval(tick);
  };
}

export function writeTheme(next: boolean) {
  window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
  document.documentElement.classList.toggle("dark", next);
  themeListeners.forEach((listener) => listener());
}

export function useIsDark() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    readDarkPreference,
    () => false,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    const color = dark ? "#0e1219" : "#e8eef5";
    document.documentElement.style.backgroundColor = color;
    document.body.style.backgroundColor = color;
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, [dark]);

  return dark;
}
