import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface TagProps extends HTMLAttributes<HTMLElement> {
  /** The pigment the tag is inked with; ink is the solemn default,
   * and the fixed pigments speak for their meaning. */
  tone?: "ink" | "primary" | "success" | "warning" | "danger" | "info";
  /** How the tag rests: a solid fill, an outline shell, a subtle
   * wash. The pressed state always reads as solid. */
  variant?: "solid" | "outline" | "subtle";
  /** Render the tag as a pressed button the consumer can toggle. */
  checkable?: boolean;
  /** The pressed state held from outside; omit it and the tag keeps
   * its own state from `defaultValue`. */
  checked?: boolean;
  defaultValue?: boolean;
  /** Render the quiet removal seal. */
  closable?: boolean;
  disabled?: boolean;
  onClose?: (event: MouseEvent) => void;
  children?: Snippet;
}
