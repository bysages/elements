import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Format } from "./index";

/** Formats a raw value for reading. */
export default defineEntry({
  Format: {
    props: z.object({
      value: z.union([z.string(), z.number()]).optional(),
      kind: z.enum(["number", "byte", "time", "relative-time"]).optional(),
    }),
    description: "Formats a raw value for reading.",
    component: ({ props }) => {
      const part =
        props.kind === "byte"
          ? Format.Byte
          : props.kind === "time"
            ? Format.Time
            : props.kind === "relative-time"
              ? Format.RelativeTime
              : Format.Number;
      return h(part as never, { value: props.value } as never);
    },
  },
});
