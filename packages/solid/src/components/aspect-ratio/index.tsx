import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/** A frame that keeps its shape: the box holds the given ratio whatever
 * the width it is dealt, and the child fills the frame it is given. */
export interface AspectRatioProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** A CSS `aspect-ratio` value — "16 / 9", "4 / 3", "1 / 1". */
  ratio?: string;
}

export function AspectRatio(props: AspectRatioProps) {
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
}

injectComponentStyle("aspect-ratio");
