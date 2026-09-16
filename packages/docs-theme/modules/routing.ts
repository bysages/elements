import { createResolver, defineNuxtModule, extendPages } from "@nuxt/kit";

import { landingPageExists } from "../utils/pages";

type I18nOptions = { locales?: Array<string | { code: string }> };

/** Serve `content/index.md` through the landing template — unless the
 * consumer already owns that route with their own `index.vue`. Under i18n
 * each locale root (`/en`, `/zh`) gets its own entry, and `useDocsI18n`
 * joins the auto-imports. */
export default defineNuxtModule({
  meta: {
    name: "docs-theme-routing",
  },
  setup(_options, nuxt) {
    const { resolve } = createResolver(import.meta.url) as {
      resolve: (...path: string[]) => string;
    };

    const i18nOptions = (nuxt.options as typeof nuxt.options & { i18n?: I18nOptions }).i18n;
    const locales = (i18nOptions?.locales ?? []).map((entry) =>
      typeof entry === "string" ? entry : entry.code,
    );

    nuxt.hook("imports:extend", (imports) => {
      if (imports.some((entry) => entry.name === "useDocsI18n")) return;
      imports.push({
        name: "useDocsI18n",
        from: resolve("../app/composables/useDocsI18n"),
      });
    });

    if (!landingPageExists(nuxt.options.rootDir)) {
      extendPages((pages) => {
        const landingTemplate = resolve("../app/templates/landing.vue");

        // The i18n module folds the locale prefix onto every scanned page,
        // so a `/:lang?` landing here would grow into `/en/:lang?` and
        // swallow two-segment paths (`/en/guide` as lang=guide) ahead of
        // the docs catch-all. Static per-locale roots opt out of that
        // folding via `i18n: false`; `/` itself redirects to the default
        // locale through the i18n middleware and needs no route.
        if (locales.length) {
          for (const page of pages) {
            // The catch-all scores above a static path in vue-router once
            // `(.*)*` is involved, so left alone it would also take `/en`
            // from the landing route below. Requiring at least one slug
            // segment keeps the two match sets disjoint.
            if (page.path === "/:lang?/:slug(.*)*") page.path = "/:lang?/:slug(.*)+";
          }
          // The root stays addressable for the i18n path matcher; its own
          // middleware redirects `/` to the default locale in strategy
          // `prefix`.
          pages.push({
            name: "landing-index",
            path: "/",
            file: landingTemplate,
            meta: { i18n: false },
          });
          for (const locale of locales) {
            pages.push({
              name: `landing-${locale}`,
              path: `/${locale}`,
              file: landingTemplate,
              meta: { i18n: false },
            });
          }
          return;
        }

        pages.push({ name: "index", path: "/", file: landingTemplate });
      });
    }
  },
});
