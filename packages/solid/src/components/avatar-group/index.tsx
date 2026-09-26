import { injectComponentStyle } from "@bysages/core";
import { splitProps, type JSX } from "solid-js";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export interface AvatarGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** One register for every seal: falls onto data-size for the
   * stylesheet to re-point the avatars' measure. */
  size?: "sm" | "md" | "lg";
}

export function AvatarGroup(props: AvatarGroupProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <div {...rest} data-scope="avatar-group" data-part="root" data-size={own.size} />;
}

injectComponentStyle("avatar-group");
