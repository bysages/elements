import { getContext, setContext } from "svelte";

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

export const CONFIG_KEY: unique symbol = Symbol("bysages-config");

export function provideConfig(context: ConfigContext): ConfigContext {
  setContext(CONFIG_KEY, context);
  return context;
}

/** The nearest provider's live snapshot, or an empty one when no
 * provider wraps the caller. */
export function useConfig(): ConfigContext {
  return getContext<ConfigContext | null>(CONFIG_KEY) ?? {};
}
