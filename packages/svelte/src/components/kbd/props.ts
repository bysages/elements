import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
