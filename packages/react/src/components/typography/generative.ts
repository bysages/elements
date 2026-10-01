import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { headingClass, textVoices } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Typography } from "./index";

/** Section heading. One per view at level 1; do not skip levels. */
export default defineEntry({
  Heading: {
    ...faces.Heading,
    component: ({ props }) =>
      createElement(
        Typography.Heading,
        { className: headingClass[props.level ?? "2"] },
        props.text,
      ),
  },
  Text: {
    ...faces.Text,
    component: ({ props }) => {
      const Voice = textVoices[(props.variant ?? "body") as keyof typeof textVoices];
      return createElement(Voice, null, props.text);
    },
  },
});
