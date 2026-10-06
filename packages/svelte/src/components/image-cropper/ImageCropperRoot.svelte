<script lang="ts">
import { ImageCropper as ArkImageCropper } from "@ark-ui/svelte/image-cropper";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { ImageCropperRootProps } from "@ark-ui/svelte/image-cropper";

injectComponentStyle("image-cropper");

let { ref = $bindable(null), zoom = $bindable(), rotation = $bindable(), flip = $bindable(), children, ...rest }: ImageCropperRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("image-cropper", generatedId, rest.id));
</script>

<ArkImageCropper.Root bind:ref bind:zoom bind:rotation bind:flip {...rest} {id}>
  {@render children?.()}
</ArkImageCropper.Root>
