import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ImageProps extends HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  fit?: "cover" | "contain" | "fill" | "none";
  /** Intrinsic width passed to the image, so layout is stable while it loads. */
  width?: number | string;
  /** Intrinsic height passed to the image, so layout is stable while it loads. */
  height?: number | string;
  loading?: "lazy" | "eager";
  /** What a broken source leaves — the quiet placeholder icon by
   * default. */
  fallback?: Snippet;
}
