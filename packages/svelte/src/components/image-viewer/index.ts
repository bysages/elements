import { defineFamily } from "../../internal/family";
import { Dialog } from "../dialog";
import ImagePreview from "./ImagePreview.svelte";
import ImageViewerComponent from "./ImageViewer.svelte";

/** The viewer opens from any wrapped doorway; Dialog anatomy remains
 * available, and `Preview` adds the shared image door with its icon. */
const viewerParts = {
  ...(Dialog as unknown as Record<string, unknown>),
  Preview: ImagePreview,
} as unknown as Parameters<typeof defineFamily>[1];

export const ImageViewer = defineFamily(
  ImageViewerComponent,
  viewerParts,
) as unknown as typeof ImageViewerComponent &
  Omit<typeof Dialog, "Root"> & {
    Root: (typeof Dialog)["Root"];
    Preview: typeof ImagePreview;
  };

export type { ImageViewerProps, ImageViewerPreviewProps } from "./props";
