import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes } from "react";

/** A frame that keeps its shape: the box holds the given ratio whatever
 * the width it is dealt, and the child fills the frame it is given. */
export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** A CSS `aspect-ratio` value — "16 / 9", "4 / 3", "1 / 1". */
  ratio?: string;
}

export function AspectRatio({ ratio = "1 / 1", ...rest }: AspectRatioProps) {
  return (
    <div
      {...rest}
      style={{ ...rest.style, "--bs-aspect-ratio": ratio } as CSSProperties}
      data-scope="aspect-ratio"
      data-part="root"
    />
  );
}

injectComponentStyle("aspect-ratio");
