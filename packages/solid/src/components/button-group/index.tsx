import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface ButtonGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The seam runs across the group (default) or down it. */
  orientation?: "horizontal" | "vertical";
  /** One register for every member: falls onto data-size for the
   * stylesheet to retune the buttons' heights. */
  size?: "sm" | "md" | "lg";
}

/**
 * Buttons fused into one control: the group owns only the joinery, so
 * members keep every variant they were given — a solid action can sit
 * beside an outline one and the seam still reads. Selection belongs to
 * the toggle group; this is layout alone.
 */
export function ButtonGroupRoot(props: ButtonGroupProps) {
  const [own, rest] = splitProps(props, ["orientation", "size"]);
  return (
    <div
      {...rest}
      role="group"
      data-scope="button-group"
      data-part="root"
      data-orientation={own.orientation ?? "horizontal"}
      data-size={own.size}
    />
  );
}

export const ButtonGroup = Object.assign(ButtonGroupRoot, { Root: ButtonGroupRoot });

injectComponentStyle("button-group");
