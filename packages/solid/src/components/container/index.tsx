import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

/** The reading frame: content held to a measure and centered on the
 * page. The sizes name typographic measures, not breakpoints — the page
 * owns its edges, the container only owns how long a line of ink runs. */
export interface ContainerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "readable" | "wide" | "full";
  /** Keep the ink off the page edges when the viewport runs narrower
   * than the measure. */
  padding?: boolean;
}

export const Container = withSelfRoot(function Container(props: ContainerProps) {
  injectComponentStyle("container");
  const [own, rest] = splitProps(props, ["size", "padding"]);
  return (
    <div
      {...rest}
      data-scope="container"
      data-part="root"
      data-size={own.size ?? "readable"}
      data-padding={own.padding === false ? undefined : ""}
    />
  );
});
