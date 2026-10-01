import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { DynamicInput } from "./index";

/** A growable list of rows; each row holds one value. */
export default defineEntry({
  DynamicInput: {
    props: z.object({
      addLabel: z.string().optional(),
      min: z.number().int().optional(),
      max: z.number().int().optional(),
    }),
    description: "A growable list of rows; each row holds one value.",
    component: ({ props }) =>
      h(
        DynamicInput as never,
        {
          addLabel: props.addLabel,
          min: props.min,
          max: props.max,
        } as never,
      ),
  },
});
