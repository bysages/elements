# @bysages/docs-theme

![npm version](https://img.shields.io/npm/v/@bysages/docs-theme)
![npm downloads](https://img.shields.io/npm/dw/@bysages/docs-theme)
![npm license](https://img.shields.io/npm/l/@bysages/docs-theme)

> A [Nuxt Content](https://content.nuxt.com) layer that turns any Nuxt site into an Elements documentation site — the paper-and-ink shell, the sidebar / article / outline grid, the AI assistant, and the raw-markdown surfaces agents expect. The interactive parts are the library itself (`NavigationMenu`, `Toc`, `Button`, the `Ai` family); the layer adds only the site chrome around them.

## Features

- 🖋 **Paper-and-ink docs shell** — sticky header with a menubar, sidebar, article grid with the "On this page" outline, footer, landing and 404 pages, all overridable by file convention
- 🤖 **AI-native surfaces** — `llms.txt` / `llms-full.txt`, a raw-markdown twin for every page, an MCP server at `/mcp`, and `.well-known` discovery documents
- 💬 **Assistant included** — a floating input and drawer panel wired to any OpenAI-compatible endpoint, with tool-call and reasoning parts styled like the rest of the system
- 🌐 **i18n-ready** — one content collection and one UI-string pack per locale; works single-language without `@nuxtjs/i18n` registered
- 📐 **SEO that ships** — canonical links, per-locale sitemaps, robots, og images and schema.org driven by the deployed origin (the platform's URL variable, docus-style)

## Installation

The package is a Nuxt layer; extend it from your site's `nuxt.config.ts`:

```bash
# pnpm
pnpm add @bysages/docs-theme

# npm
npm install @bysages/docs-theme

# yarn
yarn add @bysages/docs-theme

# bun
bun add @bysages/docs-theme
```

## Quick Start

1. Extend the layer:

   ```ts
   // nuxt.config.ts
   export default defineNuxtConfig({
     extends: ["@bysages/docs-theme"],
   });
   ```

2. Brand the site in `app/app.config.ts`:

   ```ts
   export default defineAppConfig({
     docs: {
       name: "Elements",
       description: "What this site is, in one sentence.",
       copyright: { label: "By Sages", url: "https://www.bysages.com/" },
     },
   });
   ```

3. Write markdown under `content/` (or `content/docs/`, which the layer serves under `/docs`). A site that defines its own `app/pages/index.vue` keeps it; otherwise the layer renders a landing page from `content/index.md`.

Set the deployed origin through `NUXT_SITE_URL` (or your platform's variable — `CF_PAGES_URL`, `VERCEL_URL`, …) so canonical links, the sitemap and `llms.txt` point at the real host.

## Deploying to Cloudflare Pages

The layer detects the platform (`CF_PAGES`) and prepares the build for it. Two things to provide on the Cloudflare side:

1. **A D1 database** bound to the project under the name `DB` — the content database rides on it at runtime (Workers have no `node:sqlite`).
2. Nothing else. Every prerendered page is served straight from the asset store; the worker only handles runtime routes (search, the assistant, the MCP endpoint, sitemaps, og images). For local preview, `npx wrangler pages dev dist` with a `wrangler.jsonc` that declares the same `DB` binding — Wrangler provisions a temporary local database for it.

## AI assistant

The layer ships a floating assistant panel wired to `POST /api/assistant`. Point it at any OpenAI-compatible endpoint:

```bash
BS_DOCS_BASE_URL=https://api.example.com/v1
BS_DOCS_API_KEY=…
BS_DOCS_MODEL=…        # optional, "default" when unset
```

Without credentials the endpoint answers 503 and the panel shows its quiet failure copy. Remove the route if the site does not want an assistant.

## Customizing and overriding

Nuxt layers resolve overrides by file name: drop a component with the same path into your site's `app/components/` and yours wins. Three things to know:

- **Declared site dependencies.** pnpm's strict resolution does not flow a layer's dependencies into your site — declare what your overrides import. Overriding the assistant panel requires `@ai-sdk/vue` and `ai` as site dependencies; overriding `AppSearch.vue` requires `minisearch`.
- **Theme utilities come by auto-import.** `highlightFence` (code highlighting) and `pagesFrom` are exported from the layer's `utils/` and available in every component without an import line — never import them by relative path, which resolves against the overriding site and breaks.
- **Server routes.** Overriding `server/api/assistant.post.ts` is a supported customization: replace it wholesale with your own handler, but keep the `BS_DOCS_*` environment contract so deployments stay portable.

## i18n messages

The theme ships UI strings (`docs.*`, `common.*`) in `i18n/locales/{en,zh}.json`. A site that registers `@nuxtjs/i18n` keeps full ownership of its locale files — the theme injects its strings only for the languages your `locales` declare, and your keys win over theme keys with the same name. Without `@nuxtjs/i18n` the theme serves one locale from `app.config.docs.locale`.

## Markdown (remark-mdc) conventions

The content pipeline speaks remark-mdc; three rules keep components in markdown honest:

- Indent component children by **two spaces** — an unindented `#title` inside `::page-card` binds to the outer section, and a leaked closing `:::` renders as literal text.
- Put a space before an inline `<Icon />` at line start — flush-left, the markup swallows the following text.
- Write component props inline in braces: `::page-section{orientation="horizontal" reverse}`.

## Acknowledgments

The documentation shell began as a study of [Docus](https://github.com/nuxt-content/docus) — many of its ideas (the docs grid, the raw-markdown twins, the assistant) are re-implemented here in our own UI. Thank you to the Nuxt Content team and community.

The live consumer in this repository is [`docs/`](../../docs).

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
