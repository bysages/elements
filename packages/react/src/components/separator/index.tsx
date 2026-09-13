import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** The paper-ink hairline as a component: a named rule between sections.
 * Decorative separators drop the separator role, since the page reads
 * fine without them. */
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export function Separator({
  orientation = "horizontal",
  decorative = false,
  ...rest
}: SeparatorProps) {
  return (
    <div
      {...rest}
      role={decorative ? "none" : "separator"}
      data-scope="separator"
      data-part="root"
      data-orientation={orientation}
      aria-orientation={decorative ? undefined : orientation}
    />
  );
}

injectComponentStyle("separator");
