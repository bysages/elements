# @bysages/svelte

![npm version](https://img.shields.io/npm/v/@bysages/svelte)
![npm downloads](https://img.shields.io/npm/dw/@bysages/svelte)
![npm license](https://img.shields.io/npm/l/@bysages/svelte)

> By Sages Elements for Svelte — 70+ accessible component families, headless by construction, dressed by the paper-and-ink style layer.

## Features

- 🧩 **70+ families** — actions, forms, overlays, navigation, data, layout, and an AI conversation family on ai-sdk formats
- 🏛️ **Headless inside** — interaction, state, ARIA, and positioning come from proven headless state machines; wrappers add API narrowing and style injection, no DOM of their own
- 🎨 **Token-styled** — every visual value is a CSS custom property from `@bysages/core`; light/dark, accent pigments, contrast and density tiers are data, never hardcoded styles
- 📦 **Container-driven** — components respond to `@container`, not the viewport; the same component composes in a sidebar, a card, or a page
- 💡 **Styles on import** — each family injects its stylesheet at module load, guarded against double-injection

## Installation

```bash
# pnpm
pnpm add @bysages/svelte @bysages/core

# npm
npm install @bysages/svelte @bysages/core

# yarn
yarn add @bysages/svelte @bysages/core

# bun
bun add @bysages/svelte @bysages/core
```

## Quick Start

Import the token stylesheet once, theme the document, then use the components:

```ts
// main.ts
import "@bysages/tokens/css";
import { mount } from "svelte";
import { applyTheme } from "@bysages/core";
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

## Documentation

The [documentation site](https://elements.bysages.com) carries every family with live demos and props tables.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
