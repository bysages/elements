import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export type AlertStatus = "ink" | "info" | "success" | "warning" | "danger";

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  status?: AlertStatus;
  children?: Snippet;
}

export interface AlertPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
