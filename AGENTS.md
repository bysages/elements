> Coding standards, design patterns, and the contribution workflow live in [CONTRIBUTING.md](./CONTRIBUTING.md); the full design system (principles, tokens, checklist) lives in [DESIGN.md](./DESIGN.md). This file is the architectural context an agent must understand before changing code. Read all three.

## Project

**Elements** (By Sages Elements) is the UI component library of By Sages — a pnpm monorepo on the basis + vite-plus toolchain.

The premise: **Ark's headless components, dressed in our design system.** Interactive components (dialog, menu, popover, combobox, …) are thin wrappers over [Ark UI](https://ark-ui.com) — the official multi-framework layer on the Zag.js machines — and every visual decision lives in our style layer. We do not reimplement interaction logic; our value is the paper-and-ink design language, the token system, and the lighting engine.

## Architecture

| Layer      | Technology                                  | Owns                                                                  |
| ---------- | ------------------------------------------- | --------------------------------------------------------------------- |
| Components | [Ark UI](https://ark-ui.com) (`@ark-ui/*`)  | interaction, state, ARIA, popper positioning — headless, unstyled     |
| Styling    | `@bysages/core` component styles            | the only visual layer: native CSS scoped by `[data-scope][data-part]` |
| Lighting   | `@bysages/core` lighting engine (planned)   | dynamic light: source model + a state → CSS-variable pipeline         |
| Theming    | design tokens → CSS custom properties       | palettes, light/dark, contrast & density tiers, `@layer`              |
| Responsive | native CSS Container Queries (`@container`) | components respond to their container, not the viewport               |
| Frameworks | React, Vue, Solid, Svelte                   | thin wrappers: API narrowing + style injection, no DOM of our own     |

Notes an agent must not miss:

- The framework matrix is whatever Ark UI supports — React, Vue, Solid, Svelte. **Web Components are explicitly out of scope.**
- Ark renders the anatomy attributes our CSS styles against (`data-scope`, `data-part`, `data-state`, …), so one stylesheet serves every framework. Wrappers add no structural DOM beyond Ark's anatomy; all styling happens in `@bysages/core`, never inline in a wrapper.
- Animations follow Ark's contract: keyframes hooked on `[data-state="open"]` / `[data-state="closed"]`; Ark postpones unmounting so exit animations always finish. Components also expose CSS variables (`--transform-origin`, `--reference-width`, `--available-width`) — consume them, never recompute them.
- Overlay stacking uses one shared base z-index for every dismissible layer, ordered by Zag's `--layer-index`: content and positioner `calc(var(--bs-z-overlay) + var(--layer-index, 0))`, backdrop one below. Never use `var(--z-index, …)` for the base — Zag writes `--z-index: auto` inline when no nested layer is in play, which defeats the fallback. Never give each component its own base — nested dialog/menu/popover combos must stack correctly.
- Floating positioning is built into the Ark components (popper). Do not add Floating UI as a direct dependency.
- Styling is native CSS driven by CSS variables. No utility framework is a dependency of component styles; utility-friendly output may exist at the wrapper layer, never in the core.
- Container queries need a containment context: components establish their own `container` boundaries; never couple component breakpoints to media queries.
- Tokens are the only allowed source of visual values in components — colors, spacing, radius, elevation, motion. If a value is hardcoded in a component, it is a bug.
- The lighting engine computes light (source, elevation, pigment bleed) and writes CSS variables; component CSS only ever consumes those variables. Keep the pipeline in core so every framework benefits at once.

## Design Language

Paper and ink (以光为影 — _light as shadow_): interfaces are warm paper, content is ink, hierarchy is light. Surfaces are never pure `#ffffff`; the ground rests in ambient shade; primary actions default to ink (monochrome, solemn) with switchable mineral-pigment accent themes (`[data-accent]`: qinghua cobalt / celadon / zhusha cinnabar); semantic colors are fixed pigments (bamboo success, ochre warning, cinnabar danger, ultramarine info) independent of the accent.

Shape is a signature: 方寸为章，器物为圆 — controls are square-cut at `--bs-radius-sm` (6px) like a seal; vessels (cards, dialogs) stay round at `--bs-radius-lg` and up. Control labels carry `--bs-tracking-label` (0.02em CJK tracking). Headings ride the song-serif stack (`--bs-font-serif`), UI chrome rides the hei stack (`--bs-font-sans`).

The full system — principles, spacing, typography, surface ladder, lighting model, motion grammar, density, a11y, review checklist — is specified in [DESIGN.md](./DESIGN.md). The control recipe every interactive component follows:

- **Rest state** — paper-white surface (`--bs-color-surface-2`), one hairline (`--bs-color-border`), `--bs-shadow-xs`. Nothing else.
- **Hover** — the hairline deepens (`--bs-color-border-strong`); filled states deepen their fill and let the ink bleed (the shadow spreads on a slower transition than the fill — light needs time). No background swaps on outline controls.
- **Focus** — the hairline turns `--bs-color-primary` plus the focus halo (`--bs-focus-ring`: a crisp inner line inside a soft, wide glow). Never a background change.
- **Pressed** — the shadow lets go (the control settles into the page).
- **Selected/checked** — flat primary fill, on-primary content, no inner shadow, no lit edge.
- **Invalid** — hairline turns `--bs-color-danger`; disabled — muted surface, no shadow, no cursor tricks.
- **Inputs rely on border + surface + focus halo**, not shadow, to read as fields.

Three constraints from the spec that bite in CSS specifically:

- Cast shadows are reserved for things that actually leave the page (cards e1/2, dropdowns e3, dialogs e4/5). The ladder is computed from `--bs-shadow-ink` / `--bs-light-x` / `--bs-light-reach`, never copy-pasted. Custom properties resolve their own `var()` references at the declaring element, so a colored surface that casts in its own color declares `--bs-shadow-color` locally and composes its `box-shadow` from the lighting parts inline (see the dialog trigger).
- Hover specificity overrides `[data-state]` rules — selected/invalid rules must exclude hover explicitly (`:hover:not([data-state="on"])` pattern).
- The inset ring variant is its own token (`--bs-focus-ring-inset`) — never prefix `var(--bs-focus-ring)` with `inset`, which corrupts the multi-layer shadow.

Motion grammar: light needs time (shadows transition ~1.5× slower than the property that raised them); ink bleeds (panel entrances use `bs-ink-in` — fade + blur dissolve, never pop); puppets have strings (moving parts overshoot on `--bs-ease-spring`; lists stagger on `--bs-stagger-step`). Reduced-motion retunes durations to 1ms — states remain, animation does not.

Sizing: control heights sm 28 / md 32 / lg 36 px (`--bs-control-height-*`); buttons and inputs default to md, chips and segmented items to sm. Density has four tiers (compact / default / comfortable / spacious via `[data-density]`); it scales whitespace, never type size or contrast.

Constraints that follow from the premise:

- **Inclusive across ages** — legible defaults, WCAG-contrast tiers, generous density options, not a fork.
- **Chinese × Western** — 留白 (restraint, negative space) meets Western minimalism; typography-first, no decorative noise.
- **Industry-neutral core** — any action _can_ be the primary; the components never presume an industry, so the same button serves an export report, a civic portal, and an editorial product.

Reference points: shadcn/ui (ownership + CSS-variable theming), Linear (surface ladder + hairlines, no per-control shadows), Vercel Geist (compact control register), WeUI (familiar softness), TDesign/Office (information density), Fluent UI 2 (token layering), Nuxt UI 4 (semantic color aliases), Ark UI (Zag-based multi-framework API shape).

## AI Interface

Elements must stay legible to coding agents — achieved by how components and docs are written, not by special tooling.

- **Anatomy is a stable contract.** Parts carry `data-scope` / `data-part` and machine state attributes (`data-state`, `data-open`, …). Codegen, tests, and agents rely on them; never rename casually.
- **Props and types are the API docs.** Keep them precise and self-describing; document patterns (density selection, responsive re-organization, info-priority rules) in plain markdown alongside components.

## Package Layout

```
packages/tokens/src/    @bysages/tokens — DTCG design-token source compiled with style-dictionary 4 → CSS variables + types (elevation/lighting, density, themes)
packages/core/src/      @bysages/core — theme engine, per-component styles + injection, and (planned) the lighting engine
packages/react/src/     @bysages/react — Ark wrappers for React
packages/vue/src/       @bysages/vue — Ark wrappers for Vue
packages/solid/src/     @bysages/solid — Ark wrappers for Solid
packages/svelte/src/    @bysages/svelte — Ark wrappers for Svelte
packages/charts/src/    @bysages/charts — TanStack Charts re-exported per framework, inked from the tokens
packages/workflow/src/  @bysages/workflow — headless workflow graph protocol (store/serialize) + the X6 canvas adapter, styled from core
```

Each package develops and demonstrates its components through **Storybook** — stories are colocated next to the source (`src/components/**/*.stories.tsx`) and served with `pnpm dev` from the package root (dev-only, never published). One story file per component, mirroring the wrapper layout. The docs site (Nuxt + Nuxt Content, Docus-style layer with our own UI) lives in `docs/` and consumes `@bysages/docs-theme`.

Tokens are real today; the wrapper packages and the core style layer are the current build-out. `@bysages/charts` (TanStack Charts themed from tokens) ships on top of the wrappers; `@bysages/table` (TanStack Table) is planned next.

## Build

Commands live in [CONTRIBUTING.md](./CONTRIBUTING.md) → Development Setup. The cross-package rule an agent must not miss:

> Wrapper packages import `@bysages/core` by package name (→ `dist`), so **core src changes need `pnpm --filter @bysages/core build`** before they show in the wrappers.

## Generated Files

Several trees in the repo are **build output — never edit them by hand**; change the source the generator reads, then re-run the generator:

| Generated                            | Source of truth                                                                                                                                   | Regenerate                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `docs/content/**` (both shelves)     | wrapper JSDoc/types (via docgen) · `docs/scripts/component-sections.ts` (shelf partition) · `docs/app/components/examples/<family>/*.vue` (demos) | `pnpm docs:content` (`docs:content:check` to verify) |
| `docs/app/storybook-links.json`      | vue stories (demo → story deep links)                                                                                                             | `pnpm --filter @bysages/docs-site build:links`       |
| `docs/public/storybook/` (workbench) | vue stories, static build                                                                                                                         | `pnpm --filter @bysages/docs-site build:workbench`   |

Rules that follow:

- `component-sections.ts` must partition every discovered family exactly once — the generator fails loudly on a miss or a duplicate. Page numbers follow the families' global byte order, not the shelves: moving a family between shelves renames only that family's files (URLs are unaffected; the slug is the name's last segment).
- A new demo is just a `.vue` file in `examples/<family>/`; the generator picks it up on the next `docs:content`.
- React stories mirror the vue stories (same titles, same story export names — they are the deep-link keys). `solid`/`svelte` have no storybook.

## Behavioral Guidelines

- State assumptions explicitly. If uncertain, ask before implementing.
- No features beyond what was asked. No speculative abstractions.
- Touch only what you must. Match existing style.
- Transform tasks into verifiable goals. Loop until verified.
