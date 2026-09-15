# @bysages/vue

![npm version](https://img.shields.io/npm/v/@bysages/vue)
![npm downloads](https://img.shields.io/npm/dw/@bysages/vue)
![npm license](https://img.shields.io/npm/l/@bysages/vue)

> By Sages Elements for Vue — 70+ accessible component families, headless by construction, dressed by the paper-and-ink style layer. The reference implementation of the library.

## Features

- 🧩 **70+ families** — actions, forms, overlays, navigation, data, layout, and an AI conversation family on ai-sdk formats
- 🏛️ **Headless inside** — interaction, state, ARIA, and positioning come from proven headless state machines; wrappers add API narrowing and style injection, no DOM of their own
- 🎨 **Token-styled** — every visual value is a CSS custom property from `@bysages/core`; light/dark, accent pigments, contrast and density tiers are data, never hardcoded styles
- 📦 **Container-driven** — components respond to `@container`, not the viewport; the same component composes in a sidebar, a card, or a page
- 💡 **SSR-ready** — styles inject at module load with a head-marker guard, or ship as one build-time stylesheet through [`@bysages/nuxt`](../nuxt/README.md)
- ♿ **Audited** — every family walked through real interaction testing and axe checks in light/dark × accent × scene matrices

## Installation

```bash
# pnpm
pnpm add @bysages/vue @bysages/core

# npm
npm install @bysages/vue @bysages/core

# yarn
yarn add @bysages/vue @bysages/core

# bun
bun add @bysages/vue @bysages/core
```

## Quick Start

Import the token stylesheet once, theme the document, then use the components:

```ts
// main.ts
import "@bysages/tokens/css";
import { applyTheme } from "@bysages/core";

applyTheme({ mode: "system", accent: "ink" });
```

```vue
<!-- App.vue -->
<script setup lang="ts">
import { Button, Dialog } from "@bysages/vue";
</script>

<template>
  <Dialog.Root>
    <Dialog.Trigger>Delete item</Dialog.Trigger>
    <Teleport to="body">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Delete item</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
```

## Documentation

The [documentation site](https://elements.bysages.com) carries every family with live demos and props tables. Each family also has Storybook stories in this package (`pnpm dev` from the package root, port 6006).

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
