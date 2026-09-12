import { Carousel as ArkCarousel } from "@ark-ui/svelte/carousel";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Carousel, dressed in the paper-and-ink system: slides ride in one
 * hairline-clipped lane, the triggers are quiet outline controls, and the
 * current indicator alone carries the ink. The API is Ark's own — Root,
 * Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup,
 * Indicator, AutoplayTrigger, ProgressText. */
export const Carousel = ArkCarousel;

injectComponentStyle("carousel");
