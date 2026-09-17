import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface DescriptionsRootProps extends HTMLAttributes<HTMLDListElement> {
  /** The horizontal layout reads as a table of two columns; the
   * vertical one stacks each pair for narrow measures. */
  layout?: "horizontal" | "vertical";
  children?: Snippet;
}

export interface DescriptionsPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
