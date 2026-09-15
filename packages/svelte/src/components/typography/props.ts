import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface TypographyPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
