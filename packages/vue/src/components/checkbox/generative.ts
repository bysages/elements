import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry, useBound } from "../../generative/shared";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: ({ props, bindings }) => {
      const [checked, setChecked] = useBound<boolean>(props.checked, bindings?.checked);
      return h(Checkbox, {
        label: props.label,
        disabled: props.disabled,
        defaultValue: props.checked ?? false,
        ...(props.checked === undefined ? {} : { modelValue: checked }),
        "onUpdate:modelValue": setChecked,
      });
    },
  },
});
