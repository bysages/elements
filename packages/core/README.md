# @bysages/core

![npm version](https://img.shields.io/npm/v/@bysages/core)
![npm downloads](https://img.shields.io/npm/dw/@bysages/core)
![npm license](https://img.shields.io/npm/l/@bysages/core)

> The visual core of By Sages Elements: the only style layer of the design system, the theme engine, and the lighting engine — framework-agnostic, consumed by every wrapper package.

## Features

- 🎨 **The only visual layer** — every component's stylesheet lives here, native CSS scoped by `[data-scope][data-part]`, so one stylesheet serves React, Vue, Solid, and Svelte alike
- 🌗 **Theme engine** — `applyTheme()` drives light/dark, accent pigments (qinghua / celadon / zhusha), contrast tiers, density tiers, and scene presets, all expressed as data on the document root
- 💡 **Lighting engine** — elevation, pigment bleed, and pointer-carried light computed into CSS variables (`setLight`, `attachDynamicLight`); component styles only ever consume light (以光为影 — light as shadow)
- 🖋️ **Ink ripple** — a press feedback pass that bleeds pigment from the pointer, delegated at the root and tuneable per element
- 🧩 **Style injection** — `injectComponentStyle()` ships each family's stylesheet at import time, guarded by a head marker so SSR builds that inline styles never double-inject

## Installation

```bash
# pnpm
pnpm add @bysages/core @bysages/tokens

# npm
npm install @bysages/core @bysages/tokens

# yarn
yarn add @bysages/core @bysages/tokens

# bun
bun add @bysages/core @bysages/tokens
```

## Quick Start

Load the compiled tokens, theme the document, and the component styles arrive with the wrappers:

```ts
import "@bysages/tokens/css";
import { applyTheme, attachDynamicLight } from "@bysages/core";

applyTheme({ mode: "system", accent: "ink", density: "default" });
attachDynamicLight();
```

## Architecture

```
@bysages/tokens    DTCG source → CSS custom properties
      ↓
@bysages/core      theme engine · lighting engine · per-component styles
      ↓
wrappers           Vue · React · Solid · Svelte — thin Ark UI adapters
```

The core owns no interaction; it renders nothing but light. Wrappers bring Ark UI's headless machines, the core dresses them.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
