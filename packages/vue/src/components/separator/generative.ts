import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Separator } from "./index";

/** Hairline divider between sections. */
export default defineEntry({
  Separator: {
    ...faces.Separator,
    component: ({ props }) =>
      h(Separator, { orientation: props.orientation ?? "horizontal", decorative: true }),
  },
});
