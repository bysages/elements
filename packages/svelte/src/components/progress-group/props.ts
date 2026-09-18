import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

/** One verdict on the bar. */
export interface ProgressSegment {
  value: number;
  label?: string;
  pigment?: "primary" | "success" | "warning" | "danger" | "info";
}

export interface ProgressGroupProps extends HTMLAttributes<HTMLDivElement> {
  segments: ProgressSegment[];
  max?: number;
  showLegend?: boolean;
  children?: Snippet;
}
