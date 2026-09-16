import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

export type BannerStatus = "ink" | "info" | "success" | "warning" | "danger";

export interface BannerProps extends HTMLAttributes<HTMLElement> {
  status?: BannerStatus;
  children?: Snippet;
}

export interface BannerPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface BannerCloseProps extends HTMLButtonAttributes {}
