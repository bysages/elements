import { h } from "vue";
import { z } from "zod";

import { defineEntry, useBound } from "../../generative/shared";
import { Combobox } from "./index";

/** A filterable field over a list; items are the choices. */
export default defineEntry({
  Combobox: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      items: z.array(z.string()).optional(),
      value: z.string().optional(),
    }),
    description: "A filterable field over a list; items are the choices.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      return h(Combobox, {
        label: props.label,
        placeholder: props.placeholder,
        options: (props.items ?? []).map((item: string) => ({ label: item, value: item })),
        modelValue: value,
        "onUpdate:modelValue": setValue,
      });
    },
  },
});
