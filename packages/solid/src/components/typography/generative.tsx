import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { headingClass, textVoices } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Typography } from "./index";

/** Section heading. One per view at level 1; do not skip levels. */
export default defineEntry({
  Heading: {
    ...faces.Heading,
    component: ({ props }) =>
      createComponent(Typography.Heading, {
        get class() {
          return headingClass[props.level ?? "2"];
        },
        get children() {
          return props.text;
        },
      }),
  },
  Text: {
    ...faces.Text,
    component: ({ props }) => {
      const Voice = textVoices[(props.variant ?? "body") as keyof typeof textVoices];
      return createComponent(Voice, {
        get children() {
          return props.text;
        },
      });
    },
  },
});
