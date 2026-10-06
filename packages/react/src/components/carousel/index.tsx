import { Carousel as ArkCarousel } from "@ark-ui/react/carousel";
import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Carousel, dressed in the paper-and-ink system: slides ride in one
 * hairline-clipped lane, the triggers are quiet outline controls, and the
 * current indicator alone carries the ink. The API is Ark's own — Root,
 * Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup,
 * Indicator, AutoplayTrigger, ProgressText. */
function CarouselRoot(props: ComponentProps<typeof ArkCarousel.Root>) {
  injectComponentStyle("carousel");
  const id = useElementId("carousel", props);

  return <ArkCarousel.Root {...props} id={id} />;
}

type CarouselSlide = string | { label: string };

type CarouselFacadeProps = {
  value?: number;
  defaultValue?: number;
  items: CarouselSlide[];
  spacing?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
  onValueChange?: (page: number) => void;
};

/** The complete carousel behind a slide list: arrows, progress, items, and
 * indicators use the common lane. Custom slides remain anatomy work. */
function CarouselFacade(props: CarouselFacadeProps) {
  const { value, defaultValue, items, spacing, label, className, style, onValueChange } = props;
  const slides = items.map((item) => (typeof item === "string" ? item : item.label));

  return (
    <CarouselRoot
      aria-label={label}
      slideCount={slides.length}
      defaultPage={defaultValue}
      page={value}
      spacing={spacing}
      className={className}
      style={style}
      onPageChange={(event: { page: number }) => onValueChange?.(event.page)}
    >
      <ArkCarousel.Control>
        <ArkCarousel.PrevTrigger>{iconNode("chevron-left")}</ArkCarousel.PrevTrigger>
        <ArkCarousel.ProgressText />
        <ArkCarousel.NextTrigger>{iconNode("chevron-right")}</ArkCarousel.NextTrigger>
      </ArkCarousel.Control>
      <ArkCarousel.ItemGroup>
        {slides.map((slide, index) => (
          <ArkCarousel.Item key={index} index={index}>
            {slide}
          </ArkCarousel.Item>
        ))}
      </ArkCarousel.ItemGroup>
      <ArkCarousel.IndicatorGroup>
        {slides.map((_, index) => (
          <ArkCarousel.Indicator key={index} index={index} />
        ))}
      </ArkCarousel.IndicatorGroup>
    </CarouselRoot>
  );
}

export const Carousel: typeof CarouselFacade &
  Omit<typeof ArkCarousel, "Root"> & { Root: typeof CarouselRoot } = Object.assign(CarouselFacade, {
  ...ArkCarousel,
  Root: CarouselRoot,
}) as typeof CarouselFacade & Omit<typeof ArkCarousel, "Root"> & { Root: typeof CarouselRoot };
