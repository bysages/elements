<script lang="ts">
import type { ImageProps } from "./props";

let { src, alt = "", fit = "cover", loading = "lazy", fallback, ...rest }: ImageProps = $props();

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
source leaves the fallback snippet — or the placeholder glyph when the
caller has nothing local to say. The frame's size is the consumer's to
give. -->
<figure {...rest} data-scope="image" data-part="root" data-state={state} data-fit={fit}>
  <img
    data-scope="image"
    data-part="img"
    {src}
    {alt}
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
        <!-- The mark for a source that never arrived: a quiet
        mountain-and-sun, drawn in the stylesheet's stroke and hidden
        from the reader. -->
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="1.5" />
          <circle cx="9" cy="10" r="1.5" />
          <path d="m5.5 17.5 4.5-5 3 3.5 2.5-3 3 4.5" />
        </svg>
      {/if}
    </div>
  {/if}
</figure>
