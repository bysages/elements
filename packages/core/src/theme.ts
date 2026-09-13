/**
 * Theme engine — the runtime half of the token system. Tokens declare how
 * themes look (`@layer bs.tokens`); this module drives which theme is active
 * via data attributes on the root element: `data-theme`, `data-contrast`,
 * `data-density`, `data-scene`, and `data-accent`.
 *
 * @module
 */

export type ThemeMode = "light" | "dark" | "system";
export type ThemeContrast = "normal" | "high";
export type ThemeDensity = "compact" | "default" | "comfortable" | "spacious";
export type ThemeScene = "auto" | "civic" | "enterprise" | "studio" | "tech";
export type ThemeAccent = "auto" | "ink" | "qinghua" | "celadon" | "zhusha";

export interface Theme {
  mode: ThemeMode;
  contrast: ThemeContrast;
  density: ThemeDensity;
  scene: ThemeScene;
  accent: ThemeAccent;
}

/** Each scene pairs with a default accent — the pigment that carries its
 * context (civic identity is zhusha, never an error color; tech stays
 * ink). "auto" accent resolves through this table; explicit accents win. */
export const SCENE_DEFAULT_ACCENT: Record<Exclude<ThemeScene, "auto">, ThemeAccent> = {
  civic: "zhusha",
  enterprise: "qinghua",
  studio: "celadon",
  tech: "ink",
};

export interface ApplyThemeOptions extends Partial<Theme> {
  /** Persist the theme to localStorage so `initTheme` can restore it. Defaults to true. */
  persist?: boolean;
}

const STORAGE_KEY = "bs-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

const defaults: Theme = {
  mode: "system",
  contrast: "normal",
  density: "default",
  scene: "auto",
  accent: "auto",
};

function prefersDark(): boolean {
  return typeof matchMedia === "function" && matchMedia(DARK_QUERY).matches;
}

function resolvedMode(mode: ThemeMode): "light" | "dark" {
  return mode === "system" ? (prefersDark() ? "dark" : "light") : mode;
}

/** An "auto" accent follows the scene's paired pigment; "ink" is the
 * absence of an accent attribute — the default solemn primary. */
function resolvedAccent(accent: ThemeAccent, scene: ThemeScene): ThemeAccent | undefined {
  if (accent !== "auto") return accent === "ink" ? undefined : accent;
  if (scene === "auto") return undefined;
  const paired = SCENE_DEFAULT_ACCENT[scene];
  return paired === "ink" ? undefined : paired;
}

/** The logical theme, kept in memory because the DOM cannot represent
 * "auto": the resolved `data-accent` pigment it drives would read back as
 * an explicit choice and survive a scene change that should re-pair it. */
let current: Theme | undefined;

function readTheme(): Theme {
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
      scene: (root.dataset.scene as ThemeScene) ?? defaults.scene,
      accent: (root.dataset.accent as ThemeAccent) ?? defaults.accent,
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
 * Apply a theme to the document root. Omitted fields keep the current value;
 * `mode: "system"` resolves against `prefers-color-scheme`, and an "auto"
 * accent resolves against the active scene.
 */
export function applyTheme(options: ApplyThemeOptions = {}): Theme {
  const theme: Theme = { ...(current ?? readTheme()), ...options };
  current = theme;

  if (typeof document !== "undefined") {
    const root = document.documentElement;
    root.dataset.theme = resolvedMode(theme.mode);
    root.dataset.contrast = theme.contrast;
    root.dataset.density = theme.density;

    if (theme.scene === "auto") {
      delete root.dataset.scene;
    } else {
      root.dataset.scene = theme.scene;
    }

    const accent = resolvedAccent(theme.accent, theme.scene);
    if (accent) {
      root.dataset.accent = accent;
    } else {
      delete root.dataset.accent;
    }
  }

  if (options.persist !== false && typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }

  return theme;
}

/** Read the active theme (in-memory state first, then root attributes,
 * then storage). */
export function getTheme(): Theme {
  return current ? { ...current } : readTheme();
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
