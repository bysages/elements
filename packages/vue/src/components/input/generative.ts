import { h } from "vue";
import { z } from "zod";

import { labelled, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Input } from "./index";

/** A single-line field; rely on border, surface and the focus halo. */
export default defineEntry({
  Input: {
    props: z.object({
      label: z.string().optional(),
      placeholder: z.string().optional(),
      type: z.enum(["text", "email", "url", "search", "tel"]).optional(),
      value: z.string().optional(),
    }),
    description: "A single-line field; rely on border, surface and the focus halo.",
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      return labelled(
        props.label,
        h(Input, {
          modelValue: value ?? "",
          placeholder: props.placeholder,
          type: props.type,
          "onUpdate:modelValue": (next: string) => setValue(next),
        }),
      );
    },
  },
});
