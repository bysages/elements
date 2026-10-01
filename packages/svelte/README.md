# @bysages/svelte

![npm version](https://img.shields.io/npm/v/@bysages/svelte)
![npm downloads](https://img.shields.io/npm/dw/@bysages/svelte)
![npm license](https://img.shields.io/npm/l/@bysages/svelte)

> By Sages Elements for Svelte — 140+ accessible component families, headless by construction, dressed by the paper-and-ink style layer.

## Features

- 🧩 **140+ families** — actions, forms, overlays, navigation, data, layout, an AI conversation family on ai-sdk formats, and a full generative vocabulary
- 🏛️ **Headless inside** — interaction, state, ARIA, and positioning come from proven headless state machines; wrappers add API narrowing and style injection, no DOM of their own
- 🎨 **Token-styled** — every visual value is a CSS custom property from `@bysages/core`; light/dark, accent pigments, contrast and density tiers are data, never hardcoded styles
- 📦 **Container-driven** — components respond to `@container`, not the viewport; the same component composes in a sidebar, a card, or a page
- 💡 **Styles on import** — each family injects its stylesheet at module load, guarded against double-injection

## Installation

```bash
# pnpm
pnpm add @bysages/svelte

# npm
npm install @bysages/svelte

# yarn
yarn add @bysages/svelte

# bun
bun add @bysages/svelte
```

## Quick Start

Theme the document, then use the components — the component import
carries the whole token layer in with it:

```ts
// main.ts
import { mount } from "svelte";
import { applyTheme } from "@bysages/svelte";
import App from "./App.svelte";

applyTheme({ mode: "system", accent: "ink" });

mount(App, { target: document.getElementById("app")! });
```

```svelte
<!-- App.svelte -->
<script lang="ts">
  import { Dialog } from "@bysages/svelte";
</script>

<Dialog.Root>
  <Dialog.Trigger>Delete item</Dialog.Trigger>
  <Dialog.Backdrop />
  <Dialog.Positioner>
    <Dialog.Content>
      <Dialog.Title>Delete item</Dialog.Title>
      <Dialog.Description>This action cannot be undone.</Dialog.Description>
      <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
    </Dialog.Content>
  </Dialog.Positioner>
</Dialog.Root>
```

## Generative UI

Every family carries a generative face — a zod-typed catalog entry that
lives beside the component. The faces compose into a
[json-render](https://json-render.dev) catalog and render through the
same package:

```ts
import { catalog } from "@bysages/svelte/generative";
```

Point an AI SDK stream at the renderer and a prompt becomes real,
on-brand components — constrained to the families you registered.

## Documentation

The [documentation site](https://elements.bysages.com) carries every family with live demos and props tables.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
