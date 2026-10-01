import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { AspectRatio } from "./index";

/** Locks its child to a width/height ratio, media or a plate. */
export default defineEntry({
  AspectRatio: {
    props: z.object({ ratio: z.number().optional() }),
    slots: ["default"],
    description: "Locks its child to a width/height ratio, media or a plate.",
    component: ({ props, children }) =>
      h(AspectRatio, { ratio: String(props.ratio ?? 1.5) }, () => slotted(children)),
  },
});
