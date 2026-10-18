import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Clipboard } from "./index";

/** Copies a value at a click and confirms. */
export default defineEntry({
  Clipboard: {
    props: z.object({ value: z.string().optional(), label: z.string().optional() }),
    description: "Copies a value at a click and confirms.",
    component: ({ props }) =>
      h(Clipboard, {
        label: props.label,
        defaultValue: props.value ?? "https://elements.bysages.com",
      }),
  },
});
