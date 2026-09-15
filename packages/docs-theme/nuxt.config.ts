import { createResolver, useNuxt } from "@nuxt/kit";
import { defineNuxtConfig } from "nuxt/config";

const { resolve } = createResolver(import.meta.url);

// Held in a variable so the `content` / `llms` keys (augmented at build
// time by their modules, not in this package's bare tsc pass) skip the
// literal's excess property check.
const config = {
  modules: [
    resolve("./modules/routing"),
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

  app: {
    // Pages dissolve rather than cut — the transition styles live in
    // docs.css next to the rest of the motion grammar.
    pageTransition: { name: "page", mode: "out-in" } as const,
  },

  ogImage: {
    // Templates render on demand; the runtime bundle is dead weight.
    zeroRuntime: true,
  },

  // Content collections are invisible to the sitemap module's own scan —
  // the server handler is the one true source.
  sitemap: {
    excludeAppSources: true,
    sources: ["/api/__sitemap__/urls"],
  },

  // Statically generate from the entry points: the bare root, or one
  // root per locale — crawlLinks walks the rest of the shelves from
  // there. Pure-SSR deployments simply never run the prerenderer.
  hooks: {
    "nitro:config"(nitroConfig) {
      const i18n = useNuxt().options.i18n as
        | { locales?: Array<string | { code: string }> }
        | undefined;
      const codes = (i18n?.locales ?? []).map((entry) =>
        typeof entry === "string" ? entry : entry.code,
      );
      nitroConfig.prerender ||= {};
      nitroConfig.prerender.crawlLinks = true;
      nitroConfig.prerender.autoSubfolderIndex = false;
      nitroConfig.prerender.routes ||= [];
      nitroConfig.prerender.routes.push(...(codes.length ? codes.map((c) => `/${c}`) : ["/"]));
    },
  },

  // Agents discover the site by domain: deployment sets NUXT_SITE_URL,
  // everything else (sitemap, robots, canonical links) follows it.
  site: {
    url: process.env.NUXT_SITE_URL || "http://localhost:3000",
    name: "Elements",
  },

  llms: {
    domain: process.env.NUXT_SITE_URL || "http://localhost:3000",
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
    experimental: { sqliteConnector: "native" },
    build: {
      markdown: {
        highlight: {
          langs: [
            "bash",
            "diff",
            "json",
            "js",
            "ts",
            "tsx",
            "html",
            "css",
            "vue",
            "svelte",
            "shell",
            "mdc",
            "md",
            "yaml",
          ],
        },
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
