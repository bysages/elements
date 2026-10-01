import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Field } from "./index";

/** The labelled vessel around one control; give label and hint instead of hand-building them. */
export default defineEntry({
  Field: {
    props: z.object({
      label: z.string().optional(),
      hint: z.string().optional(),
      required: z.boolean().optional(),
      invalid: z.boolean().optional(),
    }),
    slots: ["default"],
    description:
      "The labelled vessel around one control; give label and hint instead of hand-building them.",
    component: ({ props, children }) =>
      h(
        Field.Root as never,
        { required: props.required ?? false, invalid: props.invalid ?? false } as never,
        () => [
          props.label != null ? h(Field.Label, () => props.label!) : null,
          ...slotted(children),
          props.hint != null ? h(Field.HelperText, () => props.hint!) : null,
        ],
      ),
  },
});
