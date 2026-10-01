import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Button } from "./index";

/** The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest. */
export default defineEntry({
  Button: {
    ...faces.Button,
    component: ({ props, emit }) =>
      h(
        Button,
        {
          variant: props.variant ?? "solid",
          tone: props.tone,
          size: props.size,
          onClick: () => emit("press"),
        },
        () => props.label,
      ),
  },
});
