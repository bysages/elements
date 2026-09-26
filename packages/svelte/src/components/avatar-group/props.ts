import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** One register for every seal: falls onto data-size for the
   * stylesheet to re-point the avatars' measure. */
  size?: "sm" | "md" | "lg";
  children?: Snippet;
}
