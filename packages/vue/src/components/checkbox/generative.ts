import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    props: z.object({
      label: z.string(),
      checked: z.boolean().optional(),
      disabled: z.boolean().optional(),
    }),
    description: "One independent box with its label.",
    component: ({ props }) => {
      const mark = () =>
        h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
          h("path", {
            d: "M4 8.5l2.5 2.5L12 5.5",
            stroke: "currentColor",
            "stroke-width": "1.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          }),
        ]);
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
