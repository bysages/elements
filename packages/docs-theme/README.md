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
- **Extension points** — `navigation` for the header menubar, `reference-navigation` for the sidebar's Reference section (provide both as arrays of `{ title, path, children? }`)

## AI assistant

The layer ships a floating assistant panel wired to `POST /api/assistant`. Point it at any OpenAI-compatible endpoint:

```bash
BS_DOCS_BASE_URL=https://api.example.com/v1
BS_DOCS_API_KEY=…
BS_DOCS_MODEL=…        # optional, "default" when unset
```

Without credentials the endpoint answers 503 and the panel shows its quiet failure copy. Remove the route if the site does not want an assistant.

The live consumer in this repository is [`docs/`](../../docs).
