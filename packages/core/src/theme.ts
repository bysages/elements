/**
 * Theme engine — the runtime half of the token system. Tokens declare how
 * themes look (`@layer bs.tokens`); this module drives which theme is active
 * via three data attributes on the root element: `data-theme`,
 * `data-contrast`, and `data-density`.
 *
 * @module
 */

export type ThemeMode = "light" | "dark" | "system";
export type ThemeContrast = "normal" | "high";
export type ThemeDensity = "compact" | "default" | "comfortable" | "spacious";

export interface Theme {
  mode: ThemeMode;
  contrast: ThemeContrast;
  density: ThemeDensity;
}

export interface ApplyThemeOptions extends Partial<Theme> {
  /** Persist the theme to localStorage so `initTheme` can restore it. Defaults to true. */
  persist?: boolean;
}

const STORAGE_KEY = "bs-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const defaults: Theme = { mode: "system", contrast: "normal", density: "default" };

function prefersDark(): boolean {
  return typeof matchMedia === "function" && matchMedia(DARK_QUERY).matches;
}

function resolvedMode(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? (prefersDark() ? "dark" : "light") : mode;
}

/**
 * Apply a theme to the document root. Omitted fields keep the current value;
 * `mode: "system"` resolves against `prefers-color-scheme`.
 */
export function applyTheme(options: ApplyThemeOptions = {}): Theme {
  const theme: Theme = { ...getTheme(), ...options };

  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.dataset.theme = resolvedMode(theme.mode);
    root.dataset.contrast = theme.contrast;
    root.dataset.density = theme.density;
  }

  if (options.persist !== false && typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }

  return theme;
}

/** Read the active theme (root attributes first, storage as fallback). */
export function getTheme(): Theme {
  const root = typeof document === "undefined" ? undefined : document.documentElement;

  if (root?.dataset.theme) {
    return {
      mode:
        root.dataset.theme === "dark"
          ? "dark"
          : root.dataset.theme === "light"
            ? "light"
            : "system",
      contrast: root.dataset.contrast === "high" ? "high" : "normal",
      density: (root.dataset.density as ThemeDensity) ?? defaults.density,
    };
  }

  if (typeof localStorage !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return { ...defaults, ...JSON.parse(stored) };
    } catch {
      // Corrupted storage falls through to defaults.
    }
  }

  return { ...defaults };
}

/**
 * Restore the persisted theme and keep `mode: "system"` in sync with the OS
 * while it is active. Safe to call more than once; SSR is a no-op.
 */
export function initTheme(): void {
  if (typeof document === "undefined") return;

  applyTheme(getTheme());

  if (typeof matchMedia === "function") {
    matchMedia(DARK_QUERY).addEventListener("change", () => {
      if (getTheme().mode === "system") applyTheme({ persist: false });
    });
  }
}
