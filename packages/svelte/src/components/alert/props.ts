import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type AlertStatus = "ink" | "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  children?: Snippet;
}

export interface AlertPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
