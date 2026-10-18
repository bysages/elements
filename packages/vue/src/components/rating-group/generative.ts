import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { RatingGroup } from "./index";

/** Stars out of a maximum; the value is the filled count. */
export default defineEntry({
  RatingGroup: {
    props: z.object({
      label: z.string().optional(),
      value: z.number().optional(),
      count: z.number().int().optional(),
    }),
    description: "Stars out of a maximum; the value is the filled count.",
    component: ({ props }) =>
      h(RatingGroup, {
        label: props.label,
        defaultValue: props.value ?? 3,
        count: props.count ?? 5,
      }),
  },
});
