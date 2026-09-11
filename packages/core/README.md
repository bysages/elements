# @bysages/core

![npm version](https://img.shields.io/npm/v/@bysages/core)
![npm downloads](https://img.shields.io/npm/dw/@bysages/core)
![npm license](https://img.shields.io/npm/l/@bysages/core)

> The shared core of By Sages Elements: design tokens, the theme engine, and framework-agnostic component logic. Rendering adapters (Web Components, Vue, React) are built on top of it.

> 🚧 Under construction — the package is an empty scaffold while the tokens and theme layers take shape. See the [monorepo README](../../README.md) for the design direction.

## Features

- 🎨 **Design tokens** — palettes, type, spacing, radius, elevation, and density defined once and compiled to CSS custom properties
- 🌗 **Theme engine** — light/dark, contrast tiers, and density tiers expressed as data, never hardcoded styles
- 🧩 **Framework-agnostic logic** — interaction, state, and accessibility written once and shared by every rendering layer

## Installation

> 🚧 Installation guides land with the first usable release.

## Architecture

```
@bysages/core    tokens · theme engine · component logic
        ↓
adapters         Web Components · Vue · React — thin rendering layers
```

The core owns no rendering; adapters translate the same logic to their framework.

## License

- [MIT](../../LICENSE) © [By Sages](https://www.bysages.com/)
