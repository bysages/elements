import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Carousel } from "./index.js";

const meta: Meta = { title: "Components / Carousel" };
export default meta;

const slides = [
  { src: "https://picsum.photos/seed/bs-1/640/360", alt: "Mountain path" },
  { src: "https://picsum.photos/seed/bs-2/640/360", alt: "Coastal cliff" },
  { src: "https://picsum.photos/seed/bs-3/640/360", alt: "Forest canopy" },
];

function chevron(dir: "left" | "right") {
  return h(
    "svg",
    {
      width: 16,
      height: 16,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
      style: dir === "left" ? { transform: "rotate(180deg)" } : undefined,
    },
    [h("path", { d: "m9 5 7 7-7 7" })],
  );
}

/** The full strip: prev/next as quiet outline controls, the lane clipped
 * to one slide, dots underneath with the current page in ink. */
export const Basic = {
  render: () =>
    h(Carousel.Root, { slideCount: slides.length }, () => [
      h(Carousel.Control, () => [
        h(Carousel.PrevTrigger, () => chevron("left")),
        h(Carousel.ItemGroup, () =>
          slides.map((slide, index) =>
            h(Carousel.Item, { key: index, index }, () =>
              h("img", { src: slide.src, alt: slide.alt, width: 640, height: 360 }),
            ),
          ),
        ),
        h(Carousel.NextTrigger, () => chevron("right")),
      ]),
      h(Carousel.IndicatorGroup, () =>
        slides.map((_, index) => h(Carousel.Indicator, { key: index, index })),
      ),
    ]),
};
