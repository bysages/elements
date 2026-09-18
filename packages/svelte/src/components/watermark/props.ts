import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface WatermarkProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
  opacity?: number;
  rotate?: number;
  fontSize?: string;
  children?: Snippet;
}
