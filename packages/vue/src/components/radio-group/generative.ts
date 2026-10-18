import { h } from "vue";

import { faces } from "../../generative/faces";
import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { RadioGroup } from "./index";

/** Several choices where exactly one may hold. */
export default defineEntry({
  RadioGroup: {
    ...faces.RadioGroup,
    component: ({ props }) => {
      const values = props.items ?? ["Option A", "Option B", "Option C"];
      return h(RadioGroup, {
        label: props.label,
        items: values.map((value: string) => ({ value, label: value })),
        defaultValue: slug(values[0] ?? ""),
      });
    },
  },
});
