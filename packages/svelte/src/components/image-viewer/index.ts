import { injectComponentStyle } from "@bysages/core";

import ImageViewerComponent from "./ImageViewer.svelte";

/** A lightbox: the picture over a dimmed page, with a small toolbar
 * beneath it. Zoom is the reader's hand (half to three times,
 * clamped), a quarter turn at a time rotates, Escape and the scrim
 * close — the dialog machine carries the modal part. `open` may stay
 * with the caller (`bind:open`); left alone the viewer keeps it to
 * itself. */
export const ImageViewer = ImageViewerComponent;

export type { ImageViewerProps } from "./props";

injectComponentStyle("image-viewer");
