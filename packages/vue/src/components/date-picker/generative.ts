import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { DatePicker } from "./index";

/** A field that opens a calendar to pick a date. */
export default defineEntry({
  DatePicker: {
    props: z.object({ label: z.string().optional() }),
    description: "A field that opens a calendar to pick a date.",
    component: ({ props }) => h(DatePicker, { label: props.label }),
  },
});
