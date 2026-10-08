import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Button } from "./index";

/** The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest. */
export default defineEntry({
  Button: {
    ...faces.Button,
    component: ({ props, emit }) =>
      createElement(
        Button,
        {
          variant: props.variant ?? "solid",
          tone: props.tone,
          size: props.size,
          disabled: props.disabled,
          onClick: () => emit("press"),
        },
        props.label,
      ),
  },
});
