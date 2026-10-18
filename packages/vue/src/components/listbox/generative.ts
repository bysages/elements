import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Listbox } from "./index";

/** A standing list of options to pick one from. */
export default defineEntry({
  Listbox: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A standing list of options to pick one from.",
    component: ({ props }) =>
      h(Listbox, {
        label: props.label,
        options: (props.items ?? []).map((item: string) => ({ label: item, value: item })),
      }),
  },
});
