import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Icon } from "../icon";
import { Marquee } from "./index";

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
            h(Marquee.Item, { key: name }, () => [
              h(Icon, { name: "droplet" }),
              h("span", () => name),
            ]),
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
