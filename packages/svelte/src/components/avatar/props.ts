import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  /** Seal diameter: the small, medium, or large control rung. The
   * default (medium) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
  /** The corner: round by default; square cuts it sharp, a stamp
   * beside a round portrait. */
  shape?: "circle" | "square";
  children?: import("svelte").Snippet;
}

export interface AvatarFacadeProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /** The person's name; it becomes the image alt and initials. */
  name?: string;
  /** The portrait to load over the initials fallback. */
  src?: string;
  /** One rung of the control-height ladder; the Root defaults to medium. */
  size?: AvatarSize;
  /** The corner: round by default, square for a stamp. */
  shape?: "circle" | "square";
  /** Custom anatomy; omitted props let the facade render image and
   * initials. */
  children?: Snippet;
}
