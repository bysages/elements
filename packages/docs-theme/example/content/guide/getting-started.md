---
title: Getting started
description: Stand up your own paper-and-ink docs site in three files.
---

A site on `@bysages/docs-theme` is a Nuxt app that extends the layer. Three files and a content folder.

## Install

```bash
pnpm add @bysages/docs-theme nuxt
```

## Configure

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  extends: ["@bysages/docs-theme"],
});
```

The layer registers `@bysages/nuxt` and `@nuxt/content` for you, injects the token layer, and provides the shell. Override any brand string from your own `app.config.ts`:

```ts
export default {
  docs: {
    name: "My Docs",
    description: "Say what the site is for.",
  },
};
```

### Theme

Pick the accent pigment the same way you would anywhere in Elements:

```ts
export default defineNuxtConfig({
  extends: ["@bysages/docs-theme"],
  bsElements: { theme: { accent: "celadon" } },
});
```

## Write

Drop markdown into `content/`. Frontmatter titles feed the sidebar; headings feed the outline; everything renders through the layer's prose overrides.

### Front matter

```yaml
---
title: Getting started
description: One line under the title.
---
```

## Ask the assistant

The assistant panel (bottom right) speaks to `/api/assistant`. Point it at any OpenAI-compatible endpoint with environment variables:

| Variable           | Meaning                            |
| ------------------ | ---------------------------------- |
| `BS_DOCS_BASE_URL` | API base, e.g. `https://…/v1`      |
| `BS_DOCS_API_KEY`  | Bearer credential                  |
| `BS_DOCS_MODEL`    | Model id (defaults to `"default"`) |

Without them the route answers `503` and the panel reports the miss.
