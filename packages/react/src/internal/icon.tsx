import { getIcon } from "@bysages/core/icons";
import type { ReactElement, SVGProps } from "react";

/** Render a curated registry icon as a bare svg element — the components
 * own default icons. No span shell: the part rules size the svg directly.
 * Extra body appends after the icon's own body, for composed marks. */
export function iconNode(
  name: string,
  attrs: Omit<SVGProps<SVGSVGElement>, "children" | "dangerouslySetInnerHTML"> &
    Record<`data-${string}`, string | undefined> = {},
  extraBody = "",
): ReactElement {
  const icon = getIcon(name);
  if (!icon) throw new Error(`Unknown icon "${name}" in the curated core registry`);

  return (
    <svg
      viewBox={`0 0 ${icon.width} ${icon.height}`}
      aria-hidden="true"
      {...attrs}
      dangerouslySetInnerHTML={{ __html: icon.body + extraBody }}
    />
  );
}

/** The curated icon's drawing body, for composed marks that share one svg. */
export function iconBody(name: string): string {
  const icon = getIcon(name);
  if (!icon) throw new Error(`Unknown icon "${name}" in the curated core registry`);
  return icon.body;
}

/** The same curated icon as an HTML string, for enhancements that write
 * innerHTML rather than mount elements. */
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
