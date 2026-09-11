> **⚠️ Warning:** This project is not yet stable and may undergo significant changes before reaching version 1.0.0. We strongly advise against using it in production environments.

# By Sages Elements

[![npm downloads](https://img.shields.io/npm/dm/@bysages/core)](https://www.npmjs.com/package/@bysages/core)
[![GitHub Stars](https://img.shields.io/github/stars/bysages/elements)](https://github.com/bysages/elements/stargazers)
![GitHub License](https://img.shields.io/github/license/bysages/elements)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](https://www.contributor-covenant.org/version/2/1/code_of_conduct/)

> Elements is the UI component library of By Sages: component logic written once and shared by every rendering layer, responsive through native **CSS Container Queries**, and themed through **design tokens compiled to CSS variables** — one headless core, shipped as Vue components, React components, and Web Components.

[Discussions](https://github.com/bysages/elements/discussions) · [Report Issues](https://github.com/bysages/elements/issues)

⭐ **If Elements is useful to you, a star helps other developers find it.**

<!-- Hero visual goes here: ![By Sages Elements](./assets/hero.png) -->

## Why Elements?

- **Logic once, render everywhere** — interaction, state, and accessibility live in a framework-agnostic logic core; the Vue / React / Web Components layers are thin adapters over it, so behavior stays in perfect parity.
- **Container-driven responsiveness** — components respond to the space they are given (`@container`), not the viewport; the same component composes correctly in a sidebar, a card, or a full page.
- **Tokens all the way down** — palettes, type, spacing, radius, elevation, and density are design tokens exposed as CSS custom properties. Themes (light/dark, contrast tiers, density tiers) are data, never hardcoded styles.
- **Light as shadow (以光为影)** — hierarchy comes from light: luminance ramps, hairlines, soft glow, not heavy borders or drop shadows. The language bridges Chinese restraint (留白) and Western minimalism, with legible defaults and contrast/density tiers that serve both older and younger users, and both information-dense and airy layouts.

## Packages

| Package                                    | Version | Description                                                                       |
| ------------------------------------------ | ------- | --------------------------------------------------------------------------------- |
| [@bysages/core](./packages/core/README.md) | -       | Shared core — design tokens, theme engine, and framework-agnostic component logic |

Adapter packages (Web Components, Vue, React) are planned on top of the core.

## Quick Start

> 🚧 Under construction — installation and usage guides land with the first usable release.

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
pnpm build                       # Build all packages
cd packages/<pkg> && pnpm build  # Build one package
vp check                         # Lint & format
```

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
