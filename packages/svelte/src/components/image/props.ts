import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ImageProps extends HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none";
  loading?: "lazy" | "eager";
  /** What a broken source leaves — the quiet placeholder glyph by
   * default. */
  fallback?: Snippet;
}
