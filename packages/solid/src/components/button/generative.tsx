import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Button } from "./index";

/** The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest. */
export default defineEntry({
  Button: {
    ...faces.Button,
    component: ({ props, emit }) =>
      createComponent(Button, {
        get variant() {
          return props.variant ?? "solid";
        },
        get tone() {
          return props.tone;
        },
        get size() {
          return props.size;
        },
        get disabled() {
          return props.disabled;
        },
        onClick: () => emit("press"),
        get children() {
          return props.label;
        },
      }),
  },
});
