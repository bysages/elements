/// <reference types="vite/client" />
import {
  addRouteMiddleware,
  defineNuxtPlugin,
  navigateTo,
  useAppConfig,
  useCookie,
} from "nuxt/app";

/** Without `@nuxtjs/i18n` the theme still needs its UI strings: load the
 * configured locale file (default `en`) eagerly and provide it as the
 * fallback source `useDocsI18n` reads. With the module registered, it
 * provides `$i18n` and this plugin stays out of the way. Locale files are
 * lazy-globbed so only the active one lands in the bundle. */
const localeFiles = import.meta.glob<{ default: Record<string, unknown> }>(
  "../../i18n/locales/*.json",
);

export default defineNuxtPlugin(async (nuxtApp) => {
  if (nuxtApp.$config.public.i18n) {
    // Every collection is prefixed per locale, so the bare `/` belongs to
    // no language — send the reader to the one they chose last, or the
    // site's configured default.
    addRouteMiddleware((to) => {
      if (to.path === "/") {
        const locale =
          useCookie("i18n_redirected").value ||
          (
            nuxtApp.$config.public.i18n as { defaultLocale?: string } | undefined
          )?.defaultLocale ||
          "en";
        return navigateTo(`/${locale}`);
      }
    });
    return;
  }

  const appConfig = useAppConfig() as { docs?: { locale?: string } };
  let locale = appConfig.docs?.locale || "en";

  const loader =
    localeFiles[`../../i18n/locales/${locale}.json`] ??
    ((locale = "en"), localeFiles["../../i18n/locales/en.json"]);

  nuxtApp.provide("docsLocale", locale);
  nuxtApp.provide("docsMessages", (await loader?.())?.default ?? {});
});
