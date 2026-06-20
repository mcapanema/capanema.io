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
import { cn } from "@/lib/cn";

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
    <>
      <style>{`
        .theme-toggle-icon-wrapper {
          position: relative;
          width: 18px;
          height: 18px;
          display: block;
        }
        .theme-toggle-icon {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition:
            opacity var(--duration-base) var(--ease-standard),
            transform var(--duration-base) var(--ease-standard);
        }
        /* Moon: rests vertical (-90deg), exits to -135deg */
        .theme-toggle-icon-wrapper > span:first-child.is-out {
          opacity: 0;
          transform: rotate(-135deg);
        }
        .theme-toggle-icon-wrapper > span:first-child.is-in {
          opacity: 1;
          transform: rotate(-90deg);
        }
        /* Sun: rests horizontal (0deg), exits to +135deg */
        .theme-toggle-icon-wrapper > span:last-child.is-out {
          opacity: 0;
          transform: rotate(135deg);
        }
        .theme-toggle-icon-wrapper > span:last-child.is-in {
          opacity: 1;
          transform: rotate(0deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .theme-toggle-icon {
            transition: opacity var(--duration-fast) var(--ease-standard);
          }
          .theme-toggle-icon-wrapper > span:first-child,
          .theme-toggle-icon-wrapper > span:last-child {
            transform: none;
          }
        }
      `}</style>
      <IconButton label={label} onClick={toggle} disabled={theme === null}>
        {theme === null ? (
          <span aria-hidden className="block h-[18px] w-[18px]" />
        ) : (
          <span className="theme-toggle-icon-wrapper" aria-hidden="true">
            <span className={cn("theme-toggle-icon", !isDark ? "is-out" : "is-in")}>
              <Moon size={18} />
            </span>
            <span className={cn("theme-toggle-icon", isDark ? "is-out" : "is-in")}>
              <Sun size={18} />
            </span>
          </span>
        )}
      </IconButton>
    </>
  );
}
