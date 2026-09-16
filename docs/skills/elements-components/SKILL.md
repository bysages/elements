---
name: elements-components
description: |
  Use the Elements design system to build UI. Use when asked to:
  "add a dialog/menu/popover/tabs to my app", "use Elements", "install
  @bysages/*", "style a component with design tokens", "make the UI match
  our paper-and-ink system", "build a themed data table or chart",
  "build an AI chat or assistant UI", or when a project already depends
  on @bysages/react, @bysages/vue, @bysages/solid or @bysages/svelte.
  Covers installation, the Ark-based wrapper API, and the token
  discipline the components expect.
---

# Elements Components

Elements (By Sages) is a UI component library on the basis + vite-plus
toolchain. The premise: **Ark UI's headless components, dressed in our
design system.** Interactive components are thin wrappers over Ark UI
(Zag.js machines); every visual decision lives in `@bysages/core`'s
stylesheet layer, driven by design tokens. You never reimplement
interaction logic, and you never hardcode a visual value.

## Install

Pick the wrapper for your framework; components import from the package
root (`@bysages/vue`, `@bysages/react`, `@bysages/solid`, `@bysages/svelte`):

```sh
pnpm add @bysages/vue   # (react / solid / svelte likewise)
```

One package is enough: the first component import injects that
component's styles plus the whole token layer, and the theme engine
(`applyTheme`, `getTheme`) is re-exported from the same package root —
`@bysages/core` and `@bysages/tokens` ride along as dependencies.

The surface covers the usual families — actions, forms, overlays,
navigation, data display — plus the `Ai` conversation parts (message,
response, reasoning, tool, sources, prompt input) and the data layer:
`@bysages/table` and `@bysages/charts`, themed from the same tokens.

## Rules that keep the paper and ink

1. **Tokens are the only source of visual values.** Colors, spacing,
   radius, elevation and motion come from `--bs-*` custom properties. A
   hardcoded pixel or hex in component code is a bug.
2. **Style against the anatomy, not the framework.** Ark renders
   `data-scope` / `data-part` / `data-state` attributes; one stylesheet
   serves React, Vue, Solid and Svelte alike. Wrappers add no DOM.
3. **Floating positioning belongs to Ark.** Popover, menu, select and
   date-picker position themselves; never add Floating UI.
4. **Overlays share one z-index base.** Dismissible layers stack via
   `calc(var(--bs-z-overlay) + var(--layer-index, 0))` so nested
   dialog/menu/popover combos layer correctly.
5. **Components respond to their container, not the viewport.** Use the
   container queries the components establish; never media-query a
   component.
6. **In the Vue wrapper, controlled values are `v-model`-shaped.** Bind
   `:model-value` + `@update:model-value`; a `value` prop falls through
   to a DOM attribute and never reaches the state machine. `@value-change`
   is only reliable uncontrolled.
7. **`as-child` triggers delegate styling, don't lose it.** With
   `<Dialog.Trigger as-child><Button/></Dialog.Trigger>` the host
   element carries the dialog anatomy, so core ships delegation rules
   keyed on the Button seals (`data-variant`, `data-size`) that survive
   the takeover — don't re-style the host by hand.

## Live documentation

This skill covers the durable rules. For the current component list,
props and examples, the docs site serves the same content in
agent-readable form — prefer it over guessing an API:

- **MCP server** — `https://elements.bysages.com/mcp` with `list-pages`
  and `get-page`; add it once with
  `claude mcp add --transport http elements https://elements.bysages.com/mcp`
- **`llms.txt`** — `https://elements.bysages.com/llms.txt` indexes every
  page; `llms-full.txt` is the whole site as one markdown document
- **Raw markdown twins** — append `.md` to any page URL (or read the
  `/raw/...` path) for the page without the chrome

## Where to look next

Read the reference files in this skill directory for the token
cheatsheet and the architecture contract:

- `references/tokens.md` — the `--bs-*` vocabulary (surfaces, ink,
  pigments, spacing, radius, control heights, shadows, motion)
- `references/architecture.md` — package layout, the wrapper/core
  split, and the styling contract your own components must follow
