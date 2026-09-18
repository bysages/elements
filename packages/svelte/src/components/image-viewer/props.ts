export interface ImageViewerProps {
  src: string;
  alt?: string;
  /** Whether the lightbox is up. Bind it (`bind:open`) to control the
   * viewer; left alone it keeps the state to itself. */
  open?: boolean;
  zoomable?: boolean;
  /** The viewer's open state turned. */
  onOpenChange?: (open: boolean) => void;
}
