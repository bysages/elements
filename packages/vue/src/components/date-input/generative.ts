import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { DateInput } from "./index";

/** A field that reads a date, segment by segment. */
export default defineEntry({
  DateInput: {
    props: z.object({ label: z.string().optional() }),
    description: "A field that reads a date, segment by segment.",
    component: ({ props }) => h(DateInput, { label: props.label }),
  },
});
