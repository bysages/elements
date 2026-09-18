import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /** Switch to the auto-fill lattice: each track is at least this wide,
   * and the container decides how many fit. */
  minChildWidth?: string;
  children?: Snippet;
}
