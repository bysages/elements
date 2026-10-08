import { Dialog as ArkDialog } from "@ark-ui/solid/dialog";
import { injectComponentStyle } from "@bysages/core";
import { Show, createEffect, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { Dialog } from "../dialog";
import { ImageViewerPreview } from "./preview";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

/** The toolbar's icons, drawn from the house icon set. */
const TOOL_ICONS = {
  zoomIn: () => iconNode("zoom-in"),
  zoomOut: () => iconNode("zoom-out"),
  rotate: () => iconNode("rotate-cw"),
  close: () => iconNode("x"),
};

/**
 * Opens the full lightbox from a curated icon by default, or from any
 * wrapped button, image or other doorway. Zoom, rotation, Escape and the scrim
 * stay in the viewer. Anatomy remains available on `ImageViewer.Root`.
 */
export interface ImageViewerProps {
  src: string;
  alt?: string;
  /** The large image handed to the lightbox. */
  width?: number | string;
  height?: number | string;
  /** The wrapped content that opens the lightbox. */
  children?: JSX.Element;
  open?: boolean;
  zoomable?: boolean;
  /** The openness changed — from the scrim, Escape or the toolbar. */
  onOpenChange?: (open: boolean) => void;
}

function ImageViewerImpl(props: ImageViewerProps) {
  injectComponentStyle("image-viewer");
  const [own] = splitProps(props, [
    "src",
    "alt",
    "width",
    "height",
    "open",
    "zoomable",
    "onOpenChange",
    "children",
  ]);
  const id = useElementId("image-viewer");
  const messages = useComponentMessages();
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

  function toolButton(label: string, icon: () => JSX.Element, onClick: () => void) {
    return (
      <Button variant="ghost" square size="lg" aria-label={label} onClick={onClick}>
        {icon()}
      </Button>
    );
  }

  return (
    <ArkDialog.Root
      id={id()}
      open={isOpen()}
      onOpenChange={(details) => setOpen(details.open)}
      // The picture is heavy: nothing of the lightbox rests in the
      // page while it is closed.
      lazyMount
      unmountOnExit
    >
      <ArkDialog.Trigger
        asChild={() => own.children ?? <ImageViewerPreview />}
        data-scope="image-viewer"
        data-part="trigger"
      />
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
              width={own.width}
              height={own.height}
              style={{
                "--bs-image-viewer-transform": `scale(${scale()}) rotate(${rotation()}deg)`,
              }}
            />
            <div data-scope="image-viewer" data-part="toolbar">
              <ButtonGroup>
                <Show when={own.zoomable ?? true}>
                  {toolButton(messages().imageViewer.zoomIn, TOOL_ICONS.zoomIn, () =>
                    zoom(SCALE_STEP),
                  )}
                  {toolButton(messages().imageViewer.zoomOut, TOOL_ICONS.zoomOut, () =>
                    zoom(-SCALE_STEP),
                  )}
                </Show>
                {toolButton(messages().imageViewer.rotate, TOOL_ICONS.rotate, rotate)}
                <ArkDialog.CloseTrigger
                  asChild={(closeProps) => (
                    <Button
                      {...closeProps()}
                      variant="ghost"
                      square
                      size="lg"
                      aria-label={messages().imageViewer.close}
                    >
                      {TOOL_ICONS.close()}
                    </Button>
                  )}
                />
              </ButtonGroup>
            </div>
          </ArkDialog.Content>
        </ArkDialog.Positioner>
      </Portal>
    </ArkDialog.Root>
  );
}

const viewerParts = {
  ...(Dialog as unknown as Record<string, unknown>),
  Preview: ImageViewerPreview,
} as unknown as Parameters<typeof defineFamily>[1];

export const ImageViewer = defineFamily(ImageViewerImpl, viewerParts) as typeof ImageViewerImpl &
  (typeof Dialog & { Preview: typeof ImageViewerPreview });
