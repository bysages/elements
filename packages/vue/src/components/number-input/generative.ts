import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { NumberInput } from "./index";

/** A numeric field with steppers and clamped bounds. */
export default defineEntry({
  NumberInput: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A numeric field with steppers and clamped bounds.",
    component: ({ props }) => {
      return labelled(
        props.label,
        h(NumberInput.Root as never, { defaultValue: "0" } as never, () => [
          h(NumberInput.Control, () => [
            h(NumberInput.Input as never),
            h(NumberInput.Scrubber, () => iconNode("pause")),
            h(NumberInput.IncrementTrigger, { "aria-label": "Increment" }, () =>
              iconNode("chevron-up"),
            ),
            h(NumberInput.DecrementTrigger, { "aria-label": "Decrement" }, () =>
              iconNode("chevron-down"),
            ),
          ]),
        ]),
      );
    },
  },
});
