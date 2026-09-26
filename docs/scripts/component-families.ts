import { readdirSync, existsSync } from "node:fs";
import path from "node:path";

/** The two discovery rules the docs generators share: what counts as a
 * component family (a directory under the vue wrappers with an index.ts),
 * and which demos a family carries (the .vue files under its examples
 * directory, name only). Keeping them in one place keeps the content
 * generator and the storybook links keyed by the same families. */

export const vueComponentsRoot = path.resolve(
  import.meta.dirname,
  "../../packages/vue/src/components",
);
export const examplesRoot = path.resolve(import.meta.dirname, "../app/components/examples");

/** The families the vue package defines, in the directory's own order —
 * callers that need the global byte order sort them themselves. */
export const componentFamilies = (): string[] =>
  readdirSync(vueComponentsRoot, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(path.join(vueComponentsRoot, e.name, "index.ts")))
    .map((e) => e.name);

/** The demo names a family carries, or none when it has no examples. */
export const exampleNames = (family: string): string[] => {
  const dir = path.join(examplesRoot, family);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".vue"))
    .map((f) => f.replace(/\.vue$/, ""));
};
