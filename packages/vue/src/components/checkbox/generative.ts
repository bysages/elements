import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: ({ props }) => {
      const mark = () => iconNode("check");
      return h(
        Checkbox.Root as never,
        { defaultChecked: props.checked ?? false, disabled: props.disabled },
        () => [
          h(Checkbox.Control, () => h(Checkbox.Indicator, () => mark())),
          h(Checkbox.Label, () => props.label),
          h(Checkbox.HiddenInput as never),
        ],
      );
    },
  },
});
