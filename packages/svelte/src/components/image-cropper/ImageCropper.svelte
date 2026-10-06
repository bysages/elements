<script lang="ts">
import { ImageCropper as ArkImageCropper } from "@ark-ui/svelte/image-cropper";

import ImageCropperRoot from "./ImageCropperRoot.svelte";

let { src, alt, children, ...rest }: { src: string; alt?: string; children?: import("svelte").Snippet } & import("@ark-ui/svelte/image-cropper").ImageCropperRootProps = $props();
const positions = ["nw", "ne", "se", "sw"] as const;
</script>

<ImageCropperRoot {...rest}>
  <ArkImageCropper.Viewport>
    <ArkImageCropper.Image {src} {alt} />
    <ArkImageCropper.Selection>
      {#each positions as position (position)}
        <ArkImageCropper.Handle position={position}><div></div></ArkImageCropper.Handle>
      {/each}
      <ArkImageCropper.Grid axis="horizontal" />
      <ArkImageCropper.Grid axis="vertical" />
    </ArkImageCropper.Selection>
  </ArkImageCropper.Viewport>
  {@render children?.()}
</ImageCropperRoot>
