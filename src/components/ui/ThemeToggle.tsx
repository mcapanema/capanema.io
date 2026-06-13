"use client";

import { useEffect, useState } from "react";
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

export function ThemeToggle() {
  // null until mounted: server can't know the effective theme, so we render a
  // neutral placeholder first to avoid a hydration mismatch.
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(getStoredTheme() ?? getSystemTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore storage failures (private mode, etc.)
    }
    document.documentElement.dataset.theme = next;
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
