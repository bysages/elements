import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { User } from "./index";

/** A person row: seal, name, and the quiet role beneath. */
export default defineEntry({
  User: {
    props: z.object({
      name: z.string(),
      description: z.string().optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description: "A person row: seal, name, and the quiet role beneath.",
    component: ({ props }) =>
      h(
        User as never,
        {
          name: props.name,
          description: props.description,
          size: props.size,
        } as never,
      ),
  },
});
