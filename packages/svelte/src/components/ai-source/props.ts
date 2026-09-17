import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface SourceProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Where the ink came from — also the link text when no children
   * are given; opens in a new tab, referrer-free. */
  href: string;
  children?: Snippet;
}

export interface SourcesProps extends HTMLAttributes<HTMLOListElement> {
  children?: Snippet;
}
