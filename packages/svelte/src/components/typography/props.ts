import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface TypographyPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
