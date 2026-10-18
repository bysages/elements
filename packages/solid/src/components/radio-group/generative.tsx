import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { RadioGroup } from "./index";

/** Several choices where exactly one may hold. */
export default defineEntry({
  RadioGroup: {
    ...faces.RadioGroup,
    component: ({ props }) => {
      const values = () => props.items ?? ["Option A", "Option B", "Option C"];
      return createComponent(RadioGroup, {
        get label() {
          return props.label;
        },
        get items() {
          return values().map((value: string) => ({ value, label: value }));
        },
        get defaultValue() {
          return slug(values()[0] ?? "");
        },
      });
    },
  },
});
