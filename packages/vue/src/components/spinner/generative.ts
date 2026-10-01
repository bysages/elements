import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Spinner } from "./index";

/** A quiet wheel for work still settling. */
export default defineEntry({
  Spinner: {
    props: z.object({ size: z.enum(["sm", "md", "lg"]).optional(), label: z.string().optional() }),
    description: "A quiet wheel for work still settling.",
    component: ({ props }) => h(Spinner, { size: props.size, "aria-label": props.label }),
  },
});
