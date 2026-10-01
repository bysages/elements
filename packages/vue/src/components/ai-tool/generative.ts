import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Tool } from "./index";

/** A tool call row with its status. */
export default defineEntry({
  AiTool: {
    props: z.object({
      name: z.string().optional(),
      status: z.enum(["pending", "running", "completed"]).optional(),
      input: z.string().optional(),
    }),
    description: "A tool call row with its status.",
    component: ({ props }) =>
      h(Tool as never, { name: props.name, status: props.status } as never, () => [
        props.input != null ? h("pre", () => props.input!) : null,
      ]),
  },
});
