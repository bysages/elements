# @bysages/docs-theme

A [Nuxt Content](https://content.nuxt.com) layer that turns any Nuxt site into an Elements documentation site: the paper-and-ink shell, the sidebar / article / outline grid, and the AI assistant. The interactive parts are the library itself — `NavigationMenu` in the header, `Toc` on the page rail, `Button`, `Alert`, and the `Ai` family — dressed by `@bysages/core`; the layer adds only the site chrome around them.

## Usage

1. Extend the layer in `nuxt.config.ts`:

   ```ts
   export default defineNuxtConfig({
     extends: ["@bysages/docs-theme"],
   });
   ```

2. Brand the site in `app/app.config.ts`:

   ```ts
   export default {
     docs: {
       name: "Elements",
       description: "What this site is, in one sentence.",
       site: "https://elements.example.com",
       copyright: { label: "By Sages", url: "https://www.bysages.com/" },
     },
   };
   ```

3. Write markdown under `content/` (or `content/docs/`, which the layer serves under `/docs`). A site that defines its own `app/pages/index.vue` keeps it; otherwise the layer renders a landing page from `content/index.md`.

## What the layer provides

- **Shell** — sticky header (brand, menubar navigation, theme toggle), sidebar, article grid with the "On this page" outline, footer
- **Prose** — headings with hover anchors, code panels with copy, callouts via `::callout{type="note"}` (note / tip / important / warning / caution)
- **Landing and error pages** — a home page and a 404 dressed in the system, overridable by the site
- **Agent surfaces** — `llms.txt` / `llms-full.txt`, raw Markdown per page, an MCP server at `/mcp`, and `.well-known` discovery documents
- **Extension points** — `navigation` for the header menubar (provide an array of `{ title, path, children? }`)

## AI assistant

The layer ships a floating assistant panel wired to `POST /api/assistant`. Point it at any OpenAI-compatible endpoint:

```bash
BS_DOCS_BASE_URL=https://api.example.com/v1
BS_DOCS_API_KEY=…
BS_DOCS_MODEL=…        # optional, "default" when unset
```

Without credentials the endpoint answers 503 and the panel shows its quiet failure copy. Remove the route if the site does not want an assistant.

## Customizing and overriding

Nuxt layers resolve overrides by file name: drop a component with the same path into your site's `app/components/` and yours wins. Two things to know:

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

The live consumer in this repository is [`docs/`](../../docs).
