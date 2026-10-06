import { withSelfRoot } from "../../internal/family";
import AvatarGroupComponent from "./AvatarGroup.svelte";

/** Avatars overlapping one row, each rimmed in the ground so the pile
 * stays legible. */
export const AvatarGroup = withSelfRoot(AvatarGroupComponent);

export type { AvatarGroupProps } from "./props";
