import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface MasonryProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  children?: Snippet;
}
