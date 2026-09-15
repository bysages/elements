# @bysages/nuxt

![npm version](https://img.shields.io/npm/v/@bysages/nuxt)
![npm downloads](https://img.shields.io/npm/dw/@bysages/nuxt)
![npm license](https://img.shields.io/npm/l/@bysages/nuxt)

> The Nuxt module for By Sages Elements — registers every `@bysages/vue` family as an auto-imported component and ships the whole core style layer as one build-time stylesheet.

## Features

- 🧩 **Every family, auto-imported** — all 70+ `@bysages/vue` families register as Nuxt components; use `<Button>`, `<Dialog.Root>`, `<DataTable>` with no import lines
- 🖥️ **Styled SSR out of the box** — the core style layer compiles into the build as a single stylesheet, so server-rendered pages carry styled HTML and the first paint never waits on runtime injection
- 🌗 **Theme before mount** — an optional `theme` option applies mode, accent, scene, density, and contrast on the client before the app mounts
- 🔤 **Prefixed names on demand** — a `prefix` option namespaces the registrations (`<BsButton>`) when they must not collide

## Installation

```bash
# pnpm
pnpm add @bysages/nuxt

# npm
npm install @bysages/nuxt

# yarn
yarn add @bysages/nuxt

# bun
bun add @bysages/nuxt
```

## Quick Start

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ["@bysages/nuxt"],
  bsElements: {
    theme: { mode: "system", accent: "ink" },
  },
});
```

```vue
<!-- app.vue -->
<template>
  <Button tone="ink">Publish</Button>
</template>
```

The module wraps the [Vue package](../vue/README.md) — every family and prop documented there works here, and the token stylesheet is handled for you.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
