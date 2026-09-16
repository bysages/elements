import { createResolver, defineNuxtModule } from "@nuxt/kit";

const MESSAGES: Record<string, string> = { en: "en.json", zh: "zh.json" };

const { resolve } = createResolver(import.meta.url);

/** The theme speaks its own UI vocabulary (`docs.*`, `common.*`). A
 * site that registers `@nuxtjs/i18n` with its own locale files would
 * otherwise lose every theme key — layer locale files only load when
 * the layer declares them. Rather than force an `i18n` config onto
 * every consumer, this module hands the theme's files to the i18n
 * module through its authoring hook: per locale, the site's files
 * load after ours, so site keys win and the theme's remain the
 * fallback beneath them. */
export default defineNuxtModule({
  meta: { name: "@bysages/docs-theme/messages" },
  setup(_, nuxt) {
    const declared = (
      nuxt.options.i18n as { locales?: Array<string | { code: string; name?: string }> } | undefined
    )?.locales;

    /* `sitemap.md` groups pages by locale section; the section heading
       reads the locale's display name ("## 中文", not "## zh"). This
       module runs before the agent-discovery module reads its options,
       and site-provided labels keep precedence. */
    type Discovery = {
      sitemap?: { markdown?: { labels?: Record<string, string> } };
    };
    const options = nuxt.options as { agentDiscovery?: Discovery };
    const labels = Object.fromEntries(
      (declared ?? [])
        .map((entry) => (typeof entry === "string" ? { code: entry, name: entry } : entry))
        .filter((entry) => entry.name)
        .map((entry) => [entry.code, entry.name as string]),
    );
    options.agentDiscovery = {
      ...options.agentDiscovery,
      sitemap: {
        ...options.agentDiscovery?.sitemap,
        markdown: {
          ...options.agentDiscovery?.sitemap?.markdown,
          labels: { ...labels, ...options.agentDiscovery?.sitemap?.markdown?.labels },
        },
      },
    };

    nuxt.hook("i18n:registerModule", (register) => {
      const codes = (declared ?? []).map((entry) =>
        typeof entry === "string" ? entry : entry.code,
      );
      /* Only back the languages the site actually speaks; with no
         declaration there is nothing to merge into. */
      const locales = codes
        .filter((code) => code in MESSAGES)
        .map((code) => ({ code, file: MESSAGES[code] }));
      if (!locales.length) return;
      register({ langDir: resolve("../i18n/locales"), locales });
    });
  },
});
