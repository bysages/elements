import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** The reading frame: content held to a measure and centered on the
 * page. The sizes name typographic measures, not breakpoints — the page
 * owns its edges, the container only owns how long a line of ink runs. */
export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "readable" | "wide" | "full";
  /** Keep the ink off the page edges when the viewport runs narrower
   * than the measure. */
  padding?: boolean;
}

export function Container({ size = "readable", padding = true, ...rest }: ContainerProps) {
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

injectComponentStyle("container");
