import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: ({ props }) => {
      const mark = createElement(
        "svg",
        { viewBox: "0 0 16 16", fill: "none", "aria-hidden": true },
        createElement("path", {
          d: "M4 8.5l2.5 2.5L12 5.5",
          stroke: "currentColor",
          strokeWidth: 1.5,
          strokeLinecap: "round",
          strokeLinejoin: "round",
        }),
      );
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
