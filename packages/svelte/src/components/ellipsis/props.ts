import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface EllipsisProps extends HTMLAttributes<HTMLSpanElement> {
  lines?: number;
  children?: Snippet;
}
