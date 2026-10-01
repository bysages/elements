# @bysages/icons

![npm version](https://img.shields.io/npm/v/@bysages/icons)
![npm downloads](https://img.shields.io/npm/dw/@bysages/icons)
![npm license](https://img.shields.io/npm/l/@bysages/icons)

> Icon registry for By Sages Elements — iconify-format glyphs from a curated collection, one canonical set for every framework wrapper.

## Features

- 🗂 **One curated collection** — `icons.config.json` names every glyph the system uses; the registry holds only that list, and a name outside it is a loud miss, not a silent fallback
- 📦 **Iconify format, no runtime cost** — glyphs are compiled to `IconifyIcon` data at build time (`data.generated.ts`), so wrappers render them however the framework renders SVG
- 🧩 **One set, every framework** — react, vue, solid, and svelte all read the same registry, so a glyph never drifts between frameworks

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

```ts
import { getIcon } from "@bysages/icons";

const check = getIcon("check"); // IconifyIcon | undefined — names are kebab-case
```

Curate the set in `icons.config.json`, then regenerate:

```bash
pnpm --filter @bysages/icons generate
```

## Why lucide, and why a curated registry

The default collection is **Lucide**: feather-lineage strokes on a 24px
grid — 2px, rounded caps and joins — the most actively maintained open
set today, at home on warm paper, and the set code-generating agents
name by default.

The registry stays curated on purpose. Depending on the collection
directly would hand every consumer the whole 590 KB `icons.json`
(1,909 glyphs): JSON does not tree-shake, and per-icon subpaths do not
exist. Iconify's runtime component would trade that for a network
dependency. So the curated list compiles at curation time instead —
`data.generated.ts` is committed, and `generate` runs only when the
list changes, never during build.
