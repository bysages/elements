import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export type AvatarGroupProps = JSX.HTMLAttributes<HTMLDivElement>;

export function AvatarGroup(props: AvatarGroupProps) {
  return <div {...props} data-scope="avatar-group" data-part="root" />;
}

injectComponentStyle("avatar-group");
