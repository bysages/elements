import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Timeline } from "./index";

/** Events down a ruled thread; items are the moments in order. */
export default defineEntry({
  Timeline: {
    props: z.object({
      items: z.array(z.string()).optional(),
      orientation: z.enum(["vertical", "horizontal"]).optional(),
    }),
    description: "Events down a ruled thread; items are the moments in order.",
    component: ({ props }) => {
      const items = props.items ?? [];
      return h(Timeline.Root, { orientation: props.orientation ?? undefined }, () =>
        items.map((item: string) =>
          h(Timeline.Item, { key: item }, () => [
            h(Timeline.Marker),
            h(Timeline.Content, () => item),
          ]),
        ),
      );
    },
  },
});
