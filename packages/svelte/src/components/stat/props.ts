import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface StatPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface StatDeltaProps extends HTMLAttributes<HTMLElement> {
  direction?: "up" | "down" | "flat";
}
