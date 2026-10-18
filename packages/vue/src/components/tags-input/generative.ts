import { h } from "vue";
import { z } from "zod";

import { defineEntry, useBound } from "../../generative/shared";
import { TagsInput } from "./index";

/** A field that turns entries into removable tags. */
export default defineEntry({
  TagsInput: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      value: z.array(z.string()).optional(),
    }),
    description: "A field that turns entries into removable tags.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string[]>(props.value, bindings?.value);
      return h(TagsInput, {
        label: props.label,
        placeholder: props.placeholder,
        modelValue: value ?? ["Qinghua"],
        "onUpdate:modelValue": setValue,
      });
    },
  },
});
