import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface MeterRootProps extends HTMLAttributes<HTMLDivElement> {
  /** The measured value — clamped between min and max. */
  value: number;
  min?: number;
  max?: number;
  /** The pigment the ink rides: primary unless a threshold is crossed. */
  level?: "normal" | "success" | "warning" | "danger";
  label?: string;
  children?: Snippet;
}

export interface MeterPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
