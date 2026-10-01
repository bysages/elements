import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Separator } from "./index";

/** Hairline divider between sections. */
export default defineEntry({
  Separator: {
    props: z.object({ orientation: z.enum(["horizontal", "vertical"]).optional() }),
    description: "Hairline divider between sections.",
    component: ({ props }) =>
      h(Separator, { orientation: props.orientation ?? "horizontal", decorative: true }),
  },
});
