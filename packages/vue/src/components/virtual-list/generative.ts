import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { VirtualList } from "./index";

/** Renders long lists by windowing; only the visible rows exist. */
export default defineEntry({
  VirtualList: {
    props: z.object({
      items: z.array(z.string()).optional(),
      itemHeight: z.number().optional(),
      height: z.number().optional(),
    }),
    slots: ["default"],
    description: "Renders long lists by windowing; only the visible rows exist.",
    component: ({ props }) => {
      const items = props.items ?? Array.from({ length: 500 }, (_, index) => "Row " + (index + 1));
      return h(
        VirtualList as never,
        { items, itemHeight: props.itemHeight, height: props.height } as never,
        {
          item: ({ item }: { item: unknown }) =>
            h(
              "span",
              {
                style: {
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                  paddingInline: "0.75rem",
                },
              },
              () => String(item),
            ),
        },
      );
    },
  },
});
