import { Avatar as ArkAvatar } from "@ark-ui/vue/avatar";
import { injectComponentStyle } from "@bysages/core";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them. The parts — Root, Image, Fallback. */
export const Avatar = ArkAvatar;

injectComponentStyle("avatar");
