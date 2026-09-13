import { applyTheme } from "@bysages/core";

/** Applies the theme configured through module options on the client.
 * The components dress themselves — each wrapper injects its own
 * stylesheet as it is imported. Nuxt's auto-imports provide
 * `defineNuxtPlugin` and `useRuntimeConfig` here. */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const { theme } = useRuntimeConfig().public.bsElements as {
    theme: Parameters<typeof applyTheme>[0] | null;
  };
  if (theme) applyTheme(theme);
});
