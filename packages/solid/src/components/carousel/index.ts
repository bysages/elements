import { Carousel as ArkCarousel } from "@ark-ui/solid/carousel";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Carousel, dressed in the paper-and-ink system: slides ride in one
 * hairline-clipped lane, the triggers are quiet outline controls, and the
 * current indicator alone carries the ink. The API is Ark's own — Root,
 * Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup,
 * Indicator, AutoplayTrigger, ProgressText. */
function CarouselRoot(props: ComponentProps<typeof ArkCarousel.Root>) {
  const id = useElementId("carousel", () => props.id);

  return createComponent(
    ArkCarousel.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const Carousel: typeof CarouselRoot &
  Omit<typeof ArkCarousel, "Root"> & { Root: typeof CarouselRoot } = defineFamily(CarouselRoot, {
  ...ArkCarousel,
  Root: CarouselRoot,
});
injectComponentStyle("carousel");
