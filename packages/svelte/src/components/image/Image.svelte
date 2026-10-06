<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("image");

import type { ImageProps } from "./props";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  src,
  alt = "",
  fit = "cover",
  width,
  height,
  loading = "lazy",
  fallback,
  ...rest
}: ImageProps = $props();

type ImageState = "loading" | "loaded" | "error";

let state = $state<ImageState>("loading");

// A new source starts the wait over — the last picture's state must
// not stand in for the next one's.
$effect(() => {
  void src;
  state = "loading";
});
</script>

<!-- A framed picture: while the source loads, the frame keeps the
skeleton's breath; the picture dissolves in when it lands; a broken
source leaves the fallback snippet — or the placeholder icon when the
caller has nothing local to say. The frame's size is the consumer's to
give. -->
<figure {...rest} data-scope="image" data-part="root" data-state={state} data-fit={fit}>
  <img
    data-scope="image"
    data-part="img"
    {src}
    {alt}
    {width}
    {height}
    {loading}
    decoding="async"
    onload={() => (state = "loaded")}
    onerror={() => (state = "error")}
  />
  {#if state === "error"}
    <div data-scope="image" data-part="fallback">
      {#if fallback}
        {@render fallback()}
      {:else}
        <InternalIcon name="image" />
      {/if}
    </div>
  {/if}
</figure>
