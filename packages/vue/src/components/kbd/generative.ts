import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Kbd } from "./index";

/** A keycap for a shortcut, e.g. Cmd+K. */
export default defineEntry({
  Kbd: {
    props: z.object({ text: z.string() }),
    description: "A keycap for a shortcut, e.g. Cmd+K.",
    component: ({ props }) => h(Kbd, null, () => props.text),
  },
});
