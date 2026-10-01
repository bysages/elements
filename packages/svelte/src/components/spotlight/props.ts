import type { HTMLAttributes } from "svelte/elements";

export interface SpotlightProps extends HTMLAttributes<HTMLDivElement> {
  /** How far the lamp throws before the ink swallows it. */
  radius?: string;
}
