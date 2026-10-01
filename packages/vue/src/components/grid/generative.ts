import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Grid } from "./index";

/** Responsive 12-column grid. Give columns or a min child width and it wraps itself. */
export default defineEntry({
  Grid: {
    props: z.object({
      columns: z.number().int().min(1).max(12).optional(),
      gap: z.enum(["none", "xs", "sm", "md", "lg", "xl"]).optional(),
      minChildWidth: z.string().optional(),
    }),
    slots: ["default"],
    description:
      "Responsive 12-column grid. Give columns or a min child width and it wraps itself.",
    component: ({ props, children }) =>
      h(
        Grid,
        {
          columns: props.columns ?? 12,
          gap: props.gap ?? "md",
          minChildWidth: props.minChildWidth,
        },
        () => slotted(children),
      ),
  },
});
