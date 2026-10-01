import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Stack } from "./index";

/** Flex container for layout. direction column stacks vertically, row lays side by side. gap is a named spacing step. */
export default defineEntry({
  Stack: {
    props: z.object({
      direction: z.enum(["column", "row"]).optional(),
      gap: z.enum(["none", "xs", "sm", "md", "lg", "xl"]).optional(),
      align: z.string().optional(),
      justify: z.string().optional(),
      wrap: z.boolean().optional(),
    }),
    slots: ["default"],
    description:
      "Flex container for layout. direction column stacks vertically, row lays side by side. gap is a named spacing step.",
    component: ({ props, children }) =>
      h(
        Stack,
        {
          direction: props.direction ?? "column",
          gap: props.gap ?? "md",
          align: props.align,
          justify: props.justify,
          wrap: props.wrap,
        },
        () => slotted(children),
      ),
  },
});
