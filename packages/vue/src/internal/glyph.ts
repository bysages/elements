import type { IconifyIcon } from "@bysages/icons";
import { h, type VNode } from "vue";

/** Render a lucide glyph as a bare svg node — the components' own default
 * icons. No span shell: the part rules size the svg directly. Extra body
 * appends after the glyph's own paths, for the composed marks that pair a
 * glyph with one drawn line. */
export function glyphNode(
  glyph: IconifyIcon,
  attrs: Record<string, unknown> = {},
  extraBody = "",
): VNode {
  return h("svg", {
    viewBox: `0 0 ${glyph.width} ${glyph.height}`,
    "aria-hidden": "true",
    ...attrs,
    innerHTML: glyph.body + extraBody,
  });
}

/** The same glyph as an HTML string, for the enhancements that write
 * innerHTML rather than mount vnodes. */
export function glyphHtml(glyph: IconifyIcon, attrs: Record<string, string> = {}): string {
  const pairs = Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");
  return `<svg width="${glyph.width}" height="${glyph.height}" viewBox="0 0 ${glyph.width} ${glyph.height}" aria-hidden="true"${pairs}>${glyph.body}</svg>`;
}
