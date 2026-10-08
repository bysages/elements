<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("image-viewer");

import { Dialog } from "../dialog";
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { Portal } from "@ark-ui/svelte/portal";

import { Button } from "../button";
import InternalIcon from "../../internal/InternalIcon.svelte";
import { ButtonGroup } from "../button-group";
import { useComponentMessages } from "../config-provider/messages";
import ImagePreview from "./ImagePreview.svelte";
import type { ImageViewerProps } from "./props";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

let {
  src,
  alt = "",
  width,
  height,
  children,
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

<!-- The viewer opens from the curated icon by default, or from any
wrapped button, image or other doorway. Zoom, rotation, Escape and the scrim stay in
the viewer. -->
<Dialog.Root
  {open}
  onOpenChange={(details) => setOpen(details.open)}
  lazyMount
  unmountOnExit
>
  <ArkDialog.Trigger data-scope="image-viewer" data-part="trigger">
    {#snippet asChild(triggerProps)}
      {#if children}
        {@render children(triggerProps())}
      {:else}
        <ImagePreview {...triggerProps()} />
      {/if}
    {/snippet}
  </ArkDialog.Trigger>
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
          style:--bs-image-viewer-transform={`scale(${scale}) rotate(${rotation}deg)`}
        />
        <div data-scope="image-viewer" data-part="toolbar">
          <ButtonGroup>
            {#if zoomable}
              {@render tool(messages().imageViewer.zoomIn, () => zoom(SCALE_STEP), "zoom-in")}
              {@render tool(messages().imageViewer.zoomOut, () => zoom(-SCALE_STEP), "zoom-out")}
            {/if}
            {@render tool(messages().imageViewer.rotate, turn, "rotate-cw")}
            <ArkDialog.CloseTrigger>
              {#snippet asChild(closeProps)}
                <Button
                  {...closeProps()}
                  variant="ghost"
                  square
                  size="lg"
                  aria-label={messages().imageViewer.close}
                >
                  <InternalIcon name="x" />
                </Button>
              {/snippet}
            </ArkDialog.CloseTrigger>
          </ButtonGroup>
        </div>
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </Portal>
</Dialog.Root>
