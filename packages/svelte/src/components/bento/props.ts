import type { HTMLAttributes } from "svelte/elements";

export interface BentoProps extends HTMLAttributes<HTMLDivElement> {
  /** Tracks across the lattice. */
  columns?: number;
}
