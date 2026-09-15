# @bysages/tokens

![npm version](https://img.shields.io/npm/v/@bysages/tokens)
![npm downloads](https://img.shields.io/npm/dw/@bysages/tokens)
![npm license](https://img.shields.io/npm/l/@bysages/tokens)

> The design tokens of By Sages Elements — [DTCG](https://design-tokens.github.io/community-group/format/) sources compiled with Style Dictionary into CSS custom properties and TypeScript types. The only allowed source of visual values in the system.

## Features

- 🎨 **Two tiers** — primitives (the raw palettes, type ramps, spacing) and semantic tokens (surface ladder, ink, borders, elevation, motion) that components actually consume
- 🌗 **Theme dimensions as data** — light/dark modes, mineral-pigment accents (qinghua / celadon / zhusha), fixed semantic colors (bamboo / ochre / cinnabar / ultramarine), four density tiers, contrast tiers, and scene presets
- 💡 **Lighting-aware elevation** — shadows computed from `--bs-light-x` / `--bs-light-reach` parts, never copy-pasted, so the light source is a variable too
- 📦 **Three outputs** — the compiled stylesheet (`@bysages/tokens/css`), the token tree as data (`.`), and the semantic layer as JS (`./styles`)
- 🔤 **Typography with a voice** — song-serif headings, hei-sans UI chrome, CJK label tracking — dual-track stacks for the Chinese × Western register

## Installation

```bash
# pnpm
pnpm add @bysages/tokens

# npm
npm install @bysages/tokens

# yarn
yarn add @bysages/tokens

# bun
bun add @bysages/tokens
```

## Quick Start

Import the compiled stylesheet once at the app root — every token lands as a CSS custom property on `:root`:

```ts
import "@bysages/tokens/css";
```

Then consume tokens anywhere — this is the contract every component style follows:

```css
.card {
  background: var(--bs-color-surface-2);
  border: 1px solid var(--bs-color-border);
  border-radius: var(--bs-radius-lg);
  box-shadow: var(--bs-elevation-1);
  padding: var(--bs-space-4);
}
```

## Rebuilding

The tokens compile at build time (`node scripts/build.mjs`); `pnpm dev` in the package root watches and recompiles. Consumers in the monorepo read the compiled `dist`, so rebuild here before their changes pick up new tokens.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
