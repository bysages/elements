import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Stat } from "./index";

/** One loud figure with its quiet label and an optional delta. */
export default defineEntry({
  Stat: {
    ...faces.Stat,
    component: ({ props }) =>
      createElement(Stat.Root, null, [
        createElement(Stat.Label, null, props.label),
        createElement(Stat.Value, null, props.value),
        props.change != null
          ? createElement(Stat.Delta, { direction: props.direction ?? "flat" }, props.change!)
          : null,
      ]),
  },
});
