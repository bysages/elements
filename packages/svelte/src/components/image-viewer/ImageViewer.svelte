<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("image-viewer");

import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { Portal } from "@ark-ui/svelte/portal";

import { Button } from "../button";
import InternalIcon from "../../internal/InternalIcon.svelte";
import { ButtonGroup } from "../button-group";
import { useComponentMessages } from "../config-provider/messages";
import type { ImageViewerProps } from "./props";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

let {
  src,
  alt = "",
  width,
  height,
  open = $bindable(false),
  zoomable = true,
  onOpenChange,
}: ImageViewerProps = $props();

const messages = useComponentMessages();

let scale = $state(1);
let rotation = $state(0);

function setOpen(value: boolean) {
  open = value;
  onOpenChange?.(value);
}

// A fresh open starts at rest — the last session's zoom must not
// leak into the next look.
$effect(() => {
  if (open) {
    scale = 1;
    rotation = 0;
  }
});

function zoom(step: number) {
  scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale + step));
}

function turn() {
  rotation = (rotation + 90) % 360;
}
</script>

{#snippet tool(label: string, onclick: () => void, icon: string)}
  <Button variant="ghost" square size="lg" aria-label={label} {onclick}>
    <InternalIcon name={icon} />
  </Button>
{/snippet}

<!-- A lightbox: the picture over a dimmed page, with a small toolbar
beneath it. Zoom is the reader's hand (half to three times, clamped),
a quarter turn at a time rotates, Escape and the scrim close — the
dialog machine carries the modal part. The picture is heavy: nothing
of the lightbox rests in the page while it is closed. -->
<ArkDialog.Root
  {open}
  onOpenChange={(details) => setOpen(details.open)}
  lazyMount
  unmountOnExit
>
  <Portal>
    <ArkDialog.Backdrop class="bs-image-viewer-backdrop" />
    <ArkDialog.Positioner class="bs-image-viewer-positioner">
      <!-- The content owns the whole screen, so the machine's
        outside-click never fires — the scrim is always "inside". A bare
        click on the content itself (the page around the picture and its
        toolbar) reads as the scrim and closes; clicks on the picture or
        the tools carry their own targets and stay. -->
      <ArkDialog.Content
        class="bs-image-viewer-content"
        aria-label={alt || "Image preview"}
        onclick={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}
      >
        <img
          data-scope="image-viewer"
          data-part="viewport"
          {src}
          {alt}
          {width}
          {height}
          style:transform={`scale(${scale}) rotate(${rotation}deg)`}
        />
        <div data-scope="image-viewer" data-part="toolbar">
          <ButtonGroup>
            {#if zoomable}
              {@render tool(messages().imageViewer.zoomIn, () => zoom(SCALE_STEP), "zoom-in")}
              {@render tool(messages().imageViewer.zoomOut, () => zoom(-SCALE_STEP), "zoom-out")}
            {/if}
            {@render tool(messages().imageViewer.rotate, turn, "rotate-cw")}
            {@render tool(messages().imageViewer.close, () => setOpen(false), "x")}
          </ButtonGroup>
        </div>
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </Portal>
</ArkDialog.Root>
