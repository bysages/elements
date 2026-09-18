import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "column" | "row";
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  align?: string;
  justify?: string;
  children?: Snippet;
}
