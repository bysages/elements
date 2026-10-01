import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Stat } from "./index";

/** One loud figure with its quiet label and an optional delta. */
export default defineEntry({
  Stat: {
    props: z.object({
      label: z.string(),
      value: z.string(),
      change: z.string().optional(),
      direction: z.enum(["up", "down", "flat"]).optional(),
    }),
    description: "One loud figure with its quiet label and an optional delta.",
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
