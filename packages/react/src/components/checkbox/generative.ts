import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: ({ props }) => {
      const mark = iconNode("check");
      return createElement(
        Checkbox.Root,
        { defaultChecked: props.checked ?? false, disabled: props.disabled },
        [
          createElement(Checkbox.Control, null, createElement(Checkbox.Indicator, null, mark)),
          createElement(Checkbox.Label, null, props.label),
          createElement(Checkbox.HiddenInput),
        ],
      );
    },
  },
});
