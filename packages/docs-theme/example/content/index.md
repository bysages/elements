---
title: Elements, in paper and ink
description: A documentation theme that dresses Docs' bones in the By Sages design system.
---

Elements is the UI component library of By Sages: Ark's headless components wearing our design language. This site is `@bysages/docs-theme` — a Nuxt Content layer that turns any markdown folder into a paper-and-ink docs site.

## What the layer provides

The layer ships the whole document frame, so a consuming site is one config file and a content folder:

- A sticky header with the serif brand and the theme toggle
- A navigation sidebar driven by `queryCollectionNavigation`
- An on-this-page rail pulled from the parsed headings
- Prose overrides — code panels with copy, callouts, anchored headings
- An AI assistant answering over any OpenAI-compatible endpoint

## Callouts

::callout{type="note"}
Callouts land on the fixed semantic pigments — this one is info.
::

::callout{type="warning"}
Warning rides the ochre pigment, independent of the accent.
::

::callout{type="tip"}
Tips take bamboo green. The markdown you know is all it takes.
::

## Code

```ts
import { applyTheme } from "@bysages/core";

applyTheme({ mode: "system", accent: "celadon" });
```

## Tables

| Layer    | Owns                                           |
| -------- | ---------------------------------------------- |
| Ark UI   | interaction, state, ARIA, positioning          |
| core     | the only visual layer, token-driven native CSS |
| wrappers | thin framework bindings, no DOM of their own   |

## Getting around

Use the sidebar on the left, the outline on the right, and the previous/next pager below. Deep-link any heading with its anchor. Head to [Getting started](/guide/getting-started) to write your first page.
