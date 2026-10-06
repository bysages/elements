import { Avatar as ArkAvatar } from "@ark-ui/solid/avatar";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Avatar, dressed in the paper-and-ink system: a circular seal on
 * inset paper that holds initials until the image loads over them.
 * `size` picks a control-height rung for the seal — the core styles
 * re-point `--bs-avatar-size` per rung, and scenes can still retune the
 * variable directly. */
export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends ComponentProps<typeof ArkAvatar.Root> {
  /** Seal diameter: the small, medium, or large control rung. The
   * default (large) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
  /** The corner: round by default; square cuts it sharp, a stamp
   * beside a round portrait. */
  shape?: "circle" | "square";
}

function AvatarRoot(props: AvatarProps) {
  const [own, rest] = splitProps(props, ["size", "shape"]);
  const id = useElementId("avatar", () => rest.id);
  return (
    <ArkAvatar.Root {...rest} id={id()} data-size={own.size} data-shape={own.shape ?? "circle"} />
  );
}

/* Ark's namespace is frozen — spread copies the members so Root
 * can be the sized wrapper while the rest stay Ark's own parts. */
export const Avatar: typeof AvatarRoot &
  Omit<typeof ArkAvatar, "Root"> & { Root: typeof AvatarRoot } = defineFamily(AvatarRoot, {
  ...ArkAvatar,
  Root: AvatarRoot,
});

injectComponentStyle("avatar");
