import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Chip } from "./index";

/** A counting coin: the numeric value, capped with an ellipsis at max. */
export default defineEntry({
  Chip: {
    props: z.object({
      value: z.number().int(),
      max: z.number().int().optional(),
      tone: z.string().optional(),
      variant: z.string().optional(),
    }),
    description: "A counting coin: the numeric value, capped with an ellipsis at max.",
    component: ({ props }) =>
      h(Chip as never, {
        value: props.value,
        max: props.max,
        tone: props.tone,
        variant: props.variant,
      }),
  },
});
