import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export type AvatarGroupProps = HTMLAttributes<HTMLDivElement>;

export function AvatarGroup({ children, ...rest }: AvatarGroupProps) {
  return (
    <div {...rest} data-scope="avatar-group" data-part="root">
      {children}
    </div>
  );
}

injectComponentStyle("avatar-group");
