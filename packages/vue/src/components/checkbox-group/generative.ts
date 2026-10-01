import { h } from "vue";
import { z } from "zod";

import { labelled, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { CheckboxGroup } from "./index";

/** Several independent boxes; the value is the array of chosen ones. */
export default defineEntry({
  CheckboxGroup: {
    props: z.object({
      label: z.string().optional(),
      options: z.array(z.object({ label: z.string(), value: z.string() })),
      value: z.array(z.string()).optional(),
      layout: z.enum(["column", "row"]).optional(),
    }),
    description: "Several independent boxes; the value is the array of chosen ones.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string[]>(props.value, bindings?.value);
      return labelled(
        props.label,
        h(CheckboxGroup, {
          modelValue: value ?? [],
          options: props.options,
          layout: props.layout,
          "onUpdate:modelValue": (next: string[]) => setValue(next),
        }),
      );
    },
  },
});
