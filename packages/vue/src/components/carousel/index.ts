import { Carousel as ArkCarousel } from "@ark-ui/vue/carousel";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Carousel, dressed in the paper-and-ink system: slides ride in one
 * hairline-clipped lane, the triggers are quiet outline controls, and the
 * current indicator alone carries the ink. The parts — Root,
 * Control, PrevTrigger, NextTrigger, ItemGroup, Item, IndicatorGroup,
 * Indicator, AutoplayTrigger, ProgressText. */
const CarouselRoot = defineComponent({
  name: "SCarouselRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("carousel", attrs);

    return () => h(ArkCarousel.Root as never, { ...attrs, id: id.value }, slots);
  },
});

type CarouselSlide = string | { label: string };

/** The complete carousel behind a slide list: arrows, progress, items, and
 * indicators use the common lane. Custom slides remain anatomy work. */
const CarouselFacade = defineComponent({
  name: "SCarousel",
  props: {
    modelValue: { type: Number, default: undefined },
    defaultValue: { type: Number, default: undefined },
    items: { type: Array as PropType<CarouselSlide[]>, required: true },
    spacing: { type: String, default: undefined },
    label: { type: String, default: undefined },
  },
  emits: {
    "update:modelValue": (_value: number) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("carousel");
    return () => {
      const slides = props.items.map((item) => (typeof item === "string" ? item : item.label));
      return h(
        CarouselRoot,
        {
          ...attrs,
          "aria-label": props.label,
          slideCount: slides.length,
          defaultPage: props.defaultValue,
          page: props.modelValue,
          spacing: props.spacing,
          "onUpdate:page": (page: number) => emit("update:modelValue", page),
        },
        () => [
          h(ArkCarousel.Control, () => [
            h(ArkCarousel.PrevTrigger, () => iconNode("chevron-left")),
            h(ArkCarousel.ProgressText),
            h(ArkCarousel.NextTrigger, () => iconNode("chevron-right")),
          ]),
          h(ArkCarousel.ItemGroup, () =>
            slides.map((slide, index) => h(ArkCarousel.Item, { key: index, index }, () => slide)),
          ),
          h(ArkCarousel.IndicatorGroup, () =>
            slides.map((_, index) => h(ArkCarousel.Indicator, { key: index, index })),
          ),
        ],
      );
    };
  },
});

export const Carousel = defineFamily(CarouselFacade, {
  ...ArkCarousel,
  Root: CarouselRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof CarouselFacade &
  Omit<typeof ArkCarousel, "Root"> & { Root: typeof CarouselRoot };
