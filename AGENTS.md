> Coding standards, design patterns, and the contribution workflow live in [CONTRIBUTING.md](./CONTRIBUTING.md). This file is the architectural context an agent must understand before changing code. Read both.

## Project

**Elements** (By Sages Elements) is the UI component library of By Sages — a pnpm monorepo on the basis + vite-plus toolchain.

The premise: **headless logic once, adapters everywhere.** Interactive component behavior (dialog, menu, popover, combobox, …) is implemented once as framework-agnostic state machines and rendered through thin adapters. All visual decisions are expressed as design tokens consumed through CSS variables.

## Architecture

| Layer       | Technology                                               | Owns                                                     |
| ----------- | -------------------------------------------------------- | -------------------------------------------------------- |
| Logic       | [Zag.js](https://zagjs.com) state machines (`@zag-js/*`) | interaction, state, ARIA — no rendering                  |
| Positioning | `@zag-js/popper` (built into the machines)               | anchor positioning + collision for floating parts        |
| Responsive  | native CSS Container Queries (`@container`)              | components respond to their container, not the viewport  |
| Theming     | design tokens → CSS custom properties                    | palettes, light/dark, contrast & density tiers, `@layer` |
| Rendering   | adapters                                                 | Web Components, Vue, React — over the same machines      |

Notes an agent must not miss:

- Zag.js officially ships React/Vue/Solid/Svelte/Preact/Vanilla adapters ([Ark UI](https://ark-ui.com) is the reference consumer of the same machines). There is **no official Web Components adapter** — our WC layer builds custom elements directly on the machines (vanilla path) + shared CSS, not a fork.
- Floating positioning comes from `@zag-js/popper` inside the machines — it already wraps Floating UI. Do not add Floating UI as a direct dependency unless a non-machine component needs it.
- Styling is native CSS driven by CSS variables. No utility framework is a dependency of component styles; utility-friendly output may exist at the adapter layer, never in the core.
- Container queries need a containment context: components establish their own `container` boundaries; never couple component breakpoints to media queries.
- Tokens are the only allowed source of visual values in components — colors, spacing, radius, elevation, motion. If a value is hardcoded in a component, it is a bug.

## Design Language

"Light as shadow" (以光为影): elevation and hierarchy come from light — luminance ramps, hairlines, soft glow — not heavy borders or drop shadows. Constraints that follow:

- **Inclusive across ages** — legible defaults, WCAG-contrast tiers, generous hit areas available as a density/size option, not a fork.
- **Chinese × Western** — 留白 (restraint, negative space) meets Western minimalism; typography-first, no decorative noise.
- **Density-adaptive** — comfortable/compact token tiers so the same components serve dense dashboards and airy editorial surfaces.

Reference points: shadcn/ui (ownership + CSS-variable theming), Fluent UI 2 (token layering, density), Nuxt UI 4 (semantic color aliases), Ark UI (Zag-based multi-framework API shape).

## AI Interface

Elements must stay legible to coding agents — achieved by how components and docs are written, not by special tooling.

- **Anatomy is a stable contract.** Parts carry `data-scope` / `data-part` and machine state attributes (`data-state`, `data-open`, …). Codegen, tests, and agents rely on them; never rename casually.
- **Props and types are the API docs.** Keep them precise and self-describing; document patterns (density selection, responsive re-organization, info-priority rules) in plain markdown alongside components.

## Package Layout

```
packages/tokens/src/    @bysages/tokens — DTCG design-token source compiled with style-dictionary 4 → CSS variables + types (elevation/lighting, density, themes)
packages/core/src/      @bysages/core — theme engine, shared anatomy styles (.css + string exports for shadow DOM), common utils
packages/elements/src/  @bysages/elements — Web Components layer (custom elements over the machines)
packages/react/src/     @bysages/react — React adapter
packages/vue/src/       @bysages/vue — Vue adapter
```

Each package carries a `demo/` folder next to `src/` — one folder per component, mirroring the source layout, served by `vite` from the package root (dev-only, never published). The docs site (Nuxt + Nuxt Content, Docus-style layer with our own UI) joins the workspace later.

Only `packages/core` exists today; the rest are planned. `@bysages/table` (TanStack Table) and `@bysages/charts` (ECharts themed from tokens) are planned data-layer packages on top.

## Build

Commands live in [CONTRIBUTING.md](./CONTRIBUTING.md) → Development Setup. The cross-package rule an agent must not miss:

> Adapters import `@bysages/core` by package name (→ `dist`), so **core src changes need `pnpm --filter @bysages/core build`** before they show in the adapters.

## Behavioral Guidelines

- State assumptions explicitly. If uncertain, ask before implementing.
- No features beyond what was asked. No speculative abstractions.
- Touch only what you must. Match existing style.
- Transform tasks into verifiable goals. Loop until verified.
