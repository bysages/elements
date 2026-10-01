import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Badge } from "./index";

/** A small status seal beside content; reads at a glance. */
export default defineEntry({
  Badge: {
    props: z.object({
      text: z.string(),
      tone: z.string().optional(),
      variant: z.string().optional(),
    }),
    description: "A small status seal beside content; reads at a glance.",
    component: ({ props }) =>
      h(Badge, { tone: props.tone, variant: props.variant }, () => props.text),
  },
});
