import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export interface ButtonProps extends HTMLButtonAttributes {
  variant?: "solid" | "outline" | "ghost" | "subtle";
  tone?: "ink" | "info" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  /** Icon-only: the silhouette squares to the control height. */
  square?: boolean;
  /** The tag to render in place of <button> — an anchor for link
   * buttons, say. Attributes ride it; there is no nested control. */
  as?: string;
  children?: Snippet;
}
