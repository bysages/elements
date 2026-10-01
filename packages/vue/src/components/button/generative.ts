import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Button } from "./index";

/** The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest. */
export default defineEntry({
  Button: {
    props: z.object({
      label: z.string(),
      variant: z.enum(["solid", "outline", "ghost", "subtle"]).optional(),
      tone: z.string().optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description:
      "The primary action register: solid ink for the one main action, outline, ghost, or subtle for the rest.",
    component: ({ props, emit }) =>
      h(
        Button,
        {
          variant: props.variant ?? "solid",
          tone: props.tone,
          size: props.size,
          onClick: () => emit("press"),
        },
        () => props.label,
      ),
  },
});
