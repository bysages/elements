import type { ComponentMessagesOverride, ThemeScene } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";

/** The four density tiers the token layer's `[data-density]` selectors
 * name — whitespace and control heights compress, readability never
 * does. */
export type ConfigDensity = "compact" | "default" | "comfortable" | "spacious";

/** The named scene registers the token layer's `[data-scene]` selectors
 * retune — "auto" is the engine's own resolution and stays off the
 * subtree vocabulary. */
export type ConfigScene = Exclude<ThemeScene, "auto">;

/** The configuration a provider lays over its subtree. Every field is
 * optional: an absent field changes nothing, and the page's own
 * attributes keep ruling. */
export interface ConfigContext {
  density?: ConfigDensity;
  scene?: ConfigScene;
  /** A mineral pigment theme (qinghua, celadon, zhusha, …) landing as
   * `[data-accent]` on the host element. */
  accent?: string;
  /** Writing direction, landing as the native `dir` attribute. */
  dir?: "ltr" | "rtl";
  /** BCP-47 locale, landing as the native `lang` attribute. */
  locale?: string;
  /** Partial leaf overrides for wrapper-owned runtime copy. */
  messages?: ComponentMessagesOverride;
}

const ConfigContextImpl = createContext<ConfigContext>({});

/** The nearest provider's snapshot, or an empty one when no provider
 * wraps the caller — the hook the date and format families will consume
 * to localize their output. */
export function useConfig(): ConfigContext {
  return useContext(ConfigContextImpl);
}

export interface ConfigProviderProps extends HTMLAttributes<HTMLDivElement> {
  density?: ConfigDensity;
  scene?: ConfigScene;
  accent?: string;
  dir?: "ltr" | "rtl";
  locale?: string;
  messages?: ComponentMessagesOverride;
  children?: ReactNode;
}

/**
 * The declarative host for global configuration: one element that both
 * carries the token layer's attributes — `[data-density]` and
 * `[data-accent]` fire on any element — and provides the same values to
 * descendants through `useConfig`, so interactive behavior (formatting,
 * messages) and visual theming stay one decision.
 */
export function ConfigProvider({
  density,
  scene,
  accent,
  dir,
  locale,
  messages,
  children,
  ...rest
}: ConfigProviderProps) {
  return (
    <ConfigContextImpl.Provider value={{ density, scene, accent, dir, locale, messages }}>
      <div
        {...rest}
        data-scope="config-provider"
        data-part="root"
        // Absent fields must not land on the element at all — the
        // token selectors fire on presence, and an empty attribute
        // would read as a value.
        {...(density != null ? { "data-density": density } : {})}
        {...(scene != null ? { "data-scene": scene } : {})}
        {...(accent != null ? { "data-accent": accent } : {})}
        {...(dir != null ? { dir } : {})}
        {...(locale != null ? { lang: locale } : {})}
      >
        {children}
      </div>
    </ConfigContextImpl.Provider>
  );
}
