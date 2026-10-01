import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Steps } from "./index";

/** A numbered progression; items name the steps in order. */
export default defineEntry({
  Steps: {
    props: z.object({
      items: z.array(z.string()).optional(),
      current: z.number().int().optional(),
    }),
    description: "A numbered progression; items name the steps in order.",
    component: ({ props }) => {
      const items = props.items ?? ["Draft", "Review", "Publish"];
      return h(
        Steps.Root as never,
        { count: items.length, defaultStep: props.current ?? 0 } as never,
        () => [
          h(Steps.List, () =>
            items.map((item: string, index: number) =>
              h(Steps.Item, { key: item, index }, () => [
                h(Steps.Trigger, () => [
                  h(Steps.Indicator, () => String(index + 1)),
                  h("span", item),
                ]),
                h(Steps.Separator),
              ]),
            ),
          ),
          h(Steps.CompletedContent, () => "All steps completed."),
        ],
      );
    },
  },
});
