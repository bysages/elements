import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Separator } from "./index";

/** Hairline divider between sections. */
export default defineEntry({
  Separator: {
    ...faces.Separator,
    component: ({ props }) =>
      createComponent(Separator, {
        get orientation() {
          return props.orientation ?? "horizontal";
        },
        decorative: true,
      }),
  },
});
