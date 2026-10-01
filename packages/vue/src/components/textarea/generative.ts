import { h } from "vue";
import { z } from "zod";

import { labelled, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Textarea } from "./index";

/** A multi-line field for prose-length answers. */
export default defineEntry({
  Textarea: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      rows: z.number().int().optional(),
      value: z.string().optional(),
    }),
    description: "A multi-line field for prose-length answers.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      return labelled(
        props.label,
        h(Textarea, {
          modelValue: value ?? "",
          placeholder: props.placeholder,
          rows: props.rows,
          "onUpdate:modelValue": (next: string) => setValue(next),
        }),
      );
    },
  },
});
