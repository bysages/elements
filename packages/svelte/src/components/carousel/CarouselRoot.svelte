<script lang="ts">
import { Carousel as ArkCarousel } from "@ark-ui/svelte/carousel";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { CarouselRootProps } from "@ark-ui/svelte/carousel";

injectComponentStyle("carousel");

let { ref = $bindable(null), page = $bindable(), children, ...rest }: CarouselRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("carousel", generatedId, rest.id));
</script>

<ArkCarousel.Root bind:ref bind:page {...rest} {id}>
  {@render children?.()}
</ArkCarousel.Root>
