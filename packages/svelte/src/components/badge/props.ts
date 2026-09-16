import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
  children?: Snippet;
}
