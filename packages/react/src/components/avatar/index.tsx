import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them. The
 * API is Ark's own — Root, Image, Fallback. */
export const Avatar = ArkAvatar;

injectComponentStyle("avatar");
