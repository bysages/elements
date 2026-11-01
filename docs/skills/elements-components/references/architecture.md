# Elements Architecture Contract

## Package layout

```
packages/tokens/src/    @bysages/tokens — DTCG design tokens → CSS variables + types
packages/core/src/      @bysages/core   — theme engine, per-component styles, injection
packages/react/src/     @bysages/react  — Ark wrappers for React
packages/vue/src/       @bysages/vue    — Ark wrappers for Vue
packages/solid/src/     @bysages/solid  — Ark wrappers for Solid
packages/svelte/src/    @bysages/svelte — Ark wrappers for Svelte
```

`@bysages/table` (TanStack Table) and `@bysages/charts` (TanStack Charts
themed from tokens) are the data layer on top.

## The wrapper / core split

- **Ark UI owns interaction.** Dialog, menu, popover, combobox, tabs and
  the rest are thin wrappers over the Ark component for the framework.
  The wrapper narrows the API and injects styles; it adds no structural
  DOM of its own.
- **`@bysages/core` owns every pixel.** Component styles are native CSS
  scoped by `[data-scope][data-part]` — the anatomy attributes Ark
  renders. One stylesheet serves every framework.
- **Cross-package rule:** wrappers import `@bysages/core` by package
  name, so core `src` changes need `pnpm --filter @bysages/core build`
  (plus a wrapper rebuild) before they show downstream.

## Styling rules for components you add

1. Scope selectors as `[data-scope="<scope>"][data-part="<part>"]` and
   let machine state ride `[data-state]`, `[data-open]`, and friends.
2. Tokens only — a hardcoded color, spacing or shadow is a bug (see
   `tokens.md`).
3. Hover beats `[data-state]` in specificity; selected/invalid rules
   must exclude hover explicitly (`:hover:not([data-state="on"])`).
4. Animations hook Ark's contract: keyframes on
   `[data-state="open"]` / `[data-state="closed"]`; Ark postpones
   unmounting so exit animations finish. Panels enter with the ink-in
   dissolve (fade + blur), never a pop.
5. Consume the CSS variables Ark exposes (`--transform-origin`,
   `--reference-width`, `--available-width`); never recompute them.
6. Container queries, not media queries — components respond to their
   container and establish their own containment context.
7. Every dismissible layer shares the overlay base:
   content and positioner `calc(var(--bs-z-overlay) +
   var(--layer-index, 0))`, backdrop one below. Never give a component
   its own base, and never fall back on `var(--z-index, …)` — Zag
   writes `--z-index: auto` inline when no nested layer is in play.

## Building your own components in this system

Follow the control recipe — rest: paper surface, one hairline,
`--bs-shadow-xs`; hover: the hairline deepens, fills deepen with the
shadow spreading slower than the fill; focus: primary hairline plus the
focus halo, never a background change; pressed: the shadow lets go;
selected: flat primary fill, no inner shadow; disabled: muted surface,
no shadow. Inputs rely on border + surface + focus halo, not shadow.
