import { injectComponentStyle } from "@bysages/core";
import AvatarGroupComponent from "./AvatarGroup.svelte";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export const AvatarGroup = AvatarGroupComponent;

export type { AvatarGroupProps } from "./props";

injectComponentStyle("avatar-group");
