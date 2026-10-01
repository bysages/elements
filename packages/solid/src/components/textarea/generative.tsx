import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
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
        createComponent(Textarea, {
          get value() {
            return value ?? "";
          },
          get placeholder() {
            return props.placeholder;
          },
          get rows() {
            return props.rows;
          },
          onValueChange: (next: string) => setValue(next),
        }),
      );
    },
  },
});
