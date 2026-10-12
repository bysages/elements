import type { HTMLAttributes } from "svelte/elements";

export interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  value: number;
  max?: number;
  tone?: "ink" | "primary" | "success" | "warning" | "danger" | "info";
  variant?: "solid" | "subtle" | "outline";
}
