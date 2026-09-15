# @bysages/charts

![npm version](https://img.shields.io/npm/v/@bysages/charts)
![npm downloads](https://img.shields.io/npm/dw/@bysages/charts)
![npm license](https://img.shields.io/npm/l/@bysages/charts)

> Token-themed charts for By Sages Elements — [TanStack Charts](https://tanstack.com/charts) re-exported per framework, with the palette and surface variables bridged onto the paper-and-ink tokens.

## Features

- 🎨 **Tokens as ink** — marks carry `var(--bs-color-*)` straight through paint attributes; `var()` resolves against the live theme, so mode, accent, and scene retune the ink with no redraw
- 🖌️ **A fixed pigment palette** — ink → danger → success → warning → info, the system's semantic order, handed to series that don't name their own colors
- 🪟 **Paper vessels** — tooltips dress like every other popup vessel (surface, hairline, elevation), crosshairs and focus takes the primary ink
- 🧩 **The full grammar** — marks, transforms, scales, and `defineChart` pass through from TanStack Charts, one entry per framework (`/vue`, `/react`, `/solid`, `/svelte`)

## Installation

```bash
# pnpm
pnpm add @bysages/charts @bysages/core @bysages/tokens

# npm
npm install @bysages/charts @bysages/core @bysages/tokens

# yarn
yarn add @bysages/charts @bysages/core @bysages/tokens

# bun
bun add @bysages/charts @bysages/core @bysages/tokens
```

## Quick Start

```vue
<script setup lang="ts">
import { Chart } from "@bysages/charts/vue";
import { bar } from "@tanstack/charts";

const definition = {
  axis: ["Region", "Units"],
  series: [{ type: bar(), label: "Sales", data: [42, 87, 63] }],
} as const;
</script>

<template>
  <Chart :definition="definition" />
</template>
```

The module side-effects bridge the theme once on import — no setup call of its own.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
