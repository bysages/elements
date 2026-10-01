import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { AutoComplete } from "./index";

/** A field that suggests as you type; items are the suggestions. */
export default defineEntry({
  Autocomplete: {
    props: z.object({ placeholder: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A field that suggests as you type; items are the suggestions.",
    component: ({ props }) =>
      h(
        AutoComplete as never,
        {
          items: props.items ?? [],
          placeholder: props.placeholder,
        } as never,
      ),
  },
});
