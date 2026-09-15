import type { HTMLAttributes } from "svelte/elements";

export interface SpinnerProps extends HTMLAttributes<HTMLElement> {
  size?: "sm" | "md" | "lg";
}
