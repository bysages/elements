<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("dock");

type Props = HTMLAttributes<HTMLDivElement> & {
  /** The tallest an item swells under the hand — 1 stands still. */
  maxScale?: number;
  /** How far the hand reaches, in px, before an item stops answering. */
  radius?: number;
};

let { maxScale = 1.5, radius = 96, children, ...rest }: Props = $props();

const ITEM = '[data-scope="dock"][data-part="item"]';

function magnify(event: PointerEvent) {
  for (const item of (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(ITEM)) {
    const rect = item.getBoundingClientRect();
    const dist = Math.abs(event.clientX - (rect.left + rect.width / 2));
    const t = Math.max(0, 1 - dist / radius);
    item.style.setProperty("--bs-dock-scale", (1 + (maxScale - 1) * t * t).toFixed(4));
  }
}

function reset(event: PointerEvent) {
  for (const item of (event.currentTarget as HTMLElement).querySelectorAll<HTMLElement>(ITEM)) {
    item.style.removeProperty("--bs-dock-scale");
  }
}
</script>

<!-- The magnifying dock: the wrapper measures per item and writes
     --bs-dock-scale; CSS eases the chase, so no spring engine rides. -->
<div
  {...rest}
  data-scope="dock"
  data-part="root"
  style={{ ...rest.style, "--bs-dock-max-scale": String(maxScale) }}
  onpointermove={magnify}
  onpointerleave={reset}
>
  {@render children?.()}
</div>
