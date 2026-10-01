import { copyFileSync, mkdirSync } from "node:fs";
import { basename } from "node:path";

/** The generative vocabulary has one author (the vue reference) and four
 * readers — this ships the same face file into every wrapper, so the
 * words the model composes with never drift between frameworks. Run via
 * `pnpm generate:generative`. */

const source = "packages/vue/src/generative/faces.ts";

for (const fw of ["react", "solid", "svelte"]) {
  const dir = "packages/" + fw + "/src/generative";
  mkdirSync(dir, { recursive: true });
  copyFileSync(source, dir + "/" + basename(source));
  console.log("generative faces ->", dir);
}
