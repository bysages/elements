import { createComponent, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Stack } from "./index";

/** Flex container for layout. direction column stacks vertically, row lays side by side. gap is a named spacing step. */
export default defineEntry({
  Stack: {
    ...faces.Stack,
    component: ({ props, children }) =>
      createComponent(Stack, {
        get direction() {
          return props.direction ?? "column";
        },
        get gap() {
          return props.gap ?? "md";
        },
        get align() {
          return props.align;
        },
        get justify() {
          return props.justify;
        },
        get wrap() {
          return props.wrap;
        },
        get children() {
          return children as JSX.Element;
        },
      }),
  },
});
