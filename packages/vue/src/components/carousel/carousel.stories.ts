import { useCarousel } from "@ark-ui/vue/carousel";
import type { Meta } from "@storybook/vue3-vite";
import { defineComponent, h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Carousel } from "./index.js";

const meta: Meta = { title: "Components / Carousel" };
export default meta;

const slides = [
  { src: "https://picsum.photos/seed/bs-1/640/360", alt: "Mountain path" },
  { src: "https://picsum.photos/seed/bs-2/640/360", alt: "Coastal cliff" },
  { src: "https://picsum.photos/seed/bs-3/640/360", alt: "Forest canopy" },
  { src: "https://picsum.photos/seed/bs-4/640/360", alt: "River bend" },
  { src: "https://picsum.photos/seed/bs-5/640/360", alt: "Valley fog" },
];

function chevron(dir: "left" | "right" | "up" | "down") {
  const rotation = { left: 180, up: -90, right: 0, down: 90 }[dir];
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
      style: rotation ? { transform: `rotate(${rotation}deg)` } : undefined,
    },
    [h("path", { d: "m9 5 7 7-7 7" })],
  );
}

/** Prev/next as quiet outline controls, the lane clipped to one slide,
 * dots underneath with the current page in ink. */
export const Basic = {
  args: {
    orientation: "horizontal",
  },
  render: (args: any) =>
    strip({ slideCount: slides.length, orientation: args.orientation }, images()),
};

/** The lane rises: slides travel bottom to top. */
export const Vertical = {
  render: () =>
    strip({ slideCount: slides.length, orientation: "vertical", defaultPage: 0 }, images()),
};

/** Two leaves per page; each peek of the next slide invites the turn. */
export const SlidesPerPage = {
  render: () => strip({ slideCount: slides.length, slidesPerPage: 2, spacing: "16px" }, images()),
};

/** Every slide its own width; the lane breathes between them. */
export const VariableSize = {
  render: () =>
    strip(
      {
        slideCount: slides.length,
        slidesPerPage: 1.5,
        spacing: "40px",
        autoResize: true,
      } as any,
      slides.map((slide, index) =>
        h(Carousel.Item, { key: index, index }, () => [
          h(
            "div",
            {
              style: {
                display: "grid",
                placeItems: "center",
                height: "12rem",
                borderRadius: "var(--bs-radius-lg)",
                background: "var(--bs-color-surface-inset)",
                color: "var(--bs-color-text-tertiary)",
                fontSize: "var(--bs-font-size-sm)",
              },
            },
            `Slide ${index + 1}`,
          ),
        ]),
      ),
    ),
};

/** The strip turns itself: autoplay with loop, paused while hovered. */
export const Autoplay = {
  render: () => strip({ slideCount: slides.length, autoplay: true, loop: true }, images()),
};

/** Thumbnails as the page marks: the active thumbnail holds the ink
 * hairline. */
export const ThumbnailIndicator = {
  render: () =>
    strip(
      { slideCount: slides.length, defaultPage: 0 },
      images(),
      slides.map((slide, index) =>
        h(Carousel.Indicator, { key: index, index }, () =>
          h("img", { src: slide.src, alt: "", width: 96, height: 54 }),
        ),
      ),
    ),
};

/** A plain button may drive the strip — the context api scrolls to a
 * chosen page. */
export const ScrollTo = {
  render: () => {
    const Driver = defineComponent({
      name: "ScrollToDriver",
      setup() {
        const carousel = useCarousel({ slideCount: slides.length });
        return () =>
          h("div", { style: { display: "grid", gap: "0.75rem" } }, [
            h(
              "button",
              {
                type: "button",
                onClick: () => carousel.value.scrollToIndex(3),
                style: {
                  justifySelf: "start",
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.625rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                  cursor: "pointer",
                },
              },
              "Go to slide 4",
            ),
            h(Carousel.RootProvider, { value: carousel.value } as any, () => [
              h(Carousel.ItemGroup, () => slides.map((slide, index) => slide_(index))),
              h(Carousel.IndicatorGroup, () =>
                slides.map((_, index) => h(Carousel.Indicator, { key: index, index })),
              ),
            ]),
          ]);
      },
    });
    return h(Driver);
  },
};

/** Slides come and go while the strip keeps its page — add one and the
 * count follows. */
export const DynamicSlides = {
  render: () =>
    withState(() => {
      const state = reactive({ slides: [0, 1, 2, 3], page: 0 });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", maxWidth: "36rem" } }, [
          h(
            "button",
            {
              type: "button",
              onClick: () => state.slides.push(Math.max(...state.slides) + 1),
              style: {
                justifySelf: "start",
                border: "1px solid var(--bs-color-border)",
                background: "var(--bs-color-surface-2)",
                borderRadius: "var(--bs-radius-sm)",
                padding: "0.25rem 0.625rem",
                font: "inherit",
                fontSize: "var(--bs-font-size-sm)",
                cursor: "pointer",
              },
            },
            "Add slide",
          ),
          h(
            Carousel.Root,
            {
              slideCount: state.slides.length,
              page: state.page,
              onPageChange: (e: { page: number }) => (state.page = e.page),
            } as any,
            () => [
              h(Carousel.ItemGroup, () => state.slides.map((_, index) => slide_(index))),
              h(Carousel.IndicatorGroup, () =>
                state.slides.map((_, index) => h(Carousel.Indicator, { key: index, index })),
              ),
            ],
          ),
        ]);
    }),
};

/** The page answers to the caller — the strip only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ page: 0 });
      return () =>
        h(
          Carousel.Root,
          {
            slideCount: slides.length,
            page: state.page,
            onPageChange: (e: { page: number }) => (state.page = e.page),
          } as any,
          () => [
            h(Carousel.ItemGroup, () => images()),
            h(Carousel.IndicatorGroup, () =>
              slides.map((_, index) => h(Carousel.Indicator, { key: index, index })),
            ),
          ],
        );
    }),
};

function strip(rootProps: any, items: any, indicators?: any) {
  const vertical = rootProps.orientation === "vertical";
  return h(Carousel.Root, rootProps as any, () => [
    h(Carousel.Control, () => [
      h(Carousel.PrevTrigger, () => chevron(vertical ? "up" : "left")),
      h(Carousel.ItemGroup, () => items),
      h(Carousel.NextTrigger, () => chevron(vertical ? "down" : "right")),
    ]),
    h(
      Carousel.IndicatorGroup,
      () => indicators ?? slides.map((_, index) => h(Carousel.Indicator, { key: index, index })),
    ),
  ]);
}

function images() {
  return slides.map((slide, index) =>
    h(Carousel.Item, { key: index, index }, () =>
      h("img", { src: slide.src, alt: slide.alt, width: 640, height: 360 }),
    ),
  );
}

function slide_(index: number) {
  return h(Carousel.Item, { key: index, index }, () =>
    h(
      "div",
      {
        style: {
          display: "grid",
          placeItems: "center",
          height: "12rem",
          borderRadius: "var(--bs-radius-lg)",
          background: "var(--bs-color-surface-inset)",
          color: "var(--bs-color-text-tertiary)",
          fontSize: "var(--bs-font-size-sm)",
        },
      },
      `Slide ${index + 1}`,
    ),
  );
}
