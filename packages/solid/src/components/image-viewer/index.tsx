import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { injectComponentStyle } from "@bysages/core";
import { Show, createEffect, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { Button } from "../button";
import { ButtonGroup } from "../button-group";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/** The toolbar's line-drawn glyphs, fresh per render. */
const TOOL_GLYPHS = {
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
  /** The openness changed — from the scrim, Escape or the toolbar. */
  onOpenChange?: (open: boolean) => void;
}

export function ImageViewer(props: ImageViewerProps) {
  const [own] = splitProps(props, ["src", "alt", "open", "zoomable", "onOpenChange"]);
  // Controlled when the caller owns `open`; uncontrolled otherwise —
  // an undefined `open` must not reach the machine, or it would
  // override the machine's own decisions.
  const [localOpen, setLocalOpen] = createSignal(false);
  const [scale, setScale] = createSignal(1);
  const [rotation, setRotation] = createSignal(0);

  const isOpen = () => own.open ?? localOpen();
  const setOpen = (value: boolean) => {
    if (own.open === undefined) setLocalOpen(value);
    own.onOpenChange?.(value);
  };

  // A fresh open starts at rest — the last session's zoom must not
  // leak into the next look.
  createEffect(() => {
    if (isOpen()) {
      setScale(1);
      setRotation(0);
    }
  });

  function zoom(step: number) {
    setScale(Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale() + step)));
  }

  function rotate() {
    setRotation((rotation() + 90) % 360);
  }

  function toolButton(label: string, glyph: () => JSX.Element, onClick: () => void) {
    return (
      <Button variant="ghost" square size="lg" aria-label={label} onClick={onClick}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width={1.5}
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          {glyph()}
        </svg>
      </Button>
    );
  }

  return (
    <ArkDialog.Root
      open={isOpen()}
      onOpenChange={(details) => setOpen(details.open)}
      // The picture is heavy: nothing of the lightbox rests in the
      // page while it is closed.
      lazyMount
      unmountOnExit
    >
      <Portal>
        <ArkDialog.Backdrop class="bs-image-viewer-backdrop" />
        <ArkDialog.Positioner class="bs-image-viewer-positioner">
          <ArkDialog.Content
            class="bs-image-viewer-content"
            aria-label={own.alt || "Image preview"}
            // The content owns the whole screen, so the machine's
            // outside-click never fires — the scrim is always
            // "inside". A bare click on the content itself (the page
            // around the picture and its toolbar) reads as the scrim
            // and closes; clicks on the picture or the tools carry
            // their own targets and stay.
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <img
              data-scope="image-viewer"
              data-part="viewport"
              src={own.src}
              alt={own.alt ?? ""}
              style={{ transform: `scale(${scale()}) rotate(${rotation()}deg)` }}
            />
            <div data-scope="image-viewer" data-part="toolbar">
              <ButtonGroup>
                <Show when={own.zoomable ?? true}>
                  {toolButton("Zoom in", TOOL_GLYPHS.zoomIn, () => zoom(SCALE_STEP))}
                  {toolButton("Zoom out", TOOL_GLYPHS.zoomOut, () => zoom(-SCALE_STEP))}
                </Show>
                {toolButton("Rotate 90 degrees", TOOL_GLYPHS.rotate, rotate)}
                {toolButton("Close", TOOL_GLYPHS.close, () => setOpen(false))}
              </ButtonGroup>
            </div>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

injectComponentStyle("image-viewer");
