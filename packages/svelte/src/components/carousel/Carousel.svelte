<script lang="ts">
import { Carousel as ArkCarousel } from "@ark-ui/svelte/carousel";

import CarouselRoot from "./CarouselRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

export type CarouselSlide = string | { label: string };

let {
  items,
  label,
  spacing,
  children,
  ...rest
}: {
  items: CarouselSlide[];
  label?: string;
  spacing?: string;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/carousel").CarouselRootProps = $props();

const slides = $derived(items.map((item) => (typeof item === "string" ? item : item.label)));
</script>

<CarouselRoot aria-label={label} slideCount={slides.length} {spacing} {...rest}>
  <ArkCarousel.Control>
    <ArkCarousel.PrevTrigger><InternalIcon name="chevron-left" /></ArkCarousel.PrevTrigger>
    <ArkCarousel.ProgressText />
    <ArkCarousel.NextTrigger><InternalIcon name="chevron-right" /></ArkCarousel.NextTrigger>
  </ArkCarousel.Control>
  <ArkCarousel.ItemGroup>
    {#each slides as slide, index (index)}
      <ArkCarousel.Item index={index}>{slide}</ArkCarousel.Item>
    {/each}
  </ArkCarousel.ItemGroup>
  <ArkCarousel.IndicatorGroup>
    {#each slides as _, index (index)}
      <ArkCarousel.Indicator index={index} />
    {/each}
  </ArkCarousel.IndicatorGroup>
  {@render children?.()}
</CarouselRoot>
