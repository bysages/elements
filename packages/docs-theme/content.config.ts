import { defineCollection, defineContentConfig } from "@nuxt/content";
import { useNuxt } from "@nuxt/kit";
import { joinURL } from "ufo";

import { docsFolderExists, landingPageExists } from "./utils/pages";

/** Collections resolve against the *consuming* site's content folder, so
 * sites never repeat this config — drop markdown in `content/` and go.
 * When the consumer registers `@nuxtjs/i18n`, every locale gets its own
 * collections over `content/<code>/…` instead of a single shared tree. */
const { options } = useNuxt();
const cwd = joinURL(options.rootDir, "content");

const hasDocsFolder = docsFolderExists(options.rootDir);

const locales = (options as { i18n?: { locales?: Array<string | { code: string }> } | undefined })
  .i18n?.locales;

const collections: Record<string, ReturnType<typeof defineCollection>> = {};

if (locales && Array.isArray(locales)) {
  for (const locale of locales) {
    const code = (typeof locale === "string" ? locale : locale.code).replace("-", "_");
    const hasLocaleDocs = docsFolderExists(options.rootDir, code);

    if (!landingPageExists(options.rootDir)) {
      collections[`landing_${code}`] = defineCollection({
        type: "page",
        source: {
          cwd,
          include: `${code}/index.md`,
        },
      });
    }

    collections[`docs_${code}`] = defineCollection({
      type: "page",
      source: {
        cwd,
        include: hasLocaleDocs ? `${code}/docs/**` : `${code}/**`,
        prefix: hasLocaleDocs ? `/${code}/docs` : `/${code}`,
        exclude: [`${code}/index.md`],
      },
    });
  }
} else {
  collections.docs = defineCollection({
    type: "page",
    source: {
      cwd,
      include: hasDocsFolder ? "docs/**" : "**",
      prefix: hasDocsFolder ? "/docs" : "/",
      // The landing owns index.md at `/` — never a stray /docs page.
      exclude: ["index.md"],
    },
  });

  // The landing page renders `content/index.md` at `/` — unless the
  // consumer owns that route with a custom `index.vue`.
  if (!landingPageExists(options.rootDir)) {
    collections.landing = defineCollection({
      type: "page",
      source: {
        cwd,
        include: "index.md",
      },
    });
  }
}

export default defineContentConfig({ collections });
