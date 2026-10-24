import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface DialogPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
