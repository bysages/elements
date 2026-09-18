import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";

export interface BackTopProps extends HTMLButtonAttributes {
  /** How far the reader must have travelled (px) before the affordance
   * appears. */
  threshold?: number;
  /** The accessible name; the control is icon-only by default. */
  label?: string;
  /** The control's own content — the up-stroke glyph by default. */
  children?: Snippet;
}
