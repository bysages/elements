# @bysages/solid

![npm version](https://img.shields.io/npm/v/@bysages/solid)
![npm downloads](https://img.shields.io/npm/dw/@bysages/solid)
![npm license](https://img.shields.io/npm/l/@bysages/solid)

> By Sages Elements for Solid — 70+ accessible component families, headless by construction, dressed by the paper-and-ink style layer.

## Features

- 🧩 **70+ families** — actions, forms, overlays, navigation, data, layout, and an AI conversation family on ai-sdk formats
- 🏛️ **Headless inside** — interaction, state, ARIA, and positioning come from proven headless state machines; wrappers add API narrowing and style injection, no DOM of their own
- 🎨 **Token-styled** — every visual value is a CSS custom property from `@bysages/core`; light/dark, accent pigments, contrast and density tiers are data, never hardcoded styles
- 📦 **Container-driven** — components respond to `@container`, not the viewport; the same component composes in a sidebar, a card, or a page
- 💡 **Styles on import** — each family injects its stylesheet at module load, guarded against double-injection
- ⚡ **Solid to the bone** — the same headless machines, no virtual DOM; components are plain functions over fine-grained signals

## Installation

```bash
# pnpm
pnpm add @bysages/solid @bysages/core

# npm
npm install @bysages/solid @bysages/core

# yarn
yarn add @bysages/solid @bysages/core

# bun
bun add @bysages/solid @bysages/core
```

## Quick Start

Theme the document, then use the components — the component import
carries the whole token layer in with it:

```tsx
// index.tsx
import { render } from "solid-js/web";
import { applyTheme } from "@bysages/solid";
import { Dialog } from "@bysages/solid";

applyTheme({ mode: "system", accent: "ink" });

render(
  () => (
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
  ),
  document.getElementById("root")!,
);
```

## Documentation

The [documentation site](https://elements.bysages.com) carries every family with live demos and props tables.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
