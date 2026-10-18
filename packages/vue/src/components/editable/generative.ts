import { h } from "vue";
import { z } from "zod";

import { defineEntry, useBound } from "../../generative/shared";
import { Editable } from "./index";

/** Text that turns into a field when activated, and back on commit. */
export default defineEntry({
  Editable: {
    props: z.object({
      label: z.string().optional(),
      value: z.string().optional(),
      placeholder: z.string().optional(),
    }),
    description: "Text that turns into a field when activated, and back on commit.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      return h(Editable, {
        label: props.label,
        placeholder: props.placeholder,
        defaultValue: props.value ?? "",
        ...(props.value === undefined ? {} : { modelValue: value }),
        "onUpdate:modelValue": setValue,
      });
    },
  },
});
