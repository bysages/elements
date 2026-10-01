import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { DateInput } from "./index";

/** A field that reads a date, segment by segment. */
export default defineEntry({
  DateInput: {
    props: z.object({ label: z.string().optional() }),
    description: "A field that reads a date, segment by segment.",
    component: ({ props }) =>
      h(DateInput.Root as never, {}, () => [
        props.label != null ? h(DateInput.Label, () => props.label!) : null,
        h(DateInput.Control, () =>
          h(DateInput.SegmentGroup, () =>
            h(DateInput.SegmentContext, null, {
              default: (segment: unknown) => h(DateInput.Segment as never, { segment } as never),
            }),
          ),
        ),
        h(DateInput.HiddenInput as never),
      ]),
  },
});
