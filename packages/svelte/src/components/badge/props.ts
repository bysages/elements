import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  variant?: "solid" | "subtle" | "outline";
  children?: Snippet;
}
