import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Badge } from "./index";

/** A small status seal beside content; reads at a glance. */
export default defineEntry({
  Badge: {
    ...faces.Badge,
    component: ({ props }) =>
      createElement(Badge, { tone: props.tone, variant: props.variant }, props.text),
  },
});
