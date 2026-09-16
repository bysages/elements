import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

import { documentFamily, type EmitDoc, type PropDoc } from "../../scripts/generate-api-docs.ts";
import { componentNames } from "./component-names.ts";
import { displayTitle } from "./display-title.ts";

/** Generate the two component shelves into content/{zh,en}:
 * 02.components (one page per family: description, live demos, props)
 * and 03.reference (the full per-part API as plain markdown tables —
 * search-indexable, no render component between the reader and the
 * data). The family list and every fact come from the vue wrappers (the
 * reference implementation) via the api extractor; examples are
 * discovered under app/components/examples/<family>. Both directories
 * are wiped and rebuilt on every run — the vue package is the single
 * source of truth, and hand edits here would drift. `--check` regenerates
 * in memory and fails if anything on disk differs. */

const docsRoot = path.resolve(import.meta.dirname, "..");
const vueRoot = path.resolve(docsRoot, "../packages/vue/src/components");
const examplesRoot = path.resolve(docsRoot, "app/components/examples");
const contentRoot = path.resolve(docsRoot, "content");

// Byte order of the numbered filenames — the order component-order.ts
// exports — where "avatar-group." precedes "avatar." because '-' < '.'.
const byFileName = (a: string, b: string) => (a + "." < b + "." ? -1 : a + "." > b + "." ? 1 : 0);

const families = readdirSync(vueRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(path.join(vueRoot, e.name, "index.ts")))
  .map((e) => e.name)
  .sort(byFileName);

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

// The zh pages carry both scripts — TDesign style — so each page answers
// to either name in search and navigation.
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

const page = (title: string, description: string, sections: string[]): string => {
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description.replace(/\s*\n\s*/g, " ").trim())}`,
    "---",
  ];
  if (!sections.length) return [...frontmatter, ""].join("\n");
  return [...frontmatter, "", sections.join("\n\n"), ""].join("\n");
};

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

  for (const [index, family] of families.entries()) {
    const doc = documentFamily(family);
    if (!doc) continue;

    // Props ride the component page too — only the parts that own some,
    // the same rule the old render component filtered by.
    const propsGroups = Object.entries(doc.components)
      .filter(([, c]) => (c.props?.length ?? 0) > 0)
      .map(([name, c]) => [`### ${name}`, "", ...markdownProps(c.props!)].join("\n"));

    const demos = examplesOf(family).map(
      (name) => `<ComponentDemo name="${family}/${name}"></ComponentDemo>`,
    );

    const referenceSections: string[] = [];
    if (doc.anatomy?.parts?.length) {
      referenceSections.push(doc.anatomy.parts.map((p) => `\`${partTitle(p)}\``).join(" · "));
    }
    for (const [name, c] of Object.entries(doc.components)) {
      const part = [`## ${name}`];
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

    const stem = `${String(index + 1).padStart(2, "0")}.${family}`;
    for (const locale of locales) {
      const title = titleOf(family, locale);
      const usage = locale === "zh" ? "基础用法" : "Basic usage";
      const propsTitle = locale === "zh" ? "属性" : "Props";

      const componentSections: string[] = [];
      if (demos.length) {
        componentSections.push([`## ${usage}`, ...demos].join("\n"));
      }
      if (propsGroups.length) {
        componentSections.push([`## ${propsTitle}`, "", ...propsGroups].join("\n\n"));
      }
      files.set(
        path.join("content", locale, "02.components", `${stem}.md`),
        page(title, doc.description, componentSections),
      );
      files.set(
        path.join("content", locale, "03.reference", `${stem}.md`),
        page(title, doc.description, referenceSections),
      );
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
