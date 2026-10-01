import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Mentions } from "./index";

/** A field that suggests @names as you type. */
export default defineEntry({
  Mentions: {
    props: z.object({ placeholder: z.string().optional() }),
    description: "A field that suggests @names as you type.",
    component: ({ props }) =>
      h(
        Mentions as never,
        {
          items: (props.items ?? ["sages", "funish", "ink"]).map((name: string) => ({
            label: "@" + name,
            value: name,
          })),
          placeholder: props.placeholder,
        } as never,
      ),
  },
});
