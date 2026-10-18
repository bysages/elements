import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Progress } from "./index";

/** A working track that fills toward done. */
export default defineEntry({
  Progress: {
    ...faces.Progress,
    component: ({ props }) =>
      createComponent(Progress, {
        get value() {
          return props.value;
        },
        get max() {
          return props.max;
        },
        get label() {
          return props.label;
        },
      }),
  },
});
