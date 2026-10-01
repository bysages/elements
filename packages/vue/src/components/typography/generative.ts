import { h } from "vue";
import { z } from "zod";

import { headingClass, textVoices } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Typography } from "./index";

/** Section heading. One per view at level 1; do not skip levels. */
export default defineEntry({
  Heading: {
    props: z.object({ text: z.string(), level: z.enum(["1", "2", "3", "4"]).optional() }),
    description: "Section heading. One per view at level 1; do not skip levels.",
    component: ({ props }) =>
      h(Typography.Heading, { class: headingClass[props.level ?? "2"] }, () => props.text),
  },
  Text: {
    props: z.object({
      text: z.string(),
      variant: z.enum(["body", "lead", "muted", "label"]).optional(),
    }),
    description: "A prose voice: lead opens, body carries, muted whispers, label names.",
    component: ({ props }) =>
      h(textVoices[(props.variant ?? "body") as keyof typeof textVoices], null, () => props.text),
  },
});
