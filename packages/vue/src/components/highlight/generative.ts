import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Highlight } from "./index";

/** Marks the query's occurrences inside its text. */
export default defineEntry({
  Highlight: {
    props: z.object({ query: z.string().optional(), text: z.string() }),
    slots: ["default"],
    description: "Marks the query's occurrences inside its text.",
    component: ({ props }) =>
      h(Highlight as never, { query: props.query } as never, () => props.text ?? ""),
  },
});
