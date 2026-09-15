# By Sages Elements

English | [简体中文](./README.zh-CN.md)

[![npm downloads](https://img.shields.io/npm/dm/@bysages/core)](https://www.npmjs.com/package/@bysages/core)
[![GitHub Stars](https://img.shields.io/github/stars/bysages/elements)](https://github.com/bysages/elements/stargazers)
![GitHub License](https://img.shields.io/github/license/bysages/elements)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Elements is the UI component library of By Sages: accessible, headless components styled entirely by **design tokens compiled to CSS variables**, and responsive through native **CSS Container Queries** — one design system, shipped as React, Vue, Solid, and Svelte components.

[Documentation](https://elements.bysages.com) · [AI Integration](https://elements.bysages.com/en/guide/ai) · [Discussions](https://github.com/bysages/elements/discussions) · [Report Issues](https://github.com/bysages/elements/issues)

⭐ **If Elements is useful to you, a star helps other developers find it.**

<!-- Hero visual goes here: ![By Sages Elements](./assets/hero.png) -->

## Why Elements?

- 🧩 **Headless logic, our look** — interaction, state, accessibility, and positioning live in proven headless state machines; every visual decision lives in one style layer, so behavior stays rock-solid while the design stays ours.
- 💡 **Dynamic light, not static shadows** — the lighting engine computes elevation, pigment bleed, and glow into CSS variables; component styles only consume light (以光为影 — light as shadow).
- 📐 **Container-driven responsiveness** — components respond to the space they are given (`@container`), not the viewport; the same component composes correctly in a sidebar, a card, or a full page.
- 🎨 **Tokens all the way down** — palettes, type, spacing, radius, elevation, and density are design tokens exposed as CSS custom properties. Themes (light/dark, accent pigments, contrast tiers, density tiers) are data, never hardcoded styles.
- 🖋 **Paper and ink (以光为影)** — interfaces are warm paper, content is ink, hierarchy is light. Primary actions default to ink with switchable mineral-pigment accent themes; semantic colors are fixed traditional pigments; controls are square-cut like seals while vessels stay round. The language bridges Chinese restraint (留白) and Western minimalism, with legible defaults and contrast/density tiers that serve both older and younger users.
- 🌐 **Every framework, one anatomy** — React, Vue, Solid, and Svelte wrappers share the same parts contract (`data-scope` / `data-part`), so one stylesheet — and one mental model — serves them all.
- 🤖 **AI-native docs** — the documentation speaks agent: every page is served as raw markdown, the whole site compiles to `llms.txt`, and an MCP server exposes the docs to any client.

## Packages

| Package                                                | Version                                                                  | Description                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- |
| [@bysages/tokens](./packages/tokens/README.md)         | ![npm](https://img.shields.io/npm/v/@bysages/tokens)                     | DTCG design tokens compiled with style-dictionary 4 → CSS variables + types |
| [@bysages/core](./packages/core/README.md)             | ![npm](https://img.shields.io/npm/v/@bysages/core)                       | Theme engine, per-component styles, and the lighting engine                 |
| [@bysages/react](./packages/react/README.md)           | ![npm](https://img.shields.io/npm/v/@bysages/react)                      | Components for React                                                        |
| [@bysages/vue](./packages/vue/README.md)               | ![npm](https://img.shields.io/npm/v/@bysages/vue)                        | Components for Vue                                                          |
| [@bysages/solid](./packages/solid/README.md)           | ![npm](https://img.shields.io/npm/v/@bysages/solid)                      | Components for Solid                                                        |
| [@bysages/svelte](./packages/svelte/README.md)         | ![npm](https://img.shields.io/npm/v/@bysages/svelte)                     | Components for Svelte                                                       |
| [@bysages/charts](./packages/charts/README.md)         | ![npm](https://img.shields.io/npm/v/@bysages/charts)                     | Token-themed charts                                                         |
| [@bysages/nuxt](./packages/nuxt/README.md)             | ![npm](https://img.shields.io/npm/v/@bysages/nuxt)                       | Nuxt module wrapping the Vue components                                     |
| [@bysages/docs-theme](./packages/docs-theme/README.md) | ![npm](https://img.shields.io/npm/v/@bysages/docs-theme)                 | Nuxt Content layer for Elements documentation sites                         |

## Quick Start

Pick the package for your framework and add it with the core:

```bash
pnpm add @bysages/vue @bysages/core
# or @bysages/react / @bysages/solid / @bysages/svelte
```

Import the token stylesheet once and theme the document:

```ts
import "@bysages/tokens/css";
import { applyTheme } from "@bysages/core";

applyTheme({ mode: "system", accent: "ink" });
```

Then use the components — Vue here; [React](./packages/react/README.md), [Solid](./packages/solid/README.md), and [Svelte](./packages/svelte/README.md) mirror the same anatomy:

```vue
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

Nuxt applications get every family auto-imported and SSR styling handled by the module — see [@bysages/nuxt](./packages/nuxt/README.md). The [documentation site](https://elements.bysages.com) documents installation per framework, theming, and every component family with live demos.

## AI Integration

The docs site is built for agents: every page is available as raw markdown, the whole site compiles to [`llms.txt`](https://elements.bysages.com/llms.txt), and an MCP server exposes the docs to any MCP client:

```bash
claude mcp add --transport http elements https://elements.bysages.com/mcp
```

See the [AI integration guide](https://elements.bysages.com/en/guide/ai) for details.

## Development

### Prerequisites

- **Node.js** 18.x or higher
- **pnpm** 9.x or higher (recommended package manager)
- **Git** for version control

### Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bysages/elements.git
   cd elements
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Build all packages**:

   ```bash
   pnpm build
   ```

### Development Commands

```bash
pnpm build                                  # Build all packages
cd packages/<pkg> && pnpm build             # Build one package
cd packages/<pkg> && pnpm exec vp test run  # Test one package
pnpm exec vp check                          # Lint, format & type check
```

Each package serves its own component demos with `vite` from the package root (`cd packages/<pkg> && pnpm dev`).

## Versioning

This project follows [Semantic Versioning](https://semver.org/). While the major version is `0` (pre-1.0), breaking API changes are released as **minor** version bumps (`0.x.0`) rather than patch releases — the public API is expected to keep evolving until the `1.0.0` stabilization release. Pin exact versions in downstream projects if you require stability between minor updates.

## Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full contribution workflow, coding standards, and PR checklist.

## Support & Community

- 📫 [Report Issues](https://github.com/bysages/elements/issues)
- 💬 [Discussions](https://github.com/bysages/elements/discussions) — questions, ideas, and show-and-tell

If Elements is useful to you, a [⭐ star](https://github.com/bysages/elements/stargazers) helps other developers find it.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

Built with ❤️ by [By Sages](https://www.bysages.com/)
