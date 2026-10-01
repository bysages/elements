import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Spinner } from "./index";

/** A quiet wheel for work still settling. */
export default defineEntry({
  Spinner: {
    ...faces.Spinner,
    component: ({ props }) =>
      createComponent(Spinner, {
        get size() {
          return props.size;
        },
        get "aria-label"() {
          return props.label;
        },
      }),
  },
});
