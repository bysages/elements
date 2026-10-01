import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { NumberInput } from "./index";

/** A numeric field with steppers and clamped bounds. */
export default defineEntry({
  NumberInput: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A numeric field with steppers and clamped bounds.",
    component: ({ props }) => {
      const chevron = (up: boolean) =>
        h(
          "svg",
          {
            width: 14,
            height: 14,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 1.75,
            "aria-hidden": true,
          },
          [h("path", { d: up ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6" })],
        );
      return labelled(
        props.label,
        h(NumberInput.Root as never, { defaultValue: "0" } as never, () => [
          h(NumberInput.Control, () => [
            h(NumberInput.Input as never),
            h(NumberInput.IncrementTrigger, { "aria-label": "Increment" }, () => chevron(true)),
            h(NumberInput.DecrementTrigger, { "aria-label": "Decrement" }, () => chevron(false)),
          ]),
        ]),
      );
    },
  },
});
