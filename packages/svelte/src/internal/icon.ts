import { getIcon } from "@bysages/core/icons";

/** Render a curated core icon as an SVG string, for enhancements that write
 * innerHTML rather than mount elements. */
export function iconHtml(name: string, attrs: Record<string, string> = {}): string {
  const icon = getIcon(name);
  if (!icon) throw new Error(`Unknown icon "${name}" in the curated core registry`);
  const attributes = {
    width: String(icon.width),
    height: String(icon.height),
    viewBox: `0 0 ${icon.width} ${icon.height}`,
    "aria-hidden": "true",
    ...attrs,
  };
  const pairs = Object.entries(attributes)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join("");
  return `<svg${pairs}>${icon.body}</svg>`;
}
