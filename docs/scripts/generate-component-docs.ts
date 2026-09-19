import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

import {
  documentFamily,
  type EmitDoc,
  type FamilyDoc,
  type PropDoc,
} from "../../scripts/generate-api-docs.ts";
import { componentNames } from "./component-names.ts";
import { componentSections } from "./component-sections.ts";
import { displayTitle } from "./display-title.ts";

/** Generate the two component shelves into content/{zh,en}:
 * 02.components (one page per family: description, live demos, props)
 * and 03.reference (the full per-part API as plain markdown tables —
 * search-indexable, no render component between the reader and the
 * data). Files stay flat — the shelf route is the family's route —
 * while each page's frontmatter carries its section label (the same
 * partition the Storybook sidebar uses) for the sidebar to group by.
 * The family list and every fact come from the vue wrappers (the
 * reference implementation) via the api extractor; examples are
 * discovered under app/components/examples/<family>. Both directories
 * are wiped and rebuilt on every run — the vue package is the single
 * source of truth, and hand edits here would drift. `--check`
 * regenerates in memory and fails if anything on disk differs. */

const docsRoot = path.resolve(import.meta.dirname, "..");
const vueRoot = path.resolve(docsRoot, "../packages/vue/src/components");
const examplesRoot = path.resolve(docsRoot, "app/components/examples");
const contentRoot = path.resolve(docsRoot, "content");

// Byte order of the numbered filenames — the order component-order.ts
// exports — where "avatar-group." precedes "avatar." because '-' < '.'.
const byFileName = (a: string, b: string) => (a + "." < b + "." ? -1 : a + "." > b + "." ? 1 : 0);

const discovered = readdirSync(vueRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(path.join(vueRoot, e.name, "index.ts")))
  .map((e) => e.name)
  .sort(byFileName);

// Families the directory scan cannot discover, with their pages
// synthesized here: the chart family lives in @bysages/charts, whose
// vue entry exports the Chart component, so the extractor has no
// wrapper to read. The page carries this description and the demos;
// the API tables stay with the package's published reference.
const extraFamilies: Record<string, FamilyDoc> = {
  chart: {
    family: "chart",
    source: "native",
    description:
      "Token-themed charts on the paper-and-ink tokens: the Chart component renders a ChartDefinition built from the mark factories, and the palette (chartColors, chartSeriesRange) hands the marks the live theme's pigments.",
    components: {},
  },
  workflow: {
    family: "workflow",
    source: "native",
    description:
      "A workflow canvas on the paper-and-ink tokens: createWorkflowCanvas mounts an X6 graph into any element and keeps a headless protocol store in step with every gesture — drag, connect, select, undo. The host mounts any component into a node through renderNode; the executor writes states back through the store, and the canvas only displays them.",
    components: {},
  },
};

// The section map must partition the discovered families exactly — a
// family missing from it or listed twice is a bug in the map, not a
// reason to silently drop or duplicate a page.
const families = componentSections.flatMap((s) => s.families);
const partitioned = new Set(families);
for (const family of discovered) {
  if (!partitioned.has(family)) {
    throw new Error(`family "${family}" is missing from component-sections.ts`);
  }
}
for (const family of families) {
  if (!discovered.includes(family) && !extraFamilies[family]) {
    throw new Error(`component-sections.ts lists "${family}" but no such family exists`);
  }
}
if (partitioned.size !== families.length) {
  throw new Error("component-sections.ts lists a family in more than one section");
}

// The page number is the family's place in the global byte order, not
// its section: sections only label the sidebar, so moving a family
// between shelves renames just that family's files and every other
// prefix stands still.
const globalOrder = new Map(
  [...discovered, ...Object.keys(extraFamilies)].sort(byFileName).map((f, i) => [f, i]),
);

const locales = ["zh", "en"] as const;

/** The shelf is a navigation group with no landing page — the header
 * links straight into the first family — so each group declares its
 * title in .navigation.yml, which the generator writes along with
 * everything else in the directory it owns. */
const shelves = {
  "02.components": { zh: "组件", en: "Components", icon: "i-lucide-component" },
  "03.reference": { zh: "参考", en: "Reference", icon: "i-lucide-book-marked" },
} as const;

const examplesOf = (family: string): string[] => {
  const dir = path.join(examplesRoot, family);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith(".vue"))
    .map((f) => f.replace(/\.vue$/, ""));
};

// Both shelves as { relative path → content }, relative to docs/.
const titleOf = (family: string, locale: string): string => {
  const display = displayTitle(family);
  const zhName = componentNames[family];
  return locale === "zh" && zhName ? `${zhName} ${display}` : display;
};

/** Single-line cells; markdown breaks on raw newlines and pipes, and
 * wrapped type literals collapse their indentation whitespace. */
const cell = (text: string) =>
  text.replace(/\r?\n/g, " ").replace(/\s+/g, " ").replace(/\|/g, "\\|") || "—";

/** The Default column already carries it — the prose repeats "@default N".
 * Cells stay single-line, whatever the source comment wrapped. */
const prose = (text: string) =>
  text
    .replace(/@default\s+[\s\S]*$/, "")
    .replace(/\s+/g, " ")
    .trim() || "—";

/** The part as the sections title it — "item-trigger" → "ItemTrigger". */
const partTitle = (part: string) =>
  part.replace(/(^|-)([a-z])/g, (_, h: string, c: string) => c.toUpperCase());

const markdownProps = (props: PropDoc[]): string[] => [
  "| Prop | Type | Default | Description |",
  "| --- | --- | --- | --- |",
  ...props.map(
    (p) =>
      `| \`${p.name}\` | \`${cell(p.type)}\` | ${p.default ? `\`${cell(p.default)}\`` : ""} | ${prose(p.description)} |`,
  ),
];

const markdownEmits = (emits: EmitDoc[]): string[] => [
  "| Event | Payload |",
  "| --- | --- |",
  ...emits.map((e) => `| \`${e.name}\` | \`${cell(e.payload)}\` |`),
];

const markdownSlots = (slots: { name: string }[]): string[] => [
  "| Slot |",
  "| --- |",
  ...slots.map((s) => `| \`#${s.name}\` |`),
];

const page = (
  title: string,
  description: string,
  sections: string[],
  navSection?: { locale: string; label: string },
): string => {
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description.replace(/\s*\n\s*/g, " ").trim())}`,
    ...(navSection ? ["navigation:", `  section: ${JSON.stringify(navSection.label)}`] : []),
    "---",
  ];
  if (!sections.length) return [...frontmatter, ""].join("\n");
  return [...frontmatter, "", sections.join("\n\n"), ""].join("\n");
};

const stemOf = (index: number, slug: string) => `${String(index + 1).padStart(2, "0")}.${slug}`;

/** The line a prop-less part carries in both shelves — the same words
 * the reference tables have always given them. */
const propslessLine = "A styled part — no props of its own; it takes the anatomy's shared styling.";

/** Both shelves as { relative path → content }, relative to docs/. */
function render(): Map<string, string> {
  const files = new Map<string, string>();
  for (const locale of locales) {
    for (const [dir, nav] of Object.entries(shelves)) {
      files.set(
        path.join("content", locale, dir, ".navigation.yml"),
        `title: ${nav[locale]}\nicon: ${nav.icon}\n`,
      );
    }
  }

  // The files stay flat — the shelf route is the family's route — while
  // each page's frontmatter carries its section label, which the sidebar
  // groups by. The prefixes read as one alphabetical shelf across the
  // sections; the sidebar's grouping never moves a number.
  for (const section of componentSections) {
    for (const family of section.families) {
      const doc = extraFamilies[family] ?? documentFamily(family);
      if (!doc) continue;

      // Every exported part rides the component page — its own words
      // first, then the API tables; the ones without props of their own
      // still belong to the list the reader scans.
      const propsGroups = Object.entries(doc.components).map(([name, c]) => {
        const head = [`### ${name}`];
        if (c.description) head.push("", c.description);
        if (c.props?.length) head.push("", ...markdownProps(c.props));
        else head.push("", propslessLine);
        return head.join("\n");
      });

      const demos = examplesOf(family).map(
        (name) => `<ComponentDemo name="${family}/${name}"></ComponentDemo>`,
      );

      const referenceSections: string[] = [];
      if (doc.anatomy?.parts?.length) {
        referenceSections.push(doc.anatomy.parts.map((p) => `\`${partTitle(p)}\``).join(" · "));
      }
      for (const [name, c] of Object.entries(doc.components)) {
        const part = [`## ${name}`];
        if (c.description) part.push("", c.description);
        if (c.props?.length) part.push("", ...markdownProps(c.props));
        if (c.emits?.length) part.push("", ...markdownEmits(c.emits));
        if (c.slots?.length) part.push("", ...markdownSlots(c.slots));
        if (!c.props?.length && !c.emits?.length && !c.slots?.length) {
          part.push(
            "",
            "A styled part — no props of its own; it takes the anatomy's shared styling.",
          );
        }
        referenceSections.push(part.join("\n"));
      }

      const stem = stemOf(globalOrder.get(family)!, family);
      for (const locale of locales) {
        const title = titleOf(family, locale);
        const usage = locale === "zh" ? "基础用法" : "Basic usage";
        const propsTitle = locale === "zh" ? "属性" : "Props";
        const navSection = {
          locale,
          label: locale === "zh" ? section.zh : section.en,
        };

        const componentPage: string[] = [];
        if (demos.length) {
          componentPage.push([`## ${usage}`, "", ...demos].join("\n\n"));
        }
        if (propsGroups.length) {
          componentPage.push([`## ${propsTitle}`, ...propsGroups].join("\n\n"));
        }
        for (const dir of Object.keys(shelves)) {
          const body = dir === "02.components" ? componentPage : referenceSections;
          files.set(
            path.join("content", locale, dir, `${stem}.md`),
            page(title, doc.description, body, navSection),
          );
        }
      }
    }
  }
  return files;
}

const checking = process.argv.includes("--check");
const files = render();

if (checking) {
  let stale = false;
  for (const [rel, content] of files) {
    const abs = path.join(docsRoot, rel);
    const onDisk = existsSync(abs) ? readFileSync(abs, "utf8") : "";
    if (onDisk !== content) {
      console.error(`stale: ${rel} — regenerate the component docs`);
      stale = true;
    }
  }
  process.exit(stale ? 1 : 0);
}

for (const locale of locales) {
  for (const dir of Object.keys(shelves)) {
    const groupDir = path.join(contentRoot, locale, dir);
    rmSync(groupDir, { recursive: true, force: true });
    mkdirSync(groupDir, { recursive: true });
  }
}
for (const [rel, content] of files) {
  const abs = path.join(docsRoot, rel);
  mkdirSync(path.dirname(abs), { recursive: true });
  writeFileSync(abs, content);
}

const pages = [...files.keys()].filter((f) => f.endsWith(".md")).length;
console.log(
  `component docs: ${families.length} families → ${pages} pages + ${Object.keys(shelves).length * locales.length} navigation groups`,
);
