import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** Declare which edge the skeleton reserves for its sider — without
   * it the root is a single column. */
  sider?: "start" | "end";
  children?: Snippet;
}

/** A semantic block of the skeleton — header, footer, and the flow's
 * main content each land on their native element and their grid area. */
export interface LayoutRegionProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface LayoutSiderProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** The caller drives the fold — `bind:collapsed` mirrors every
   * change. */
  collapsed?: boolean;
  /** The rail's resting inline size — a layout parameter, not a visual
   * token, so it rides an inline variable. Bindable: the drag and the
   * arrow keys write through it. */
  width?: string;
  /** The inline size when folded. */
  collapsedWidth?: string;
  /** Offer the hairline at the flow edge: the rail's width follows the
   * hand (and the arrow keys), clamped by min/max, and every change
   * rides `bind:width`. */
  resizable?: boolean;
  /** The rail's narrowest inline size while resizing. */
  minWidth?: string;
  /** The rail's widest inline size while resizing. */
  maxWidth?: string;
  /** Receives the fold state, so a rail can swap its labels for icons
   * instead of being clipped mid-word by the narrowing edge. */
  children?: Snippet<[{ collapsed: boolean }]>;
}
