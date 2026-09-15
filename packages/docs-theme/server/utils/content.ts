import type { H3Event } from "h3";
import { useRuntimeConfig } from "nitropack/runtime";

/** Locale codes the consumer registered under `@nuxtjs/i18n` — empty when
 * the site is single-language. */
export function getAvailableLocales(event: H3Event): string[] {
  const config = useRuntimeConfig(event) as {
    public?: { i18n?: { locales?: Array<string | { code: string }> } };
  };
  const locales = config.public?.i18n?.locales;
  return (locales ?? []).map((locale) => (typeof locale === "string" ? locale : locale.code));
}

/** Collection names to search for pages: the locale's own `docs_<code>`
 * when asked, every locale when not, and the single `docs` collection for
 * sites without i18n. Mirrors the per-locale split in content.config.ts. */
export function getCollectionsToQuery(locale: string | undefined, available: string[]): string[] {
  const name = (code: string) => `docs_${code.replace("-", "_")}`;

  if (locale && available.includes(locale)) return [name(locale)];
  return available.length > 0 ? available.map(name) : ["docs"];
}

/** Content's machine-generated navigation entries leak into page queries
 * as `.navigation` paths; agents must never see them. */
export function isNavigationPath(path: string): boolean {
  return path.endsWith(".navigation") || path.includes("/.navigation/");
}
