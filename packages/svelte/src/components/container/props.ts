import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "readable" | "wide" | "full";
  /** Keep the ink off the page edges when the viewport runs narrower
   * than the measure. */
  padding?: boolean;
  children?: Snippet;
}
