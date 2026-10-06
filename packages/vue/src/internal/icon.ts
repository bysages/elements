import { getIcon } from "@bysages/core/icons";
import { h, type VNode } from "vue";

/** Resolve a curated core icon for the components' own render output. */
function resolve(name: string) {
  const icon = getIcon(name);
  if (!icon) throw new Error(`Unknown icon "${name}" in the curated core registry`);
  return icon;
}

/** Render a curated core icon as a bare svg node — the components' own
 * default icons. No span shell: the part rules size the svg directly.
 * Extra body appends after the icon's own paths, for composed marks. */
export function iconNode(name: string, attrs: Record<string, unknown> = {}, extraBody = ""): VNode {
  const icon = resolve(name);
  return h("svg", {
    viewBox: `0 0 ${icon.width} ${icon.height}`,
    "aria-hidden": "true",
    ...attrs,
    innerHTML: icon.body + extraBody,
  });
}

/** The same curated icon as an HTML string, for enhancements that write
 * innerHTML rather than mount vnodes. */
export function iconHtml(name: string, attrs: Record<string, string> = {}): string {
  const icon = resolve(name);
  const pairs = Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");
  return `<svg width="${icon.width}" height="${icon.height}" viewBox="0 0 ${icon.width} ${icon.height}" aria-hidden="true"${pairs}>${icon.body}</svg>`;
}

/** The curated icon's drawing body, for composed marks that share one svg. */
export function iconBody(name: string): string {
  return resolve(name).body;
}
