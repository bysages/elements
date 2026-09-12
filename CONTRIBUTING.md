# Contributing to Elements

Thanks for contributing! This guide covers the **workflow** for contributing and the **coding standards** that keep Elements consistent. For architectural context (layers, design language, theming rules), see [AGENTS.md](./AGENTS.md).

## Development Setup

```bash
pnpm install                                # install dependencies
pnpm build                                  # build all packages
cd packages/<pkg> && pnpm build             # build one package
cd packages/<pkg> && pnpm exec vp test run  # test one package
pnpm exec vp check                          # lint, format & type check
cd packages/<pkg> && pnpm dev               # storybook for one package (port 6006)
```

Prerequisites: Node.js 18+, pnpm 9+.

## Contribution Workflow

1. **Fork & clone** — fork on GitHub, clone your fork, add `upstream` (`git remote add upstream https://github.com/bysages/elements.git`).
2. **Branch** — branch off `main` (`feat/...`, `fix:...`, `docs/...`, …).
3. **Code** — follow the standards below; match existing style.
4. **Commit** — use [conventional commits](https://www.conventionalcommits.org/): `feat:`, `fix:`, `docs:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `chore:`, `revert:`.
5. **Push & PR** — push to your fork and open a PR against `upstream/main` (checklist below).

## Project Structure

The package map and the architecture layers live in [AGENTS.md](./AGENTS.md) — one source, kept current there.

## Coding Standards

### Naming

- **Functions**: camelCase with a semantic prefix — `create*` (factories), `resolve*` (derive from tokens/context), `attach*` / `connect*` (wire machine to DOM)
- **Files & directories**: kebab-case
- **Interfaces**: PascalCase, no `I` prefix, `Options` suffix, `readonly` properties
- **Constants**: `as const` objects (not `enum`), SCREAMING_SNAKE_CASE keys, lowercase values

```typescript
export const DensityMode = {
  COMFORTABLE: "comfortable",
  COMPACT: "compact",
} as const;
```

### Loops

| Scenario                        | Use                |
| ------------------------------- | ------------------ |
| Transform into new array        | `.map()`           |
| Filter                          | `.filter()`        |
| Side-effects, async, early exit | `for...of`         |
| Hot paths                       | `for...of` / `for` |

Avoid `.forEach()` — `for...of` is strictly superior.

### Component rules

- Interaction logic belongs to [Ark UI](https://ark-ui.com) — never reimplement it. A wrapper only narrows the API to our surface (props, events) and injects the component style from `@bysages/core`; it adds no structural DOM beyond Ark's anatomy.
- Component styles live in `@bysages/core`, scoped by `[data-scope][data-part]` — the anatomy attributes Ark renders in every framework.
- Visual values (color, spacing, radius, elevation, motion) come from tokens/CSS variables — never hardcoded in components.
- Responsiveness is container-driven (`@container`); media queries are reserved for global concerns.

## Pull Request Checklist

- [ ] `vp check` passes
- [ ] `pnpm build` + tests succeed for the changed package
- [ ] Naming & patterns follow the standards above
- [ ] Changes are minimal and focused — match existing style
