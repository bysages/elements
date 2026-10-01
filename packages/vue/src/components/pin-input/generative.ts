import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { PinInput } from "./index";

/** A row of single-digit boxes for a verification code. */
export default defineEntry({
  PinInput: {
    props: z.object({ label: z.string().optional(), count: z.number().int().optional() }),
    description: "A row of single-digit boxes for a verification code.",
    component: ({ props }) =>
      labelled(
        props.label,
        h(PinInput.Root as never, { placeholder: "\u00b7" }, () => [
          h(PinInput.Control, () =>
            Array.from({ length: props.count ?? 4 }, (_, index) =>
              h(PinInput.Input as never, { key: index, index } as never),
            ),
          ),
          h(PinInput.HiddenInput as never),
        ]),
      ),
  },
});
