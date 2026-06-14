export type Theme = "light" | "dark";

export function getStoredTheme(): Theme | null {
  try {
    const t = localStorage.getItem("theme");
    return t === "light" || t === "dark" ? t : null;
  } catch {
    return null;
  }
}

export function persistTheme(theme: Theme): void {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    // ignore storage failures (private mode, etc.)
  }
}

export function applyTheme(theme: Theme | null): void {
  if (theme) {
    document.documentElement.dataset.theme = theme;
  } else {
    delete document.documentElement.dataset.theme;
  }
}

export function initThemeFromStorage(): void {
  applyTheme(getStoredTheme());
}

export function nextTheme(current: Theme): Theme {
  return current === "dark" ? "light" : "dark";
}
