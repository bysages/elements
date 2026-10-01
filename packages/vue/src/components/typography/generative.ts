import { h } from "vue";

import { faces } from "../../generative/faces";
import { headingClass, textVoices } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Typography } from "./index";

/** Section heading. One per view at level 1; do not skip levels. */
export default defineEntry({
  Heading: {
    ...faces.Heading,
    component: ({ props }) =>
      h(Typography.Heading, { class: headingClass[props.level ?? "2"] }, () => props.text),
  },
  Text: {
    ...faces.Text,
    component: ({ props }) =>
      h(textVoices[(props.variant ?? "body") as keyof typeof textVoices], null, () => props.text),
  },
});
