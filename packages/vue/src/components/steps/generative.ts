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
      return h(Steps, {
        items: items.map((title: string) => ({ title })),
        defaultStep: props.current ?? 0,
      });
    },
  },
});
