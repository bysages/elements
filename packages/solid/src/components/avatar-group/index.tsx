import { injectComponentStyle } from "@bysages/core";
import { splitProps, type JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export interface AvatarGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** One register for every seal: falls onto data-size for the
   * stylesheet to re-point the avatars' measure. */
  size?: "sm" | "md" | "lg";
}

export const AvatarGroup = withSelfRoot(function AvatarGroup(props: AvatarGroupProps) {
  injectComponentStyle("avatar-group");
  const [own, rest] = splitProps(props, ["size"]);
  return <div {...rest} data-scope="avatar-group" data-part="root" data-size={own.size} />;
});
