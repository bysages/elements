import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** One register for every seal: falls onto data-size for the
   * stylesheet to re-point the avatars' measure. */
  size?: "sm" | "md" | "lg";
}

function AvatarGroupImpl({ size, children, ...rest }: AvatarGroupProps) {
  injectComponentStyle("avatar-group");
  return (
    <div {...rest} data-scope="avatar-group" data-part="root" data-size={size}>
      {children}
    </div>
  );
}

export const AvatarGroup = withSelfRoot(AvatarGroupImpl);
