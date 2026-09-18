import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** The seam runs across the group (default) or down it. */
  orientation?: "horizontal" | "vertical";
  /** One register for every member: falls onto data-size for the
   * stylesheet to retune the buttons' heights. */
  size?: "sm" | "md" | "lg";
  /** The members' corner register: retunes --bs-radius-control for the
   * whole fused shape — edges and trimmed seams keep one story. */
  radius?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  children?: ReactNode;
}

/**
 * Buttons fused into one control: the group owns only the joinery, so
 * members keep every variant they were given — a solid action can sit
 * beside an outline one and the seam still reads. Selection belongs to
 * the toggle group; this is layout alone.
 */
function Root({ orientation = "horizontal", size, radius, children, ...rest }: ButtonGroupProps) {
  return (
    <div
      {...rest}
      role="group"
      data-scope="button-group"
      data-part="root"
      data-orientation={orientation}
      data-size={size}
      data-radius={radius}
    >
      {children}
    </div>
  );
}

export const ButtonGroup = Object.assign(Root, { Root });

injectComponentStyle("button-group");
