import { existsSync } from "node:fs";

import { joinURL } from "ufo";

/**
 * Checks if the consumer defines its own `app/pages/index.vue`. When true,
 * the layer stays out of the `/` route and defines no landing collection.
 */
export function landingPageExists(rootDir: string): boolean {
  return existsSync(joinURL(rootDir, "app", "pages", "index.vue"));
}

/**
 * Checks whether the consumer's content folder has a `docs/` subfolder.
 * When true, doc pages live under the `/docs` prefix; otherwise every
 * markdown file but `index.md` is a docs page. Under i18n, the check runs
 * per locale (`content/<code>/docs/`).
 */
export function docsFolderExists(rootDir: string, locale?: string): boolean {
  const docsPath = locale
    ? joinURL(rootDir, "content", locale, "docs")
    : joinURL(rootDir, "content", "docs");
  return existsSync(docsPath);
}
