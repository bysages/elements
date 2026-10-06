import { getIcon } from "@bysages/core/icons";
import type { JSX } from "solid-js";

function resolve(name: string) {
  const icon = getIcon(name);
  if (!icon) throw new Error(`Unknown icon "${name}" in the curated core registry`);
  return icon;
}

/** Render a curated core icon as a bare svg node — the components' own
 * default icons. No span shell: the part rules size the svg directly.
 * Extra body appends after the icon's own body, for composed marks. */
export function iconNode(
  name: string,
  attrs: JSX.SvgSVGAttributes<SVGSVGElement> & Record<`data-${string}`, string> = {},
  extraBody = "",
): JSX.Element {
  const icon = resolve(name);
  return (
    <svg
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      aria-hidden="true"
      {...attrs}
      innerHTML={icon.body + extraBody}
    />
  );
}

/** The same curated icon as an HTML string, for enhancements that write
 * innerHTML rather than mount elements. */
export function iconHtml(name: string, attrs: Record<string, string> = {}): string {
  const icon = resolve(name);
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

/** The curated icon's drawing body, for composed marks that share one svg. */
export function iconBody(name: string): string {
  return resolve(name).body;
}
