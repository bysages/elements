import { h } from "vue";

import { faces } from "../../generative/faces";
import { labelled, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Textarea } from "./index";

/** A multi-line field for prose-length answers. */
export default defineEntry({
  Textarea: {
    ...faces.Textarea,
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
