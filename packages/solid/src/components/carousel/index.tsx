import { Carousel as ArkCarousel } from "@ark-ui/solid/carousel";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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

type CarouselSlide = string | { label: string };

export interface CarouselFacadeProps {
  value?: number;
  defaultValue?: number;
  items: CarouselSlide[];
  spacing?: string;
  label?: string;
  onValueChange?: (value: number) => void;
}

/** The complete carousel behind a slide list: arrows, progress, items, and
 * indicators use the common lane. Custom slides remain anatomy work. */
function CarouselFacade(props: CarouselFacadeProps) {
  injectComponentStyle("carousel");
  const slides = () => props.items.map((item) => (typeof item === "string" ? item : item.label));

  return (
    <CarouselRoot
      aria-label={props.label}
      slideCount={slides().length}
      defaultPage={props.defaultValue}
      page={props.value}
      spacing={props.spacing}
      onPageChange={(page: { page: number }) => props.onValueChange?.(page.page)}
    >
      <ArkCarousel.Control>
        <ArkCarousel.PrevTrigger>{iconNode("chevron-left")}</ArkCarousel.PrevTrigger>
        <ArkCarousel.ProgressText />
        <ArkCarousel.NextTrigger>{iconNode("chevron-right")}</ArkCarousel.NextTrigger>
      </ArkCarousel.Control>
      <ArkCarousel.ItemGroup>
        <For each={slides()}>
          {(slide, index) => <ArkCarousel.Item index={index()}>{slide}</ArkCarousel.Item>}
        </For>
      </ArkCarousel.ItemGroup>
      <ArkCarousel.IndicatorGroup>
        <For each={slides()}>{(_, index) => <ArkCarousel.Indicator index={index()} />}</For>
      </ArkCarousel.IndicatorGroup>
    </CarouselRoot>
  );
}

export const Carousel: typeof CarouselFacade &
  Omit<typeof ArkCarousel, "Root"> & { Root: typeof CarouselRoot } = defineFamily(CarouselFacade, {
  ...ArkCarousel,
  Root: CarouselRoot,
});
injectComponentStyle("carousel");
