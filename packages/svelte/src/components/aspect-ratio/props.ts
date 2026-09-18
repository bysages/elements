import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  /** A CSS `aspect-ratio` value — "16 / 9", "4 / 3", "1 / 1". */
  ratio?: string;
  children?: Snippet;
}
