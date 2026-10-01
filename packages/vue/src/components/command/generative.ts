import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Command } from "./index";

/** A command list with grouped actions; items name them. */
export default defineEntry({
  Command: {
    props: z.object({
      items: z.array(z.string()).optional(),
      placeholder: z.string().optional(),
      open: z.boolean().optional(),
    }),
    description: "A command list with grouped actions; items name them.",
    component: ({ props }) =>
      h(
        Command as never,
        {
          items: (props.items ?? ["Open file", "Save", "Export"]).map((item: string) => ({
            label: item,
            value: item,
          })),
          placeholder: props.placeholder,
          open: props.open ?? false,
        } as never,
      ),
  },
});
