import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry, slotted } from "../../generative/shared";
import { Stack } from "./index";

/** Flex container for layout. direction column stacks vertically, row lays side by side. gap is a named spacing step. */
export default defineEntry({
  Stack: {
    ...faces.Stack,
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
