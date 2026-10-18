import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { PasswordInput } from "./index";

/** A secret field with a visibility toggle. */
export default defineEntry({
  PasswordInput: {
    props: z.object({ label: z.string().optional() }),
    description: "A secret field with a visibility toggle.",
    component: ({ props }) => h(PasswordInput, { label: props.label }),
  },
});
