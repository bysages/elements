import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { SplitButton } from "./index";

/** A main action with a divided menu of alternates; items name the alternates. */
export default defineEntry({
  SplitButton: {
    props: z.object({
      label: z.string(),
      items: z.array(z.string()).optional(),
      tone: z.string().optional(),
    }),
    description: "A main action with a divided menu of alternates; items name the alternates.",
    component: ({ props, emit }) =>
      h(SplitButton, {
        label: props.label,
        tone: props.tone,
        items: (props.items ?? []).map((item: string) => ({ label: item, value: item })),
        onSelect: () => emit("select"),
      } as never),
  },
});
