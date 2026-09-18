import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface AffixProps extends HTMLAttributes<HTMLDivElement> {
  /** Where the content pins when it reaches the top of the scrolling
   * ancestor — the height of any fixed header it must clear. */
  offsetTop?: string;
  /** Where it pins from the bottom instead, for footers and action bars. */
  offsetBottom?: string;
  children?: Snippet;
}
