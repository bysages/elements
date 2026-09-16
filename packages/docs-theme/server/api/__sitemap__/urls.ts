import { queryCollection } from "@nuxt/content/server";

import { getAvailableLocales, getCollectionsToQuery, isNavigationPath } from "../../utils/content";

type Page = Record<string, unknown> & { path?: string; meta?: Record<string, unknown> };

/** Every content page, for `@nuxtjs/sitemap` — content collections are
 * invisible to the module's app-source scan. A page opting out with
 * `sitemap: false` in its frontmatter stays out. */
export default defineSitemapEventHandler(async (event) => {
  const availableLocales = getAvailableLocales(event);
  const collections = getCollectionsToQuery(undefined, availableLocales);

  if (availableLocales.length > 0) {
    for (const locale of availableLocales) {
      collections.push(`landing_${locale.replace("-", "_")}`);
    }
  } else {
    collections.push("landing");
  }

  const urls: Array<{ loc: string; lastmod?: string }> = [];

  for (const collection of collections) {
    // A consumer without a landing page has no such collection — skip.
    const pages = await (
      queryCollection as unknown as (
        event: unknown,
        collection: string,
      ) => {
        all: () => Promise<Page[]>;
      }
    )(event, collection)
      .all()
      .catch(() => [] as Page[]);

    for (const page of pages) {
      const meta = page.meta || {};
      const path = page.path || "/";

      if (meta.sitemap === false || isNavigationPath(path)) {
        continue;
      }

      urls.push({
        loc: path,
        // Date part only (YYYY-MM-DD).
        lastmod: typeof meta.modifiedAt === "string" ? meta.modifiedAt.split("T")[0] : undefined,
      });
    }
  }

  return urls;
});
