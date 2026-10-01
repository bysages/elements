import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Ellipsis } from "./index";

/** Clamps its text to a few lines, the rest folded away. */
export default defineEntry({
  Ellipsis: {
    props: z.object({ lines: z.number().int().optional(), text: z.string() }),
    slots: ["default"],
    description: "Clamps its text to a few lines, the rest folded away.",
    component: ({ props }) =>
      h(Ellipsis, { lines: props.lines ?? 1, title: props.text }, () => props.text),
  },
});
