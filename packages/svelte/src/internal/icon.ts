import { getIcon } from "@bysages/core/icons";

/** Render a curated core icon as an SVG string, for enhancements that write
 * innerHTML rather than mount elements. Extra body appends after the icon's
 * own paths, for composed marks. */
export function iconHtml(name: string, attrs: Record<string, string> = {}, extraBody = ""): string {
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
  return `<svg${pairs}>${icon.body + extraBody}</svg>`;
}

/** The curated icon's drawing body, for composed marks that share one svg. */
export function iconBody(name: string): string {
  const icon = getIcon(name);
  if (!icon) throw new Error(`Unknown icon "${name}" in the curated core registry`);
  return icon.body;
}
