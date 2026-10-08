import { h } from "vue";

import { faces } from "../../generative/faces";
import { labelled, useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Input } from "./index";

/** A single-line field; rely on border, surface and the focus halo. */
export default defineEntry({
  Input: {
    ...faces.Input,
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string>(props.value, bindings?.value);
      return labelled(
        props.label,
        h(Input, {
          modelValue: value ?? "",
          placeholder: props.placeholder,
          type: props.type,
          disabled: props.disabled,
          "onUpdate:modelValue": (next: string) => setValue(next),
        }),
      );
    },
  },
});
