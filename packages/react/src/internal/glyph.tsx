import type { IconifyIcon } from "@bysages/icons";
import type { ReactElement, SVGProps } from "react";

/** Render a lucide glyph as a bare svg element — the components' own
 * default icons. No span shell: the part rules size the svg directly. */
export function glyphNode(
  glyph: IconifyIcon,
  attrs: Omit<SVGProps<SVGSVGElement>, "children" | "dangerouslySetInnerHTML"> = {},
): ReactElement {
  return (
    <svg
      viewBox={`0 0 ${glyph.width} ${glyph.height}`}
      aria-hidden="true"
      {...attrs}
      dangerouslySetInnerHTML={{ __html: glyph.body }}
    />
  );
}
