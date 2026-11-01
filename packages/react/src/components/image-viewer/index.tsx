import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { createImageViewerGestures, type ImageViewerGestureController } from "@bysages/core";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { Dialog } from "../dialog";
import { ImageViewerPreview } from "./preview";

const SCALE_STEP = 0.25;

const TOOL_ICONS = {
  zoomIn: "zoom-in",
  zoomOut: "zoom-out",
  rotate: "rotate-cw",
  close: "x",
} as const;

/**
 * Opens the full lightbox from a curated icon by default, or from any
 * wrapped button, image or other doorway. Zoom, rotation, Escape and the scrim
 * stay in the viewer. Anatomy remains available on `ImageViewer.Root`.
 */
export interface ImageViewerProps {
  id?: string;
  src: string;
  alt?: string;
  open?: boolean;
  zoomable?: boolean;
  /** The large image handed to the lightbox. */
  width?: number | string;
  /** The large image handed to the lightbox. */
  height?: number | string;
  /** The wrapped content that opens the lightbox. */
  children?: ReactNode;
  /** Reports the viewer's next state. */
  onOpenChange?: (open: boolean) => void;
}

function ImageViewerImpl({
  src,
  alt = "",
  open,
  zoomable = true,
  width,
  height,
  children,
  onOpenChange,
  id,
}: ImageViewerProps) {
  injectComponentStyle("image-viewer");
  const hostId = useElementId("image-viewer", { id });
  const messages = useComponentMessages();
  // Controlled when the caller owns `open`; uncontrolled otherwise —
  // an undefined `open` must not reach the machine, or it would
  // override the machine's own decisions.
  const [localOpen, setLocalOpen] = useState(false);
  const viewportRef = useRef<HTMLImageElement | null>(null);
  const gesturesRef = useRef<ImageViewerGestureController | null>(null);

  const isOpen = open ?? localOpen;
  const setOpen = (value: boolean) => {
    if (open === undefined) setLocalOpen(value);
    onOpenChange?.(value);
  };

  // The lightbox is lazy, so bind gestures every time its image enters
  // the tree; leaving the tree resets the next opening to rest.
  useEffect(() => {
    const node = viewportRef.current;
    if (!node) return;

    const gestures = createImageViewerGestures(node, { zoomable });
    gesturesRef.current = gestures;
    return () => {
      gesturesRef.current = null;
      gestures.stop();
    };
  }, [isOpen, zoomable]);

  function toolButton(label: string, icon: string, onClick: () => void) {
    return (
      <Button variant="ghost" square size="lg" aria-label={label} onClick={onClick}>
        {iconNode(icon)}
      </Button>
    );
  }

  // The close rung is the dialog machine's own: the CloseTrigger
  // folds the lightbox, no local handler.
  function closeToolButton(label: string, icon: string) {
    return (
      <ArkDialog.CloseTrigger asChild>
        <Button variant="ghost" square size="lg" aria-label={label}>
          {iconNode(icon)}
        </Button>
      </ArkDialog.CloseTrigger>
    );
  }

  return (
    <ArkDialog.Root
      id={`${hostId}:dialog`}
      // The picture is heavy: nothing of the lightbox rests in the page
      // while it is closed.
      open={isOpen}
      onOpenChange={(details) => setOpen(details.open)}
      lazyMount
      unmountOnExit
    >
      <ArkDialog.Trigger asChild data-scope="image-viewer" data-part="trigger">
        {children ?? <ImageViewerPreview />}
      </ArkDialog.Trigger>
      <Portal>
        <ArkDialog.Backdrop className="bs-image-viewer-backdrop" />
        <ArkDialog.Positioner className="bs-image-viewer-positioner">
          <ArkDialog.Content
            className="bs-image-viewer-content"
            aria-label={alt || "Image preview"}
            // The content owns the whole screen, so the machine's
            // outside-click never fires — the scrim is always "inside".
            // A bare click on the content itself (the page around the
            // picture and its toolbar) reads as the scrim and closes;
            // clicks on the picture or the tools carry their own
            // targets and stay.
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <img
              data-scope="image-viewer"
              data-part="viewport"
              src={src}
              alt={alt}
              width={width}
              height={height}
              ref={viewportRef}
            />
            <div data-scope="image-viewer" data-part="toolbar">
              <ButtonGroup>
                {zoomable
                  ? [
                      toolButton(messages.imageViewer.zoomIn, TOOL_ICONS.zoomIn, () =>
                        gesturesRef.current?.zoomBy(SCALE_STEP),
                      ),
                      toolButton(messages.imageViewer.zoomOut, TOOL_ICONS.zoomOut, () =>
                        gesturesRef.current?.zoomBy(-SCALE_STEP),
                      ),
                    ]
                  : null}
                {toolButton(messages.imageViewer.rotate, TOOL_ICONS.rotate, () =>
                  gesturesRef.current?.rotate(),
                )}
                {closeToolButton(messages.imageViewer.close, TOOL_ICONS.close)}
              </ButtonGroup>
            </div>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

export const ImageViewer = Object.assign(ImageViewerImpl, {
  ...Dialog,
  Preview: ImageViewerPreview,
}) as typeof ImageViewerImpl & typeof Dialog & { Preview: typeof ImageViewerPreview };
