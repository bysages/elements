import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Separator } from "./index";

/** Hairline divider between sections. */
export default defineEntry({
  Separator: {
    ...faces.Separator,
    component: ({ props }) =>
      createElement(Separator, {
        orientation: props.orientation ?? "horizontal",
        decorative: true,
      }),
  },
});
