import type { HTMLAttributes } from "svelte/elements";

export interface DockProps extends HTMLAttributes<HTMLDivElement> {
  /** The tallest an item swells under the hand — 1 stands still. */
  maxScale?: number;
  /** How far the hand reaches, in px, before an item stops answering. */
  radius?: number;
}
