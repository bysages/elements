import type { HTMLAttributes } from "svelte/elements";

export interface BlockUIProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the curtain is drawn. */
  blocked?: boolean;
  children?: import("svelte").Snippet;
}
