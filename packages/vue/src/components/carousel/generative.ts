import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Carousel } from "./index";

/** A sliding gallery with arrows and dots. */
export default defineEntry({
  Carousel: {
    props: z.object({}),
    slots: ["default"],
    description: "A sliding gallery with arrows and dots.",
    component: ({ props }) => {
      const labels = props.slides ?? ["First", "Second", "Third"];
      return h(Carousel.Root as never, { slideCount: labels.length } as never, () => [
        h(Carousel.Control, () => [
          h(Carousel.PrevTrigger, () => "<"),
          h(Carousel.ItemGroup, () =>
            labels.map((label: string, index: number) =>
              h(Carousel.Item, { key: index, index }, () =>
                h(
                  "div",
                  {
                    style: {
                      display: "grid",
                      placeItems: "center",
                      blockSize: "10rem",
                      background: "var(--bs-color-surface-3)",
                      color: "var(--bs-color-text-secondary)",
                    },
                  },
                  label,
                ),
              ),
            ),
          ),
          h(Carousel.NextTrigger, () => ">"),
        ]),
        h(Carousel.IndicatorGroup, () =>
          labels.map((_slide: unknown, index: number) =>
            h(Carousel.Indicator, { key: index, index }),
          ),
        ),
      ]);
    },
  },
});
