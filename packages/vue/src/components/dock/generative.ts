import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Dock } from "./index";

/** A magnifying rail of icons; children are the items. */
export default defineEntry({
  Dock: {
    props: z.object({
      maxScale: z.number().optional(),
      radius: z.number().optional(),
      items: z.array(z.string()).optional(),
    }),
    slots: ["default"],
    description: "A magnifying rail of icons; children are the items.",
    component: ({ props }) => {
      const items = props.items ?? ["Brush", "Ink", "Seal"];
      return h(Dock.Root, { maxScale: props.maxScale, radius: props.radius } as never, () =>
        items.map((item: string) =>
          h(Dock.Item, { key: item }, () => h("span", { style: { fontSize: "1.125rem" } }, item)),
        ),
      );
    },
  },
});
