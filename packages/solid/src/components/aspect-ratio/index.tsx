import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

/** A frame that keeps its shape: the box holds the given ratio whatever
 * the width it is dealt, and the child fills the frame it is given. */
export interface AspectRatioProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** A CSS `aspect-ratio` value — "16 / 9", "4 / 3", "1 / 1". */
  ratio?: string;
}

export const AspectRatio = withSelfRoot(function AspectRatio(props: AspectRatioProps) {
  injectComponentStyle("aspect-ratio");
  const [own, rest] = splitProps(props, ["ratio"]);
  return (
    <div
      {...rest}
      style={{
        ...(rest.style as JSX.CSSProperties),
        "--bs-aspect-ratio": own.ratio ?? "1 / 1",
      }}
      data-scope="aspect-ratio"
      data-part="root"
    />
  );
});
