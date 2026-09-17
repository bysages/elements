import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** The seam runs across the group (default) or down it. */
  orientation?: "horizontal" | "vertical";
  /** One register for every member: falls onto data-size for the
   * stylesheet to retune the buttons' heights. */
  size?: "sm" | "md" | "lg";
  children?: Snippet;
}
