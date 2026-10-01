import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Spinner } from "./index";

/** A quiet wheel for work still settling. */
export default defineEntry({
  Spinner: {
    ...faces.Spinner,
    component: ({ props }) => h(Spinner, { size: props.size, "aria-label": props.label }),
  },
});
