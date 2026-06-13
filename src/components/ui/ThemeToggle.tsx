"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { IconButton } from "./IconButton";

type Theme = "light" | "dark";

// Persisted explicit choice, or null when the visitor is following the OS.
function getStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/* The effective theme is an external store: the persisted choice if any, else
   the OS preference. useSyncExternalStore keeps the UI in sync with it without
   a setState-in-effect, and returns null on the server / first hydration render
   so we paint a neutral placeholder and avoid a mismatch. */
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  // OS change (while following the OS) and changes from other tabs.
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

  // Keep the <html data-theme> attribute in sync with the *stored* choice so a
  // change from another tab (storage event) updates the page colors, not just
  // this icon. Sync from the stored value, never the effective theme: when the
  // visitor is following the OS there is no stored value, so we remove the
  // attribute and let `color-scheme: light dark` keep tracking the OS.
  useEffect(() => {
    const stored = getStoredTheme();
    if (stored) {
      document.documentElement.dataset.theme = stored;
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [theme]);

  function toggle() {
    if (theme === null) return;
    const next: Theme = theme === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    document.documentElement.dataset.theme = next;
    // setItem doesn't fire a storage event in the same tab, so notify directly.
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
