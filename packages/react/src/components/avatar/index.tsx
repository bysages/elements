import { Avatar as ArkAvatar } from "@ark-ui/react/avatar";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

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
  const id = useElementId("avatar", props);
  const { size, shape = "circle", ...rest } = props;

  return <ArkAvatar.Root {...rest} id={id} data-size={size} data-shape={shape} />;
}

/* Ark's namespace is frozen — Object.assign copies the members so Root
 * can be the sized wrapper while the rest stay Ark's own parts. */
export const Avatar = Object.assign(AvatarRoot, {
  ...ArkAvatar,
  Root: AvatarRoot,
}) as typeof AvatarRoot & typeof ArkAvatar & { Root: typeof AvatarRoot };

injectComponentStyle("avatar");
