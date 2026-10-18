import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry, useBound } from "../../generative/shared";
import { Select } from "./index";

/** A choice field that opens a ruled list; options carry label and value. */
export default defineEntry({
  Select: {
    ...faces.Select,
    component: ({ props, bindings }) => {
      const [value, setValue] = useBound<string | string[]>(props.value, bindings?.value);
      return createComponent(Select, {
        get label() {
          return props.label;
        },
        get placeholder() {
          return props.placeholder;
        },
        get options() {
          return props.options;
        },
        get multiple() {
          return props.multiple;
        },
        get disabled() {
          return props.disabled;
        },
        get value() {
          return props.multiple
            ? Array.isArray(value)
              ? value
              : value
                ? [value]
                : undefined
            : Array.isArray(value)
              ? (value.at(0) ?? "")
              : value;
        },
        onValueChange: setValue,
      });
    },
  },
});
