import { Dialog as ArkDialog } from "@ark-ui/react/dialog";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import { Button } from "../button";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/** The toolbar's line-drawn glyphs, fresh per render. */
const TOOL_GLYPHS: Record<string, () => ReactNode> = {
  zoomIn: () => (
    <>
      <circle cx={11} cy={11} r={7} />
      <path d="m16.2 16.2 4.8 4.8" />
      <path d="M8 11h6" />
      <path d="M11 8v6" />
    </>
  ),
  zoomOut: () => (
    <>
      <circle cx={11} cy={11} r={7} />
      <path d="m16.2 16.2 4.8 4.8" />
      <path d="M8 11h6" />
    </>
  ),
  rotate: () => (
    <>
      <path d="M20.49 12A8.5 8.5 0 1 1 18 6.06" />
      <path d="M20.5 3.5v4h-4" />
    </>
  ),
  close: () => (
    <>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
};

/**
 * A lightbox: the picture over a dimmed page, with a small toolbar
 * beneath it. Zoom is the reader's hand (half to three times, clamped),
 * a quarter turn at a time rotates, Escape and the scrim close — the
 * dialog machine carries the modal part. `open` may stay with the
 * caller; left undefined the viewer keeps it to itself.
 */
export interface ImageViewerProps {
  src: string;
  alt?: string;
  open?: boolean;
  zoomable?: boolean;
  /** Reports the viewer's next state. */
  onOpenChange?: (open: boolean) => void;
}

export function ImageViewer({
  src,
  alt = "",
  open,
  zoomable = true,
  onOpenChange,
}: ImageViewerProps) {
  // Controlled when the caller owns `open`; uncontrolled otherwise —
  // an undefined `open` must not reach the machine, or it would
  // override the machine's own decisions.
  const [localOpen, setLocalOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const isOpen = open ?? localOpen;
  const setOpen = (value: boolean) => {
    if (open === undefined) setLocalOpen(value);
    onOpenChange?.(value);
  };

  // A fresh open starts at rest — the last session's zoom must not
  // leak into the next look.
  useEffect(() => {
    if (isOpen) {
      setScale(1);
      setRotation(0);
    }
  }, [isOpen]);

  function zoom(step: number) {
    setScale((current) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, current + step)));
  }

  function rotate() {
    setRotation((current) => (current + 90) % 360);
  }

  function toolButton(label: string, glyph: () => ReactNode, onClick: () => void) {
    return (
      <Button variant="ghost" square size="lg" aria-label={label} onClick={onClick}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {glyph()}
        </svg>
      </Button>
    );
  }

  return (
    <ArkDialog.Root
      // The picture is heavy: nothing of the lightbox rests in the page
      // while it is closed.
      open={isOpen}
      onOpenChange={(details) => setOpen(details.open)}
      lazyMount
      unmountOnExit
    >
      <Portal>
        <ArkDialog.Backdrop className="bs-image-viewer-backdrop" />
        <ArkDialog.Positioner className="bs-image-viewer-positioner">
          <ArkDialog.Content
            className="bs-image-viewer-content"
            aria-label={alt || "Image preview"}
          >
            <img
              data-scope="image-viewer"
              data-part="viewport"
              src={src}
              alt={alt}
              style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
            />
            <div data-scope="image-viewer" data-part="toolbar">
              {zoomable
                ? [
                    toolButton("Zoom in", TOOL_GLYPHS.zoomIn, () => zoom(SCALE_STEP)),
                    toolButton("Zoom out", TOOL_GLYPHS.zoomOut, () => zoom(-SCALE_STEP)),
                  ]
                : null}
              {toolButton("Rotate 90 degrees", TOOL_GLYPHS.rotate, rotate)}
              {toolButton("Close", TOOL_GLYPHS.close, () => setOpen(false))}
            </div>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

injectComponentStyle("image-viewer");
