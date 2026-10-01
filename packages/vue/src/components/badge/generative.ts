import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Badge } from "./index";

/** A small status seal beside content; reads at a glance. */
export default defineEntry({
  Badge: {
    ...faces.Badge,
    component: ({ props }) =>
      h(Badge, { tone: props.tone, variant: props.variant }, () => props.text),
  },
});
