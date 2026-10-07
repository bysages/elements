import { readdirSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { componentFamilies, examplesRoot, exampleNames } from "./component-families.ts";
import { displayTitle } from "./display-title.ts";

/** Map every docs demo to its Storybook story id, by matching the built
 * workbench's own index (storybook-static/index.json) against the demo
 * files on disk. Story titles are hand-written and drift from the
 * family slugs ("Auto Complete", "CascadeSelect"), so the ids cannot be
 * derived — they have to be read back from the build. The result feeds
 * the docs' per-demo "open the workbench" links. Run after
 * build:workbench; the committed JSON keeps the docs build independent
 * of whether the workbench happens to be built on a given machine. */

const docsRoot = path.resolve(import.meta.dirname, "..");
const vueWorkbenchIndex = path.resolve(docsRoot, "public/storybook/index.json");
const reactWorkbenchIndex = path.resolve(docsRoot, "public/storybook/react/index.json");
const vueLinksFile = path.resolve(docsRoot, "app/storybook-links.json");
const reactLinksFile = path.resolve(docsRoot, "app/storybook-react-links.json");

/** Slugs compare without their dashes — "auto-complete" and
 * "autocomplete" are the same family under two spellings. */
const flat = (s: string) => s.replace(/[\s-]/g, "").toLowerCase();
const kebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// The families with demos: the vue components tree, plus the extra
// families (chart, workflow) that live in their own packages — their
// demo directories are the superset, and a family without demos
// matches nothing anyway.
const uniqueFamilies = [
  ...new Set([
    ...componentFamilies(),
    ...readdirSync(examplesRoot, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name),
  ]),
];

for (const [index, command] of [
  [vueWorkbenchIndex, "pnpm --filter @bysages/vue build:workbench"],
  [reactWorkbenchIndex, "pnpm --filter @bysages/react build:workbench"],
] as const) {
  if (!existsSync(index)) {
    console.error(`no workbench index at ${index} — run "${command}" first`);
    process.exit(1);
  }
}

type WorkbenchEntry = { type: string; title?: string; id: string };
type Story = { id: string; demo: string; rank: number; name: string };

function readStories(index: string) {
  const entries: Record<string, WorkbenchEntry> = JSON.parse(readFileSync(index, "utf8")).entries;
  const storiesOfFamily = new Map<string, Story[]>();
  for (const entry of Object.values(entries)) {
    if (entry.type !== "story" || !entry.title?.startsWith("Components/")) continue;
    const [, , familyTitle] = entry.title.split("/");
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
  return storiesOfFamily;
}

function writeLinks(storiesOfFamily: Map<string, Story[]>, outFile: string) {
  const links: Record<string, string> = {};
  const unlinked: string[] = [];
  for (const family of uniqueFamilies) {
    const examples = exampleNames(family);
    // A demo deep-links to its same-named story when there is one, and
    // otherwise to the family's first story: the workbench stays one
    // click away even where the demo predates the stories. Story titles
    // are held to the docs' own rule — the family slug through
    // displayTitle — so the flattened lookup needs no per-family cases.
    const stories = storiesOfFamily.get(flat(displayTitle(family)));
    for (const demo of examples) {
      const hit = stories?.find((s) => s.demo === demo) ?? stories?.[0];
      if (hit) links[`${family}/${demo}`] = hit.id;
      else unlinked.push(`${family}/${demo}`);
    }
  }

  // A family the workbench never built stories for (the headless logic
  // parts, or a wrapper that has not adopted the family yet)
  // legitimately has no link; a family that does have stories but
  // leaves a demo unlinked means the titles or demo names drifted — a
  // bug, and the run fails on it.
  const orphaned = unlinked.filter((key) =>
    storiesOfFamily.has(flat(displayTitle(key.split("/")[0]))),
  );
  if (orphaned.length) {
    console.error(
      `demos whose family has stories but no link — title or demo-name drift: ${orphaned.join(", ")}`,
    );
    process.exit(1);
  }

  const linked = Object.keys(links).length;
  writeFileSync(outFile, JSON.stringify(links, null, 2) + "\n");
  console.log(`storybook links: ${linked} demos → ${outFile}`);
  if (unlinked.length) console.log(`  ${unlinked.length} demos without a story family — no link`);
}

writeLinks(readStories(vueWorkbenchIndex), vueLinksFile);
writeLinks(readStories(reactWorkbenchIndex), reactLinksFile);
