import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext } from "react";

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

const ConfigContextImpl = createContext<ConfigContext>({});

/** The nearest provider's snapshot, or an empty one when no provider
 * wraps the caller — the hook the date and format families will consume
 * to localize their output. */
export function useConfig(): ConfigContext {
  return useContext(ConfigContextImpl);
}

export interface ConfigProviderProps extends HTMLAttributes<HTMLDivElement> {
  density?: ConfigDensity;
  accent?: string;
  dir?: "ltr" | "rtl";
  locale?: string;
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
  accent,
  dir,
  locale,
  children,
  ...rest
}: ConfigProviderProps) {
  return (
    <ConfigContextImpl.Provider value={{ density, accent, dir, locale }}>
      <div
        {...rest}
        data-scope="config-provider"
        data-part="root"
        // Absent fields must not land on the element at all — the
        // token selectors fire on presence, and an empty attribute
        // would read as a value.
        {...(density != null ? { "data-density": density } : {})}
        {...(accent != null ? { "data-accent": accent } : {})}
        {...(dir != null ? { dir } : {})}
        {...(locale != null ? { lang: locale } : {})}
      >
        {children}
      </div>
    </ConfigContextImpl.Provider>
  );
}
