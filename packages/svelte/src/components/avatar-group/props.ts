import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}
