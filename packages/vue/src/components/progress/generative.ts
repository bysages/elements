import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Progress } from "./index";

/** A working track that fills toward done. */
export default defineEntry({
  Progress: {
    ...faces.Progress,
    component: ({ props }) =>
      h(
        Progress.Root,
        // Ark Vue reads the controlled fill from modelValue; value would
        // fall to attrs and the machine would sit at its midpoint.
        { modelValue: props.value, defaultValue: 0 },
        () => [
          props.label != null ? h(Progress.Label, () => props.label!) : null,
          h(Progress.Track, () => h(Progress.Range)),
        ],
      ),
  },
});
