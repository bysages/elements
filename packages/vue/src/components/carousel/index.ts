import { Carousel as ArkCarousel } from "@ark-ui/vue/carousel";
import { injectComponentStyle } from "@bysages/core";

/** Carousel, dressed in the paper-and-ink system: slides ride in one
 * hairline-clipped lane, the triggers are quiet outline controls, and the
 * current indicator alone carries the ink. The parts — Root,
 * Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup,
 * Indicator, AutoplayTrigger, ProgressText. */
export const Carousel = ArkCarousel;

injectComponentStyle("carousel");
