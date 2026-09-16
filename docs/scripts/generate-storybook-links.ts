import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/** Map every docs demo to its Storybook story id, by matching the built
 * workbench's own index (storybook-static/index.json) against the demo
 * files on disk. Story titles are hand-written and drift from the
 * family slugs ("Auto Complete", "CascadeSelect"), so the ids cannot be
 * derived — they have to be read back from the build. The result feeds
 * the docs' per-demo "open the workbench" links. Run after
 * build:workbench; the committed JSON keeps the docs build independent
 * of whether the workbench happens to be built on a given machine. */

const docsRoot = path.resolve(import.meta.dirname, "..");
const vueRoot = path.resolve(docsRoot, "../packages/vue/src/components");
const examplesRoot = path.resolve(docsRoot, "app/components/examples");
const workbenchIndex = path.resolve(docsRoot, "public/storybook/index.json");
const outFile = path.resolve(docsRoot, "app/storybook-links.json");

/** Slugs compare without their dashes — "auto-complete" and
 * "autocomplete" are the same family under two spellings. */
const flat = (s) => s.replace(/[\s-]/g, "").toLowerCase();
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

const families = readdirSync(vueRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(path.join(vueRoot, e.name, "index.ts")))
  .map((e) => e.name);

if (!existsSync(workbenchIndex)) {
  console.error(
    `no workbench index at ${workbenchIndex} — run "pnpm --filter @bysages/vue build:workbench" first`,
  );
  process.exit(1);
}

const entries = JSON.parse(readFileSync(workbenchIndex, "utf8")).entries;

// Per family (flattened title key): the stories, with a same-named one
// first and the rest alphabetical, so a demo without its own story
// still lands on the family's most representative one.
const storiesOfFamily = new Map();
for (const entry of Object.values(entries)) {
  if (entry.type !== "story" || !entry.title?.startsWith("Components/")) continue;
  const [, section, familyTitle] = entry.title.split("/");
  const [familyKey, storyKey] = [flat(familyTitle), kebab(entry.id.split("--")[1])];
  const stories = storiesOfFamily.get(familyKey) ?? [];
  stories.push({
    id: entry.id,
    demo: storyKey,
    rank: storyKey === "basic" ? 0 : 1,
    name: storyKey,
  });
  storiesOfFamily.set(familyKey, stories);
}
for (const stories of storiesOfFamily.values()) {
  stories.sort((a, b) => a.rank - b.rank || a.name.localeCompare(b.name));
}

const links = {};
let unlinked = 0;
for (const family of families) {
  const examples = existsSync(path.join(examplesRoot, family))
    ? readdirSync(path.join(examplesRoot, family))
        .filter((f) => f.endsWith(".vue"))
        .map((f) => f.replace(/\.vue$/, ""))
    : [];
  // A demo deep-links to its same-named story when there is one, and
  // otherwise to the family's first story: the workbench stays one
  // click away even where the demo predates the stories. Story titles
  // are held to the docs' own rule — the family slug through
  // displayTitle — so the flattened lookup needs no per-family cases.
  const stories = storiesOfFamily.get(flat(family));
  for (const demo of examples) {
    const hit = stories?.find((s) => s.demo === demo) ?? stories?.[0];
    if (hit) links[`${family}/${demo}`] = hit.id;
    else unlinked++;
  }
}

const linked = Object.keys(links).length;
writeFileSync(outFile, JSON.stringify(links, null, 2) + "\n");
console.log(`storybook links: ${linked} demos → ${outFile}`);
if (unlinked) console.log(`  ${unlinked} demos without a matching story family — no link`);
if (linked === 0) process.exit(1);
