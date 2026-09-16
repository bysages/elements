# @bysages/react

![npm version](https://img.shields.io/npm/v/@bysages/react)
![npm downloads](https://img.shields.io/npm/dw/@bysages/react)
![npm license](https://img.shields.io/npm/l/@bysages/react)

> By Sages Elements for React — 90+ accessible component families, headless by construction, dressed by the paper-and-ink style layer. Ported from the Vue reference implementation, API for API.

## Features

- 🧩 **90+ families** — actions, forms, overlays, navigation, data, layout, and an AI conversation family on ai-sdk formats
- 🏛️ **Headless inside** — interaction, state, ARIA, and positioning come from proven headless state machines; wrappers add API narrowing and style injection, no DOM of their own
- 🎨 **Token-styled** — every visual value is a CSS custom property from `@bysages/core`; light/dark, accent pigments, contrast and density tiers are data, never hardcoded styles
- 📦 **Container-driven** — components respond to `@container`, not the viewport; the same component composes in a sidebar, a card, or a page
- 💡 **Styles on import** — each family injects its stylesheet at module load, guarded against double-injection
- 📊 **DataTable included** — a TanStack Table v9 integration with drag reordering, pinning, tree data, and virtualization

## Installation

```bash
# pnpm
pnpm add @bysages/react

# npm
npm install @bysages/react

# yarn
yarn add @bysages/react

# bun
bun add @bysages/react
```

## Quick Start

Theme the document, then use the components — the component import
carries the whole token layer in with it:

```tsx
// main.tsx
import { applyTheme } from "@bysages/react";

applyTheme({ mode: "system", accent: "ink" });
```

```tsx
// App.tsx
import { Button, Dialog } from "@bysages/react";

export function App() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Delete item</Button>
      </Dialog.Trigger>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Title>Delete item</Dialog.Title>
          <Dialog.Description>This action cannot be undone.</Dialog.Description>
          <Dialog.CloseTrigger>×</Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
```

## Documentation

The [documentation site](https://elements.bysages.com) carries every family with live demos and props tables.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
