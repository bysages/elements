export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  /** Seal diameter: the small, medium, or large control rung. The
   * default (large) stands as tall as the biggest control so an avatar
   * rides a row without stretching it. */
  size?: AvatarSize;
  children?: import("svelte").Snippet;
}
