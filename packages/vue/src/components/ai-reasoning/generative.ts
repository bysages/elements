import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Reasoning } from "./index";

/** The thinking fold above an answer. */
export default defineEntry({
  AiReasoning: {
    props: z.object({ label: z.string().optional(), summary: z.string().optional() }),
    description: "The thinking fold above an answer.",
    component: ({ props }) =>
      h(Reasoning as never, { label: props.label } as never, () => props.summary ?? ""),
  },
});
