import { Carousel as ArkCarousel } from "@ark-ui/svelte/carousel";

import { defineFamily } from "../../internal/family";
import CarouselFacade from "./Carousel.svelte";
import CarouselRoot from "./CarouselRoot.svelte";

/** Ark's Carousel, dressed in the paper-and-ink system: slides ride in one
 * hairline-clipped lane, the triggers are quiet outline controls, and the
 * current indicator alone carries the ink. The API is Ark's own — Root,
 * Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup,
 * Indicator, AutoplayTrigger, ProgressText. */
export const Carousel: typeof CarouselFacade &
  Omit<typeof ArkCarousel, "Root"> & {
    Root: typeof CarouselRoot;
  } = defineFamily(CarouselFacade, {
  ...ArkCarousel,
  Root: CarouselRoot,
});
