import type { ApplyThemeOptions } from "@bysages/core";

/** Options accepted through `nuxt.config` under the `bsElements` key. */
export interface BsElementsOptions {
  /** Prefix for the auto-imported components — "Bs" renders
   * `<BsButton>`. Empty by default. */
  prefix?: string;
  /** Theme applied on the client before the app mounts: mode, accent,
   * scene, density, contrast — anything `applyTheme` accepts. */
  theme?: ApplyThemeOptions;
}

declare const _default: import("@nuxt/kit").NuxtModule<BsElementsOptions>;
export default _default;
