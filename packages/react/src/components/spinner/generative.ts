import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Spinner } from "./index";

/** A quiet wheel for work still settling. */
export default defineEntry({
  Spinner: {
    ...faces.Spinner,
    component: ({ props }) =>
      createElement(Spinner, { size: props.size, "aria-label": props.label }),
  },
});
