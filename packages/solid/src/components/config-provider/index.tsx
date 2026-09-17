import { createContext, useContext, splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** The four density tiers the token layer's `[data-density]` selectors
 * name — whitespace and control heights compress, readability never
 * does. */
export type ConfigDensity = "compact" | "default" | "comfortable" | "spacious";

/** The configuration a provider lays over its subtree. Every field is
 * optional: an absent field changes nothing, and the page's own
 * attributes keep ruling. */
export interface ConfigContext {
  density?: ConfigDensity;
  /** A mineral pigment theme (qinghua, celadon, zhusha, …) landing as
   * `[data-accent]` on the host element. */
  accent?: string;
  /** Writing direction, landing as the native `dir` attribute. */
  dir?: "ltr" | "rtl";
  /** BCP-47 locale, landing as the native `lang` attribute. */
  locale?: string;
}

/** Solid context for the provider's snapshot — a custom part reads it
 * with `useContext(ConfigContextKey)`. */
export const ConfigContextKey = createContext<() => ConfigContext>(() => ({}));

/** The nearest provider's snapshot, or an empty one when no provider
 * wraps the caller — the hook the date and format families will consume
 * to localize their output. */
export function useConfig(): () => ConfigContext {
  return useContext(ConfigContextKey);
}

export interface ConfigProviderProps extends JSX.HTMLAttributes<HTMLDivElement> {
  density?: ConfigDensity;
  accent?: string;
  dir?: "ltr" | "rtl";
  locale?: string;
}

/**
 * The declarative host for global configuration: one element that both
 * carries the token layer's attributes — `[data-density]` and
 * `[data-accent]` fire on any element — and provides the same values to
 * descendants through `useConfig`, so interactive behavior (formatting,
 * messages) and visual theming stay one decision.
 */
export function ConfigProvider(props: ConfigProviderProps) {
  const [own, rest] = splitProps(props, ["density", "accent", "dir", "locale", "children"]);
  return (
    <ConfigContextKey.Provider
      value={() => ({
        density: own.density,
        accent: own.accent,
        dir: own.dir,
        locale: own.locale,
      })}
    >
      <div
        {...rest}
        data-scope="config-provider"
        data-part="root"
        // Absent fields must not land on the element at all — the token
        // selectors fire on presence, and an empty attribute would read
        // as a value. Solid drops an attribute set to undefined.
        data-density={own.density}
        data-accent={own.accent}
        dir={own.dir}
        lang={own.locale}
      >
        {own.children}
      </div>
    </ConfigContextKey.Provider>
  );
}
