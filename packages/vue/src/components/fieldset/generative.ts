import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Fieldset } from "./index";

/** A grouped field with one legend over its controls. */
export default defineEntry({
  Fieldset: {
    props: z.object({
      legend: z.string().optional(),
      hint: z.string().optional(),
      invalid: z.boolean().optional(),
    }),
    description: "A grouped field with one legend over its controls.",
    component: ({ props, children }) =>
      h(Fieldset.Root as never, { invalid: props.invalid ?? false } as never, () => [
        props.legend != null ? h(Fieldset.Legend, () => props.legend!) : null,
        ...slotted(children),
        props.hint != null ? h(Fieldset.HelperText, () => props.hint!) : null,
      ]),
  },
});
