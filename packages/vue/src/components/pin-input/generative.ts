import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { PinInput } from "./index";

/** A row of single-digit boxes for a verification code. */
export default defineEntry({
  PinInput: {
    props: z.object({ label: z.string().optional(), count: z.number().int().optional() }),
    description: "A row of single-digit boxes for a verification code.",
    component: ({ props }) => h(PinInput, { label: props.label, length: props.count ?? 4 }),
  },
});
