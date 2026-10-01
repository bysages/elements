import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Progress } from "./index";

/** A working track that fills toward done. */
export default defineEntry({
  Progress: {
    ...faces.Progress,
    component: ({ props }) =>
      createElement(
        Progress.Root,
        { value: props.value },
        props.label != null ? createElement(Progress.Label, null, props.label!) : null,
        createElement(Progress.Track, null, createElement(Progress.Range)),
      ),
  },
});
