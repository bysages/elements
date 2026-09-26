import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** One register for every seal: falls onto data-size for the
   * stylesheet to re-point the avatars' measure. */
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup({ size, children, ...rest }: AvatarGroupProps) {
  return (
    <div {...rest} data-scope="avatar-group" data-part="root" data-size={size}>
      {children}
    </div>
  );
}

injectComponentStyle("avatar-group");
