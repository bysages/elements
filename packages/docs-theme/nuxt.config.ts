import { createResolver, useNuxt } from "@nuxt/kit";
import type { NitroOptions } from "nitropack";
import { defineNuxtConfig, type NuxtConfig } from "nuxt/config";

// Resolver#resolve is a method signature, which unbound-method flags on
// destructuring — the returned closure never touches `this`.
const { resolve } = createResolver(import.meta.url) as {
  resolve: (...path: string[]) => string;
};

// Canonical, sitemap, llms.txt and the raw-markdown twins all need the
// deployed origin. The chain mirrors docus: explicit runtime config
// first, then whichever URL variable the hosting platform exports into
// the build. With none of them set the url stays undefined — links go
// relative and the build warns — rather than leaking a localhost that
// search engines would index as the canonical host.
const RAW_SITE_URL =
  process.env.NUXT_PUBLIC_SITE_URL ||
  process.env.NUXT_SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_BRANCH_URL ||
  process.env.VERCEL_URL ||
  process.env.URL ||
  process.env.CI_PAGES_URL ||
  process.env.CF_PAGES_URL;
const siteUrl = RAW_SITE_URL
  ? RAW_SITE_URL.startsWith("http")
    ? RAW_SITE_URL
    : `https://${RAW_SITE_URL}`
  : undefined;

// Held in a variable so the `content` / `llms` keys (augmented at build
// time by their modules, not in this package's bare tsc pass) skip the
// literal's excess property check.
const config = {
  modules: [
    resolve("./modules/routing"),
    resolve("./modules/messages"),
    "@nuxt/content",
    "@nuxt/icon",
    "@bysages/nuxt",
    // The agent surface: llms.txt + raw markdown, the /mcp endpoint, the
    // .well-known discovery documents, and the SEO basics every docs site
    // owes its readers and its crawlers. `@nuxtjs/i18n` stays opt-in —
    // register it from the consuming site and the theme adapts.
    "nuxt-agent-discovery",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "@nuxtjs/mcp-toolkit",
    "nuxt-schema-org",
    "nuxt-og-image",
    "nuxt-llms",
  ],

  css: [resolve("./assets/css/docs.css")],

  ogImage: {
    // Templates render on demand; the runtime bundle is dead weight.
    zeroRuntime: true,
  },

  // Content collections are invisible to the sitemap module's own scan —
  // the server handler is the one true source.
  sitemap: {
    excludeAppSources: true as const,
    sources: ["/api/__sitemap__/urls"],
  },

  // Statically generate from the entry points: the bare root, or one
  // root per locale — crawlLinks walks the rest of the shelves from
  // there. Pure-SSR deployments simply never run the prerenderer.
  // The hook key predates Nuxt's typed hook map but stays supported at
  // runtime — the assertion is the type layer catching up, not a cast
  // around a lie.
  hooks: {
    // A deployment that forgot its URL variable still builds — but every
    // canonical, sitemap entry and llms.txt link goes relative, so say
    // so loudly instead of letting the site ship quietly un-absolute.
    ready() {
      if (!siteUrl) {
        console.warn(
          "[@bysages/docs-theme] site.url is not set: set NUXT_SITE_URL (or your platform's URL variable, e.g. CF_PAGES_URL) so canonical links, the sitemap and llms.txt point at the deployed origin.",
        );
      }
    },
    "nitro:config"(nitroConfig: NitroOptions) {
      const i18n = useNuxt().options.i18n as
        | { locales?: Array<string | { code: string }> }
        | undefined;
      const codes = (i18n?.locales ?? []).map((entry) =>
        typeof entry === "string" ? entry : entry.code,
      );
      const roots = codes.length ? codes.map((c) => `/${c}`) : ["/"];
      // One sitemap per locale leaves `/sitemap.xml` a redirect; letting the
      // prerenderer chase it would write that redirect as an HTML file the
      // CDN then serves for the XML URL (the same wall docus hit).
      nitroConfig.prerender = {
        ...nitroConfig.prerender,
        crawlLinks: true,
        failOnError: false,
        autoSubfolderIndex: false,
        routes: [...(nitroConfig.prerender?.routes ?? []), ...roots],
        ignore: [...(nitroConfig.prerender?.ignore ?? []), "/sitemap.xml"],
      };
      // Cloudflare Pages: serve prerendered pages straight from the asset
      // store and invoke the worker only for runtime routes. The auto
      // map spills past the platform's 100-rule cap and truncates to
      // `include: /*`, dragging every page refresh through the worker.
      // Exclude wins over include, so static pockets inside runtime
      // prefixes (.well-known/skills) still resolve to files. Pages
      // outside the locale prefixes keep falling back to the worker.
      nitroConfig.cloudflare = {
        ...nitroConfig.cloudflare,
        pages: {
          defaultRoutes: false,
          routes: {
            include: [
              "/api/*",
              "/mcp",
              "/mcp/*",
              "/__sitemap__/*",
              "/_og/d/*",
              "/_og/r/*",
              "/robots.txt",
              "/llms.txt",
              "/llms-full.txt",
              "/sitemap_index.xml",
              "/sitemap/*",
              "/.well-known/*",
            ],
            exclude: [
              "/",
              "/_nuxt/*",
              "/raw/*",
              "/storybook/*",
              "/dump.*",
              "/.well-known/skills/*",
              ...roots,
              ...codes.map((c) => `/${c}/*`),
            ],
          },
        },
      };
    },
  } as NuxtConfig["hooks"],

  // Agents discover the site by domain: the platform's URL variable (or
  // an explicit NUXT_SITE_URL) feeds everything — sitemap, robots,
  // canonical links and the llms.txt domain.
  site: {
    url: siteUrl,
    name: "Elements",
  },

  // The assistant's MCP endpoint: a path uses this site's own server,
  // a full URL points the assistant at an external one. Declared so a
  // consuming site (or NUXT_ASSISTANT_MCP_SERVER) can override it.
  runtimeConfig: {
    assistant: {
      mcpServer: "/mcp",
    },
  },

  llms: {
    domain: siteUrl,
    title: "Elements",
    description:
      "The UI component library of By Sages — Ark UI headless components dressed in a paper-and-ink design language, with React, Vue, Solid and Svelte wrappers.",
    full: {
      title: "Elements — Full Documentation",
      description:
        "Every documentation page of the Elements design system as a single markdown document.",
    },
  },

  agentDiscovery: {
    discovery: {
      mcpServerCard: {
        endpoint: "/mcp",
        name: "Elements Docs",
        description:
          "Search and read the Elements documentation: list-pages to explore, get-page for full markdown.",
      },
    },
  },

  content: {
    experimental: {
      // The build-time database rides node:sqlite (what docus ships too).
      // Runtime is a different database entirely: on Cloudflare the
      // module binds the queries to the project's D1, so this option
      // never reaches the worker — and even where node:sqlite is
      // missing the adapter probe falls back on its own.
      sqliteConnector: "native" as const,
    },
    build: {
      markdown: {
        // Code blocks are stored as plain text in the content AST and
        // re-inked at render time (ProsePre) — `false` keeps shiki, its
        // wasm and grammar imports, out of the pipeline entirely.
        highlight: false as const,
        remarkPlugins: {
          "remark-mdc": {
            options: {
              autoUnwrap: true,
            },
          },
        },
      },
    },
  },

  // MCP tool handlers resolve their request through nitro's async
  // context — without it `useEvent()` throws outside the handler scope.
  experimental: {
    asyncContext: true,
  },

  compatibilityDate: "2026-09-01" as const,
};

export default defineNuxtConfig(config);
