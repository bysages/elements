import { chevron_down, chevron_up } from "@bysages/icons";
import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { glyphNode } from "../../internal/glyph";
import { NumberInput } from "./index";

/** A numeric field with steppers and clamped bounds. */
export default defineEntry({
  NumberInput: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A numeric field with steppers and clamped bounds.",
    component: ({ props }) => {
      const chevron = (up: boolean) =>
        glyphNode(up ? chevron_up : chevron_down, { width: 14, height: 14 });
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
