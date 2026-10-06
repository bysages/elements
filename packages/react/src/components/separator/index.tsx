import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** The paper-ink hairline as a component: a named rule between sections.
 * Decorative separators drop the separator role, since the page reads
 * fine without them. */
export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function SeparatorImpl({
  orientation = "horizontal",
  decorative = false,
  ...rest
}: SeparatorProps) {
  injectComponentStyle("separator");
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

export const Separator = withSelfRoot(SeparatorImpl);
