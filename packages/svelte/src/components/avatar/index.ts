import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";

import { defineFamily } from "../../internal/family";
import AvatarRoot from "./Avatar.svelte";
import AvatarFacade from "./AvatarFacade.svelte";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them.
 * `size` picks a control-height rung for the seal — the core styles
 * re-point `--bs-avatar-size` per rung, and scenes can still retune the
 * variable directly. */
export const Avatar: typeof AvatarFacade &
  Omit<typeof ArkAvatar, "Root"> & {
    Root: typeof AvatarRoot;
  } = defineFamily(AvatarFacade, {
  ...ArkAvatar,
  Root: AvatarRoot,
});

export type { AvatarFacadeProps, AvatarProps, AvatarSize } from "./props";
