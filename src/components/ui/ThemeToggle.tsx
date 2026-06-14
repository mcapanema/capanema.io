"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "./IconButton";
import {
  type Theme,
  getStoredTheme,
  persistTheme,
  applyTheme,
  nextTheme,
} from "../../lib/theme";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    media.removeEventListener("change", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

function getServerSnapshot(): null {
  return null;
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyTheme(getStoredTheme());
  }, [theme]);

  function toggle() {
    if (theme === null) return;
    const next = nextTheme(theme);
    persistTheme(next);
    applyTheme(next);
    notify();
  }

  const isDark = theme === "dark";
  const label =
    theme === null
      ? "Toggle theme"
      : isDark
        ? "Switch to light theme"
        : "Switch to dark theme";

  return (
    <IconButton label={label} onClick={toggle} disabled={theme === null}>
      {theme === null ? (
        <span aria-hidden className="block h-[18px] w-[18px]" />
      ) : isDark ? (
        <Sun aria-hidden size={18} />
      ) : (
        <Moon aria-hidden size={18} />
      )}
    </IconButton>
  );
}
