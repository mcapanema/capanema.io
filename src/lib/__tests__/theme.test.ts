import { describe, it, expect, beforeEach } from "vitest";
import {
  getStoredTheme,
  persistTheme,
  applyTheme,
  initThemeFromStorage,
  nextTheme,
} from "../theme";

beforeEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
});

// ---------------------------------------------------------------------------
// getStoredTheme
// ---------------------------------------------------------------------------

describe("getStoredTheme", () => {
  it("returns null when no theme is stored", () => {
    expect(getStoredTheme()).toBeNull();
  });

  it("returns 'dark' when 'dark' is stored", () => {
    localStorage.setItem("theme", "dark");
    expect(getStoredTheme()).toBe("dark");
  });

  it("returns 'light' when 'light' is stored", () => {
    localStorage.setItem("theme", "light");
    expect(getStoredTheme()).toBe("light");
  });

  it("returns null for an unrecognised value", () => {
    localStorage.setItem("theme", "system");
    expect(getStoredTheme()).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// persistTheme
// ---------------------------------------------------------------------------

describe("persistTheme", () => {
  it("writes 'dark' to localStorage", () => {
    persistTheme("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("writes 'light' to localStorage", () => {
    persistTheme("light");
    expect(localStorage.getItem("theme")).toBe("light");
  });

  it("round-trips with getStoredTheme", () => {
    persistTheme("dark");
    expect(getStoredTheme()).toBe("dark");
    persistTheme("light");
    expect(getStoredTheme()).toBe("light");
  });
});

// ---------------------------------------------------------------------------
// applyTheme
// ---------------------------------------------------------------------------

describe("applyTheme", () => {
  it("sets data-theme='dark' on <html>", () => {
    applyTheme("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("sets data-theme='light' on <html>", () => {
    applyTheme("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("removes data-theme when called with null (OS-follow mode)", () => {
    document.documentElement.dataset.theme = "dark";
    applyTheme(null);
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// nextTheme — toggle direction
// ---------------------------------------------------------------------------

describe("nextTheme", () => {
  it("returns 'light' when current is 'dark'", () => {
    expect(nextTheme("dark")).toBe("light");
  });

  it("returns 'dark' when current is 'light'", () => {
    expect(nextTheme("light")).toBe("dark");
  });
});

// ---------------------------------------------------------------------------
// initThemeFromStorage — page-load persistence
// ---------------------------------------------------------------------------

describe("initThemeFromStorage", () => {
  it("sets data-theme='dark' when 'dark' is stored", () => {
    localStorage.setItem("theme", "dark");
    initThemeFromStorage();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });

  it("sets data-theme='light' when 'light' is stored", () => {
    localStorage.setItem("theme", "light");
    initThemeFromStorage();
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("leaves data-theme unset when nothing is stored (OS-follow)", () => {
    initThemeFromStorage();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it("full persistence round-trip: persist → simulate reload → restore", () => {
    persistTheme("dark");
    delete document.documentElement.dataset.theme;
    initThemeFromStorage();
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});

// ---------------------------------------------------------------------------
// Toggle cycle
// ---------------------------------------------------------------------------

describe("toggle cycle", () => {
  it("dark → light: updates both localStorage and data-theme", () => {
    persistTheme("dark");
    applyTheme("dark");

    const next = nextTheme("dark");
    persistTheme(next);
    applyTheme(next);

    expect(getStoredTheme()).toBe("light");
    expect(document.documentElement.dataset.theme).toBe("light");
  });

  it("light → dark: updates both localStorage and data-theme", () => {
    persistTheme("light");
    applyTheme("light");

    const next = nextTheme("light");
    persistTheme(next);
    applyTheme(next);

    expect(getStoredTheme()).toBe("dark");
    expect(document.documentElement.dataset.theme).toBe("dark");
  });
});
