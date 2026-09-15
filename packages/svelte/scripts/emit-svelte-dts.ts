import { createRequire } from "node:module";
import { readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { emitDts } from "svelte2tsx";

/** Emit a `.svelte.d.ts` beside every `.svelte` source under `src`, the
 * same declaration form @ark-ui/svelte ships, so the pack toolchain's
 * declaration pass can resolve imports that point at svelte sources.
 * Only the Ark-free components have `.svelte` files — Ark wrappers get
 * their types from @ark-ui/svelte and need none.
 *
 * Previously emitted declarations must go first: TypeScript refuses to
 * write a declaration that is also part of its input set, so a stale run
 * would silently block every later one. `.d.ts` copies of plain `.ts`
 * sources are dropped too — the pack toolchain declares those itself. */
const srcRoot = path.resolve("src");
const walk = (dir, visit) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, visit);
    else visit(full);
  }
};
walk(srcRoot, (file) => {
  if (file.endsWith(".d.ts")) rmSync(file);
});

await emitDts({
  libRoot: "src",
  declarationDir: "src",
  svelteShimsPath: createRequire(import.meta.url).resolve("svelte2tsx/svelte-shims-v4.d.ts"),
  tsconfig: path.resolve("tsconfig.json"),
});

walk(srcRoot, (file) => {
  if (file.endsWith(".d.ts") && !file.endsWith(".svelte.d.ts")) rmSync(file);
});
