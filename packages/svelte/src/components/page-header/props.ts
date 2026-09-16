import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface PageHeaderPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
