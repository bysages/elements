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

export interface BannerFacadeProps extends HTMLAttributes<HTMLElement> {
  /** The status pigment; ink is the neutral register. */
  status?: BannerStatus;
  /** The line the reader reads first. */
  title?: string;
  /** The supporting line. */
  message?: string;
  /** Renders the close and lets the facade retire itself. */
  dismissible?: boolean;
  /** Extra body content after the title and message. */
  children?: Snippet;
  /** Row of answers inside the body. */
  actions?: Snippet;
}
