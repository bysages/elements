import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface DeferredContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "placeholder"> {
  /** How much of the placeholder must be visible before the content
   * mounts, from 0 (any pixel) to 1 (the whole box). */
  threshold?: number;
  /** Drawn until the box approaches the viewport. */
  placeholder?: Snippet;
  children?: Snippet;
}
