import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Meter } from "./index";

/** A read-only measure between bounds. */
export default defineEntry({
  Meter: {
    props: z.object({ value: z.number().optional(), label: z.string().optional() }),
    description: "A read-only measure between bounds.",
    component: ({ props }) =>
      h(
        Meter.Root as never,
        { value: props.value ?? 0, label: props.label ?? undefined } as never,
        () => [h(Meter.Track as never)],
      ),
  },
});
