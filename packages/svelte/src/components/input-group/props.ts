import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface InputGroupProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

export interface InputGroupAddonProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}
