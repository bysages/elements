export interface ImageViewerProps {
  src: string;
  alt?: string;
  /** Intrinsic width passed to the preview image, so layout is stable while it loads. */
  width?: number | string;
  /** Intrinsic height passed to the preview image, so layout is stable while it loads. */
  height?: number | string;
  /** Whether the lightbox is up. Bind it (`bind:open`) to control the
   * viewer; left alone it keeps the state to itself. */
  open?: boolean;
  zoomable?: boolean;
  /** The viewer's open state turned. */
  onOpenChange?: (open: boolean) => void;
}
