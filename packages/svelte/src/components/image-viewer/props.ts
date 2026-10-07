import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ImageViewerProps extends HTMLAttributes<HTMLElement> {
  src: string;
  alt?: string;
  /** The large image handed to the lightbox. */
  width?: number | string;
  /** The large image handed to the lightbox. */
  height?: number | string;
  /** The wrapped content that opens the lightbox. */
  children?: Snippet;
  /** Whether the lightbox is up. Bind it (`bind:open`) to control the
   * viewer; left alone it keeps the state to itself. */
  open?: boolean;
  zoomable?: boolean;
  /** The viewer's open state turned. */
  onOpenChange?: (open: boolean) => void;
}

export interface ImageViewerPreviewProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /** Visible beside the affordance over custom content. */
  label?: string;
  /** Custom doorway content; omit it for the default curated icon. */
  children?: Snippet;
}
