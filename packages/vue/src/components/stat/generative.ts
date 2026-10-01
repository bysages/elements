import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Stat } from "./index";

/** One loud figure with its quiet label and an optional delta. */
export default defineEntry({
  Stat: {
    ...faces.Stat,
    component: ({ props }) =>
      h(Stat.Root, () => [
        h(Stat.Label, () => props.label),
        h(Stat.Value, () => props.value),
        props.change != null
          ? h(Stat.Delta, { direction: props.direction ?? "flat" }, () => props.change!)
          : null,
      ]),
  },
});
