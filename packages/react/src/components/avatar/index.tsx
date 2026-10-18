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

function initials(name?: string) {
  return (
    name
      ?.trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") ?? ""
  );
}

export interface AvatarProps extends ComponentProps<typeof ArkAvatar.Root> {
  /** Seal diameter: the small, medium, or large control rung. The
   * default (medium) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
  /** The corner: round by default; square cuts it sharp, a stamp
   * beside a round portrait. */
  shape?: "circle" | "square";
}

function AvatarRoot(props: AvatarProps) {
  const id = useElementId("avatar", props);
  const { size = "md", shape = "circle", ...rest } = props;

  return <ArkAvatar.Root {...rest} id={id} data-size={size} data-shape={shape} />;
}

export interface AvatarFacadeProps extends AvatarProps {
  /** The person's name; its first two initials wait beneath an image. */
  name?: string;
  /** The portrait to load over the name's initials. */
  src?: string;
}

function AvatarFacade({ name, src, size = "md", shape, children, ...rest }: AvatarFacadeProps) {
  return (
    <AvatarRoot size={size} shape={shape} {...rest}>
      {children ?? (
        <>
          {src ? <ArkAvatar.Image src={src} alt={name} /> : null}
          {name ? <ArkAvatar.Fallback>{initials(name)}</ArkAvatar.Fallback> : null}
        </>
      )}
    </AvatarRoot>
  );
}

AvatarFacade.displayName = "SAvatar";

/* Ark's namespace is frozen — Object.assign copies the members so the
 * facade can be the one-tag path while the rest stay Ark's own parts. */
export const Avatar = Object.assign(AvatarFacade, {
  ...ArkAvatar,
  Root: AvatarRoot,
}) as typeof AvatarFacade & typeof ArkAvatar & { Root: typeof AvatarRoot };

injectComponentStyle("avatar");
