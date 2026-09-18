<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import Portal from "@ark-ui/svelte/portal";

import { Button } from "../button";
import { ButtonGroup } from "../button-group";
import type { ImageViewerProps } from "./props";

const MIN_SCALE = 0.5;
const MAX_SCALE = 3;
const SCALE_STEP = 0.25;

let { src, alt = "", open = $bindable(false), zoomable = true, onOpenChange }: ImageViewerProps =
  $props();

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

{#snippet tool(label: string, onclick: () => void, glyph: Snippet)}
  <Button variant="ghost" square size="lg" aria-label={label} {onclick}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {@render glyph()}
    </svg>
  </Button>
{/snippet}

{#snippet zoomIn()}
  <circle cx="11" cy="11" r="7" />
  <path d="m16.2 16.2 4.8 4.8" />
  <path d="M8 11h6" />
  <path d="M11 8v6" />
{/snippet}

{#snippet zoomOut()}
  <circle cx="11" cy="11" r="7" />
  <path d="m16.2 16.2 4.8 4.8" />
  <path d="M8 11h6" />
{/snippet}

{#snippet turnGlyph()}
  <path d="M20.49 12A8.5 8.5 0 1 1 18 6.06" />
  <path d="M20.5 3.5v4h-4" />
{/snippet}

{#snippet closeGlyph()}
  <path d="m6 6 12 12" />
  <path d="M18 6 6 18" />
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
          style:transform={`scale(${scale}) rotate(${rotation}deg)`}
        />
        <div data-scope="image-viewer" data-part="toolbar">
          <ButtonGroup>
            {#if zoomable}
              {@render tool("Zoom in", () => zoom(SCALE_STEP), zoomIn)}
              {@render tool("Zoom out", () => zoom(-SCALE_STEP), zoomOut)}
            {/if}
            {@render tool("Rotate 90 degrees", turn, turnGlyph)}
            {@render tool("Close", () => setOpen(false), closeGlyph)}
          </ButtonGroup>
        </div>
      </ArkDialog.Content>
    </ArkDialog.Positioner>
  </Portal>
</ArkDialog.Root>
