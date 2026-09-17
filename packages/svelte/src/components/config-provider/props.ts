import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

import type { ConfigDensity } from "./context";

export interface ConfigProviderProps extends HTMLAttributes<HTMLDivElement> {
  density?: ConfigDensity;
  accent?: string;
  dir?: "ltr" | "rtl";
  /** BCP-47 locale, landing as the native `lang` attribute. */
  locale?: string;
  children?: Snippet;
}
