<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  injectComponentStyle("image-viewer");

  import { useComponentMessages } from "../config-provider/messages";
  import InternalIcon from "../../internal/InternalIcon.svelte";
  import type { ImageViewerPreviewProps } from "./props";

  let { label, children, ...rest }: ImageViewerPreviewProps = $props();

  const messages = useComponentMessages();
  const isIcon = $derived(!children);
  const accessibleLabel = $derived(rest["aria-label"] ?? messages().imageViewer.preview);
  const parts = [rest["data-part"], "preview"].filter(Boolean).join(" ");
</script>

<!-- The default doorway is the curated preview icon; custom content keeps
that icon as its hover and focus affordance. -->
<span
  {...rest}
  data-scope="image-viewer"
  data-part={parts}
  data-empty={isIcon ? "true" : undefined}
  aria-label={isIcon ? accessibleLabel : rest["aria-label"]}
>
  {#if children}
    {@render children()}
    <span data-scope="image-viewer" data-part="preview-overlay" aria-hidden="true">
      <InternalIcon name="eye" size="lg" />
      {#if label}
        <span data-part="preview-label">{label}</span>
      {/if}
    </span>
  {:else}
    <InternalIcon name="eye" size="lg" />
  {/if}
</span>

