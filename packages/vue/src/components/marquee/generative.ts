import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Marquee } from "./index";

const dropletMark = () =>
  h("svg", {
    width: 16,
    height: 16,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    "aria-hidden": "true",
    innerHTML: '<path d="M12 3 3 9l9 12 9-12-9-6Z" />',
  });

/** A slow parade of repeated content across the page. */
export default defineEntry({
  Marquee: {
    props: z.object({ speed: z.number().optional(), items: z.array(z.string()).optional() }),
    slots: ["default"],
    description: "A slow parade of repeated content across the page.",
    component: ({ props }) => {
      const names = props.items ?? [
        "Qinghua",
        "Celadon",
        "Zhusha",
        "Ochre",
        "Ultramarine",
        "Gamboge",
      ];
      const stream = () =>
        h(Marquee.Content, () =>
          names.map((name: string) =>
            h(Marquee.Item, { key: name }, () => [dropletMark(), h("span", () => name)]),
          ),
        );
      return h(Marquee.Root, { spacing: "1.5rem", speed: props.speed } as never, () => [
        h(Marquee.Edge, { side: "start" }),
        h(Marquee.Viewport, () => stream()),
        h(Marquee.Edge, { side: "end" }),
      ]);
    },
  },
});
