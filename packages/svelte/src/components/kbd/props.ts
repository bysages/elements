import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
