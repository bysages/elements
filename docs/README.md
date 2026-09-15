# Elements documentation site

The Elements documentation site — the live consumer of [`@bysages/docs-theme`](../packages/docs-theme). The layer supplies the shell, prose, landing, search, and the agent surfaces; this site adds only what is its own:

- `app/app.config.ts` — the brand (name, description, site, copyright)
- `content/` — the guide and reference markdown, bilingual (`zh/` + `en/`)
- `app/components/examples/` — one live demo per component page, referenced by the generated prose

## Generated content

The component and reference pages are **generated, never hand-edited** — every family is documented from the Vue wrappers' source through the shared extractors in [`scripts/generate-api-docs.ts`](../scripts/generate-api-docs.ts):

```bash
pnpm docs:content           # regenerate content/{zh,en}/02.components + 03.reference
pnpm docs:content:check     # regenerate and diff against disk (CI mode)
```

Live demos live beside the generator by file convention: `app/components/examples/<family>/<name>.vue`. Add a demo file and reference it from a story-mirroring page; the generator picks up prose, the bundler picks up the component.

## Develop

```bash
pnpm dev   # from this folder — http://localhost:3000
```

Core and wrapper sources are consumed from their `dist`, so rebuild a package (`pnpm --filter @bysages/core build`) before its changes show here — and restart this dev server afterwards.
