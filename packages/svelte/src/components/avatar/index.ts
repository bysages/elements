import { Avatar as ArkAvatar } from "@ark-ui/svelte/avatar";
import { injectComponentStyle } from "@bysages/core";

import AvatarRoot from "./Avatar.svelte";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them.
 * `size` picks a control-height rung for the seal — the core styles
 * re-point `--bs-avatar-size` per rung, and scenes can still retune the
 * variable directly. */
export const Avatar = Object.assign({}, ArkAvatar, { Root: AvatarRoot });

injectComponentStyle("avatar");
