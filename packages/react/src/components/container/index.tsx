import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** The reading frame: content held to a measure and centered on the
 * page. The sizes name typographic measures, not breakpoints — the page
 * owns its edges, the container only owns how long a line of ink runs. */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "readable" | "wide" | "full";
  /** Keep the ink off the page edges when the viewport runs narrower
   * than the measure. */
  padding?: boolean;
}

function ContainerImpl({ size = "readable", padding = true, ...rest }: ContainerProps) {
  injectComponentStyle("container");
  return (
    <div
      {...rest}
      data-scope="container"
      data-part="root"
      data-size={size}
      data-padding={padding ? "" : undefined}
    />
  );
}

export const Container = withSelfRoot(ContainerImpl);
