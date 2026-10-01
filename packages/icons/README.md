# @bysages/icons

![npm version](https://img.shields.io/npm/v/@bysages/icons)
![npm downloads](https://img.shields.io/npm/dw/@bysages/icons)
![npm license](https://img.shields.io/npm/l/@bysages/icons)

> The icon registry for By Sages Elements — the [Lucide](https://lucide.dev) collection as named exports, one canonical set for every framework wrapper.

## Features

- 🗂 **The collection whole, as named exports** — every Lucide glyph is one `IconifyIcon` constant (`import { calendar } from "@bysages/icons"`); a consumer that knows which glyph it wants imports that one name
- 📦 **Shakeable by construction** — the set compiles to per-glyph ES exports at generation time, so bundlers ship only the imports actually made, never the 590 KB raw JSON
- 🧩 **One set, every framework** — react, vue, solid, and svelte all draw from this one registry, so a glyph never drifts between frameworks

## Installation

```bash
# pnpm
pnpm add @bysages/icons

# npm
npm install @bysages/icons

# yarn
yarn add @bysages/icons

# bun
bun add @bysages/icons
```

## Usage

Import the glyph by name and render it through any wrapper's `Icon`:

```vue
<script setup lang="ts">
import { Icon } from "@bysages/vue";
import { calendar } from "@bysages/icons";
</script>

<template>
  <Icon :glyph="calendar" label="Pick a date" />
</template>
```

Regenerate after the collection package updates:

```bash
pnpm --filter @bysages/icons generate
```

## Why lucide, and why named exports

The collection is **Lucide**: feather-lineage strokes on a 24px grid —
2px, rounded caps and joins — the most actively maintained open set
today, at home on warm paper, and the set code-generating agents name by
default.

Serving the raw `icons.json` would hand every consumer the whole 590 KB
(JSON does not tree-shake), and per-icon subpaths do not exist. So the
collection compiles to named exports once, at generation time —
`data.generated.ts` is committed, and `generate` runs only when the
collection changes, never during build. The wrappers' own registry (the
few glyphs the components draw) is curated in
[`@bysages/core`](../core/README.md); everything else is a direct import
away.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
