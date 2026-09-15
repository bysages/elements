import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface PageHeaderPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
