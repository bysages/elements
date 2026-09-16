import { defineNuxtPlugin, useRuntimeConfig } from "#imports";
import { applyTheme } from "@bysages/core";

/** Applies the theme configured through module options on the client.
 * The wrappers' own injection already stands down against the build-time
 * stylesheet via the head marker the module plants. Published modules
 * cannot lean on the application's auto-imports — the Nuxt APIs come
 * in explicitly from `#imports`, which the consuming build resolves. */
export default defineNuxtPlugin(() => {
  if (import.meta.server) return;

  const { theme } = useRuntimeConfig().public.bsElements as {
    theme: Parameters<typeof applyTheme>[0] | null;
  };
  if (theme) applyTheme(theme);
});
