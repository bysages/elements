import type { HTMLAttributes } from "svelte/elements";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
}
