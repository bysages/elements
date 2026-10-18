import { h } from "vue";
import { z } from "zod";

import { defineEntry, useBound } from "../../generative/shared";
import { NumberInput } from "./index";

/** A numeric field with steppers and clamped bounds. */
export default defineEntry({
  NumberInput: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A numeric field with steppers and clamped bounds.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<number>(props.value, bindings?.value);
      return h(NumberInput, {
        label: props.label,
        defaultValue: String(props.value ?? 0),
        ...(props.value === undefined ? {} : { modelValue: String(value ?? 0) }),
        "onUpdate:modelValue": (next: string) => setValue(Number(next)),
      });
    },
  },
});
