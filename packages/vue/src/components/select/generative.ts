import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry, useBound } from "../../generative/shared";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string | string[]>(props.value, bindings?.value);
      return h(Select, {
        label: props.label,
        placeholder: props.placeholder,
        options: props.options,
        multiple: props.multiple,
        disabled: props.disabled,
        modelValue: value,
        "onUpdate:modelValue": setValue,
      });
    },
  },
});
