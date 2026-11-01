import { applyTheme, hasStoredTheme, initTheme } from "@bysages/core";

import { defineNuxtPlugin, useRuntimeConfig } from "#imports";

/** Applies the configured default theme, but never outranks an explicit
 * persisted choice. A stored theme is restored before mount instead; the
 * module's early head script already prevents the first-paint flash. */
export default defineNuxtPlugin(() => {
  // Module sources are checked outside a generated Nuxt app, where the
  // environment flag is Nuxt's own injected extension rather than TS DOM metadata.
  if ((import.meta as { server?: boolean }).server) return;

  const { theme } = useRuntimeConfig().public.bsElements as {
    theme: Parameters<typeof applyTheme>[0] | null;
  };
  if (hasStoredTheme()) {
    initTheme();
  } else if (theme) {
    applyTheme(theme);
  }
});
