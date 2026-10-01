import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ProgressGroup } from "./index";

/** Several Progress tracks read as one group. */
export default defineEntry({
  ProgressGroup: {
    props: z.object({
      segments: z.array(z.object({ label: z.string(), value: z.number() })).optional(),
    }),
    slots: ["default"],
    description: "Several Progress tracks read as one group.",
    component: ({ props }) => {
      const segments = props.segments ?? [
        { label: "Ink", value: 6 },
        { label: "Paper", value: 3 },
        { label: "Seal", value: 1 },
      ];
      return h(ProgressGroup as never, { segments } as never);
    },
  },
});
